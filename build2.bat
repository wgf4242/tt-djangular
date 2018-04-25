path=..\client\;%path%
cd client 2>nul
npm run build2
::ng build --prod --output-path "..\backend\src\static\ang" --watch --output-hashing none --sourcemap
