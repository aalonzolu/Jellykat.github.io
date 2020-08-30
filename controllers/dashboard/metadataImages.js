define(["jQuery","loading","libraryMenu","globalize","listViewStyle"],(function(_jQuery,_loading,_libraryMenu,_globalize,_listViewStyle){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function populateCountries(select){return ApiClient.getCountries().then((function(allCountries){var html="";html+="<option value=''></option>";for(var i=0,length=allCountries.length;i<length;i++){var culture=allCountries[i];html+="<option value='"+culture.TwoLetterISORegionName+"'>"+culture.DisplayName+"</option>"}select.innerHTML=html}))}function onSubmit(){var form=this;return _loading.default.show(),ApiClient.getServerConfiguration().then((function(config){config.PreferredMetadataLanguage=form.querySelector("#selectLanguage").value,config.MetadataCountryCode=form.querySelector("#selectCountry").value,ApiClient.updateServerConfiguration(config).then(Dashboard.processServerConfigurationUpdateResult)})),!1}function getTabs(){return[{href:"library.html",name:_globalize.default.translate("HeaderLibraries")},{href:"librarydisplay.html",name:_globalize.default.translate("Display")},{href:"metadataimages.html",name:_globalize.default.translate("Metadata")},{href:"metadatanfo.html",name:_globalize.default.translate("TabNfoSettings")}]}_jQuery=_interopRequireDefault(_jQuery),_loading=_interopRequireDefault(_loading),_libraryMenu=_interopRequireDefault(_libraryMenu),_globalize=_interopRequireDefault(_globalize),(0,_jQuery.default)(document).on("pageinit","#metadataImagesConfigurationPage",(function(){(0,_jQuery.default)(".metadataImagesConfigurationForm").off("submit",onSubmit).on("submit",onSubmit)})).on("pageshow","#metadataImagesConfigurationPage",(function(){_libraryMenu.default.setTabs("metadata",2,getTabs),_loading.default.show(),function loadPage(page){var select,promises=[ApiClient.getServerConfiguration(),(select=page.querySelector("#selectLanguage"),ApiClient.getCultures().then((function(languages){var html="";html+="<option value=''></option>";for(var i=0,length=languages.length;i<length;i++){var culture=languages[i];html+="<option value='"+culture.TwoLetterISOLanguageName+"'>"+culture.DisplayName+"</option>"}select.innerHTML=html}))),populateCountries(page.querySelector("#selectCountry"))];Promise.all(promises).then((function(responses){var config=responses[0];page.querySelector("#selectLanguage").value=config.PreferredMetadataLanguage||"",page.querySelector("#selectCountry").value=config.MetadataCountryCode||"",_loading.default.hide()}))}(this)}))}));
//# sourceMappingURL=metadataImages.js.map
