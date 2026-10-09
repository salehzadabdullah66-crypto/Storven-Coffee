Add-Type -AssemblyName System.Drawing

$srcFile = Get-Item "img\777044d1-a996-4cf4-b0ef-62a4617c7e1a.png"
$bytes = [System.IO.File]::ReadAllBytes($srcFile.FullName)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$src = [System.Drawing.Bitmap]::FromStream($ms)

$w = $src.Width
$h = $src.Height
Write-Output "Image size: $w x $h"

# The cup center in 777044d1-a996-4cf4-b0ef-62a4617c7e1a.png:
# Let's crop:
# Option 1: Just the cup + saucer + splash + beans
# Cup center is around X = 1100 (66% of width), Y = 560 (60% of height)
# Let's crop a bounding box of 850x850 around it
$cropX = [int]($w * 0.44) # ~735
$cropY = [int]($h * 0.05) # ~47
$cropW = [int]($w * 0.55) # ~920
$cropH = [int]($h * 0.92) # ~865

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cupCrop = $src.Clone($rect, $src.PixelFormat)
$cupCrop.Save("img\new-cup-crop.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cupCrop.Dispose()

$src.Dispose()
$ms.Dispose()

Write-Output "Cropped cup saved to img\new-cup-crop.png"
