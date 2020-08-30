define(["require","exports","loading","components/groupedcards","cardBuilder","imageLoader"],(function(_require,_exports,_loading,_groupedcards,_cardBuilder,_imageLoader){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=function _default(view,params,tabContent){var latestPromise;this.preRender=function(){latestPromise=function getLatestPromise(context,params){_loading.default.show();var userId=ApiClient.getCurrentUserId(),options={IncludeItemTypes:"Episode",Limit:30,Fields:"PrimaryImageAspectRatio,BasicSyncInfo",ParentId:params.topParentId,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb"};return ApiClient.getJSON(ApiClient.getUrl("Users/"+userId+"/Items/Latest",options))}(0,params)},this.renderTab=function(){!function loadLatest(context,params,promise){promise.then((function(items){var html="";html+=_cardBuilder.default.getCardsHtml({items:items,shape:"backdrop",preferThumb:!0,showTitle:!0,showSeriesYear:!0,showParentTitle:!0,overlayText:!1,cardLayout:!1,showUnplayedIndicator:!1,showChildCountIndicator:!0,centerText:!0,lazy:!0,overlayPlayButton:!0,lines:2});var elem=context.querySelector("#latestEpisodes");elem.innerHTML=html,_imageLoader.default.lazyChildren(elem),_loading.default.hide(),new Promise((function(_resolve,_reject){return _require(["autoFocuser"],(function(imported){return _resolve(function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}newObj.default=obj,cache&&cache.set(obj,newObj);return newObj}(imported))}),_reject)})).then((function(_ref){_ref.default.autoFocus(context)}))}))}(tabContent,0,latestPromise)},tabContent.querySelector("#latestEpisodes").addEventListener("click",_groupedcards.default)},_loading=_interopRequireDefault(_loading),_groupedcards=_interopRequireDefault(_groupedcards),_cardBuilder=_interopRequireDefault(_cardBuilder),_imageLoader=_interopRequireDefault(_imageLoader)}));
//# sourceMappingURL=tvlatest.js.map
