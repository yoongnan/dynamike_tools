# dynamike_tools

upgrade the npm version
========================
npm install -g n 

install necessary library
=========================
npm install
npm install @angular/cli
npm install @angular-devkit/build-angular 

Start Server
=============
npm run build -- -c=prod

Configure for Android 
=======================
npm install -g cordova
cordova create dynamike com.dynamike.pos DynamikeApp
cd dynamike
ng build --base-href . --output-path ../www/
cordova platform add android
cordova platform rm android

cd C:\Users\bysadmin\AppData\Local\Android\Sdk\tools\bin
sdkmanager --licenses

cordova build android

cordova run android --no-native-run
cordova emulate android

Install cordova and build apk
=======================
npm install -g cordova
ng build --aot
cordova build android

Debug Android App
=======================
cordova run android --debug --target=YOURDEVICEIDHER
chrome://inspect/#devices

Release Android App
=======================
cordova build --release android


Configure for Desktop apps
==========================
refer this link https://fireship.io/lessons/desktop-apps-with-electron-and-angular/
npm install electron --save-dev

packing as exe file
====================
npm install electron-packager -g
npm install electron-packager --save-dev

window apps
===========
electron-packager . --platform=win32

Mac apps
===========
electron-packager . --platform=darwin