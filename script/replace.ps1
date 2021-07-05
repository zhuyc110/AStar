$files = Get-ChildItem -Path './dist/' -Recurse -Include *.js

$importReg = 'import [\w\W]+";'

foreach ($file in $files) {
    $content = Get-Content $file

    for ($i = 0; $i -lt $content.Length; $i++) {
        if ($content[$i] -match $importReg) {
            $content[$i] = $content[$i] -ireplace '";', '.js";'
        }
    }

    $content | Set-Content $file
}