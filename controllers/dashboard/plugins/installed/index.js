define(["require","loading","libraryMenu","dom","globalize","cardStyle","emby-button"],(function(_require,_loading,_libraryMenu,_dom,_globalize,_cardStyle,_embyButton){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}function renderPlugins(page,plugins){ApiClient.getJSON(ApiClient.getUrl("web/configurationpages")+"?pageType=PluginConfiguration").then((function(configPages){!function populateList(page,plugins,pluginConfigurationPages){var html=(plugins=plugins.sort((function(plugin1,plugin2){return plugin1.Name>plugin2.Name?1:-1}))).map((function(p){return function getPluginCardHtml(plugin,pluginConfigurationPages){var configPage=pluginConfigurationPages.filter((function(pluginConfigurationPage){return pluginConfigurationPage.PluginId==plugin.Id}))[0],configPageUrl=configPage?Dashboard.getConfigurationPageUrl(configPage.Name):null,html="";return html+="<div data-id='"+plugin.Id+"' data-name='"+plugin.Name+"' data-removable='"+plugin.CanUninstall+"' class='card backdropCard'>",html+='<div class="cardBox visualCardBox">',html+='<div class="cardScalable">',html+='<div class="cardPadder cardPadder-backdrop"></div>',html+=configPageUrl?'<a class="cardContent cardImageContainer" is="emby-linkbutton" href="'+configPageUrl+'">':'<div class="cardContent noConfigPluginCard noHoverEffect cardImageContainer emby-button">',html+='<span class="cardImageIcon material-icons folder"></span>',html+=configPageUrl?"</a>":"</div>",html+="</div>",html+='<div class="cardFooter">',(configPage||plugin.CanUninstall)&&(html+='<div style="text-align:right; float:right;padding-top:5px;">',html+='<button type="button" is="paper-icon-button-light" class="btnCardMenu autoSize"><span class="material-icons more_vert"></span></button>',html+="</div>"),html+="<div class='cardText'>",html+=configPage&&configPage.DisplayName?configPage.DisplayName:plugin.Name,html+="</div>",html+="<div class='cardText cardText-secondary'>",html+=plugin.Version,html+="</div>",html+="</div>",html+="</div>",html+="</div>"}(p,pluginConfigurationPages)})).join(""),installedPluginsElement=page.querySelector(".installedPlugins");installedPluginsElement.removeEventListener("click",onInstalledPluginsClick),installedPluginsElement.addEventListener("click",onInstalledPluginsClick),plugins.length?(installedPluginsElement.classList.add("itemsContainer"),installedPluginsElement.classList.add("vertical-wrap")):(html+='<div class="centerMessage">',html+="<h1>"+_globalize.default.translate("MessageNoPluginsInstalled")+"</h1>",html+='<p><a is="emby-linkbutton" class="button-link" href="availableplugins.html">',html+=_globalize.default.translate("MessageBrowsePluginCatalog"),html+="</a></p>",html+="</div>");installedPluginsElement.innerHTML=html,_loading.default.hide()}(page,plugins,configPages)}))}function showPluginMenu(page,elem){var card=_dom.default.parentWithClass(elem,"card"),id=card.getAttribute("data-id"),name=card.getAttribute("data-name"),removable=card.getAttribute("data-removable"),configHref=card.querySelector(".cardContent").getAttribute("href"),menuItems=[];configHref&&menuItems.push({name:_globalize.default.translate("ButtonSettings"),id:"open",icon:"mode_edit"}),"true"===removable&&menuItems.push({name:_globalize.default.translate("ButtonUninstall"),id:"delete",icon:"delete"}),new Promise((function(_resolve,_reject){return _require(["actionsheet"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){_ref2.default.show({items:menuItems,positionTo:elem,callback:function callback(resultId){switch(resultId){case"open":Dashboard.navigate(configHref);break;case"delete":!function deletePlugin(page,uniqueid,name){var msg=_globalize.default.translate("UninstallPluginConfirmation",name);new Promise((function(_resolve,_reject){return _require(["confirm"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){_ref.default.default({title:_globalize.default.translate("HeaderUninstallPlugin"),text:msg,primary:"delete",confirmText:_globalize.default.translate("HeaderUninstallPlugin")}).then((function(){_loading.default.show(),ApiClient.uninstallPlugin(uniqueid).then((function(){reloadList(page)}))}))}))}(page,id,name)}}})}))}function reloadList(page){_loading.default.show(),ApiClient.getInstalledPlugins().then((function(plugins){renderPlugins(page,plugins)}))}function getTabs(){return[{href:"installedplugins.html",name:_globalize.default.translate("TabMyPlugins")},{href:"availableplugins.html",name:_globalize.default.translate("TabCatalog")},{href:"repositories.html",name:_globalize.default.translate("TabRepositories")}]}function onInstalledPluginsClick(e){if(_dom.default.parentWithClass(e.target,"noConfigPluginCard"))!function showNoConfigurationMessage(){Dashboard.alert({message:_globalize.default.translate("MessageNoPluginConfiguration")})}();else if(_dom.default.parentWithClass(e.target,"connectModePluginCard"))!function showConnectMessage(){Dashboard.alert({message:_globalize.default.translate("MessagePluginConfigurationRequiresLocalAccess")})}();else{var btnCardMenu=_dom.default.parentWithClass(e.target,"btnCardMenu");btnCardMenu&&showPluginMenu(_dom.default.parentWithClass(btnCardMenu,"page"),btnCardMenu)}}_loading=_interopRequireDefault(_loading),_libraryMenu=_interopRequireDefault(_libraryMenu),_dom=_interopRequireDefault(_dom),_globalize=_interopRequireDefault(_globalize),pageIdOn("pageshow","pluginsPage",(function(){_libraryMenu.default.setTabs("plugins",0,getTabs),reloadList(this)})),window.PluginsPage={renderPlugins:renderPlugins}}));
//# sourceMappingURL=index.js.map
