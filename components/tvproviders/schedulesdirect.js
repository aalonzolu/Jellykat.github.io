define(["exports","jQuery","loading","globalize","emby-checkbox","emby-input","listViewStyle","paper-icon-button-light","emby-select","emby-button","flexStyles"],(function(_exports,_jQuery,_loading,_globalize,_embyCheckbox,_embyInput,_listViewStyle,_paperIconButtonLight,_embySelect,_embyButton,_flexStyles){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=function _default(page,providerId,options){function reload(){_loading.default.show(),ApiClient.getNamedConfiguration("livetv").then((function(config){var info=config.ListingProviders.filter((function(i){return i.Id===providerId}))[0]||{};listingsId=info.ListingsId,(0,_jQuery.default)("#selectListing",page).val(info.ListingsId||""),page.querySelector(".txtUser").value=info.Username||"",page.querySelector(".txtPass").value="",page.querySelector(".txtZipCode").value=info.ZipCode||"",info.Username&&info.Password?page.querySelector(".listingsSection").classList.remove("hide"):page.querySelector(".listingsSection").classList.add("hide"),page.querySelector(".chkAllTuners").checked=info.EnableAllTuners,info.EnableAllTuners?page.querySelector(".selectTunersSection").classList.add("hide"):page.querySelector(".selectTunersSection").classList.remove("hide"),function setCountry(info){ApiClient.getJSON(ApiClient.getUrl("LiveTv/ListingProviders/SchedulesDirect/Countries")).then((function(result){var i,length,countryList=[];for(var region in result){var countries=result[region];if(countries.length&&"ZZZ"!==region)for(i=0,length=countries.length;i<length;i++)countryList.push({name:countries[i].fullName,value:countries[i].shortName})}countryList.sort((function(a,b){return a.name>b.name?1:a.name<b.name?-1:0})),(0,_jQuery.default)("#selectCountry",page).html(countryList.map((function(c){return'<option value="'+c.value+'">'+c.name+"</option>"})).join("")).val(info.Country||""),(0,_jQuery.default)(page.querySelector(".txtZipCode")).trigger("change")}),(function(){Dashboard.alert({message:_globalize.default.translate("ErrorGettingTvLineups")})})),_loading.default.hide()}(info),function refreshTunerDevices(page,providerInfo,devices){for(var html="",i=0,length=devices.length;i<length;i++){var device=devices[i];html+='<div class="listItem">';var enabledTuners=providerInfo.EnabledTuners||[],checkedAttribute=providerInfo.EnableAllTuners||-1!==enabledTuners.indexOf(device.Id)?" checked":"";html+='<label class="checkboxContainer listItemCheckboxContainer"><input type="checkbox" is="emby-checkbox" data-id="'+device.Id+'" class="chkTuner" '+checkedAttribute+"/><span></span></label>",html+='<div class="listItemBody two-line">',html+='<div class="listItemBodyText">',html+=device.FriendlyName||getTunerName(device.Type),html+="</div>",html+='<div class="listItemBodyText secondary">',html+=device.Url,html+="</div>",html+="</div>",html+="</div>"}page.querySelector(".tunerList").innerHTML=html}(page,info,config.TunerHosts)}))}function sha256(str){if(!self.TextEncoder)return Promise.resolve("");var buffer=new TextEncoder("utf-8").encode(str);return crypto.subtle.digest("SHA-256",buffer).then((function(hash){return function hex(buffer){for(var hexCodes=[],view=new DataView(buffer),i=0;i<view.byteLength;i+=4){var paddedValue=("00000000"+view.getUint32(i).toString(16)).slice(-"00000000".length);hexCodes.push(paddedValue)}return hexCodes.join("")}(hash)}))}function getTunerName(providerId){switch(providerId=providerId.toLowerCase()){case"m3u":return"M3U Playlist";case"hdhomerun":return"HDHomerun";case"satip":return"DVB";default:return"Unknown"}}var listingsId,self=this;self.submit=function(){page.querySelector(".btnSubmitListingsContainer").click()},self.init=function(){var hideCancelButton=!1===(options=options||{}).showCancelButton;page.querySelector(".btnCancel").classList.toggle("hide",hideCancelButton);var hideSubmitButton=!1===options.showSubmitButton;page.querySelector(".btnSubmitListings").classList.toggle("hide",hideSubmitButton),(0,_jQuery.default)(".formLogin",page).on("submit",(function(){return function submitLoginForm(){_loading.default.show(),sha256(page.querySelector(".txtPass").value).then((function(passwordHash){var info={Type:"SchedulesDirect",Username:page.querySelector(".txtUser").value,EnableAllTuners:!0,Password:passwordHash,Pw:page.querySelector(".txtPass").value},id=providerId;id&&(info.Id=id),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/ListingProviders",{ValidateLogin:!0}),data:JSON.stringify(info),contentType:"application/json",dataType:"json"}).then((function(result){Dashboard.processServerConfigurationUpdateResult(),providerId=result.Id,reload()}),(function(){Dashboard.alert({message:_globalize.default.translate("ErrorSavingTvProvider")})}))}))}(),!1})),(0,_jQuery.default)(".formListings",page).on("submit",(function(){return function submitListingsForm(){var selectedListingsId=(0,_jQuery.default)("#selectListing",page).val();if(selectedListingsId){_loading.default.show();var id=providerId;ApiClient.getNamedConfiguration("livetv").then((function(config){var info=config.ListingProviders.filter((function(i){return i.Id===id}))[0];info.ZipCode=page.querySelector(".txtZipCode").value,info.Country=(0,_jQuery.default)("#selectCountry",page).val(),info.ListingsId=selectedListingsId,info.EnableAllTuners=page.querySelector(".chkAllTuners").checked,info.EnabledTuners=info.EnableAllTuners?[]:(0,_jQuery.default)(".chkTuner",page).get().filter((function(i){return i.checked})).map((function(i){return i.getAttribute("data-id")})),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/ListingProviders",{ValidateListings:!0}),data:JSON.stringify(info),contentType:"application/json"}).then((function(result){_loading.default.hide(),options.showConfirmation&&Dashboard.processServerConfigurationUpdateResult(),Events.trigger(self,"submitted")}),(function(){_loading.default.hide(),Dashboard.alert({message:_globalize.default.translate("ErrorAddingListingsToSchedulesDirect")})}))}))}else Dashboard.alert({message:_globalize.default.translate("ErrorPleaseSelectLineup")})}(),!1})),(0,_jQuery.default)(".txtZipCode",page).on("change",(function(){!function refreshListings(value){value?(_loading.default.show(),ApiClient.ajax({type:"GET",url:ApiClient.getUrl("LiveTv/ListingProviders/Lineups",{Id:providerId,Location:value,Country:(0,_jQuery.default)("#selectCountry",page).val()}),dataType:"json"}).then((function(result){(0,_jQuery.default)("#selectListing",page).html(result.map((function(o){return'<option value="'+o.Id+'">'+o.Name+"</option>"}))),listingsId&&(0,_jQuery.default)("#selectListing",page).val(listingsId),_loading.default.hide()}),(function(result){Dashboard.alert({message:_globalize.default.translate("ErrorGettingTvLineups")}),refreshListings(""),_loading.default.hide()}))):(0,_jQuery.default)("#selectListing",page).html("")}(this.value)})),page.querySelector(".chkAllTuners").addEventListener("change",(function(e){e.target.checked?page.querySelector(".selectTunersSection").classList.add("hide"):page.querySelector(".selectTunersSection").classList.remove("hide")})),(0,_jQuery.default)(".createAccountHelp",page).html(_globalize.default.translate("MessageCreateAccountAt",'<a is="emby-linkbutton" class="button-link" href="http://www.schedulesdirect.org" target="_blank">http://www.schedulesdirect.org</a>')),reload()}},_jQuery=_interopRequireDefault(_jQuery),_loading=_interopRequireDefault(_loading),_globalize=_interopRequireDefault(_globalize)}));
//# sourceMappingURL=schedulesdirect.js.map
