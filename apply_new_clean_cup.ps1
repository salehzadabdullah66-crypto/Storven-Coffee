Add-Type -AssemblyName System.Drawing

$srcUpload = "C:\Users\PC\.gemini\antigravity-ide\brain\30f80ac1-2b8d-495a-aff2-20e162d25f14\.user_uploaded\media_1791497422908.jpg"
$bannerDest = "img\storven-hero-banner.jpg"
$cupDest = "img\storven-hero-cup.png"

# Copy as banner image
Copy-Item $srcUpload $bannerDest -Force
Copy-Item $srcUpload "img\777044d1-a996-4cf4-b0ef-62a4617c7e1a.png" -Force

$bytes = [System.IO.File]::ReadAllBytes($srcUpload)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$src = [System.Drawing.Bitmap]::FromStream($ms)

$w = $src.Width
$h = $src.Height
Write-Output "New image dimensions: $w x $h"

# Crop ratios identical to previous so cup position is EXACTLY preserved:
# In previous 1672x941: cropX was 760 (45.45% of width).
# Crop width was w - cropX (54.55% of width).
$cropX = [int]($w * (760.0 / 1672.0))
$cropY = 0
$cropW = $w - $cropX
$cropH = $h

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cupCrop = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$src.Dispose()
$ms.Dispose()

# Lock bits for identical rectangular soft feathering
$bmpData = $cupCrop.LockBits((New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$totalBytes = [Math]::Abs($bmpData.Stride) * $cropH
$pixelValues = New-Object "byte[]" $totalBytes
[System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $pixelValues, 0, $totalBytes)

# Proportional fade margins:
$fadeLeft = 110.0 * ($cropW / 912.0)
$fadeRight = 100.0 * ($cropW / 912.0)
$fadeTop = 130.0 * ($cropH / 941.0)
$fadeBottom = 80.0 * ($cropH / 941.0)

for ($y = 0; $y -lt $cropH; $y++) {
    $rowOffset = $y * $bmpData.Stride
    
    $fy = 1.0
    if ($y -lt $fadeTop) {
        $t = $y / $fadeTop
        $fy = 0.5 * (1.0 - [Math]::Cos($t * [Math]::PI))
    } elseif ($y -gt ($cropH - $fadeBottom)) {
        $t = ($cropH - $y) / $fadeBottom
        $fy = 0.5 * (1.0 - [Math]::Cos($t * [Math]::PI))
    }
    
    for ($x = 0; $x -lt $cropW; $x++) {
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

$cupCrop.Save($cupDest, [System.Drawing.Imaging.ImageFormat]::Png)
$cupCrop.Dispose()

Write-Output "Successfully updated storven-hero-cup.png and storven-hero-banner.jpg with clean no-smoke image ($cropW x $cropH)"
