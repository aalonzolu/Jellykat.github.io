define(["browser","dom","layoutManager","keyboardnavigation","css!./emby-slider","webcomponents","emby-input"],(function(_browser,_dom,_layoutManager,_keyboardnavigation,_embySlider,_webcomponents,_embyInput){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}_browser=_interopRequireDefault(_browser),_dom=_interopRequireDefault(_dom),_layoutManager=_interopRequireDefault(_layoutManager),_keyboardnavigation=_interopRequireDefault(_keyboardnavigation);var EmbySliderPrototype=Object.create(HTMLInputElement.prototype),supportsValueSetOverride=!1;if(Object.getOwnPropertyDescriptor&&Object.defineProperty){var descriptor=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");descriptor&&descriptor.configurable&&(supportsValueSetOverride=!0)}function mapClientToFraction(range,clientX){var rect=range.sliderBubbleTrack.getBoundingClientRect(),fraction=(clientX-rect.left)/rect.width,valueRange=range.max-range.min;if("any"!==range.step&&0!==valueRange){var step=(range.step||1)/valueRange;fraction=Math.round(fraction/step)*step}return Math.min(Math.max(fraction,0),1)}function mapFractionToValue(range,fraction){var value=(range.max-range.min)*fraction;if("any"!==range.step){var step=range.step||1;value=Math.round(value/step)*step}return value+=parseFloat(range.min),Math.min(Math.max(value,range.min),range.max)}function updateValues(isValueSet){if(!isValueSet||!this.keyboardDragging&&!this.touched){var range=this,value=range.value;cancelAnimationFrame(range.updateValuesFrame),range.updateValuesFrame=requestAnimationFrame((function(){var backgroundLower=range.backgroundLower;if(backgroundLower){var fraction=(value-range.min)/(range.max-range.min);fraction*=100,backgroundLower.style.width=fraction+"%"}}))}}function updateBubble(range,value,bubble,bubbleText){requestAnimationFrame((function(){var bubbleTrackRect=range.sliderBubbleTrack.getBoundingClientRect(),bubbleRect=bubble.getBoundingClientRect(),bubblePos=bubbleTrackRect.width*value/100;bubblePos=Math.min(Math.max(bubblePos,bubbleRect.width/2),bubbleTrackRect.width-bubbleRect.width/2),bubble.style.left=bubblePos+"px",value=range.getBubbleHtml?range.getBubbleHtml(value):'<h1 class="sliderBubbleText">'+(value=range.getBubbleText?range.getBubbleText(value):mapFractionToValue(range,value/100).toLocaleString())+"</h1>",bubble.innerHTML=value}))}EmbySliderPrototype.attachedCallback=function(){if("true"!==this.getAttribute("data-embyslider")){this.setAttribute("data-embyslider","true"),this.classList.add("mdl-slider"),this.classList.add("mdl-js-slider"),_browser.default.edge&&this.classList.add("slider-browser-edge"),_layoutManager.default.mobile||this.classList.add("mdl-slider-hoverthumb"),_layoutManager.default.tv&&this.classList.add("show-focus");var topContainer=_dom.default.parentWithClass(this,"sliderContainer-settings");if(topContainer&&this.getAttribute("label")){var label=this.ownerDocument.createElement("label");label.innerHTML=this.getAttribute("label"),label.classList.add("sliderLabel"),label.htmlFor=this.id,topContainer.insertBefore(label,topContainer.firstChild)}var containerElement=this.parentNode;containerElement.classList.add("mdl-slider-container");'<div class="mdl-slider-background-flex-container">','<div class="mdl-slider-background-flex">','<div class="mdl-slider-background-flex-inner">','<div class="mdl-slider-background-upper"></div>','<div class="mdl-slider-background-lower"></div>',"</div>","</div>","</div>",'<div class="sliderBubbleTrack"><div class="sliderBubble hide"></div></div>',containerElement.insertAdjacentHTML("beforeend",'<div class="mdl-slider-background-flex-container"><div class="mdl-slider-background-flex"><div class="mdl-slider-background-flex-inner"><div class="mdl-slider-background-upper"></div><div class="mdl-slider-background-lower"></div></div></div></div><div class="sliderBubbleTrack"><div class="sliderBubble hide"></div></div>'),this.sliderBubbleTrack=containerElement.querySelector(".sliderBubbleTrack"),this.backgroundLower=containerElement.querySelector(".mdl-slider-background-lower"),this.backgroundUpper=containerElement.querySelector(".mdl-slider-background-upper");var sliderBubble=containerElement.querySelector(".sliderBubble"),hasHideClass=sliderBubble.classList.contains("hide");_dom.default.addEventListener(this,"input",(function(e){this.dragging=!0,"true"!==this.dataset.sliderKeepProgress&&updateValues.call(this),updateBubble(this,100*function mapValueToFraction(range,value){var valueRange=range.max-range.min,fraction=0!==valueRange?(value-range.min)/valueRange:0;return Math.min(Math.max(fraction,0),1)}(this,this.value),sliderBubble),hasHideClass&&(sliderBubble.classList.remove("hide"),hasHideClass=!1)}),{passive:!0}),_dom.default.addEventListener(this,"change",(function(){this.dragging=!1,"true"===this.dataset.sliderKeepProgress&&updateValues.call(this),sliderBubble.classList.add("hide"),hasHideClass=!0}),{passive:!0}),_dom.default.addEventListener(this,window.PointerEvent?"pointermove":"mousemove",(function(e){this.dragging||(updateBubble(this,100*mapClientToFraction(this,e.clientX),sliderBubble),hasHideClass&&(sliderBubble.classList.remove("hide"),hasHideClass=!1))}),{passive:!0}),_dom.default.addEventListener(this,window.PointerEvent?"pointerleave":"mouseleave",(function(){sliderBubble.classList.add("hide"),hasHideClass=!0}),{passive:!0}),_browser.default.iOS&&(_dom.default.addEventListener(this,"touchstart",(function(e){if(1===e.targetTouches.length){this.touched=!0;var fraction=mapClientToFraction(this,e.targetTouches[0].clientX);this.value=mapFractionToValue(this,fraction),this.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!1})),e.preventDefault()}}),{capture:!0}),_dom.default.addEventListener(this,"touchmove",(function(e){if(this.touched&&1===e.targetTouches.length){var fraction=mapClientToFraction(this,e.targetTouches[0].clientX);this.value=mapFractionToValue(this,fraction),this.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!1}))}}),{passive:!0}),_dom.default.addEventListener(this,"touchend",(function(e){var range=this;setTimeout((function(){range.touched=!1,range.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!1}))}),0)}),{passive:!0})),supportsValueSetOverride?this.addEventListener("valueset",updateValues.bind(this,!0)):function startInterval(range){var interval=range.interval;interval&&clearInterval(interval);range.interval=setInterval(updateValues.bind(range,!0),100)}(this)}};var keyboardDraggingTimer;function startKeyboardDragging(elem){elem.keyboardDragging=!0,clearTimeout(keyboardDraggingTimer),keyboardDraggingTimer=setTimeout((function(){!function finishKeyboardDragging(elem){clearTimeout(keyboardDraggingTimer),keyboardDraggingTimer=void 0,elem.keyboardDragging=!1;var event=new Event("change",{bubbles:!0,cancelable:!1});elem.dispatchEvent(event)}(elem)}),1e3)}function stepKeyboard(elem,delta){startKeyboardDragging(elem),elem.value=Math.max(elem.min,Math.min(elem.max,parseFloat(elem.value)+delta));var event=new Event("input",{bubbles:!0,cancelable:!1});elem.dispatchEvent(event)}function onKeyDown(e){switch(_keyboardnavigation.default.getKeyName(e)){case"ArrowLeft":case"Left":stepKeyboard(this,-this.keyboardStepDown||-1),e.preventDefault(),e.stopPropagation();break;case"ArrowRight":case"Right":stepKeyboard(this,this.keyboardStepUp||1),e.preventDefault(),e.stopPropagation()}}function setRange(elem,startPercent,endPercent){var style=elem.style;style.left=Math.max(startPercent,0)+"%";var widthPercent=endPercent-startPercent;style.width=Math.max(Math.min(widthPercent,100),0)+"%"}EmbySliderPrototype.enableKeyboardDragging=function(){this.keyboardDraggingEnabled||(this.addEventListener("keydown",onKeyDown),this.keyboardDraggingEnabled=!0)},EmbySliderPrototype.setKeyboardSteps=function(stepDown,stepUp){this.keyboardStepDown=stepDown||stepUp||1,this.keyboardStepUp=stepUp||stepDown||1},EmbySliderPrototype.setBufferedRanges=function(ranges,runtime,position){var elem=this.backgroundUpper;if(elem){for(var range in null!=runtime&&(ranges=function mapRangesFromRuntimeToPercent(ranges,runtime){return runtime?ranges.map((function(r){return{start:r.start/runtime*100,end:r.end/runtime*100}})):[]}(ranges,runtime),position=position/runtime*100),ranges)if(!(null!=position&&position>=range.end))return void setRange(elem,range.start,range.end);setRange(elem,0,0)}},EmbySliderPrototype.setIsClear=function(isClear){var backgroundLower=this.backgroundLower;backgroundLower&&(isClear?backgroundLower.classList.add("mdl-slider-background-lower-clear"):backgroundLower.classList.remove("mdl-slider-background-lower-clear"))},EmbySliderPrototype.detachedCallback=function(){var interval=this.interval;interval&&clearInterval(interval),this.interval=null,this.backgroundUpper=null,this.backgroundLower=null},document.registerElement("emby-slider",{prototype:EmbySliderPrototype,extends:"input"})}));
//# sourceMappingURL=emby-slider.js.map
