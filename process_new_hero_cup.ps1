Add-Type -AssemblyName System.Drawing

$baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$srcFile = Join-Path $baseDir "img\777044d1-a996-4cf4-b0ef-62a4617c7e1a.png"
$destFile = Join-Path $baseDir "img\storven-hero-cup.png"

$bytes = [System.IO.File]::ReadAllBytes($srcFile)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$src = [System.Drawing.Bitmap]::FromStream($ms)

$w = $src.Width  # 1672
$h = $src.Height # 941

# Crop cup region starting at X=760 to capture full saucer, beans, splash and handle
$cropX = 760
$cropY = 0
$cropW = $w - $cropX # 912
$cropH = $h          # 941

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cupCrop = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$src.Dispose()
$ms.Dispose()

# Lock bits for high-speed feathering
$bmpData = $cupCrop.LockBits((New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$totalBytes = [Math]::Abs($bmpData.Stride) * $cropH
$pixelValues = New-Object "byte[]" $totalBytes
[System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $pixelValues, 0, $totalBytes)

# Margins for soft edge fading (in pixels)
$fadeLeft = 110.0
$fadeRight = 100.0
$fadeTop = 130.0
$fadeBottom = 80.0

for ($y = 0; $y -lt $cropH; $y++) {
    $rowOffset = $y * $bmpData.Stride
    
    # Vertical factor fy
    $fy = 1.0
    if ($y -lt $fadeTop) {
        $t = $y / $fadeTop
        $fy = 0.5 * (1.0 - [Math]::Cos($t * [Math]::PI))
    } elseif ($y -gt ($cropH - $fadeBottom)) {
        $t = ($cropH - $y) / $fadeBottom
        $fy = 0.5 * (1.0 - [Math]::Cos($t * [Math]::PI))
    }
    
    for ($x = 0; $x -lt $cropW; $x++) {
        # Horizontal factor fx
        $fx = 1.0
        if ($x -lt $fadeLeft) {
            $t = $x / $fadeLeft
            $fx = 0.5 * (1.0 - [Math]::Cos($t * [Math]::PI))
        } elseif ($x -gt ($cropW - $fadeRight)) {
            $t = ($cropW - $x) / $fadeRight
            $fx = 0.5 * (1.0 - [Math]::Cos($t * [Math]::PI))
        }
        
        $factor = $fx * $fy
        if ($factor -lt 0.0) { $factor = 0.0 }
        if ($factor -gt 1.0) { $factor = 1.0 }
        
        $idx = $rowOffset + ($x * 4) + 3 # Alpha byte
        
        if ($factor -lt 0.999) {
            $val = [int]($pixelValues[$idx] * $factor)
            if ($val -lt 0) { $val = 0 }
            if ($val -gt 255) { $val = 255 }
            $pixelValues[$idx] = [byte]$val
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($pixelValues, 0, $bmpData.Scan0, $totalBytes)
$cupCrop.UnlockBits($bmpData)

# Save destination
$cupCrop.Save($destFile, [System.Drawing.Imaging.ImageFormat]::Png)
$cupCrop.Dispose()

Write-Output "Successfully updated storven-hero-cup.png with rectangular smooth feathering ($cropW x $cropH)"
