define(["require","exports","globalize","apphost","appSettings","focusManager","layoutManager","loading","connectionManager","subtitleAppearanceHelper","settingsHelper","dom","events","listViewStyle","emby-select","emby-slider","emby-input","emby-checkbox","flexStyles","css!./subtitlesettings"],(function(_require,_exports,_globalize,_apphost,_appSettings,_focusManager,_layoutManager,_loading,_connectionManager,_subtitleAppearanceHelper,_settingsHelper,_dom,_events,_listViewStyle,_embySelect,_embySlider,_embyInput,_embyCheckbox,_flexStyles,_subtitlesettings){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}function getSubtitleAppearanceObject(context){var appearanceSettings={};return appearanceSettings.textSize=context.querySelector("#selectTextSize").value,appearanceSettings.dropShadow=context.querySelector("#selectDropShadow").value,appearanceSettings.font=context.querySelector("#selectFont").value,appearanceSettings.textBackground=context.querySelector("#inputTextBackground").value,appearanceSettings.textColor=context.querySelector("#inputTextColor").value,appearanceSettings.verticalPosition=context.querySelector("#sliderVerticalPosition").value,appearanceSettings}function save(instance,context,userId,userSettings,apiClient,enableSaveConfirmation){_loading.default.show(),_appSettings.default.set("subtitleburnin",context.querySelector("#selectSubtitleBurnIn").value),apiClient.getUser(userId).then((function(user){(function saveUser(context,user,userSettingsInstance,appearanceKey,apiClient){var appearanceSettings=userSettingsInstance.getSubtitleAppearanceSettings(appearanceKey);return appearanceSettings=Object.assign(appearanceSettings,getSubtitleAppearanceObject(context)),userSettingsInstance.setSubtitleAppearanceSettings(appearanceSettings,appearanceKey),user.Configuration.SubtitleLanguagePreference=context.querySelector("#selectSubtitleLanguage").value,user.Configuration.SubtitleMode=context.querySelector("#selectSubtitlePlaybackMode").value,apiClient.updateUserConfiguration(user.Id,user.Configuration)})(context,user,userSettings,instance.appearanceKey,apiClient).then((function(){_loading.default.hide(),enableSaveConfirmation&&new Promise((function(_resolve,_reject){return _require(["toast"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){(0,_ref.default)(_globalize.default.translate("SettingsSaved"))})),_events.default.trigger(instance,"saved")}),(function(){_loading.default.hide()}))}))}function onSubtitleModeChange(e){for(var view=_dom.default.parentWithClass(e.target,"subtitlesettings"),subtitlesHelp=view.querySelectorAll(".subtitlesHelp"),i=0,length=subtitlesHelp.length;i<length;i++)subtitlesHelp[i].classList.add("hide");view.querySelector(".subtitles"+this.value+"Help").classList.remove("hide")}function onAppearanceFieldChange(e){var view=_dom.default.parentWithClass(e.target,"subtitlesettings"),appearanceSettings=getSubtitleAppearanceObject(view),elements={window:view.querySelector(".subtitleappearance-preview-window"),text:view.querySelector(".subtitleappearance-preview-text"),preview:!0};_subtitleAppearanceHelper.default.applyStyles(elements,appearanceSettings),_subtitleAppearanceHelper.default.applyStyles({window:view.querySelector(".subtitleappearance-fullpreview-window"),text:view.querySelector(".subtitleappearance-fullpreview-text")},appearanceSettings)}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=_exports.SubtitleSettings=void 0,_globalize=_interopRequireDefault(_globalize),_apphost=_interopRequireDefault(_apphost),_appSettings=_interopRequireDefault(_appSettings),_focusManager=_interopRequireDefault(_focusManager),_layoutManager=_interopRequireDefault(_layoutManager),_loading=_interopRequireDefault(_loading),_connectionManager=_interopRequireDefault(_connectionManager),_subtitleAppearanceHelper=_interopRequireDefault(_subtitleAppearanceHelper),_settingsHelper=_interopRequireDefault(_settingsHelper),_dom=_interopRequireDefault(_dom),_events=_interopRequireDefault(_events);var subtitlePreviewTimer;function showSubtitlePreview(persistent){clearTimeout(subtitlePreviewTimer),this._fullPreview.classList.remove("subtitleappearance-fullpreview-hide"),persistent&&this._refFullPreview++,0===this._refFullPreview&&(subtitlePreviewTimer=setTimeout(hideSubtitlePreview.bind(this),1e3))}function hideSubtitlePreview(persistent){clearTimeout(subtitlePreviewTimer),persistent&&this._refFullPreview--,0===this._refFullPreview&&this._fullPreview.classList.add("subtitleappearance-fullpreview-hide")}var SubtitleSettings=function(){function SubtitleSettings(options){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,SubtitleSettings),this.options=options,function embed(options,self){new Promise((function(_resolve,_reject){return _require(["text!./subtitlesettings.template.html"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){var template=_ref2.default;if(options.element.classList.add("subtitlesettings"),options.element.innerHTML=_globalize.default.translateHtml(template,"core"),options.element.querySelector("form").addEventListener("submit",self.onSubmit.bind(self)),options.element.querySelector("#selectSubtitlePlaybackMode").addEventListener("change",onSubtitleModeChange),options.element.querySelector("#selectTextSize").addEventListener("change",onAppearanceFieldChange),options.element.querySelector("#selectDropShadow").addEventListener("change",onAppearanceFieldChange),options.element.querySelector("#selectFont").addEventListener("change",onAppearanceFieldChange),options.element.querySelector("#inputTextColor").addEventListener("change",onAppearanceFieldChange),options.element.querySelector("#inputTextBackground").addEventListener("change",onAppearanceFieldChange),options.enableSaveButton&&options.element.querySelector(".btnSave").classList.remove("hide"),_apphost.default.supports("subtitleappearancesettings")){options.element.querySelector(".subtitleAppearanceSection").classList.remove("hide"),self._fullPreview=options.element.querySelector(".subtitleappearance-fullpreview"),self._refFullPreview=0;var sliderVerticalPosition=options.element.querySelector("#sliderVerticalPosition");sliderVerticalPosition.addEventListener("input",onAppearanceFieldChange),sliderVerticalPosition.addEventListener("input",(function(){return showSubtitlePreview.call(self)}));var eventPrefix=window.PointerEvent?"pointer":"mouse";sliderVerticalPosition.addEventListener("".concat(eventPrefix,"enter"),(function(){return showSubtitlePreview.call(self,!0)})),sliderVerticalPosition.addEventListener("".concat(eventPrefix,"leave"),(function(){return hideSubtitlePreview.call(self,!0)})),_layoutManager.default.tv&&(sliderVerticalPosition.addEventListener("focus",(function(){return showSubtitlePreview.call(self,!0)})),sliderVerticalPosition.addEventListener("blur",(function(){return hideSubtitlePreview.call(self,!0)})),setTimeout((function(){sliderVerticalPosition.classList.add("focusable"),sliderVerticalPosition.enableKeyboardDragging()}),0)),options.element.querySelector(".chkPreview").addEventListener("change",(function(e){e.target.checked?showSubtitlePreview.call(self,!0):hideSubtitlePreview.call(self,!0)}))}self.loadData(),options.autoFocus&&_focusManager.default.autoFocus(options.element)}))}(options,this)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(SubtitleSettings,[{key:"loadData",value:function loadData(){var self=this,context=self.options.element;_loading.default.show();var userId=self.options.userId,apiClient=_connectionManager.default.getApiClient(self.options.serverId),userSettings=self.options.userSettings;apiClient.getUser(userId).then((function(user){userSettings.setUserInfo(userId,apiClient).then((function(){self.dataLoaded=!0;var appearanceSettings=userSettings.getSubtitleAppearanceSettings(self.options.appearanceKey);!function loadForm(context,user,userSettings,appearanceSettings,apiClient){apiClient.getCultures().then((function(allCultures){_apphost.default.supports("subtitleburnsettings")&&user.Policy.EnableVideoPlaybackTranscoding&&context.querySelector(".fldBurnIn").classList.remove("hide");var selectSubtitleLanguage=context.querySelector("#selectSubtitleLanguage");_settingsHelper.default.populateLanguages(selectSubtitleLanguage,allCultures),selectSubtitleLanguage.value=user.Configuration.SubtitleLanguagePreference||"",context.querySelector("#selectSubtitlePlaybackMode").value=user.Configuration.SubtitleMode||"",context.querySelector("#selectSubtitlePlaybackMode").dispatchEvent(new CustomEvent("change",{})),context.querySelector("#selectTextSize").value=appearanceSettings.textSize||"",context.querySelector("#selectDropShadow").value=appearanceSettings.dropShadow||"",context.querySelector("#inputTextBackground").value=appearanceSettings.textBackground||"transparent",context.querySelector("#inputTextColor").value=appearanceSettings.textColor||"#ffffff",context.querySelector("#selectFont").value=appearanceSettings.font||"",context.querySelector("#sliderVerticalPosition").value=appearanceSettings.verticalPosition,context.querySelector("#selectSubtitleBurnIn").value=_appSettings.default.get("subtitleburnin")||"",onAppearanceFieldChange({target:context.querySelector("#selectTextSize")}),_loading.default.hide()}))}(context,user,0,appearanceSettings,apiClient)}))}))}},{key:"submit",value:function submit(){this.onSubmit(null)}},{key:"destroy",value:function destroy(){this.options=null}},{key:"onSubmit",value:function onSubmit(e){var self=this,apiClient=_connectionManager.default.getApiClient(self.options.serverId),userId=self.options.userId,userSettings=self.options.userSettings;return userSettings.setUserInfo(userId,apiClient).then((function(){var enableSaveConfirmation=self.options.enableSaveConfirmation;save(self,self.options.element,userId,userSettings,apiClient,enableSaveConfirmation)})),e&&e.preventDefault(),!1}}]),SubtitleSettings}();_exports.SubtitleSettings=SubtitleSettings;var _default=SubtitleSettings;_exports.default=_default}));
//# sourceMappingURL=subtitlesettings.js.map
