define(["require","exports","dialogHelper","layoutManager","globalize","userSettings","emby-select","paper-icon-button-light","material-icons","css!./../formdialog","emby-button","flexStyles"],(function(_require,_exports,_dialogHelper,_layoutManager,_globalize,userSettings,_embySelect,_paperIconButtonLight,_materialIcons,_formdialog,_embyButton,_flexStyles){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}function onSubmit(e){return e.preventDefault(),!1}function centerFocus(elem,horiz,on){new Promise((function(_resolve,_reject){return _require(["scrollHelper"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){var scrollHelper=_ref.default,fn=on?"on":"off";scrollHelper.centerFocus[fn](elem,horiz)}))}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0,_dialogHelper=_interopRequireDefault(_dialogHelper),_layoutManager=_interopRequireDefault(_layoutManager),_globalize=_interopRequireDefault(_globalize),userSettings=_interopRequireWildcard(userSettings);var _default=function(){function SortMenu(){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,SortMenu)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(SortMenu,[{key:"show",value:function show(options){return new Promise((function(resolve,reject){new Promise((function(_resolve,_reject){return _require(["text!./sortmenu.template.html"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){var template=_ref2.default,dialogOptions={removeOnClose:!0,scrollY:!1};_layoutManager.default.tv?dialogOptions.size="fullscreen":dialogOptions.size="small";var dlg=_dialogHelper.default.createDialog(dialogOptions);dlg.classList.add("formDialog");var submitted,html="";html+='<div class="formDialogHeader">',html+='<button is="paper-icon-button-light" class="btnCancel hide-mouse-idle-tv" tabindex="-1"><span class="material-icons arrow_back"></span></button>',html+='<h3 class="formDialogHeaderTitle">${Sort}</h3>',html+="</div>",html+=template,dlg.innerHTML=_globalize.default.translateHtml(html,"core"),function fillSortBy(context,options){context.querySelector(".selectSortBy").innerHTML=options.map((function(o){return'<option value="'+o.value+'">'+o.name+"</option>"})).join("")}(dlg,options.sortOptions),function initEditor(context,settings){context.querySelector("form").addEventListener("submit",onSubmit),context.querySelector(".selectSortOrder").value=settings.sortOrder,context.querySelector(".selectSortBy").value=settings.sortBy}(dlg,options.settings),dlg.querySelector(".btnCancel").addEventListener("click",(function(){_dialogHelper.default.close(dlg)})),_layoutManager.default.tv&&centerFocus(dlg.querySelector(".formDialogContent"),!1,!0),dlg.querySelector("form").addEventListener("change",(function(){submitted=!0}),!0),_dialogHelper.default.open(dlg).then((function(){if(_layoutManager.default.tv&&centerFocus(dlg.querySelector(".formDialogContent"),!1,!1),submitted)return function saveValues(context,settingsKey){userSettings.setFilter(settingsKey+"-sortorder",context.querySelector(".selectSortOrder").value),userSettings.setFilter(settingsKey+"-sortby",context.querySelector(".selectSortBy").value)}(dlg,options.settingsKey),void resolve();reject()}))}))}))}}]),SortMenu}();_exports.default=_default}));
//# sourceMappingURL=sortmenu.js.map
