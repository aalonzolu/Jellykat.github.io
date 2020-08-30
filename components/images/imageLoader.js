function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}define(["exports","lazyLoader","userSettings","blurhash","css!./style"],(function(_exports,lazyLoader,userSettings,blurhash,_style){"use strict";function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}function _createForOfIteratorHelper(o,allowArrayLike){var it;if("undefined"==typeof Symbol||null==o[Symbol.iterator]){if(Array.isArray(o)||(it=function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function F(){};return{s:F,n:function n(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function s(){it=o[Symbol.iterator]()},n:function n(){var step=it.next();return normalCompletion=step.done,step},e:function e(_e2){didErr=!0,err=_e2},f:function f(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function lazyImage(elem){var source=arguments.length>1&&void 0!==arguments[1]?arguments[1]:elem.getAttribute("data-src");source&&fillImageElement(elem,source)}function itemBlurhashing(target,blurhashstr){if(blurhash.isBlurhashValid(blurhashstr)){var pixels;try{pixels=blurhash.decode(blurhashstr,18,18)}catch(err){return console.error("Blurhash decode error: ",err),void target.classList.add("non-blurhashable")}var canvas=document.createElement("canvas");canvas.width=18,canvas.height=18;var ctx=canvas.getContext("2d"),imgData=ctx.createImageData(18,18);imgData.data.set(pixels),ctx.putImageData(imgData,0,0),requestAnimationFrame((function(){canvas.classList.add("blurhash-canvas"),userSettings.enableFastFadein()?canvas.classList.add("lazy-blurhash-fadein-fast"):canvas.classList.add("lazy-blurhash-fadein"),target.parentNode.insertBefore(canvas,target),target.classList.add("blurhashed"),target.removeAttribute("data-blurhash")}))}}function fillImage(entry){if(!entry)throw new Error("entry cannot be null");var target=entry.target,source=void 0;source=target?target.getAttribute("data-src"):entry,entry.intersectionRatio>0?source&&fillImageElement(target,source):source||requestAnimationFrame((function(){!function emptyImageElement(elem){var url;"IMG"!==elem.tagName?(url=elem.style.backgroundImage.slice(4,-1).replace(/"/g,""),elem.style.backgroundImage="none",elem.style.backgroundColor=null):(url=elem.getAttribute("src"),elem.setAttribute("src",""));elem.setAttribute("data-src",url),elem.classList.remove("lazy-image-fadein-fast","lazy-image-fadein"),elem.classList.add("lazy-hidden")}(target)}))}function fillImageElement(elem,url){if(void 0===url)throw new TypeError("url cannot be undefined");var preloaderImg=new Image;preloaderImg.src=url,elem.classList.add("lazy-hidden"),preloaderImg.addEventListener("load",(function(){requestAnimationFrame((function(){"IMG"!==elem.tagName?(elem.style.backgroundImage="url('"+url+"')",elem.classList.contains("blurhashed")&&(elem.style.backgroundColor="#fff")):elem.setAttribute("src",url),elem.removeAttribute("data-src"),elem.classList.remove("lazy-hidden"),userSettings.enableFastFadein()?elem.classList.add("lazy-image-fadein-fast"):elem.classList.add("lazy-image-fadein")}))}))}function lazyChildren(elem){if(userSettings.enableBlurhash()){var _step,_iterator=_createForOfIteratorHelper(elem.querySelectorAll(".lazy"));try{for(_iterator.s();!(_step=_iterator.n()).done;){var lazyElem=_step.value,blurhashstr=lazyElem.getAttribute("data-blurhash");!lazyElem.classList.contains("blurhashed","non-blurhashable")&&blurhashstr?itemBlurhashing(lazyElem,blurhashstr):blurhashstr||lazyElem.classList.contains("blurhashed")||lazyElem.classList.add("non-blurhashable")}}catch(err){_iterator.e(err)}finally{_iterator.f()}}lazyLoader.lazyChildren(elem,fillImage)}function getPrimaryImageAspectRatio(items){for(var values=[],i=0,length=items.length;i<length;i++){var ratio=items[i].PrimaryImageAspectRatio||0;ratio&&(values[values.length]=ratio)}if(!values.length)return null;values.sort((function(a,b){return a-b}));var result,half=Math.floor(values.length/2);result=values.length%2?values[half]:(values[half-1]+values[half])/2;if(Math.abs(2/3-result)<=.15)return 2/3;if(Math.abs(16/9-result)<=.2)return 16/9;if(Math.abs(1-result)<=.15)return 1;return Math.abs(4/3-result)<=.15?4/3:result}function fillImages(elems){for(var i=0,length=elems.length;i<length;i++){fillImage(elems[0])}}function setLazyImage(element,url){element.classList.add("lazy"),element.setAttribute("data-src",url),lazyImage(element)}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.lazyImage=lazyImage,_exports.fillImage=fillImage,_exports.lazyChildren=lazyChildren,_exports.getPrimaryImageAspectRatio=getPrimaryImageAspectRatio,_exports.fillImages=fillImages,_exports.setLazyImage=setLazyImage,_exports.default=void 0,lazyLoader=_interopRequireWildcard(lazyLoader),userSettings=_interopRequireWildcard(userSettings),blurhash=_interopRequireWildcard(blurhash);var _default={setLazyImage:setLazyImage,fillImages:fillImages,fillImage:fillImage,lazyImage:lazyImage,lazyChildren:lazyChildren,getPrimaryImageAspectRatio:getPrimaryImageAspectRatio};_exports.default=_default}));
//# sourceMappingURL=imageLoader.js.map
