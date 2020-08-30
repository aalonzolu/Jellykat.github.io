define(["require","exports","dom","dialogHelper","loading","layoutManager","connectionManager","globalize","emby-input","emby-checkbox","paper-icon-button-light","emby-select","material-icons","css!./../formdialog","emby-button"],(function(_require,_exports,_dom,_dialogHelper,_loading,_layoutManager,_connectionManager,_globalize,_embyInput,_embyCheckbox,_paperIconButtonLight,_embySelect,_materialIcons,_formdialog,_embyButton){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}function centerFocus(elem,horiz,on){new Promise((function(_resolve,_reject){return _require(["scrollHelper"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){var scrollHelper=_ref.default,fn=on?"on":"off";scrollHelper.centerFocus[fn](elem,horiz)}))}function onSubmit(e){_loading.default.show();var dlg=_dom.default.parentWithClass(e.target,"dialog"),options=this.options,apiClient=_connectionManager.default.getApiClient(options.serverId),replaceAllMetadata="all"===dlg.querySelector("#selectMetadataRefreshMode").value,mode="scan"===dlg.querySelector("#selectMetadataRefreshMode").value?"Default":"FullRefresh",replaceAllImages="FullRefresh"===mode&&dlg.querySelector(".chkReplaceImages").checked;return options.itemIds.forEach((function(itemId){apiClient.refreshItem(itemId,{Recursive:!0,ImageRefreshMode:mode,MetadataRefreshMode:mode,ReplaceAllImages:replaceAllImages,ReplaceAllMetadata:replaceAllMetadata})})),_dialogHelper.default.close(dlg),new Promise((function(_resolve,_reject){return _require(["toast"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){(0,_ref2.default)(_globalize.default.translate("RefreshQueued"))})),_loading.default.hide(),e.preventDefault(),!1}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0,_dom=_interopRequireDefault(_dom),_dialogHelper=_interopRequireDefault(_dialogHelper),_loading=_interopRequireDefault(_loading),_layoutManager=_interopRequireDefault(_layoutManager),_connectionManager=_interopRequireDefault(_connectionManager),_globalize=_interopRequireDefault(_globalize);var _default=function(){function RefreshDialog(options){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,RefreshDialog),this.options=options}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(RefreshDialog,[{key:"show",value:function show(){var dialogOptions={removeOnClose:!0,scrollY:!1};_layoutManager.default.tv?dialogOptions.size="fullscreen":dialogOptions.size="small";var dlg=_dialogHelper.default.createDialog(dialogOptions);dlg.classList.add("formDialog");var html="";return html+='<div class="formDialogHeader">',html+='<button is="paper-icon-button-light" class="btnCancel autoSize" tabindex="-1"><span class="material-icons arrow_back"></span></button>',html+='<h3 class="formDialogHeaderTitle">',html+=_globalize.default.translate("RefreshMetadata"),html+="</h3>",html+="</div>",html+=function getEditorHtml(){var html="";return html+='<div class="formDialogContent smoothScrollY" style="padding-top:2em;">',html+='<div class="dialogContentInner dialog-content-centered">',html+='<form style="margin:auto;">',html+='<div class="fldSelectPlaylist selectContainer">',html+='<select is="emby-select" id="selectMetadataRefreshMode" label="'+_globalize.default.translate("LabelRefreshMode")+'">',html+='<option value="scan">'+_globalize.default.translate("ScanForNewAndUpdatedFiles")+"</option>",html+='<option value="missing">'+_globalize.default.translate("SearchForMissingMetadata")+"</option>",html+='<option value="all" selected>'+_globalize.default.translate("ReplaceAllMetadata")+"</option>",html+="</select>",html+="</div>",html+='<label class="checkboxContainer hide fldReplaceExistingImages">',html+='<input type="checkbox" is="emby-checkbox" class="chkReplaceImages" />',html+="<span>"+_globalize.default.translate("ReplaceExistingImages")+"</span>",html+="</label>",html+='<div class="fieldDescription">',html+=_globalize.default.translate("RefreshDialogHelp"),html+="</div>",html+='<input type="hidden" class="fldSelectedItemIds" />',html+="<br />",html+='<div class="formDialogFooter">',html+='<button is="emby-button" type="submit" class="raised btnSubmit block formDialogFooterItem button-submit">'+_globalize.default.translate("Refresh")+"</button>",html+="</div>",html+="</form>",html+="</div>",html+="</div>"}(),dlg.innerHTML=html,dlg.querySelector("form").addEventListener("submit",onSubmit.bind(this)),dlg.querySelector("#selectMetadataRefreshMode").addEventListener("change",(function(){"scan"===this.value?dlg.querySelector(".fldReplaceExistingImages").classList.add("hide"):dlg.querySelector(".fldReplaceExistingImages").classList.remove("hide")})),this.options.mode&&(dlg.querySelector("#selectMetadataRefreshMode").value=this.options.mode),dlg.querySelector("#selectMetadataRefreshMode").dispatchEvent(new CustomEvent("change")),dlg.querySelector(".btnCancel").addEventListener("click",(function(){_dialogHelper.default.close(dlg)})),_layoutManager.default.tv&&centerFocus(dlg.querySelector(".formDialogContent"),!1,!0),new Promise((function(resolve,reject){_layoutManager.default.tv&&centerFocus(dlg.querySelector(".formDialogContent"),!1,!1),dlg.addEventListener("close",resolve),_dialogHelper.default.open(dlg)}))}}]),RefreshDialog}();_exports.default=_default}));
//# sourceMappingURL=refreshdialog.js.map
