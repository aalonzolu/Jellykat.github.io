"use strict";window.appMode="standalone",function(){function injectScriptElement(src,onload){if(src){var script=document.createElement("script");window.dashboardVersion&&(src+="?v=".concat(window.dashboardVersion)),script.src=src,script.setAttribute("async",""),onload&&(script.onload=onload),document.head.appendChild(script)}}function loadSite(){injectScriptElement("./libraries/alameda.js",(function(){injectScriptElement("./scripts/site.js")}))}try{Promise.resolve()}catch(ex){window.Promise=void 0,window.Promise=void 0}window.Promise?loadSite():injectScriptElement("./libraries/npo.js",loadSite)}();
//# sourceMappingURL=apploader.js.map
