define(["require","scroller","dom","layoutManager","inputManager","focusManager","browser","webcomponents","css!./emby-scroller"],(function(_require,_scroller,_dom,_layoutManager,_inputManager,_focusManager,_browser,_webcomponents,_embyScroller){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}_scroller=_interopRequireDefault(_scroller),_dom=_interopRequireDefault(_dom),_layoutManager=_interopRequireDefault(_layoutManager),_inputManager=_interopRequireDefault(_inputManager),_focusManager=_interopRequireDefault(_focusManager),_browser=_interopRequireDefault(_browser);var ScrollerPrototype=Object.create(HTMLDivElement.prototype);function onInputCommand(e){var cmd=e.detail.command;"end"===cmd?(_focusManager.default.focusLast(this,"."+this.getAttribute("data-navcommands")),e.preventDefault(),e.stopPropagation()):"pageup"===cmd?(_focusManager.default.moveFocus(e.target,this,"."+this.getAttribute("data-navcommands"),-12),e.preventDefault(),e.stopPropagation()):"pagedown"===cmd&&(_focusManager.default.moveFocus(e.target,this,"."+this.getAttribute("data-navcommands"),12),e.preventDefault(),e.stopPropagation())}ScrollerPrototype.createdCallback=function(){this.classList.add("emby-scroller")},ScrollerPrototype.scrollToBeginning=function(){this.scroller&&this.scroller.slideTo(0,!0)},ScrollerPrototype.toStart=function(elem,immediate){this.scroller&&this.scroller.toStart(elem,immediate)},ScrollerPrototype.toCenter=function(elem,immediate){this.scroller&&this.scroller.toCenter(elem,immediate)},ScrollerPrototype.scrollToPosition=function(pos,immediate){this.scroller&&this.scroller.slideTo(pos,immediate)},ScrollerPrototype.getScrollPosition=function(){if(this.scroller)return this.scroller.getScrollPosition()},ScrollerPrototype.getScrollSize=function(){if(this.scroller)return this.scroller.getScrollSize()},ScrollerPrototype.getScrollEventName=function(){if(this.scroller)return this.scroller.getScrollEventName()},ScrollerPrototype.getScrollSlider=function(){if(this.scroller)return this.scroller.getScrollSlider()},ScrollerPrototype.addScrollEventListener=function(fn,options){this.scroller&&_dom.default.addEventListener(this.scroller.getScrollFrame(),this.scroller.getScrollEventName(),fn,options)},ScrollerPrototype.removeScrollEventListener=function(fn,options){this.scroller&&_dom.default.removeEventListener(this.scroller.getScrollFrame(),this.scroller.getScrollEventName(),fn,options)},ScrollerPrototype.attachedCallback=function(){this.getAttribute("data-navcommands")&&_inputManager.default.on(this,onInputCommand);var horizontal="false"!==this.getAttribute("data-horizontal"),slider=this.querySelector(".scrollSlider");horizontal&&(slider.style["white-space"]="nowrap");var enableScrollButtons=_layoutManager.default.desktop&&horizontal&&"false"!==this.getAttribute("data-scrollbuttons"),options={horizontal:horizontal,mouseDragging:1,mouseWheel:"false"!==this.getAttribute("data-mousewheel"),touchDragging:1,slidee:slider,scrollBy:200,speed:horizontal?270:240,elasticBounds:1,dragHandle:1,autoImmediate:!0,skipSlideToWhenVisible:"true"===this.getAttribute("data-skipfocuswhenvisible"),dispatchScrollEvent:enableScrollButtons||"true"===this.getAttribute("data-scrollevent"),hideScrollbar:enableScrollButtons||"true"===this.getAttribute("data-hidescrollbar"),allowNativeSmoothScroll:"true"===this.getAttribute("data-allownativesmoothscroll")&&!enableScrollButtons,allowNativeScroll:!enableScrollButtons,forceHideScrollbars:enableScrollButtons,requireAnimation:enableScrollButtons&&_browser.default.edge};this.scroller=new _scroller.default(this,options),this.scroller.init(),this.scroller.reload(),_layoutManager.default.tv&&this.getAttribute("data-centerfocus")&&function initCenterFocus(elem,scrollerInstance){_dom.default.addEventListener(elem,"focus",(function(e){var focused=_focusManager.default.focusableParent(e.target);focused&&scrollerInstance.toCenter(focused)}),{capture:!0,passive:!0})}(this,this.scroller),enableScrollButtons&&function loadScrollButtons(scroller){new Promise((function(_resolve,_reject){return _require(["emby-scrollbuttons"],(function(imported){return _resolve(function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}(imported))}),_reject)})).then((function(){scroller.insertAdjacentHTML("beforebegin",'<div is="emby-scrollbuttons" class="emby-scrollbuttons padded-right"></div>')}))}(this)},ScrollerPrototype.pause=function(){var headroom=this.headroom;headroom&&headroom.pause()},ScrollerPrototype.resume=function(){var headroom=this.headroom;headroom&&headroom.resume()},ScrollerPrototype.detachedCallback=function(){this.getAttribute("data-navcommands")&&_inputManager.default.off(this,onInputCommand);var headroom=this.headroom;headroom&&(headroom.destroy(),this.headroom=null);var scrollerInstance=this.scroller;scrollerInstance&&(scrollerInstance.destroy(),this.scroller=null)},document.registerElement("emby-scroller",{prototype:ScrollerPrototype,extends:"div"})}));
//# sourceMappingURL=emby-scroller.js.map
