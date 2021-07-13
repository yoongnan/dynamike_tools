# dynamike_tools

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