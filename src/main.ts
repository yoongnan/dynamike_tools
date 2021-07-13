import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';


let configuration = '${APP_CONFIG}';
let nodeEnvironment = configuration === '' || configuration.startsWith('$') ? '' : `.${configuration}`;
let env = require('./environments/environment' + nodeEnvironment);
// let testCookie = {
//   metaVal: [
//     { name: 'microsites-utag', content: 'https://tags.tiqcdn.com/utag/vmware/microsites-privacy/qa/utag.js' },
//     { name: 'microsites-utag', content: 'https://tags.tiqcdn.com/utag/vmware/microsites-at-privacy/qa/utag.js' },
//     { name: 'onetrust-data-domain', content: 'b9242434-9feb-47be-a894-3a9e658fdd50-test' },
//   ],
//   scriptVal: [
//     { type: "text/JavaScript", src: './lib/jquery-1.11.0.min.js' },
//     { type: "text/JavaScript", src: 'https://api.demandbase.com/api/v2/ip.js?key=e1f90d4a92d08428627aa34a78d58cc3e866c84f&var=db' },
//     { type: "text/JavaScript", src: 'https://tags.tiqcdn.com/utag/vmware/microsites-privacy/qa/utag.sync.js' },
//     { type: "text/JavaScript", src: 'https://www.vmware.com/files/templates/inc/utag_data.js' },
//     { type: "text/plain", cls: 'optanon-category-C0001' }
//   ],
//   jq:
//     { type: "text/JavaScript", src: 'https://www.vmware.com/content/dam/digitalmarketing/onetrust/assets/js/jquery-1.11.0.min.js' },
// }

// let prodCookie = {
//   metaVal: [
//     { name: 'microsites-utag', content: 'https://tags.tiqcdn.com/utag/vmware/microsites-privacy/prod/utag.js' },
//     { name: 'microsites-utag', content: 'https://tags.tiqcdn.com/utag/vmware/microsites-privacy/prod/utag.js' },
//     { name: 'onetrust-data-domain', content: 'b9242434-9feb-47be-a894-3a9e658fdd50' },
//   ],
//   scriptVal: [
//     { type: "text/JavaScript", src: './lib/jquery-1.11.0.min.js' },
//     { type: "text/JavaScript", src: 'https://api.demandbase.com/api/v2/ip.js?key=e1f90d4a92d08428627aa34a78d58cc3e866c84f&var=db' },
//     { type: "text/JavaScript", src: 'https://tags.tiqcdn.com/utag/vmware/microsites-privacy/prod/utag.sync.js' },
//     { type: "text/JavaScript", src: 'https://www.vmware.com/files/templates/inc/utag_data.js' },
//     { type: "text/plain", cls: 'optanon-category-C0001' }
//   ],
//   jq:
//     { type: "text/JavaScript", src: 'https://www.vmware.com/content/dam/digitalmarketing/onetrust/assets/js/jquery-1.11.0.min.js' },
// }
// if (env.environment.production) {
//   enableProdMode();
//   // addScript(prodCookie.jq.type, prodCookie.jq.src)
//   // setTimeout(() => {
//   setTrust(prodCookie.metaVal, prodCookie.scriptVal);
//   // }, 1500)
// } else {
//   // addScript(testCookie.jq.type, testCookie.jq.src)
//   // setTimeout(() => {
//   setTrust(testCookie.metaVal, testCookie.scriptVal);
//   // }, 1500)
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// function addMeta(n, c) {
//   let Meta = document.createElement('meta');
//   Meta.name = n; Meta.content = c;
//   document.getElementsByTagName('head')[0].appendChild(Meta)
// }
// function addScript(t, s, c?) {
//   let Script = document.createElement('script');
//   Script.type = t; s ? Script.src = s : ""; c ? Script.className = c : "";
//   document.getElementsByTagName('head')[0].appendChild(Script)
// }
// function setTrust(m, s) {
//   m.forEach((r) => { addMeta(r.name, r.content) })
//   s.forEach((r) => { addScript(r.type, r.src ? r.src : "", r.cls ? r.cls : "") })
// }
