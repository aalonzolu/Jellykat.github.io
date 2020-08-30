define(["require","exports","events","libraryBrowser","imageLoader","listView","loading","userSettings","globalize","emby-itemscontainer"],(function(_require,_exports,_events,_libraryBrowser,_imageLoader,_listView,_loading,userSettings,_globalize,_embyItemscontainer){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=function _default(view,params,tabContent){function getPageData(context){var key=getSavedQueryKey(context),pageData=data[key];return pageData||(pageData=data[key]={query:{SortBy:"Album,SortName",SortOrder:"Ascending",IncludeItemTypes:"Audio",Recursive:!0,Fields:"AudioInfo,ParentId",StartIndex:0,ImageTypeLimit:1,EnableImageTypes:"Primary"}},userSettings.libraryPageSize()>0&&(pageData.query.Limit=userSettings.libraryPageSize()),pageData.query.ParentId=params.topParentId,_libraryBrowser.default.loadSavedQueryValues(key,pageData.query)),pageData}function getQuery(context){return getPageData(context).query}function getSavedQueryKey(context){return context.savedQueryKey||(context.savedQueryKey=_libraryBrowser.default.getSavedQueryKey("songs")),context.savedQueryKey}function reloadItems(page){_loading.default.show(),isLoading=!0;var query=getQuery(page);ApiClient.getItems(Dashboard.getCurrentUserId(),query).then((function(result){function onNextPageClick(){isLoading||(userSettings.libraryPageSize()>0&&(query.StartIndex+=query.Limit),reloadItems(tabContent))}function onPreviousPageClick(){isLoading||(userSettings.libraryPageSize()>0&&(query.StartIndex=Math.max(0,query.StartIndex-query.Limit)),reloadItems(tabContent))}window.scrollTo(0,0);for(var pagingHtml=_libraryBrowser.default.getQueryPagingHtml({startIndex:query.StartIndex,limit:query.Limit,totalRecordCount:result.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!1,sortButton:!1,filterButton:!1}),html=_listView.default.getListViewHtml({items:result.Items,action:"playallfromhere",smallIcon:!0,artist:!0,addToListButton:!0}),elems=tabContent.querySelectorAll(".paging"),i=0,length=elems.length;i<length;i++)elems[i].innerHTML=pagingHtml;for(var _i=0,_length=(elems=tabContent.querySelectorAll(".btnNextPage")).length;_i<_length;_i++)elems[_i].addEventListener("click",onNextPageClick);for(var _i2=0,_length2=(elems=tabContent.querySelectorAll(".btnPreviousPage")).length;_i2<_length2;_i2++)elems[_i2].addEventListener("click",onPreviousPageClick);var itemsContainer=tabContent.querySelector(".itemsContainer");itemsContainer.innerHTML=html,_imageLoader.default.lazyChildren(itemsContainer),_libraryBrowser.default.saveQueryValues(getSavedQueryKey(page),query),_loading.default.hide(),isLoading=!1,new Promise((function(_resolve,_reject){return _require(["autoFocuser"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){_ref.default.autoFocus(page)}))}))}var self=this,data={},isLoading=!1;self.showFilterMenu=function(){new Promise((function(_resolve,_reject){return _require(["components/filterdialog/filterdialog"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){var filterDialog=new(0,_ref2.default)({query:getQuery(tabContent),mode:"songs",serverId:ApiClient.serverId()});_events.default.on(filterDialog,"filterchange",(function(){getQuery(tabContent).StartIndex=0,reloadItems(tabContent)})),filterDialog.show()}))},self.getCurrentViewStyle=function(){return getPageData(tabContent).view},function initPage(tabContent){tabContent.querySelector(".btnFilter").addEventListener("click",(function(){self.showFilterMenu()})),tabContent.querySelector(".btnSort").addEventListener("click",(function(e){_libraryBrowser.default.showSortMenu({items:[{name:_globalize.default.translate("OptionTrackName"),id:"Name"},{name:_globalize.default.translate("OptionAlbum"),id:"Album,SortName"},{name:_globalize.default.translate("OptionAlbumArtist"),id:"AlbumArtist,Album,SortName"},{name:_globalize.default.translate("OptionArtist"),id:"Artist,Album,SortName"},{name:_globalize.default.translate("OptionDateAdded"),id:"DateCreated,SortName"},{name:_globalize.default.translate("OptionDatePlayed"),id:"DatePlayed,SortName"},{name:_globalize.default.translate("OptionPlayCount"),id:"PlayCount,SortName"},{name:_globalize.default.translate("OptionReleaseDate"),id:"PremiereDate,AlbumArtist,Album,SortName"},{name:_globalize.default.translate("OptionRuntime"),id:"Runtime,AlbumArtist,Album,SortName"}],callback:function callback(){getQuery(tabContent).StartIndex=0,reloadItems(tabContent)},query:getQuery(tabContent),button:e.target})}))}(tabContent),self.renderTab=function(){reloadItems(tabContent)},self.destroy=function(){}},_events=_interopRequireDefault(_events),_libraryBrowser=_interopRequireDefault(_libraryBrowser),_imageLoader=_interopRequireDefault(_imageLoader),_listView=_interopRequireDefault(_listView),_loading=_interopRequireDefault(_loading),userSettings=_interopRequireWildcard(userSettings),_globalize=_interopRequireDefault(_globalize)}));
//# sourceMappingURL=songs.js.map
