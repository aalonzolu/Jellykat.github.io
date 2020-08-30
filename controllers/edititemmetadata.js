define(["require","exports","loading","scripts/editorsidebar"],(function(_require,_exports,_loading,_editorsidebar){"use strict";function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function reload(context,itemId){_loading.default.show(),itemId?new Promise((function(_resolve,_reject){return _require(["metadataEditor"],(function(imported){return _resolve(function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}(imported))}),_reject)})).then((function(_ref){_ref.default.embed(context.querySelector(".editPageInnerContent"),itemId,ApiClient.serverInfo().Id)})):(context.querySelector(".editPageInnerContent").innerHTML="",_loading.default.hide())}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=function _default(view,params){view.addEventListener("viewshow",(function(){reload(this,MetadataEditor.getCurrentItemId())})),MetadataEditor.setCurrentItemId(null),view.querySelector(".libraryTree").addEventListener("itemclicked",(function(event){var data=event.detail;data.id!=MetadataEditor.getCurrentItemId()&&(MetadataEditor.setCurrentItemId(data.id),reload(view,data.id))}))},_loading=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(_loading)}));
//# sourceMappingURL=edititemmetadata.js.map
