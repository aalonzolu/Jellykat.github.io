define(["layoutManager","css!./emby-radio","webcomponents","browser"],(function(_layoutManager,_embyRadio,_webcomponents,_browser){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}_layoutManager=_interopRequireDefault(_layoutManager),_browser=_interopRequireDefault(_browser);var EmbyRadioPrototype=Object.create(HTMLInputElement.prototype);function onKeyDown(e){if(13===e.keyCode||32===e.keyCode&&_browser.default.tizen)return e.preventDefault(),this.checked||(this.checked=!0,this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))),!1}EmbyRadioPrototype.attachedCallback=function(){var showFocus=!_layoutManager.default.mobile;if("true"!==this.getAttribute("data-radio")){this.setAttribute("data-radio","true"),this.classList.add("mdl-radio__button");var labelElement=this.parentNode;labelElement.classList.add("mdl-radio"),labelElement.classList.add("mdl-js-radio"),labelElement.classList.add("mdl-js-ripple-effect"),showFocus&&labelElement.classList.add("show-focus");var labelTextElement=labelElement.querySelector("span");labelTextElement.classList.add("radioButtonLabel"),labelTextElement.classList.add("mdl-radio__label");var html="";html+='<div class="mdl-radio__circles">',html+="<svg>",html+="<defs>",html+='<clipPath id="cutoff">',html+='<circle cx="50%" cy="50%" r="50%" />',html+="</clipPath>",html+="</defs>",html+='<circle class="mdl-radio__outer-circle" cx="50%" cy="50%" r="50%" fill="none" stroke="currentcolor" stroke-width="0.26em" clip-path="url(#cutoff)" />',html+='<circle class="mdl-radio__inner-circle" cx="50%" cy="50%" r="25%" fill="currentcolor" />',html+="</svg>",showFocus&&(html+='<div class="mdl-radio__focus-circle"></div>'),html+="</div>",this.insertAdjacentHTML("afterend",html),this.addEventListener("keydown",onKeyDown)}},document.registerElement("emby-radio",{prototype:EmbyRadioPrototype,extends:"input"})}));
//# sourceMappingURL=emby-radio.js.map
