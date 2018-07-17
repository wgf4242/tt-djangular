cd client 2>nul
rem ng build --output-path "..\backend\src\templates" --watch --extract-css --output-hashing none
ng build --output-path "..\backend\src\static\ang" --watch --extract-css --output-hashing none
rem ng build --prod --output-path "..\backend\src\static\ang" --watch --output-hashing none
::ng build --prod --output-path "..\backend\src\static\ang" --watch --output-hashing none --sourcemap
