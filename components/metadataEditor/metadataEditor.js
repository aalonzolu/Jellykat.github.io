define(["require","exports","dom","layoutManager","dialogHelper","datetime","loading","focusManager","connectionManager","globalize","shell","emby-checkbox","emby-input","emby-select","listViewStyle","emby-textarea","emby-button","paper-icon-button-light","css!./../formdialog","clearButtonStyle","flexStyles"],(function(_require,_exports,_dom,_layoutManager,_dialogHelper,_datetime,_loading,_focusManager,_connectionManager,_globalize,_shell,_embyCheckbox,_embyInput,_embySelect,_listViewStyle,_embyTextarea,_embyButton,_paperIconButtonLight,_formdialog,_clearButtonStyle,_flexStyles){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}var currentContext,metadataEditorInfo,currentItem;function closeDialog(isSubmitted){(function isDialog(){return currentContext.classList.contains("dialog")})()&&_dialogHelper.default.close(currentContext)}function getSelectedAirDays(form){var checkedItems=form.querySelectorAll(".chkAirDay:checked")||[];return Array.prototype.map.call(checkedItems,(function(c){return c.getAttribute("data-day")}))}function getAlbumArtists(form){return form.querySelector("#txtAlbumArtist").value.trim().split(";").filter((function(s){return s.length>0})).map((function(a){return{Name:a}}))}function getArtists(form){return form.querySelector("#txtArtist").value.trim().split(";").filter((function(s){return s.length>0})).map((function(a){return{Name:a}}))}function getDateValue(form,element,property){var val=form.querySelector(element).value;if(!val)return null;if(currentItem[property]){var parts=_datetime.default.parseISO8601Date(currentItem[property],!0).toISOString().split("T");if(0===parts[0].indexOf(val))val+="T"+parts[1]}return val}function onSubmit(e){_loading.default.show();var item={Id:currentItem.Id,Name:this.querySelector("#txtName").value,OriginalTitle:this.querySelector("#txtOriginalName").value,ForcedSortName:this.querySelector("#txtSortName").value,CommunityRating:this.querySelector("#txtCommunityRating").value,CriticRating:this.querySelector("#txtCriticRating").value,IndexNumber:this.querySelector("#txtIndexNumber").value||null,AirsBeforeSeasonNumber:this.querySelector("#txtAirsBeforeSeason").value,AirsAfterSeasonNumber:this.querySelector("#txtAirsAfterSeason").value,AirsBeforeEpisodeNumber:this.querySelector("#txtAirsBeforeEpisode").value,ParentIndexNumber:this.querySelector("#txtParentIndexNumber").value||null,DisplayOrder:this.querySelector("#selectDisplayOrder").value,Album:this.querySelector("#txtAlbum").value,AlbumArtists:getAlbumArtists(this),ArtistItems:getArtists(this),Overview:this.querySelector("#txtOverview").value,Status:this.querySelector("#selectStatus").value,AirDays:getSelectedAirDays(this),AirTime:this.querySelector("#txtAirTime").value,Genres:getListValues(this.querySelector("#listGenres")),Tags:getListValues(this.querySelector("#listTags")),Studios:getListValues(this.querySelector("#listStudios")).map((function(element){return{Name:element}})),PremiereDate:getDateValue(this,"#txtPremiereDate","PremiereDate"),DateCreated:getDateValue(this,"#txtDateAdded","DateCreated"),EndDate:getDateValue(this,"#txtEndDate","EndDate"),ProductionYear:this.querySelector("#txtProductionYear").value,AspectRatio:this.querySelector("#txtOriginalAspectRatio").value,Video3DFormat:this.querySelector("#select3dFormat").value,OfficialRating:this.querySelector("#selectOfficialRating").value,CustomRating:this.querySelector("#selectCustomRating").value,People:currentItem.People,LockData:this.querySelector("#chkLockData").checked,LockedFields:Array.prototype.filter.call(this.querySelectorAll(".selectLockedField"),(function(c){return!c.checked})).map((function(c){return c.getAttribute("data-value")}))};item.ProviderIds=Object.assign({},currentItem.ProviderIds);var idElements=this.querySelectorAll(".txtExternalId");if(Array.prototype.map.call(idElements,(function(idElem){var providerKey=idElem.getAttribute("data-providerkey");item.ProviderIds[providerKey]=idElem.value})),item.PreferredMetadataLanguage=this.querySelector("#selectLanguage").value,item.PreferredMetadataCountryCode=this.querySelector("#selectCountry").value,"Person"===currentItem.Type){var placeOfBirth=this.querySelector("#txtPlaceOfBirth").value;item.ProductionLocations=placeOfBirth?[placeOfBirth]:[]}if("Series"===currentItem.Type){var seriesRuntime=this.querySelector("#txtSeriesRuntime").value;item.RunTimeTicks=seriesRuntime?6e8*seriesRuntime:null}var tagline=this.querySelector("#txtTagline").value;return item.Taglines=tagline?[tagline]:[],function submitUpdatedItem(form,item){function afterContentTypeUpdated(){new Promise((function(_resolve,_reject){return _require(["toast"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){(0,_ref.default)(_globalize.default.translate("MessageItemSaved"))})),_loading.default.hide(),closeDialog()}var apiClient=getApiClient();apiClient.updateItem(item).then((function(){var newContentType=form.querySelector("#selectContentType").value||"";(metadataEditorInfo.ContentType||"")!==newContentType?apiClient.ajax({url:apiClient.getUrl("Items/"+item.Id+"/ContentType",{ContentType:newContentType}),type:"POST"}).then((function(){afterContentTypeUpdated()})):afterContentTypeUpdated()}))}(this,item),e.preventDefault(),e.stopPropagation(),!1}function getListValues(list){return Array.prototype.map.call(list.querySelectorAll(".textValue"),(function(el){return el.textContent}))}function editPerson(context,person,index){new Promise((function(_resolve,_reject){return _require(["personEditor"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref3){_ref3.default.show(person).then((function(updatedPerson){-1===index&&currentItem.People.push(updatedPerson),populatePeople(context,currentItem.People)}))}))}function showMoreMenu(context,button,user){new Promise((function(_resolve,_reject){return _require(["itemContextMenu"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref5){var itemContextMenu=_ref5.default,item=currentItem;itemContextMenu.show({item:item,positionTo:button,edit:!1,editImages:!0,editSubtitles:!0,sync:!1,share:!1,play:!1,queue:!1,user:user}).then((function(result){result.deleted?function afterDeleted(context,item){var parentId=item.ParentId||item.SeasonId||item.SeriesId;parentId?reload(context,parentId,item.ServerId):new Promise((function(_resolve,_reject){return _require(["appRouter"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref4){_ref4.default.goHome()}))}(context,item):result.updated&&reload(context,item.Id,item.ServerId)}))}))}function onEditorClick(e){var btnRemoveFromEditorList=_dom.default.parentWithClass(e.target,"btnRemoveFromEditorList");if(btnRemoveFromEditorList)(function removeElementFromList(source){var el=_dom.default.parentWithClass(source,"listItem");el.parentNode.removeChild(el)})(btnRemoveFromEditorList);else{var btnAddTextItem=_dom.default.parentWithClass(e.target,"btnAddTextItem");btnAddTextItem&&function addElementToList(source,sortCallback){new Promise((function(_resolve,_reject){return _require(["prompt"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){(0,_ref2.default)({label:"Value:"}).then((function(text){var list=_dom.default.parentWithClass(source,"editableListviewContainer").querySelector(".paperList"),items=getListValues(list);items.push(text),populateListView(list,items,sortCallback)}))}))}(btnAddTextItem)}}function getApiClient(){return _connectionManager.default.getApiClient(currentItem.ServerId)}function init(context,apiClient){context.querySelector(".externalIds").addEventListener("click",(function(e){var btnOpenExternalId=_dom.default.parentWithClass(e.target,"btnOpenExternalId");if(btnOpenExternalId){var field=context.querySelector("#"+btnOpenExternalId.getAttribute("data-fieldid")),formatString=field.getAttribute("data-formatstring");field.value&&_shell.default.openUrl(formatString.replace("{0}",field.value))}})),_layoutManager.default.desktop||(context.querySelector(".btnBack").classList.remove("hide"),context.querySelector(".btnClose").classList.add("hide")),function bindAll(elems,eventName,fn){for(var i=0,length=elems.length;i<length;i++)elems[i].addEventListener(eventName,fn)}(context.querySelectorAll(".btnCancel"),"click",(function(event){event.preventDefault(),closeDialog()})),context.querySelector(".btnMore").addEventListener("click",(function(e){getApiClient().getCurrentUser().then((function(user){showMoreMenu(context,e.target,user)}))})),context.querySelector(".btnHeaderSave").addEventListener("click",(function(e){context.querySelector(".btnSave").click()})),context.querySelector("#chkLockData").addEventListener("click",(function(e){e.target.checked?hideElement(".providerSettingsContainer"):showElement(".providerSettingsContainer")})),context.removeEventListener("click",onEditorClick),context.addEventListener("click",onEditorClick);var form=context.querySelector("form");form.removeEventListener("submit",onSubmit),form.addEventListener("submit",onSubmit),context.querySelector("#btnAddPerson").addEventListener("click",(function(event,data){editPerson(context,{},-1)})),context.querySelector("#peopleList").addEventListener("click",(function(e){var index,btnDeletePerson=_dom.default.parentWithClass(e.target,"btnDeletePerson");btnDeletePerson&&(index=parseInt(btnDeletePerson.getAttribute("data-index")),currentItem.People.splice(index,1),populatePeople(context,currentItem.People));var btnEditPerson=_dom.default.parentWithClass(e.target,"btnEditPerson");btnEditPerson&&(index=parseInt(btnEditPerson.getAttribute("data-index")),editPerson(context,currentItem.People[index],index))}))}function getItem(itemId,serverId){var apiClient=_connectionManager.default.getApiClient(serverId);return itemId?apiClient.getItem(apiClient.getCurrentUserId(),itemId):apiClient.getRootFolder(apiClient.getCurrentUserId())}function getEditorConfig(itemId,serverId){var apiClient=_connectionManager.default.getApiClient(serverId);return itemId?apiClient.getJSON(apiClient.getUrl("Items/"+itemId+"/MetadataEditor")):Promise.resolve({})}function hideElement(selector,context,multiple){if(context=context||document,"string"==typeof selector){var elements=multiple?context.querySelectorAll(selector):[context.querySelector(selector)];Array.prototype.forEach.call(elements,(function(el){el&&el.classList.add("hide")}))}else selector.classList.add("hide")}function showElement(selector,context,multiple){if(context=context||document,"string"==typeof selector){var elements=multiple?context.querySelectorAll(selector):[context.querySelector(selector)];Array.prototype.forEach.call(elements,(function(el){el&&el.classList.remove("hide")}))}else selector.classList.remove("hide")}function fillItemInfo(context,item,parentalRatingOptions){var select=context.querySelector("#selectOfficialRating");populateRatings(parentalRatingOptions,select,item.OfficialRating),select.value=item.OfficialRating||"",populateRatings(parentalRatingOptions,select=context.querySelector("#selectCustomRating"),item.CustomRating),select.value=item.CustomRating||"";var selectStatus=context.querySelector("#selectStatus");!function populateStatus(select){var html="";html+="<option value=''></option>",html+="<option value='Continuing'>"+_globalize.default.translate("Continuing")+"</option>",html+="<option value='Ended'>"+_globalize.default.translate("Ended")+"</option>",select.innerHTML=html}(selectStatus),selectStatus.value=item.Status||"",context.querySelector("#select3dFormat",context).value=item.Video3DFormat||"",Array.prototype.forEach.call(context.querySelectorAll(".chkAirDay",context),(function(el){el.checked=-1!==(item.AirDays||[]).indexOf(el.getAttribute("data-day"))})),populateListView(context.querySelector("#listGenres"),item.Genres),populatePeople(context,item.People||[]),populateListView(context.querySelector("#listStudios"),(item.Studios||[]).map((function(element){return element.Name||""}))),populateListView(context.querySelector("#listTags"),item.Tags);var date,lockData=item.LockData||!1,chkLockData=context.querySelector("#chkLockData");if(chkLockData.checked=lockData,chkLockData.checked?hideElement(".providerSettingsContainer",context):showElement(".providerSettingsContainer",context),function fillMetadataSettings(context,item,lockedFields){var container=context.querySelector(".providerSettingsContainer");lockedFields=lockedFields||[];var lockedFieldsList=[{name:_globalize.default.translate("Name"),value:"Name"},{name:_globalize.default.translate("Overview"),value:"Overview"},{name:_globalize.default.translate("Genres"),value:"Genres"},{name:_globalize.default.translate("ParentalRating"),value:"OfficialRating"},{name:_globalize.default.translate("People"),value:"Cast"}];"Person"===item.Type?lockedFieldsList.push({name:_globalize.default.translate("BirthLocation"),value:"ProductionLocations"}):lockedFieldsList.push({name:_globalize.default.translate("ProductionLocations"),value:"ProductionLocations"});"Series"===item.Type&&lockedFieldsList.push({name:_globalize.default.translate("Runtime"),value:"Runtime"});lockedFieldsList.push({name:_globalize.default.translate("Studios"),value:"Studios"}),lockedFieldsList.push({name:_globalize.default.translate("Tags"),value:"Tags"});var html="";html+="<h2>"+_globalize.default.translate("HeaderEnabledFields")+"</h2>",html+="<p>"+_globalize.default.translate("HeaderEnabledFieldsHelp")+"</p>",html+=function getLockedFieldsHtml(fields,currentFields){for(var html="",i=0;i<fields.length;i++){var field=fields[i],name=field.name,value=field.value||field.name,checkedHtml=-1===currentFields.indexOf(value)?" checked":"";html+="<label>",html+='<input type="checkbox" is="emby-checkbox" class="selectLockedField" data-value="'+value+'"'+checkedHtml+"/>",html+="<span>"+name+"</span>",html+="</label>"}return html}(lockedFieldsList,lockedFields),container.innerHTML=html}(context,item,item.LockedFields),context.querySelector("#txtPath").value=item.Path||"",context.querySelector("#txtName").value=item.Name||"",context.querySelector("#txtOriginalName").value=item.OriginalTitle||"",context.querySelector("#txtOverview").value=item.Overview||"",context.querySelector("#txtTagline").value=item.Taglines&&item.Taglines.length?item.Taglines[0]:"",context.querySelector("#txtSortName").value=item.ForcedSortName||"",context.querySelector("#txtCommunityRating").value=item.CommunityRating||"",context.querySelector("#txtCriticRating").value=item.CriticRating||"",context.querySelector("#txtIndexNumber").value=null==item.IndexNumber?"":item.IndexNumber,context.querySelector("#txtParentIndexNumber").value=null==item.ParentIndexNumber?"":item.ParentIndexNumber,context.querySelector("#txtAirsBeforeSeason").value="AirsBeforeSeasonNumber"in item?item.AirsBeforeSeasonNumber:"",context.querySelector("#txtAirsAfterSeason").value="AirsAfterSeasonNumber"in item?item.AirsAfterSeasonNumber:"",context.querySelector("#txtAirsBeforeEpisode").value="AirsBeforeEpisodeNumber"in item?item.AirsBeforeEpisodeNumber:"",context.querySelector("#txtAlbum").value=item.Album||"",context.querySelector("#txtAlbumArtist").value=(item.AlbumArtists||[]).map((function(a){return a.Name})).join(";"),context.querySelector("#selectDisplayOrder").value=item.DisplayOrder||"",context.querySelector("#txtArtist").value=(item.ArtistItems||[]).map((function(a){return a.Name})).join(";"),item.DateCreated)try{date=_datetime.default.parseISO8601Date(item.DateCreated,!0),context.querySelector("#txtDateAdded").value=date.toISOString().slice(0,10)}catch(e){context.querySelector("#txtDateAdded").value=""}else context.querySelector("#txtDateAdded").value="";if(item.PremiereDate)try{date=_datetime.default.parseISO8601Date(item.PremiereDate,!0),context.querySelector("#txtPremiereDate").value=date.toISOString().slice(0,10)}catch(e){context.querySelector("#txtPremiereDate").value=""}else context.querySelector("#txtPremiereDate").value="";if(item.EndDate)try{date=_datetime.default.parseISO8601Date(item.EndDate,!0),context.querySelector("#txtEndDate").value=date.toISOString().slice(0,10)}catch(e){context.querySelector("#txtEndDate").value=""}else context.querySelector("#txtEndDate").value="";context.querySelector("#txtProductionYear").value=item.ProductionYear||"",context.querySelector("#txtAirTime").value=item.AirTime||"";var placeofBirth=item.ProductionLocations&&item.ProductionLocations.length?item.ProductionLocations[0]:"";if(context.querySelector("#txtPlaceOfBirth").value=placeofBirth,context.querySelector("#txtOriginalAspectRatio").value=item.AspectRatio||"",context.querySelector("#selectLanguage").value=item.PreferredMetadataLanguage||"",context.querySelector("#selectCountry").value=item.PreferredMetadataCountryCode||"",item.RunTimeTicks){var minutes=item.RunTimeTicks/6e8;context.querySelector("#txtSeriesRuntime").value=Math.round(minutes)}else context.querySelector("#txtSeriesRuntime",context).value=""}function populateRatings(allParentalRatings,select,currentValue){var html="";html+="<option value=''></option>";for(var rating,ratings=[],currentValueFound=!1,i=0,length=allParentalRatings.length;i<length;i++)rating=allParentalRatings[i],ratings.push({Name:rating.Name,Value:rating.Name}),rating.Name===currentValue&&(currentValueFound=!0);currentValue&&!currentValueFound&&ratings.push({Name:currentValue,Value:currentValue});for(var _i=0,_length=ratings.length;_i<_length;_i++)html+="<option value='"+(rating=ratings[_i]).Value+"'>"+rating.Name+"</option>";select.innerHTML=html}function populateListView(list,items,sortCallback){items=items||[],void 0===sortCallback?items.sort((function(a,b){return a.toLowerCase().localeCompare(b.toLowerCase())})):items=sortCallback(items);for(var html="",i=0;i<items.length;i++)html+='<div class="listItem">',html+='<span class="material-icons listItemIcon live_tv" style="background-color:#333;"></span>',html+='<div class="listItemBody">',html+='<div class="textValue">',html+=items[i],html+="</div>",html+="</div>",html+='<button type="button" is="paper-icon-button-light" data-index="'+i+'" class="btnRemoveFromEditorList autoSize"><span class="material-icons delete"></span></button>',html+="</div>";list.innerHTML=html}function populatePeople(context,people){for(var html="",elem=context.querySelector("#peopleList"),i=0,length=people.length;i<length;i++){var person=people[i];html+='<div class="listItem">',html+='<span class="material-icons listItemIcon person" style="background-color:#333;"></span>',html+='<div class="listItemBody">',html+='<button style="text-align:left;" type="button" class="btnEditPerson clearButton" data-index="'+i+'">',html+='<div class="textValue">',html+=person.Name||"",html+="</div>",person.Role&&""!==person.Role&&(html+='<div class="secondary">'+person.Role+"</div>"),html+="</button>",html+="</div>",html+='<button type="button" is="paper-icon-button-light" data-index="'+i+'" class="btnDeletePerson autoSize"><span class="material-icons delete"></span></button>',html+="</div>"}elem.innerHTML=html}function reload(context,itemId,serverId){_loading.default.show(),Promise.all([getItem(itemId,serverId),getEditorConfig(itemId,serverId)]).then((function(responses){var item=responses[0];metadataEditorInfo=responses[1],currentItem=item;var languages=metadataEditorInfo.Cultures,countries=metadataEditorInfo.Countries;!function renderContentTypeOptions(context,metadataInfo){metadataInfo.ContentTypeOptions.length?showElement("#fldContentType",context):hideElement("#fldContentType",context);var html=metadataInfo.ContentTypeOptions.map((function(i){return'<option value="'+i.Value+'">'+i.Name+"</option>"})).join(""),selectEl=context.querySelector("#selectContentType");selectEl.innerHTML=html,selectEl.value=metadataInfo.ContentType||""}(context,metadataEditorInfo),function loadExternalIds(context,item,externalIds){for(var html="",providerIds=item.ProviderIds||{},i=0,length=externalIds.length;i<length;i++){var idInfo=externalIds[i],id="txt1"+idInfo.Key,formatString=idInfo.UrlFormatString||"",fullName=idInfo.Name;idInfo.Type&&(fullName=idInfo.Name+" "+_globalize.default.translate(idInfo.Type));var labelText=_globalize.default.translate("LabelDynamicExternalId",fullName);html+='<div class="inputContainer">',html+='<div class="flex align-items-center">',html+='<div class="flex-grow">',html+='<input is="emby-input" class="txtExternalId" value="'+(providerIds[idInfo.Key]||"")+'" data-providerkey="'+idInfo.Key+'" data-formatstring="'+formatString+'" id="'+id+'" label="'+labelText+'"/>',html+="</div>",formatString&&(html+='<button type="button" is="paper-icon-button-light" class="btnOpenExternalId align-self-flex-end" data-fieldid="'+id+'"><span class="material-icons open_in_browser"></span></button>'),html+="</div>",html+="</div>"}context.querySelector(".externalIds",context).innerHTML=html,externalIds.length?context.querySelector(".externalIdsSection").classList.remove("hide"):context.querySelector(".externalIdsSection").classList.add("hide")}(context,item,metadataEditorInfo.ExternalIdInfos),function populateLanguages(select,languages){var html="";html+="<option value=''></option>";for(var i=0,length=languages.length;i<length;i++){var culture=languages[i];html+="<option value='"+culture.TwoLetterISOLanguageName+"'>"+culture.DisplayName+"</option>"}select.innerHTML=html}(context.querySelector("#selectLanguage"),languages),function populateCountries(select,allCountries){var html="";html+="<option value=''></option>";for(var i=0,length=allCountries.length;i<length;i++){var culture=allCountries[i];html+="<option value='"+culture.TwoLetterISORegionName+"'>"+culture.DisplayName+"</option>"}select.innerHTML=html}(context.querySelector("#selectCountry"),countries),function setFieldVisibilities(context,item){item.Path&&!1!==item.EnableMediaSourceDisplay?showElement("#fldPath",context):hideElement("#fldPath",context),"Series"===item.Type||"Movie"===item.Type||"Trailer"===item.Type?showElement("#fldOriginalName",context):hideElement("#fldOriginalName",context),"Series"===item.Type?showElement("#fldSeriesRuntime",context):hideElement("#fldSeriesRuntime",context),"Series"===item.Type||"Person"===item.Type?showElement("#fldEndDate",context):hideElement("#fldEndDate",context),"MusicAlbum"===item.Type?showElement("#albumAssociationMessage",context):hideElement("#albumAssociationMessage",context),"Movie"===item.Type||"Trailer"===item.Type?showElement("#fldCriticRating",context):hideElement("#fldCriticRating",context),"Series"===item.Type?(showElement("#fldStatus",context),showElement("#fldAirDays",context),showElement("#fldAirTime",context)):(hideElement("#fldStatus",context),hideElement("#fldAirDays",context),hideElement("#fldAirTime",context)),"Video"===item.MediaType&&"TvChannel"!==item.Type?showElement("#fld3dFormat",context):hideElement("#fld3dFormat",context),"Audio"===item.Type?showElement("#fldAlbumArtist",context):hideElement("#fldAlbumArtist",context),"Audio"===item.Type||"MusicVideo"===item.Type?(showElement("#fldArtist",context),showElement("#fldAlbum",context)):(hideElement("#fldArtist",context),hideElement("#fldAlbum",context)),"Episode"===item.Type&&0===item.ParentIndexNumber?showElement("#collapsibleSpecialEpisodeInfo",context):hideElement("#collapsibleSpecialEpisodeInfo",context),"Person"===item.Type||"Genre"===item.Type||"Studio"===item.Type||"MusicGenre"===item.Type||"TvChannel"===item.Type||"Book"===item.Type?hideElement("#peopleCollapsible",context):showElement("#peopleCollapsible",context),"Person"===item.Type||"Genre"===item.Type||"Studio"===item.Type||"MusicGenre"===item.Type||"TvChannel"===item.Type?(hideElement("#fldCommunityRating",context),hideElement("#genresCollapsible",context),hideElement("#studiosCollapsible",context),"TvChannel"===item.Type?showElement("#fldOfficialRating",context):hideElement("#fldOfficialRating",context),hideElement("#fldCustomRating",context)):(showElement("#fldCommunityRating",context),showElement("#genresCollapsible",context),showElement("#studiosCollapsible",context),showElement("#fldOfficialRating",context),showElement("#fldCustomRating",context)),showElement("#tagsCollapsible",context),"TvChannel"===item.Type?(hideElement("#metadataSettingsCollapsible",context),hideElement("#fldPremiereDate",context),hideElement("#fldDateAdded",context),hideElement("#fldYear",context)):(showElement("#metadataSettingsCollapsible",context),showElement("#fldPremiereDate",context),showElement("#fldDateAdded",context),showElement("#fldYear",context)),"TvChannel"===item.Type?hideElement(".overviewContainer",context):showElement(".overviewContainer",context),"Person"===item.Type?(context.querySelector("#txtProductionYear").label(_globalize.default.translate("LabelBirthYear")),context.querySelector("#txtPremiereDate").label(_globalize.default.translate("LabelBirthDate")),context.querySelector("#txtEndDate").label(_globalize.default.translate("LabelDeathDate")),showElement("#fldPlaceOfBirth")):(context.querySelector("#txtProductionYear").label(_globalize.default.translate("LabelYear")),context.querySelector("#txtPremiereDate").label(_globalize.default.translate("LabelReleaseDate")),context.querySelector("#txtEndDate").label(_globalize.default.translate("LabelEndDate")),hideElement("#fldPlaceOfBirth")),"Video"===item.MediaType&&"TvChannel"!==item.Type?showElement("#fldOriginalAspectRatio"):hideElement("#fldOriginalAspectRatio"),"Audio"===item.Type||"Episode"===item.Type||"Season"===item.Type?(showElement("#fldIndexNumber"),"Episode"===item.Type?context.querySelector("#txtIndexNumber").label(_globalize.default.translate("LabelEpisodeNumber")):"Season"===item.Type?context.querySelector("#txtIndexNumber").label(_globalize.default.translate("LabelSeasonNumber")):"Audio"===item.Type?context.querySelector("#txtIndexNumber").label(_globalize.default.translate("LabelTrackNumber")):context.querySelector("#txtIndexNumber").label(_globalize.default.translate("LabelNumber"))):hideElement("#fldIndexNumber"),"Audio"===item.Type||"Episode"===item.Type?(showElement("#fldParentIndexNumber"),"Episode"===item.Type?context.querySelector("#txtParentIndexNumber").label(_globalize.default.translate("LabelSeasonNumber")):"Audio"===item.Type?context.querySelector("#txtParentIndexNumber").label(_globalize.default.translate("LabelDiscNumber")):context.querySelector("#txtParentIndexNumber").label(_globalize.default.translate("LabelParentNumber"))):hideElement("#fldParentIndexNumber",context),"BoxSet"===item.Type?(showElement("#fldDisplayOrder",context),hideElement(".seriesDisplayOrderDescription",context),context.querySelector("#selectDisplayOrder").innerHTML='<option value="SortName">'+_globalize.default.translate("SortName")+'</option><option value="PremiereDate">'+_globalize.default.translate("ReleaseDate")+"</option>"):"Series"===item.Type?(showElement("#fldDisplayOrder",context),showElement(".seriesDisplayOrderDescription",context),context.querySelector("#selectDisplayOrder").innerHTML='<option value="">'+_globalize.default.translate("Aired")+'</option><option value="absolute">'+_globalize.default.translate("Absolute")+'</option><option value="dvd">Dvd</option>'):(context.querySelector("#selectDisplayOrder").innerHTML="",hideElement("#fldDisplayOrder",context))}(context,item),fillItemInfo(context,item,metadataEditorInfo.ParentalRatingOptions),"Video"===item.MediaType&&"Episode"!==item.Type&&"TvChannel"!==item.Type?showElement("#fldTagline",context):hideElement("#fldTagline",context),_loading.default.hide()}))}function centerFocus(elem,horiz,on){new Promise((function(_resolve,_reject){return _require(["scrollHelper"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref6){var scrollHelper=_ref6.default,fn=on?"on":"off";scrollHelper.centerFocus[fn](elem,horiz)}))}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0,_dom=_interopRequireDefault(_dom),_layoutManager=_interopRequireDefault(_layoutManager),_dialogHelper=_interopRequireDefault(_dialogHelper),_datetime=_interopRequireDefault(_datetime),_loading=_interopRequireDefault(_loading),_focusManager=_interopRequireDefault(_focusManager),_connectionManager=_interopRequireDefault(_connectionManager),_globalize=_interopRequireDefault(_globalize),_shell=_interopRequireDefault(_shell);var _default={show:function show(itemId,serverId){return new Promise((function(resolve,reject){return function _show(itemId,serverId,resolve,reject){_loading.default.show(),new Promise((function(_resolve,_reject){return _require(["text!./metadataEditor.template.html"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref7){var template=_ref7.default,dialogOptions={removeOnClose:!0,scrollY:!1};_layoutManager.default.tv?dialogOptions.size="fullscreen":dialogOptions.size="small";var dlg=_dialogHelper.default.createDialog(dialogOptions);dlg.classList.add("formDialog");var html="";html+=_globalize.default.translateHtml(template,"core"),dlg.innerHTML=html,_layoutManager.default.tv&&centerFocus(dlg.querySelector(".formDialogContent"),!1,!0),_dialogHelper.default.open(dlg),dlg.addEventListener("close",(function(){_layoutManager.default.tv&&centerFocus(dlg.querySelector(".formDialogContent"),!1,!1),resolve()})),currentContext=dlg,init(dlg,_connectionManager.default.getApiClient(serverId)),reload(dlg,itemId,serverId)}))}(itemId,serverId,resolve)}))},embed:function embed(elem,itemId,serverId){return new Promise((function(resolve,reject){_loading.default.show(),new Promise((function(_resolve,_reject){return _require(["text!./metadataEditor.template.html"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref8){var template=_ref8.default;elem.innerHTML=_globalize.default.translateHtml(template,"core"),elem.querySelector(".formDialogFooter").classList.remove("formDialogFooter"),elem.querySelector(".btnClose").classList.add("hide"),elem.querySelector(".btnHeaderSave").classList.remove("hide"),elem.querySelector(".btnCancel").classList.add("hide"),currentContext=elem,init(elem,_connectionManager.default.getApiClient(serverId)),reload(elem,itemId,serverId),_focusManager.default.autoFocus(elem)}))}))}};_exports.default=_default}));
//# sourceMappingURL=metadataEditor.js.map
