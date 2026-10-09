Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "img\storven-hero-cup.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$w = $bmp.Width
$h = $bmp.Height

$c00 = $bmp.GetPixel(10, 10)
$cTop = $bmp.GetPixel($w / 2, 10)
$cLeft = $bmp.GetPixel(10, $h / 2)
$cBottom = $bmp.GetPixel($w / 2, $h - 10)

Write-Output "Top-Left (10,10): R=$($c00.R), G=$($c00.G), B=$($c00.B)"
Write-Output "Top-Center: R=$($cTop.R), G=$($cTop.G), B=$($cTop.B)"
Write-Output "Left-Center: R=$($cLeft.R), G=$($cLeft.G), B=$($cLeft.B)"
Write-Output "Bottom-Center: R=$($cBottom.R), G=$($cBottom.G), B=$($cBottom.B)"

$bmp.Dispose()
