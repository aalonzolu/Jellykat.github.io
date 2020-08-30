define(["dom","scroller","browser","focusManager","webcomponents","css!./emby-tabs","scrollStyles"],(function(_dom,_scroller,_browser,_focusManager,_webcomponents,_embyTabs,_scrollStyles){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}_dom=_interopRequireDefault(_dom),_scroller=_interopRequireDefault(_scroller),_browser=_interopRequireDefault(_browser),_focusManager=_interopRequireDefault(_focusManager);var EmbyTabs=Object.create(HTMLDivElement.prototype),activeButtonClass="emby-tab-button-active";function setActiveTabButton(newButton){newButton.classList.add(activeButtonClass)}function triggerBeforeTabChange(tabs,index,previousIndex){tabs.dispatchEvent(new CustomEvent("beforetabchange",{detail:{selectedTabIndex:index,previousIndex:previousIndex}})),null!=previousIndex&&previousIndex!==index&&function removeActivePanelClass(tabs,index){var tabPanel=null;tabPanel&&tabPanel.classList.remove("is-active")}();var newPanel=null;newPanel&&(newPanel.animate&&function fadeInRight(elem){var keyframes=[{opacity:"0",transform:"translate3d("+(_browser.default.mobile?"4%":"0.5%")+", 0, 0)",offset:0},{opacity:"1",transform:"none",offset:1}];elem.animate(keyframes,{duration:160,iterations:1,easing:"ease-out"})}(newPanel),newPanel.classList.add("is-active"))}function onClick(e){var tabs=this,current=tabs.querySelector("."+activeButtonClass),tabButton=_dom.default.parentWithClass(e.target,"emby-tab-button");if(tabButton&&tabButton!==current){current&&current.classList.remove(activeButtonClass);var previousIndex=current?parseInt(current.getAttribute("data-index")):null;setActiveTabButton(tabButton);var index=parseInt(tabButton.getAttribute("data-index"));triggerBeforeTabChange(tabs,index,previousIndex),setTimeout((function(){tabs.selectedTabIndex=index,tabs.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:index,previousIndex:previousIndex}}))}),120),tabs.scroller&&tabs.scroller.toCenter(tabButton,!1)}}function onFocusOut(e){var previousFocus=e.target.parentNode.querySelector(".lastFocused");previousFocus&&previousFocus.classList.remove("lastFocused"),e.target.classList.add("lastFocused")}function getSelectedTabButton(elem){return elem.querySelector("."+activeButtonClass)}function getSibling(elem,method){for(var sibling=elem[method];sibling;){if(sibling.classList.contains("emby-tab-button")&&!sibling.classList.contains("hide"))return sibling;sibling=sibling[method]}return null}EmbyTabs.createdCallback=function(){this.classList.contains("emby-tabs")||(this.classList.add("emby-tabs"),this.classList.add("focusable"),_dom.default.addEventListener(this,"click",onClick,{passive:!0}),_dom.default.addEventListener(this,"focusout",onFocusOut))},EmbyTabs.focus=function onFocusIn(){var selectedTab=this.querySelector("."+activeButtonClass),lastFocused=this.querySelector(".lastFocused");lastFocused?_focusManager.default.focus(lastFocused):selectedTab?_focusManager.default.focus(selectedTab):_focusManager.default.autoFocus(this)},EmbyTabs.refresh=function(){this.scroller&&this.scroller.reload()},EmbyTabs.attachedCallback=function(){!function initScroller(tabs){if(!tabs.scroller){var contentScrollSlider=tabs.querySelector(".emby-tabs-slider");contentScrollSlider?(tabs.scroller=new _scroller.default(tabs,{horizontal:1,itemNav:0,mouseDragging:1,touchDragging:1,slidee:contentScrollSlider,smart:!0,releaseSwing:!0,scrollBy:200,speed:120,elasticBounds:1,dragHandle:1,dynamicHandle:1,clickBar:1,hiddenScroll:!0,requireAnimation:!_browser.default.safari,allowNativeSmoothScroll:!0}),tabs.scroller.init()):(tabs.classList.add("scrollX"),tabs.classList.add("hiddenScrollX"),tabs.classList.add("smoothScrollX"))}}(this);var current=this.querySelector("."+activeButtonClass),currentIndex=current?parseInt(current.getAttribute("data-index")):parseInt(this.getAttribute("data-index")||"0");if(-1!==currentIndex){this.selectedTabIndex=currentIndex;var newTabButton=this.querySelectorAll(".emby-tab-button")[currentIndex];newTabButton&&setActiveTabButton(newTabButton)}this.readyFired||(this.readyFired=!0,this.dispatchEvent(new CustomEvent("ready",{})))},EmbyTabs.detachedCallback=function(){this.scroller&&(this.scroller.destroy(),this.scroller=null),_dom.default.removeEventListener(this,"click",onClick,{passive:!0})},EmbyTabs.selectedIndex=function(selected,triggerEvent){if(null==selected)return this.selectedTabIndex||0;var current=this.selectedIndex();this.selectedTabIndex=selected;var tabButtons=this.querySelectorAll(".emby-tab-button");if(current===selected||!1===triggerEvent){triggerBeforeTabChange(this,selected,current),this.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:selected}}));var currentTabButton=tabButtons[current];setActiveTabButton(tabButtons[selected]),current!==selected&&currentTabButton&&currentTabButton.classList.remove(activeButtonClass)}else onClick.call(this,{target:tabButtons[selected]})},EmbyTabs.selectNext=function(){var sibling=getSibling(getSelectedTabButton(this),"nextSibling");sibling&&onClick.call(this,{target:sibling})},EmbyTabs.selectPrevious=function(){var sibling=getSibling(getSelectedTabButton(this),"previousSibling");sibling&&onClick.call(this,{target:sibling})},EmbyTabs.triggerBeforeTabChange=function(selected){triggerBeforeTabChange(this,this.selectedIndex())},EmbyTabs.triggerTabChange=function(selected){this.dispatchEvent(new CustomEvent("tabchange",{detail:{selectedTabIndex:this.selectedIndex()}}))},EmbyTabs.setTabEnabled=function(index,enabled){var btn=this.querySelector('.emby-tab-button[data-index="'+index+'"]');enabled?btn.classList.remove("hide"):btn.classList.remove("add")},document.registerElement("emby-tabs",{prototype:EmbyTabs,extends:"div"})}));
//# sourceMappingURL=emby-tabs.js.map
