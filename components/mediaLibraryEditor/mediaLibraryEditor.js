define(["require","exports","jQuery","loading","dialogHelper","dom","components/libraryoptionseditor/libraryoptionseditor","globalize","emby-button","listViewStyle","paper-icon-button-light","formDialogStyle","emby-toggle","flexStyles"],(function(_require,_exports,_jQuery,_loading,_dialogHelper,_dom,_libraryoptionseditor,_globalize,_embyButton,_listViewStyle,_paperIconButtonLight,_formDialogStyle,_embyToggle,_flexStyles){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}function onEditLibrary(){if(isCreating)return!1;isCreating=!0,_loading.default.show();var dlg=_dom.default.parentWithClass(this,"dlg-libraryeditor"),libraryOptions=_libraryoptionseditor.default.getLibraryOptions(dlg.querySelector(".libraryOptions"));return libraryOptions=Object.assign(currentOptions.library.LibraryOptions||{},libraryOptions),ApiClient.updateVirtualFolderOptions(currentOptions.library.ItemId,libraryOptions).then((function(){hasChanges=!0,isCreating=!1,_loading.default.hide(),_dialogHelper.default.close(dlg)}),(function(){isCreating=!1,_loading.default.hide()})),!1}function onListItemClick(e){var listItem=_dom.default.parentWithClass(e.target,"listItem");if(listItem){var index=parseInt(listItem.getAttribute("data-index")),pathInfos=(currentOptions.library.LibraryOptions||{}).PathInfos||[],pathInfo=null==index?{}:pathInfos[index]||{},originalPath=pathInfo.Path||(null==index?null:currentOptions.library.Locations[index]),btnRemovePath=_dom.default.parentWithClass(e.target,"btnRemovePath");if(btnRemovePath)return void function onRemoveClick(btnRemovePath,location){var button=btnRemovePath,virtualFolder=currentOptions.library;new Promise((function(_resolve,_reject){return _require(["confirm"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref3){(0,_ref3.default)({title:_globalize.default.translate("HeaderRemoveMediaLocation"),text:_globalize.default.translate("MessageConfirmRemoveMediaLocation"),confirmText:_globalize.default.translate("Delete"),primary:"delete"}).then((function(){var refreshAfterChange=currentOptions.refresh;ApiClient.removeMediaPath(virtualFolder.Name,location,refreshAfterChange).then((function(){hasChanges=!0,refreshLibraryFromServer(_dom.default.parentWithClass(button,"dlg-libraryeditor"))}),(function(){new Promise((function(_resolve,_reject){return _require(["toast"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref4){(0,_ref4.default)(_globalize.default.translate("ErrorDefault"))}))}))}))}))}(btnRemovePath,originalPath);showDirectoryBrowser(_dom.default.parentWithClass(listItem,"dlg-libraryeditor"),originalPath,pathInfo.NetworkPath)}}function getFolderHtml(pathInfo,index){var html="";return html+='<div class="listItem listItem-border lnkPath" data-index="'.concat(index,'" style="padding-left:.5em;">'),html+='<div class="'.concat(pathInfo.NetworkPath?"listItemBody two-line":"listItemBody",'">'),html+='<h3 class="listItemBodyText">',html+=pathInfo.Path,html+="</h3>",pathInfo.NetworkPath&&(html+='<div class="listItemBodyText secondary">'.concat(pathInfo.NetworkPath,"</div>")),html+="</div>",html+='<button type="button" is="paper-icon-button-light" class="listItemButton btnRemovePath" data-index="'.concat(index,'"><span class="material-icons remove_circle"></span></button>'),html+="</div>"}function refreshLibraryFromServer(page){ApiClient.getVirtualFolders().then((function(result){var library=result.filter((function(f){return f.Name===currentOptions.library.Name}))[0];library&&(currentOptions.library=library,renderLibrary(page,currentOptions))}))}function renderLibrary(page,options){var pathInfos=(options.library.LibraryOptions||{}).PathInfos||[];pathInfos.length||(pathInfos=options.library.Locations.map((function(p){return{Path:p}}))),"boxsets"===options.library.CollectionType?page.querySelector(".folders").classList.add("hide"):page.querySelector(".folders").classList.remove("hide"),page.querySelector(".folderList").innerHTML=pathInfos.map(getFolderHtml).join("")}function onAddButtonClick(){showDirectoryBrowser(_dom.default.parentWithClass(this,"dlg-libraryeditor"))}function showDirectoryBrowser(context,originalPath,networkPath){new Promise((function(_resolve,_reject){return _require(["directorybrowser"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref5){var picker=new(0,_ref5.default);picker.show({enableNetworkSharePath:!0,pathReadOnly:null!=originalPath,path:originalPath,networkSharePath:networkPath,callback:function callback(path,networkSharePath){path&&(originalPath?function updateMediaLocation(page,path,networkSharePath){var virtualFolder=currentOptions.library;ApiClient.updateMediaPath(virtualFolder.Name,{Path:path,NetworkPath:networkSharePath}).then((function(){hasChanges=!0,refreshLibraryFromServer(page)}),(function(){new Promise((function(_resolve,_reject){return _require(["toast"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){(0,_ref2.default)(_globalize.default.translate("ErrorAddingMediaPathToVirtualFolder"))}))}))}(context,originalPath,networkSharePath):function addMediaLocation(page,path,networkSharePath){var virtualFolder=currentOptions.library,refreshAfterChange=currentOptions.refresh;ApiClient.addMediaPath(virtualFolder.Name,path,networkSharePath,refreshAfterChange).then((function(){hasChanges=!0,refreshLibraryFromServer(page)}),(function(){new Promise((function(_resolve,_reject){return _require(["toast"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){(0,_ref.default)(_globalize.default.translate("ErrorAddingMediaPathToVirtualFolder"))}))}))}(context,path,networkSharePath)),picker.close()}})}))}function onToggleAdvancedChange(){var dlg=_dom.default.parentWithClass(this,"dlg-libraryeditor");_libraryoptionseditor.default.setAdvancedVisible(dlg.querySelector(".libraryOptions"),this.checked)}function onDialogClosed(){currentDeferred.resolveWith(null,[hasChanges])}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=_exports.showEditor=void 0,_jQuery=_interopRequireDefault(_jQuery),_loading=_interopRequireDefault(_loading),_dialogHelper=_interopRequireDefault(_dialogHelper),_dom=_interopRequireDefault(_dom),_libraryoptionseditor=_interopRequireDefault(_libraryoptionseditor),_globalize=_interopRequireDefault(_globalize);var currentDeferred,currentOptions,showEditor=function showEditor(options){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,showEditor);var deferred=_jQuery.default.Deferred();return currentOptions=options,currentDeferred=deferred,hasChanges=!1,new Promise((function(_resolve,_reject){return _require(["text!./components/mediaLibraryEditor/mediaLibraryEditor.template.html"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref6){var template=_ref6.default,dlg=_dialogHelper.default.createDialog({size:"small",modal:!1,removeOnClose:!0,scrollY:!1});dlg.classList.add("dlg-libraryeditor"),dlg.classList.add("ui-body-a"),dlg.classList.add("background-theme-a"),dlg.classList.add("formDialog"),dlg.innerHTML=_globalize.default.translateHtml(template),dlg.querySelector(".formDialogHeaderTitle").innerHTML=options.library.Name,function initEditor(dlg,options){renderLibrary(dlg,options),dlg.querySelector(".btnAddFolder").addEventListener("click",onAddButtonClick),dlg.querySelector(".folderList").addEventListener("click",onListItemClick),dlg.querySelector(".chkAdvanced").addEventListener("change",onToggleAdvancedChange),dlg.querySelector(".btnSubmit").addEventListener("click",onEditLibrary),_libraryoptionseditor.default.embed(dlg.querySelector(".libraryOptions"),options.library.CollectionType,options.library.LibraryOptions).then((function(){onToggleAdvancedChange.call(dlg.querySelector(".chkAdvanced"))}))}(dlg,options),dlg.addEventListener("close",onDialogClosed),_dialogHelper.default.open(dlg),dlg.querySelector(".btnCancel").addEventListener("click",(function(){_dialogHelper.default.close(dlg)})),refreshLibraryFromServer(dlg)})),deferred.promise()};_exports.showEditor=showEditor;var hasChanges=!1,isCreating=!1,_default=showEditor;_exports.default=_default}));
//# sourceMappingURL=mediaLibraryEditor.js.map
