Add-Type -AssemblyName System.Drawing

$srcFile = Get-Item "img\777044d1-a996-4cf4-b0ef-62a4617c7e1a.png"
$bytes = [System.IO.File]::ReadAllBytes($srcFile.FullName)
$ms = New-Object System.IO.MemoryStream(,$bytes)
$src = [System.Drawing.Bitmap]::FromStream($ms)

$w = $src.Width  # 1672
$h = $src.Height # 941

# In img\new-cup-crop.png, cropX was 735 (w * 0.44) and showed a sliver of 'n'.
# The 'n' in "Storven" ends around X = 770.
# So if we crop from X = 780 to 1672:
# Width = 1672 - 780 = 892
# Height = 941
# The cup center will be roughly at X = 1180 in original, so 1180 - 780 = 400 in cropped.
# 400 / 892 = 45% (almost perfectly centered!)
# Let's test cropX = 780:

$cropX = 780
$cropY = 0
$cropW = $w - $cropX
$cropH = $h

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cupCrop = $src.Clone($rect, $src.PixelFormat)
$cupCrop.Save("img\test-cup-780.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cupCrop.Dispose()

$src.Dispose()
$ms.Dispose()

Write-Output "Saved test-cup-780.png ($cropW x $cropH)"
