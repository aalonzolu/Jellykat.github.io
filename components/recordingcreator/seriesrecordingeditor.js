define(["require","exports","dialogHelper","globalize","layoutManager","connectionManager","loading","scrollHelper","datetime","scrollStyles","emby-button","emby-checkbox","emby-input","emby-select","paper-icon-button-light","css!./../formdialog","css!./recordingcreator","material-icons","flexStyles"],(function(_require,_exports,_dialogHelper,_globalize,_layoutManager,_connectionManager,_loading,_scrollHelper,_datetime,_scrollStyles,_embyButton,_embyCheckbox,_embyInput,_embySelect,_paperIconButtonLight,_formdialog,_recordingcreator,_materialIcons,_flexStyles){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}var currentDialog;Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0,_dialogHelper=_interopRequireDefault(_dialogHelper),_globalize=_interopRequireDefault(_globalize),_layoutManager=_interopRequireDefault(_layoutManager),_connectionManager=_interopRequireDefault(_connectionManager),_loading=_interopRequireDefault(_loading),_scrollHelper=_interopRequireDefault(_scrollHelper),_datetime=_interopRequireDefault(_datetime);var currentItemId,currentServerId,recordingUpdated=!1,recordingDeleted=!1;function renderTimer(context,item){context.querySelector("#txtPrePaddingMinutes").value=item.PrePaddingSeconds/60,context.querySelector("#txtPostPaddingMinutes").value=item.PostPaddingSeconds/60,context.querySelector(".selectChannels").value=item.RecordAnyChannel?"all":"one",context.querySelector(".selectAirTime").value=item.RecordAnyTime?"any":"original",context.querySelector(".selectShowType").value=item.RecordNewOnly?"new":"all",context.querySelector(".chkSkipEpisodesInLibrary").checked=item.SkipEpisodesInLibrary,context.querySelector(".selectKeepUpTo").value=item.KeepUpTo||0,item.ChannelName||item.ChannelNumber?context.querySelector(".optionChannelOnly").innerHTML=_globalize.default.translate("ChannelNameOnly",item.ChannelName||item.ChannelNumber):context.querySelector(".optionChannelOnly").innerHTML=_globalize.default.translate("OneChannel"),context.querySelector(".optionAroundTime").innerHTML=_globalize.default.translate("AroundTime",_datetime.default.getDisplayTime(_datetime.default.parseISO8601Date(item.StartDate))),_loading.default.hide()}function closeDialog(isDeleted){recordingUpdated=!0,recordingDeleted=isDeleted,_dialogHelper.default.close(currentDialog)}function onSubmit(e){var form=this,apiClient=_connectionManager.default.getApiClient(currentServerId);return apiClient.getLiveTvSeriesTimer(currentItemId).then((function(item){item.PrePaddingSeconds=60*form.querySelector("#txtPrePaddingMinutes").value,item.PostPaddingSeconds=60*form.querySelector("#txtPostPaddingMinutes").value,item.RecordAnyChannel="all"===form.querySelector(".selectChannels").value,item.RecordAnyTime="any"===form.querySelector(".selectAirTime").value,item.RecordNewOnly="new"===form.querySelector(".selectShowType").value,item.SkipEpisodesInLibrary=form.querySelector(".chkSkipEpisodesInLibrary").checked,item.KeepUpTo=form.querySelector(".selectKeepUpTo").value,apiClient.updateLiveTvSeriesTimer(item)})),e.preventDefault(),!1}function init(context){!function fillKeepUpTo(context){for(var html="",i=0;i<=50;i++){var text=void 0;text=0===i?_globalize.default.translate("AsManyAsPossible"):1===i?_globalize.default.translate("ValueOneEpisode"):_globalize.default.translate("ValueEpisodeCount",i),html+='<option value="'+i+'">'+text+"</option>"}context.querySelector(".selectKeepUpTo").innerHTML=html}(context),context.querySelector(".btnCancel").addEventListener("click",(function(){closeDialog(!1)})),context.querySelector(".btnCancelRecording").addEventListener("click",(function(){(function deleteTimer(apiClient,timerId){return new Promise((function(resolve,reject){new Promise((function(_resolve,_reject){return _require(["recordingHelper"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){_ref.default.cancelSeriesTimerWithConfirmation(timerId,apiClient.serverId()).then(resolve,reject)}))}))})(_connectionManager.default.getApiClient(currentServerId),currentItemId).then((function(){closeDialog(!0)}))})),context.querySelector("form").addEventListener("submit",onSubmit)}function reload(context,id){var apiClient=_connectionManager.default.getApiClient(currentServerId);_loading.default.show(),"string"==typeof id?(currentItemId=id,apiClient.getLiveTvSeriesTimer(id).then((function(result){renderTimer(context,result),_loading.default.hide()}))):id&&(currentItemId=id.Id,renderTimer(context,id),_loading.default.hide())}function onFieldChange(){this.querySelector(".btnSubmit").click()}var _default={show:function showEditor(itemId,serverId,options){return new Promise((function(resolve,reject){recordingUpdated=!1,recordingDeleted=!1,currentServerId=serverId,_loading.default.show(),options=options||{},new Promise((function(_resolve,_reject){return _require(["text!./seriesrecordingeditor.template.html"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref3){var template=_ref3.default,dialogOptions={removeOnClose:!0,scrollY:!1};_layoutManager.default.tv?dialogOptions.size="fullscreen":dialogOptions.size="small";var dlg=_dialogHelper.default.createDialog(dialogOptions);dlg.classList.add("formDialog"),dlg.classList.add("recordingDialog"),_layoutManager.default.tv||(dlg.style["min-width"]="20%");var html="";html+=_globalize.default.translateHtml(template,"core"),dlg.innerHTML=html,!1===options.enableCancel&&dlg.querySelector(".formDialogFooter").classList.add("hide"),currentDialog=dlg,dlg.addEventListener("closing",(function(){recordingDeleted||this.querySelector(".btnSubmit").click()})),dlg.addEventListener("close",(function(){recordingUpdated?resolve({updated:!0,deleted:recordingDeleted}):reject()})),_layoutManager.default.tv&&_scrollHelper.default.centerFocus.on(dlg.querySelector(".formDialogContent"),!1),init(dlg),reload(dlg,itemId),_dialogHelper.default.open(dlg)}))}))},embed:function embed(itemId,serverId,options){recordingUpdated=!1,recordingDeleted=!1,currentServerId=serverId,_loading.default.show(),options=options||{},new Promise((function(_resolve,_reject){return _require(["text!./seriesrecordingeditor.template.html"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){var template=_ref2.default,dialogOptions={removeOnClose:!0,scrollY:!1};_layoutManager.default.tv?dialogOptions.size="fullscreen":dialogOptions.size="small";var dlg=options.context;dlg.classList.add("hide"),dlg.innerHTML=_globalize.default.translateHtml(template,"core"),dlg.querySelector(".formDialogHeader").classList.add("hide"),dlg.querySelector(".formDialogFooter").classList.add("hide"),dlg.querySelector(".formDialogContent").className="",dlg.querySelector(".dialogContentInner").className="",dlg.classList.remove("hide"),dlg.removeEventListener("change",onFieldChange),dlg.addEventListener("change",onFieldChange),currentDialog=dlg,init(dlg),reload(dlg,itemId)}))}};_exports.default=_default}));
//# sourceMappingURL=seriesrecordingeditor.js.map
