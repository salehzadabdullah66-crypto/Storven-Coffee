Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "img\storven-hero-cup.jpg"
$destPath = Join-Path $PSScriptRoot "img\storven-hero-cup.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = $src.Width
$h = $src.Height
$dest = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$g = [System.Drawing.Graphics]::FromImage($dest)
$g.DrawImage($src, 0, 0, $w, $h)
$g.Dispose()

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$bmpData = $dest.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$totalBytes = [Math]::Abs($bmpData.Stride) * $h
$pixelValues = New-Object "byte[]" $totalBytes
[System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $pixelValues, 0, $totalBytes)

# تلاشي حواف الإطار الخارجي فقط لمنع أي خط حاد، مع إبقاء الفنجان كاملاً وطبيعياً 100%
$margin = 50

for ($y = 0; $y -lt $h; $y++) {
    $rowOffset = $y * $bmpData.Stride
    $distY = [Math]::Min($y, $h - 1 - $y)
    $alphaY = 1.0
    if ($distY -lt $margin) {
        $p = $distY / $margin
        $alphaY = $p * $p * (3.0 - 2.0 * $p)
    }

    for ($x = 0; $x -lt $w; $x++) {
        $distX = [Math]::Min($x, $w - 1 - $x)
        $alphaX = 1.0
        if ($distX -lt $margin) {
            $p = $distX / $margin
            $alphaX = $p * $p * (3.0 - 2.0 * $p)
        }
        
        $alpha = $alphaX * $alphaY
        $idx = $rowOffset + ($x * 4) + 3
        
        if ($alpha -lt 1.0) {
            $val = [int]($pixelValues[$idx] * $alpha)
            if ($val -lt 0) { $val = 0 }
            if ($val -gt 255) { $val = 255 }
            $pixelValues[$idx] = [byte]$val
        }
    }
}

[System.Runtime.InteropServices.Marshal]::Copy($pixelValues, 0, $bmpData.Scan0, $totalBytes)
$dest.UnlockBits($bmpData)

$dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()
$dest.Dispose()

Write-Output "Box feathering completed successfully!"
