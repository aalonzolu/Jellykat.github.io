define(["layoutManager","css!./emby-button","webcomponents"],(function(_layoutManager,_embyButton,_webcomponents){"use strict";_layoutManager=function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(_layoutManager);var EmbyButtonPrototype=Object.create(HTMLButtonElement.prototype);EmbyButtonPrototype.createdCallback=function(){this.classList.add("paper-icon-button-light"),_layoutManager.default.tv&&this.classList.add("show-focus")},document.registerElement("paper-icon-button-light",{prototype:EmbyButtonPrototype,extends:"button"})}));
//# sourceMappingURL=paper-icon-button-light.js.map
