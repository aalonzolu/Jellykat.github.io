define(["require","exports","dialogHelper","inputManager","connectionManager","layoutManager","focusManager","browser","apphost","dom","css!./style","material-icons","paper-icon-button-light"],(function(_require,_exports,_dialogHelper,_inputManager,_connectionManager,_layoutManager,_focusManager,_browser,_apphost,_dom,_style,_materialIcons,_paperIconButtonLight){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=function _default(options){var swiperInstance,dialog,currentOptions,hideTimeout,lastMouseMoveData;function createElements(options){currentOptions=options,(dialog=_dialogHelper.default.createDialog({exitAnimationDuration:options.interactive?400:800,size:"fullscreen",autoFocus:!1,scrollY:!1,exitAnimation:"fadeout",removeOnClose:!0})).classList.add("slideshowDialog");var html="";if(html+='<div class="slideshowSwiperContainer"><div class="swiper-wrapper"></div></div>',options.interactive&&!_layoutManager.default.tv){var actionButtonsOnTop=_layoutManager.default.mobile;html+=getIcon("keyboard_arrow_left","btnSlideshowPrevious slideshowButton hide-mouse-idle-tv",!1),html+=getIcon("keyboard_arrow_right","btnSlideshowNext slideshowButton hide-mouse-idle-tv",!1),html+='<div class="topActionButtons">',actionButtonsOnTop&&(_apphost.default.supports("filedownload")&&options.user&&options.user.Policy.EnableContentDownloading&&(html+=getIcon("file_download","btnDownload slideshowButton",!0)),_apphost.default.supports("sharing")&&(html+=getIcon("share","btnShare slideshowButton",!0))),html+=getIcon("close","slideshowButton btnSlideshowExit hide-mouse-idle-tv",!1),html+="</div>",actionButtonsOnTop||(html+='<div class="slideshowBottomBar hide">',html+=getIcon("play_arrow","btnSlideshowPause slideshowButton",!0,!0),_apphost.default.supports("filedownload")&&options.user&&options.user.Policy.EnableContentDownloading&&(html+=getIcon("file_download","btnDownload slideshowButton",!0)),_apphost.default.supports("sharing")&&(html+=getIcon("share","btnShare slideshowButton",!0)),html+="</div>")}else html+='<div class="slideshowImage"></div><h1 class="slideshowImageText"></h1>';if(dialog.innerHTML=html,options.interactive&&!_layoutManager.default.tv){dialog.querySelector(".btnSlideshowExit").addEventListener("click",(function(e){_dialogHelper.default.close(dialog)}));var btnPause=dialog.querySelector(".btnSlideshowPause");btnPause&&btnPause.addEventListener("click",playPause);var btnDownload=dialog.querySelector(".btnDownload");btnDownload&&btnDownload.addEventListener("click",download);var btnShare=dialog.querySelector(".btnShare");btnShare&&btnShare.addEventListener("click",share)}setUserScalable(!0),_dialogHelper.default.open(dialog).then((function(){setUserScalable(!1)})),_inputManager.default.on(window,onInputCommand),document.addEventListener(window.PointerEvent?"pointermove":"mousemove",onPointerMove),dialog.addEventListener("close",onDialogClosed),function loadSwiper(dialog,options){var slides;slides=currentOptions.slides?currentOptions.slides:currentOptions.items;new Promise((function(_resolve,_reject){return _require(["swiper"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){var Swiper=_ref.default;(swiperInstance=new Swiper(dialog.querySelector(".slideshowSwiperContainer"),{direction:"horizontal",loop:!1,zoom:{minRatio:1,toggle:!0},autoplay:!options.interactive,keyboard:{enabled:!0},preloadImages:!0,slidesPerView:1,slidesPerColumn:1,initialSlide:options.startIndex||0,speed:240,navigation:{nextEl:".btnSlideshowNext",prevEl:".btnSlideshowPrevious"},virtual:{slides:slides,cache:!0,renderSlide:getSwiperSlideHtml,addSlidesBefore:1,addSlidesAfter:1}})).on("autoplayStart",onAutoplayStart),swiperInstance.on("autoplayStop",onAutoplayStop),useFakeZoomImage&&swiperInstance.on("zoomChange",onZoomChange)}))}(dialog,options)}function onAutoplayStart(){var btnSlideshowPause=dialog.querySelector(".btnSlideshowPause .material-icons");btnSlideshowPause&&btnSlideshowPause.classList.replace("play_arrow","pause")}function onAutoplayStop(){var btnSlideshowPause=dialog.querySelector(".btnSlideshowPause .material-icons");btnSlideshowPause&&btnSlideshowPause.classList.replace("pause","play_arrow")}function onZoomChange(swiper,scale,imageEl,slideEl){var zoomImage=slideEl.querySelector(".swiper-zoom-fakeimg");zoomImage&&(zoomImage.style.width=zoomImage.style.height=100*scale+"%",scale>1?zoomImage.classList.contains("swiper-zoom-fakeimg-hidden")&&setTimeout((function(){var callback=function callback(){imageEl.removeEventListener(transitionEndEventName,callback),zoomImage.classList.remove("swiper-zoom-fakeimg-hidden")};parseFloat(imageEl.style.transitionDuration.replace(/[a-z]/i,""))>0?imageEl.addEventListener(transitionEndEventName,callback):callback()}),0):zoomImage.classList.add("swiper-zoom-fakeimg-hidden"))}function getSwiperSlideHtml(item,index){return currentOptions.slides?getSwiperSlideHtmlFromSlide(item):function getSwiperSlideHtmlFromItem(item){return getSwiperSlideHtmlFromSlide({originalImage:getImgUrl(item,currentOptions.user),Id:item.Id,ServerId:item.ServerId})}(item)}function getSwiperSlideHtmlFromSlide(item){var html="";return html+='<div class="swiper-slide" data-original="'+item.originalImage+'" data-itemid="'+item.Id+'" data-serverid="'+item.ServerId+'">',html+='<div class="swiper-zoom-container">',useFakeZoomImage&&(html+='<div class="swiper-zoom-fakeimg swiper-zoom-fakeimg-hidden" style="background-image: url(\''.concat(item.originalImage,"')\"></div>")),html+='<img src="'+item.originalImage+'" class="swiper-slide-img">',html+="</div>",(item.title||item.subtitle)&&(html+='<div class="slideText">',html+='<div class="slideTextInner">',item.title&&(html+='<h1 class="slideTitle">',html+=item.title,html+="</h1>"),item.description&&(html+='<div class="slideSubtitle">',html+=item.description,html+="</div>"),html+="</div>",html+="</div>"),html+="</div>"}function getCurrentImageInfo(){if(swiperInstance){var slide=document.querySelector(".swiper-slide-active");return slide?{url:slide.getAttribute("data-original"),shareUrl:slide.getAttribute("data-original"),itemId:slide.getAttribute("data-itemid"),serverId:slide.getAttribute("data-serverid")}:null}return null}function download(){var imageInfo=getCurrentImageInfo();new Promise((function(_resolve,_reject){return _require(["fileDownloader"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref2){_ref2.default.download([imageInfo])}))}function share(){var imageInfo=getCurrentImageInfo();navigator.share({url:imageInfo.shareUrl})}function play(){swiperInstance.autoplay&&swiperInstance.autoplay.start()}function pause(){swiperInstance.autoplay&&swiperInstance.autoplay.stop()}function playPause(){!dialog.querySelector(".btnSlideshowPause .material-icons").classList.contains("pause")?play():pause()}function onDialogClosed(){swiperInstance&&(swiperInstance.destroy(!0,!0),swiperInstance=null),_inputManager.default.off(window,onInputCommand),document.removeEventListener(window.PointerEvent?"pointermove":"mousemove",onPointerMove),document.body.classList.remove("hide-scroll"),document.body.classList.add("force-scroll")}function showOsd(){var bottom=dialog.querySelector(".slideshowBottomBar");bottom&&(!function slideUpToShow(element){if(!element.classList.contains("hide"))return;element.classList.remove("hide");var onFinish=function onFinish(){_focusManager.default.focus(element.querySelector(".btnSlideshowPause"))};if(!element.animate)return void onFinish();requestAnimationFrame((function(){var keyframes=[{transform:"translate3d(0,"+element.offsetHeight+"px,0)",opacity:".3",offset:0},{transform:"translate3d(0,0,0)",opacity:"1",offset:1}];element.animate(keyframes,{duration:300,iterations:1,easing:"ease-out"}).onfinish=onFinish}))}(bottom),function startHideTimer(){(function stopHideTimer(){hideTimeout&&(clearTimeout(hideTimeout),hideTimeout=null)})(),hideTimeout=setTimeout(hideOsd,3e3)}())}function hideOsd(){var bottom=dialog.querySelector(".slideshowBottomBar");bottom&&function slideDownToHide(element){if(element.classList.contains("hide"))return;var onFinish=function onFinish(){element.classList.add("hide")};if(!element.animate)return void onFinish();requestAnimationFrame((function(){var keyframes=[{transform:"translate3d(0,0,0)",opacity:"1",offset:0},{transform:"translate3d(0,"+element.offsetHeight+"px,0)",opacity:".3",offset:1}];element.animate(keyframes,{duration:300,iterations:1,easing:"ease-out"}).onfinish=onFinish}))}(bottom)}function onPointerMove(event){if("mouse"===(event.pointerType||(_layoutManager.default.mobile?"touch":"mouse"))){var eventX=event.screenX||0,eventY=event.screenY||0,obj=lastMouseMoveData;if(!obj)return void(lastMouseMoveData={x:eventX,y:eventY});if(Math.abs(eventX-obj.x)<10&&Math.abs(eventY-obj.y)<10)return;obj.x=eventX,obj.y=eventY,showOsd()}}function onInputCommand(event){switch(event.detail.command){case"up":case"down":case"select":case"menu":case"info":showOsd();break;case"play":play();break;case"pause":pause();break;case"playpause":playPause()}}this.show=function(){createElements(options),document.body.classList.remove("force-scroll"),document.body.classList.add("hide-scroll")},this.hide=function(){dialog&&_dialogHelper.default.close(dialog)}},_dialogHelper=_interopRequireDefault(_dialogHelper),_inputManager=_interopRequireDefault(_inputManager),_connectionManager=_interopRequireDefault(_connectionManager),_layoutManager=_interopRequireDefault(_layoutManager),_focusManager=_interopRequireDefault(_focusManager),_browser=_interopRequireDefault(_browser),_apphost=_interopRequireDefault(_apphost);var transitionEndEventName=(_dom=_interopRequireDefault(_dom)).default.whichTransitionEvent(),useFakeZoomImage=_browser.default.safari;function getImgUrl(item,user){var apiClient=_connectionManager.default.getApiClient(item.ServerId),imageOptions={};return item.BackdropImageTags&&item.BackdropImageTags.length?function getBackdropImageUrl(item,options,apiClient){return(options=options||{}).type=options.type||"Backdrop",options.maxWidth||options.width||options.maxHeight||options.height||(options.quality=100),item.BackdropImageTags&&item.BackdropImageTags.length?(options.tag=item.BackdropImageTags[0],apiClient.getScaledImageUrl(item.Id,options)):null}(item,imageOptions,apiClient):"Photo"===item.MediaType&&user&&user.Policy.EnableContentDownloading?apiClient.getItemDownloadUrl(item.Id):(imageOptions.type="Primary",function getImageUrl(item,options,apiClient){return(options=options||{}).type=options.type||"Primary","string"==typeof item?apiClient.getScaledImageUrl(item,options):item.ImageTags&&item.ImageTags[options.type]?(options.tag=item.ImageTags[options.type],apiClient.getScaledImageUrl(item.Id,options)):"Primary"===options.type&&item.AlbumId&&item.AlbumPrimaryImageTag?(options.tag=item.AlbumPrimaryImageTag,apiClient.getScaledImageUrl(item.AlbumId,options)):null}(item,imageOptions,apiClient))}function getIcon(icon,cssClass,canFocus,autoFocus){return'<button is="paper-icon-button-light" class="autoSize '+cssClass+'"'+(canFocus?"":' tabindex="-1"')+(autoFocus=autoFocus?" autofocus":"")+'><span class="material-icons slideshowButtonIcon '+icon+'"></span></button>'}function setUserScalable(scalable){try{_apphost.default.setUserScalable(scalable)}catch(err){console.error("error in appHost.setUserScalable: "+err)}}}));
//# sourceMappingURL=slideshow.js.map
