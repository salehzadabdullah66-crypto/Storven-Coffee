Add-Type -AssemblyName System.Drawing

# 1. Resolve directory safely whether executed as script or line-by-line
$baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$srcPath = Join-Path $baseDir "img\storven-hero-cup.jpg"
$destPath = Join-Path $baseDir "img\storven-hero-cup.png"

if (-not (Test-Path $srcPath)) {
    Write-Error "Source image not found: $srcPath"
    exit 1
}

# 2. Read image without locking file on disk
$fileBytes = [System.IO.File]::ReadAllBytes($srcPath)
$ms = New-Object System.IO.MemoryStream(,$fileBytes)
$srcImage = [System.Drawing.Image]::FromStream($ms)

$w = $srcImage.Width
$h = $srcImage.Height

$dest = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($srcImage, 0, 0, $w, $h)
$g.Dispose()
$srcImage.Dispose()
$ms.Dispose()

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$bmpData = $dest.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$totalBytes = [Math]::Abs($bmpData.Stride) * $h
$pixelValues = New-Object "byte[]" $totalBytes
[System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $pixelValues, 0, $totalBytes)

# Center of cup
$cx = $w * 0.505
$cy = $h * 0.545

# Tight circular radii
$r0 = $w * 0.21
$r1 = $w * 0.35

for ($y = 0; $y -lt $h; $y++) {
    $rowOffset = $y * $bmpData.Stride
    $dy = $y - $cy
    $dy2 = $dy * $dy
    for ($x = 0; $x -lt $w; $x++) {
        $dx = $x - $cx
        $d = [Math]::Sqrt($dx * $dx + $dy2)
        $idx = $rowOffset + ($x * 4) + 3
        if ($d -ge $r1) {
            $pixelValues[$idx] = 0
        } elseif ($d -gt $r0) {
            $t = ($d - $r0) / ($r1 - $r0)
            $f = 0.5 * (1.0 + [Math]::Cos($t * [Math]::PI))
            $val = [int]($pixelValues[$idx] * $f)
            if ($val -lt 0) { $val = 0 }
            if ($val -gt 255) { $val = 255 }
            $pixelValues[$idx] = [byte]$val
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($pixelValues, 0, $bmpData.Scan0, $totalBytes)
$dest.UnlockBits($bmpData)

$dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()

Write-Output "Tight feathering completed successfully: $destPath"
