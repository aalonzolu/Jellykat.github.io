define(["exports","connectionManager","dom","recordingHelper","paper-icon-button-light","emby-button","css!./recordingfields"],(function(_exports,_connectionManager,_dom,_recordingHelper,_paperIconButtonLight,_embyButton,_recordingfields){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function onRecordingButtonClick(e){var item=this.item;if(item){var serverId=item.ServerId,programId=item.Id,timerId=item.TimerId,timerStatus=item.Status,seriesTimerId=item.SeriesTimerId,instance=this;_recordingHelper.default.toggleRecording(serverId,programId,timerId,timerStatus,seriesTimerId).then((function(){instance.refresh(serverId,programId)}))}}function setButtonIcon(button,icon){var inner=button.querySelector(".material-icons");inner.classList.remove("fiber_smart_record"),inner.classList.remove("fiber_manual_record"),inner.classList.add(icon)}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0,_connectionManager=_interopRequireDefault(_connectionManager),_dom=_interopRequireDefault(_dom),_recordingHelper=_interopRequireDefault(_recordingHelper);var _default=function(){function RecordingButton(options){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,RecordingButton),this.options=options;var button=options.button;setButtonIcon(button,"fiber_manual_record"),options.item?this.refreshItem(options.item):options.itemId&&options.serverId&&this.refresh(options.itemId,options.serverId);var clickFn=onRecordingButtonClick.bind(this);this.clickFn=clickFn,_dom.default.addEventListener(button,"click",clickFn,{passive:!0})}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(RecordingButton,[{key:"refresh",value:function refresh(serverId,itemId){var apiClient=_connectionManager.default.getApiClient(serverId),self=this;apiClient.getItem(apiClient.getCurrentUserId(),itemId).then((function(item){self.refreshItem(item)}))}},{key:"refreshItem",value:function refreshItem(item){var button=this.options.button;this.item=item,setButtonIcon(button,function getIndicatorIcon(item){var status;if("SeriesTimer"===item.Type)return"fiber_smart_record";if(item.TimerId||item.SeriesTimerId)status=item.Status||"Cancelled";else{if("Timer"!==item.Type)return"fiber_manual_record";status=item.Status}if(item.SeriesTimerId&&"Cancelled"!==status)return"fiber_smart_record";return"fiber_manual_record"}(item)),item.TimerId&&"Cancelled"!==(item.Status||"Cancelled")?button.classList.add("recordingIcon-active"):button.classList.remove("recordingIcon-active")}},{key:"destroy",value:function destroy(){var options=this.options;if(options){var button=options.button,clickFn=this.clickFn;clickFn&&_dom.default.removeEventListener(button,"click",clickFn,{passive:!0})}this.options=null,this.item=null}}]),RecordingButton}();_exports.default=_default}));
//# sourceMappingURL=recordingbutton.js.map
