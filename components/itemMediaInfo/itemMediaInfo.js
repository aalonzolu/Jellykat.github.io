define(["require","exports","dialogHelper","layoutManager","globalize","connectionManager","loading","emby-select","listViewStyle","paper-icon-button-light","css!./../formdialog","material-icons","emby-button","flexStyles"],(function(_require,_exports,_dialogHelper,_layoutManager,_globalize,_connectionManager,_loading,_embySelect,_listViewStyle,_paperIconButtonLight,_formdialog,_materialIcons,_embyButton,_flexStyles){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function setMediaInfo(user,page,item){var html=item.MediaSources.map((function(version){return function getMediaSourceHtml(user,item,version){var html="";version.Name&&(html+='<div><h2 class="mediaInfoStreamType">'.concat(version.Name,"</h2></div>"));version.Container&&(html+="".concat(createAttribute(_globalize.default.translate("MediaInfoContainer"),version.Container),"<br/>"));version.Formats&&version.Formats.length&&(html+="".concat(createAttribute(_globalize.default.translate("MediaInfoFormat"),version.Formats.join(",")),"<br/>"));version.Path&&user&&user.Policy.IsAdministrator&&(html+="".concat(createAttribute(_globalize.default.translate("MediaInfoPath"),version.Path),"<br/>"));if(version.Size){var size="".concat((version.Size/1048576).toFixed(0)," MB");html+="".concat(createAttribute(_globalize.default.translate("MediaInfoSize"),size),"<br/>")}for(var i=0,length=version.MediaStreams.length;i<length;i++){var stream=version.MediaStreams[i];if("Data"!==stream.Type){html+='<div class="mediaInfoStream">';var displayType=_globalize.default.translate("MediaInfoStreamType".concat(stream.Type));html+='<h2 class="mediaInfoStreamType">'.concat(displayType,"</h2>");var attributes=[];stream.DisplayTitle&&attributes.push(createAttribute("Title",stream.DisplayTitle)),stream.Language&&"Video"!==stream.Type&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoLanguage"),stream.Language)),stream.Codec&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoCodec"),stream.Codec.toUpperCase())),stream.CodecTag&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoCodecTag"),stream.CodecTag)),null!=stream.IsAVC&&attributes.push(createAttribute("AVC",stream.IsAVC?"Yes":"No")),stream.Profile&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoProfile"),stream.Profile)),stream.Level&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoLevel"),stream.Level)),(stream.Width||stream.Height)&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoResolution"),"".concat(stream.Width,"x").concat(stream.Height))),stream.AspectRatio&&"mjpeg"!==stream.Codec&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoAspectRatio"),stream.AspectRatio)),"Video"===stream.Type&&(null!=stream.IsAnamorphic&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoAnamorphic"),stream.IsAnamorphic?"Yes":"No")),attributes.push(createAttribute(_globalize.default.translate("MediaInfoInterlaced"),stream.IsInterlaced?"Yes":"No"))),(stream.AverageFrameRate||stream.RealFrameRate)&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoFramerate"),stream.AverageFrameRate||stream.RealFrameRate)),stream.ChannelLayout&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoLayout"),stream.ChannelLayout)),stream.Channels&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoChannels"),"".concat(stream.Channels," ch"))),stream.BitRate&&"mjpeg"!==stream.Codec&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoBitrate"),"".concat(parseInt(stream.BitRate/1e3)," kbps"))),stream.SampleRate&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoSampleRate"),"".concat(stream.SampleRate," Hz"))),stream.BitDepth&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoBitDepth"),"".concat(stream.BitDepth," bit"))),stream.PixelFormat&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoPixelFormat"),stream.PixelFormat)),stream.RefFrames&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoRefFrames"),stream.RefFrames)),stream.NalLengthSize&&attributes.push(createAttribute("NAL",stream.NalLengthSize)),"Video"!==stream.Type&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoDefault"),stream.IsDefault?"Yes":"No")),"Subtitle"===stream.Type&&(attributes.push(createAttribute(_globalize.default.translate("MediaInfoForced"),stream.IsForced?"Yes":"No")),attributes.push(createAttribute(_globalize.default.translate("MediaInfoExternal"),stream.IsExternal?"Yes":"No"))),"Video"===stream.Type&&version.Timestamp&&attributes.push(createAttribute(_globalize.default.translate("MediaInfoTimestamp"),version.Timestamp)),html+=attributes.join("<br/>"),html+="</div>"}}return html}(user,0,version)})).join('<div style="border-top:1px solid #444;margin: 1em 0;"></div>');item.MediaSources.length>1&&(html="<br/>".concat(html)),page.querySelector("#mediaInfoContent").innerHTML=html}function createAttribute(label,value){return'<span class="mediaInfoLabel">'.concat(label,'</span><span class="mediaInfoAttribute">').concat(value,"</span>")}function show(itemId,serverId){return _loading.default.show(),new Promise((function(_resolve,_reject){return _require(["text!./itemMediaInfo.template.html"],(function(imported){return _resolve(function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}(imported))}),_reject)})).then((function(_ref){var template=_ref.default;return new Promise((function(resolve,reject){(function loadMediaInfo(itemId,serverId,template){var apiClient=_connectionManager.default.getApiClient(serverId);return apiClient.getItem(apiClient.getCurrentUserId(),itemId).then((function(item){var dialogOptions={size:"small",removeOnClose:!0,scrollY:!1};_layoutManager.default.tv&&(dialogOptions.size="fullscreen");var dlg=_dialogHelper.default.createDialog(dialogOptions);dlg.classList.add("formDialog");var html="";html+=_globalize.default.translateHtml(template,"core"),dlg.innerHTML=html,_layoutManager.default.tv&&dlg.querySelector(".formDialogContent"),_dialogHelper.default.open(dlg),dlg.querySelector(".btnCancel").addEventListener("click",(function(){_dialogHelper.default.close(dlg)})),apiClient.getCurrentUser().then((function(user){setMediaInfo(user,dlg,item)})),_loading.default.hide()}))})(itemId,serverId,template).then(resolve,reject)}))}))}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.show=show,_exports.default=void 0,_dialogHelper=_interopRequireDefault(_dialogHelper),_layoutManager=_interopRequireDefault(_layoutManager),_globalize=_interopRequireDefault(_globalize),_connectionManager=_interopRequireDefault(_connectionManager),_loading=_interopRequireDefault(_loading);var _default={show:show};_exports.default=_default}));
//# sourceMappingURL=itemMediaInfo.js.map
