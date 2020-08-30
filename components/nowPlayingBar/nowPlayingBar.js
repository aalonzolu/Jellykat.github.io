define(["require","datetime","events","browser","imageLoader","layoutManager","playbackManager","nowPlayingHelper","apphost","dom","connectionManager","itemContextMenu","paper-icon-button-light","emby-ratingbutton"],(function(_require,_datetime,_events,_browser,_imageLoader,_layoutManager,_playbackManager,_nowPlayingHelper,_apphost,_dom,_connectionManager,_itemContextMenu,_paperIconButtonLight,_embyRatingbutton){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(arr)))return;var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}return newObj.default=obj,cache&&cache.set(obj,newObj),newObj}var currentPlayer;_datetime=_interopRequireDefault(_datetime),_events=_interopRequireDefault(_events),_browser=_interopRequireDefault(_browser),_imageLoader=_interopRequireDefault(_imageLoader),_layoutManager=_interopRequireDefault(_layoutManager),_playbackManager=_interopRequireDefault(_playbackManager),_nowPlayingHelper=_interopRequireDefault(_nowPlayingHelper),_apphost=_interopRequireDefault(_apphost),_dom=_interopRequireDefault(_dom),_connectionManager=_interopRequireDefault(_connectionManager),_itemContextMenu=_interopRequireDefault(_itemContextMenu);var currentTimeElement,nowPlayingImageElement,nowPlayingTextElement,nowPlayingUserData,muteButton,volumeSlider,volumeSliderContainer,playPauseButtons,positionSlider,toggleRepeatButton,toggleRepeatButtonIcon,isEnabled,nowPlayingBarElement,currentImgUrl,currentPlayerSupportedCommands=[],lastUpdateTime=0,lastPlayerState={},currentRuntimeTicks=0,isVisibilityAllowed=!0;function onSlideDownComplete(){this.classList.add("hide")}function slideUp(elem){_dom.default.removeEventListener(elem,_dom.default.whichTransitionEvent(),onSlideDownComplete,{once:!0}),elem.classList.remove("hide"),elem.offsetWidth,elem.classList.remove("nowPlayingBar-hidden")}function onPlayPauseClick(){_playbackManager.default.playPause(currentPlayer)}function bindEvents(elem){currentTimeElement=elem.querySelector(".nowPlayingBarCurrentTime"),nowPlayingImageElement=elem.querySelector(".nowPlayingImage"),nowPlayingTextElement=elem.querySelector(".nowPlayingBarText"),nowPlayingUserData=elem.querySelector(".nowPlayingBarUserDataButtons"),positionSlider=elem.querySelector(".nowPlayingBarPositionSlider"),muteButton=elem.querySelector(".muteButton"),playPauseButtons=elem.querySelectorAll(".playPauseButton"),toggleRepeatButton=elem.querySelector(".toggleRepeatButton"),volumeSlider=elem.querySelector(".nowPlayingBarVolumeSlider"),volumeSliderContainer=elem.querySelector(".nowPlayingBarVolumeSliderContainer"),muteButton.addEventListener("click",(function(){currentPlayer&&_playbackManager.default.toggleMute(currentPlayer)})),elem.querySelector(".stopButton").addEventListener("click",(function(){currentPlayer&&_playbackManager.default.stop(currentPlayer)})),playPauseButtons.forEach((function(button){button.addEventListener("click",onPlayPauseClick)})),elem.querySelector(".nextTrackButton").addEventListener("click",(function(){currentPlayer&&_playbackManager.default.nextTrack(currentPlayer)})),elem.querySelector(".previousTrackButton").addEventListener("click",(function(e){if(currentPlayer)if("Audio"===lastPlayerState.NowPlayingItem.MediaType&&(currentPlayer._currentTime>=5||!_playbackManager.default.previousTrack(currentPlayer))){if(e.detail>1&&_playbackManager.default.previousTrack(currentPlayer))return;_playbackManager.default.seekPercent(0,currentPlayer),positionSlider.value=0}else _playbackManager.default.previousTrack(currentPlayer)})),elem.querySelector(".previousTrackButton").addEventListener("dblclick",(function(){currentPlayer&&_playbackManager.default.previousTrack(currentPlayer)})),elem.querySelector(".btnShuffleQueue").addEventListener("click",(function(){currentPlayer&&_playbackManager.default.toggleQueueShuffleMode()})),(toggleRepeatButton=elem.querySelector(".toggleRepeatButton")).addEventListener("click",(function(){switch(_playbackManager.default.getRepeatMode()){case"RepeatAll":_playbackManager.default.setRepeatMode("RepeatOne");break;case"RepeatOne":_playbackManager.default.setRepeatMode("RepeatNone");break;case"RepeatNone":_playbackManager.default.setRepeatMode("RepeatAll")}})),toggleRepeatButtonIcon=toggleRepeatButton.querySelector(".material-icons"),volumeSliderContainer.classList.toggle("hide",_apphost.default.supports("physicalvolumecontrol")),volumeSlider.addEventListener("input",(function(e){currentPlayer&&currentPlayer.setVolume(e.target.value)})),positionSlider.addEventListener("change",(function(){if(currentPlayer){var newPercent=parseFloat(this.value);_playbackManager.default.seekPercent(newPercent,currentPlayer)}})),positionSlider.getBubbleText=function(value){if(!lastPlayerState||!lastPlayerState.NowPlayingItem||!currentRuntimeTicks)return"--:--";var ticks=currentRuntimeTicks;return ticks/=100,ticks*=value,_datetime.default.getDisplayRunningTime(ticks)},elem.addEventListener("click",(function(e){_dom.default.parentWithTag(e.target,["BUTTON","INPUT"])||function showRemoteControl(){new Promise((function(_resolve,_reject){return _require(["appRouter"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})).then((function(_ref){_ref.default.showNowPlaying()}))}()}))}function getNowPlayingBar(){return nowPlayingBarElement?Promise.resolve(nowPlayingBarElement):new Promise((function(resolve,reject){Promise.all([new Promise((function(_resolve,_reject){return _require(["appFooter-shared"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})),new Promise((function(_resolve,_reject){return _require(["itemShortcuts"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})),new Promise((function(_resolve,_reject){return _require(["css!./nowPlayingBar.css"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)})),new Promise((function(_resolve,_reject){return _require(["emby-slider"],(function(imported){return _resolve(_interopRequireWildcard(imported))}),_reject)}))]).then((function(_ref2){var _ref3=_slicedToArray(_ref2,2),appfooter=_ref3[0],itemShortcuts=_ref3[1],parentContainer=appfooter.element;(nowPlayingBarElement=parentContainer.querySelector(".nowPlayingBar"))||(parentContainer.insertAdjacentHTML("afterbegin",function getNowPlayingBarHtml(){var html="";return html+='<div class="nowPlayingBar hide nowPlayingBar-hidden">',html+='<div class="nowPlayingBarTop">',html+='<div class="nowPlayingBarPositionContainer sliderContainer">',html+='<input type="range" is="emby-slider" pin step=".01" min="0" max="100" value="0" class="slider-medium-thumb nowPlayingBarPositionSlider" data-slider-keep-progress="true"/>',html+="</div>",html+='<div class="nowPlayingBarInfoContainer">',html+='<div class="nowPlayingImage"></div>',html+='<div class="nowPlayingBarText"></div>',html+="</div>",html+='<div class="nowPlayingBarCenter">',html+='<button is="paper-icon-button-light" class="previousTrackButton mediaButton"><span class="material-icons skip_previous"></span></button>',html+='<button is="paper-icon-button-light" class="playPauseButton mediaButton"><span class="material-icons pause"></span></button>',html+='<button is="paper-icon-button-light" class="stopButton mediaButton"><span class="material-icons stop"></span></button>',_layoutManager.default.mobile||(html+='<button is="paper-icon-button-light" class="nextTrackButton mediaButton"><span class="material-icons skip_next"></span></button>'),html+='<div class="nowPlayingBarCurrentTime"></div>',html+="</div>",html+='<div class="nowPlayingBarRight">',html+='<button is="paper-icon-button-light" class="muteButton mediaButton"><span class="material-icons volume_up"></span></button>',html+='<div class="sliderContainer nowPlayingBarVolumeSliderContainer hide" style="width:9em;vertical-align:middle;display:inline-flex;">',html+='<input type="range" is="emby-slider" pin step="1" min="0" max="100" value="0" class="slider-medium-thumb nowPlayingBarVolumeSlider"/>',html+="</div>",html+='<button is="paper-icon-button-light" class="toggleRepeatButton mediaButton"><span class="material-icons repeat"></span></button>',html+='<button is="paper-icon-button-light" class="btnShuffleQueue mediaButton"><span class="material-icons shuffle"></span></button>',html+='<div class="nowPlayingBarUserDataButtons">',html+="</div>",html+='<button is="paper-icon-button-light" class="playPauseButton mediaButton"><span class="material-icons pause"></span></button>',_layoutManager.default.mobile?html+='<button is="paper-icon-button-light" class="nextTrackButton mediaButton"><span class="material-icons skip_next"></span></button>':html+='<button is="paper-icon-button-light" class="btnToggleContextMenu mediaButton"><span class="material-icons more_vert"></span></button>',html+="</div>",html+="</div>",html+="</div>"}()),nowPlayingBarElement=parentContainer.querySelector(".nowPlayingBar"),_layoutManager.default.mobile&&(hideButton(nowPlayingBarElement.querySelector(".btnShuffleQueue")),hideButton(nowPlayingBarElement.querySelector(".nowPlayingBarCenter"))),_browser.default.safari&&_browser.default.slow&&nowPlayingBarElement.classList.add("noMediaProgress"),itemShortcuts.on(nowPlayingBarElement),bindEvents(nowPlayingBarElement)),resolve(nowPlayingBarElement)}))}))}function hideButton(button){button.classList.add("hide")}function updatePlayPauseState(isPaused){playPauseButtons&&playPauseButtons.forEach((function(button){var icon=button.querySelector(".material-icons");icon.classList.remove("play_arrow","pause"),icon.classList.add(isPaused?"play_arrow":"pause")}))}function updatePlayerStateInternal(event,state,player){!function showNowPlayingBar(){if(!isVisibilityAllowed)return void hideNowPlayingBar();getNowPlayingBar().then(slideUp)}(),lastPlayerState=state;var playerInfo=_playbackManager.default.getPlayerInfo(),playState=state.PlayState||{};updatePlayPauseState(playState.IsPaused);var supportedCommands=playerInfo.supportedCommands;if(currentPlayerSupportedCommands=supportedCommands,-1===supportedCommands.indexOf("SetRepeatMode")?toggleRepeatButton.classList.add("hide"):toggleRepeatButton.classList.remove("hide"),updateRepeatModeDisplay(_playbackManager.default.getRepeatMode()),onQueueShuffleModeChange(),updatePlayerVolumeState(playState.IsMuted,playState.VolumeLevel),positionSlider&&!positionSlider.dragging){positionSlider.disabled=!playState.CanSeek;var isProgressClear=state.MediaSource&&null==state.MediaSource.RunTimeTicks;positionSlider.setIsClear(isProgressClear)}var nowPlayingItem=state.NowPlayingItem||{};updateTimeDisplay(playState.PositionTicks,nowPlayingItem.RunTimeTicks,_playbackManager.default.getBufferedRanges(player)),function updateNowPlayingInfo(state){var nowPlayingItem=state.NowPlayingItem,textLines=nowPlayingItem?_nowPlayingHelper.default.getNowPlayingNames(nowPlayingItem):[];if(nowPlayingTextElement.innerHTML="",textLines){var itemText=document.createElement("div"),secondaryText=document.createElement("div");if(secondaryText.classList.add("nowPlayingBarSecondaryText"),textLines.length>1&&(textLines[1].secondary=!0,textLines[1].text)){var text=document.createElement("a");text.innerHTML=textLines[1].text,secondaryText.appendChild(text)}if(textLines[0].text){var _text=document.createElement("a");_text.innerHTML=textLines[0].text,itemText.appendChild(_text)}nowPlayingTextElement.appendChild(itemText),nowPlayingTextElement.appendChild(secondaryText)}var url=nowPlayingItem?function seriesImageUrl(item,options){if(!item)throw new Error("item cannot be null!");if("Episode"!==item.Type)return null;if((options=options||{}).type=options.type||"Primary","Primary"===options.type&&item.SeriesPrimaryImageTag)return options.tag=item.SeriesPrimaryImageTag,_connectionManager.default.getApiClient(item.ServerId).getScaledImageUrl(item.SeriesId,options);if("Thumb"===options.type){if(item.SeriesThumbImageTag)return options.tag=item.SeriesThumbImageTag,_connectionManager.default.getApiClient(item.ServerId).getScaledImageUrl(item.SeriesId,options);if(item.ParentThumbImageTag)return options.tag=item.ParentThumbImageTag,_connectionManager.default.getApiClient(item.ServerId).getScaledImageUrl(item.ParentThumbItemId,options)}return null}(nowPlayingItem,{height:70})||function imageUrl(item,options){if(!item)throw new Error("item cannot be null!");if((options=options||{}).type=options.type||"Primary",item.ImageTags&&item.ImageTags[options.type])return options.tag=item.ImageTags[options.type],_connectionManager.default.getApiClient(item.ServerId).getScaledImageUrl(item.PrimaryImageItemId||item.Id,options);if(item.AlbumId&&item.AlbumPrimaryImageTag)return options.tag=item.AlbumPrimaryImageTag,_connectionManager.default.getApiClient(item.ServerId).getScaledImageUrl(item.AlbumId,options);return null}(nowPlayingItem,{height:70}):null,isRefreshing=!1;url!==currentImgUrl&&(currentImgUrl=url,isRefreshing=!0,url?(_imageLoader.default.lazyImage(nowPlayingImageElement,url),nowPlayingImageElement.style.display=null,nowPlayingTextElement.style.marginLeft=null):(nowPlayingImageElement.style.backgroundImage="",nowPlayingImageElement.style.display="none",nowPlayingTextElement.style.marginLeft="1em"));if(nowPlayingItem.Id){if(isRefreshing){var apiClient=_connectionManager.default.getApiClient(nowPlayingItem.ServerId);apiClient.getItem(apiClient.getCurrentUserId(),nowPlayingItem.Id).then((function(item){var userData=item.UserData||{},likes=null==userData.Likes?"":userData.Likes;if(!_layoutManager.default.mobile){var contextButton=nowPlayingBarElement.querySelector(".btnToggleContextMenu"),contextButtonClone=contextButton.cloneNode(!0);contextButton.parentNode.replaceChild(contextButtonClone,contextButton);var options={play:!1,queue:!1,clearQueue:!0,positionTo:contextButton=nowPlayingBarElement.querySelector(".btnToggleContextMenu")};apiClient.getCurrentUser().then((function(user){contextButton.addEventListener("click",(function(){_itemContextMenu.default.show(Object.assign({item:item,user:user},options))}))}))}nowPlayingUserData.innerHTML='<button is="emby-ratingbutton" type="button" class="listItemButton mediaButton paper-icon-button-light" data-id="'+item.Id+'" data-serverid="'+item.ServerId+'" data-itemtype="'+item.Type+'" data-likes="'+likes+'" data-isfavorite="'+userData.IsFavorite+'"><span class="material-icons favorite"></span></button>'}))}}else nowPlayingUserData.innerHTML=""}(state)}function updateRepeatModeDisplay(repeatMode){toggleRepeatButtonIcon.classList.remove("repeat","repeat_one");switch(repeatMode){case"RepeatAll":toggleRepeatButtonIcon.classList.add("repeat"),toggleRepeatButton.classList.add("buttonActive");break;case"RepeatOne":toggleRepeatButtonIcon.classList.add("repeat_one"),toggleRepeatButton.classList.add("buttonActive");break;case"RepeatNone":default:toggleRepeatButtonIcon.classList.add("repeat"),toggleRepeatButton.classList.remove("buttonActive")}}function updateTimeDisplay(positionTicks,runtimeTicks,bufferedRanges){if(positionSlider&&!positionSlider.dragging)if(runtimeTicks){var pct=positionTicks/runtimeTicks;pct*=100,positionSlider.value=pct}else positionSlider.value=0;if(positionSlider&&positionSlider.setBufferedRanges(bufferedRanges,runtimeTicks,positionTicks),currentTimeElement){var timeText=null==positionTicks?"--:--":_datetime.default.getDisplayRunningTime(positionTicks);runtimeTicks&&(timeText+=" / "+_datetime.default.getDisplayRunningTime(runtimeTicks)),currentTimeElement.innerHTML=timeText}}function updatePlayerVolumeState(isMuted,volumeLevel){var supportedCommands=currentPlayerSupportedCommands,showMuteButton=!0,showVolumeSlider=!0;-1===supportedCommands.indexOf("ToggleMute")&&(showMuteButton=!1);var muteButtonIcon=muteButton.querySelector(".material-icons");muteButtonIcon.classList.remove("volume_off","volume_up"),muteButtonIcon.classList.add(isMuted?"volume_off":"volume_up"),-1===supportedCommands.indexOf("SetVolume")&&(showVolumeSlider=!1),currentPlayer.isLocalPlayer&&_apphost.default.supports("physicalvolumecontrol")&&(showMuteButton=!1,showVolumeSlider=!1),showMuteButton?function showButton(button){button.classList.remove("hide")}(muteButton):hideButton(muteButton),volumeSlider&&(volumeSliderContainer.classList.toggle("hide",!showVolumeSlider),volumeSlider.dragging||(volumeSlider.value=volumeLevel||0))}function onPlaybackStart(e,state){console.debug("nowplaying event: "+e.type);onStateChanged.call(this,e,state)}function onRepeatModeChange(){isEnabled&&updateRepeatModeDisplay(_playbackManager.default.getRepeatMode())}function onQueueShuffleModeChange(){if(isEnabled){var shuffleMode=_playbackManager.default.getQueueShuffleMode(),toggleShuffleButton=nowPlayingBarElement.querySelector(".btnShuffleQueue");switch(shuffleMode){case"Shuffle":toggleShuffleButton.classList.add("buttonActive");break;case"Sorted":default:toggleShuffleButton.classList.remove("buttonActive")}}}function hideNowPlayingBar(){isEnabled=!1;var elem=document.getElementsByClassName("nowPlayingBar")[0];elem&&function slideDown(elem){elem.offsetWidth,elem.classList.add("nowPlayingBar-hidden"),_dom.default.addEventListener(elem,_dom.default.whichTransitionEvent(),onSlideDownComplete,{once:!0})}(elem)}function onPlaybackStopped(e,state){console.debug("nowplaying event: "+e.type);this.isLocalPlayer?"Audio"!==state.NextMediaType&&hideNowPlayingBar():state.NextMediaType||hideNowPlayingBar()}function onPlayPauseStateChanged(e){if(isEnabled){updatePlayPauseState(this.paused())}}function onStateChanged(event,state){console.debug("nowplaying event: "+event.type);var player=this;state.NowPlayingItem&&!_layoutManager.default.tv?player.isLocalPlayer&&state.NowPlayingItem&&"Video"===state.NowPlayingItem.MediaType?hideNowPlayingBar():(isEnabled=!0,nowPlayingBarElement?updatePlayerStateInternal(0,state,player):getNowPlayingBar().then((function(){updatePlayerStateInternal(0,state,player)}))):hideNowPlayingBar()}function onTimeUpdate(e){if(isEnabled){var now=(new Date).getTime();if(!(now-lastUpdateTime<700)){lastUpdateTime=now;currentRuntimeTicks=_playbackManager.default.duration(this),updateTimeDisplay(_playbackManager.default.currentTime(this),currentRuntimeTicks,_playbackManager.default.getBufferedRanges(this))}}}function onVolumeChanged(e){if(isEnabled){updatePlayerVolumeState(this.isMuted(),this.getVolume())}}function refreshFromPlayer(player){var state=_playbackManager.default.getPlayerState(player);onStateChanged.call(player,{type:"init"},state)}function bindToPlayer(player){player!==currentPlayer&&(!function releaseCurrentPlayer(){var player=currentPlayer;player&&(_events.default.off(player,"playbackstart",onPlaybackStart),_events.default.off(player,"statechange",onPlaybackStart),_events.default.off(player,"repeatmodechange",onRepeatModeChange),_events.default.off(player,"shufflequeuemodechange",onQueueShuffleModeChange),_events.default.off(player,"playbackstop",onPlaybackStopped),_events.default.off(player,"volumechange",onVolumeChanged),_events.default.off(player,"pause",onPlayPauseStateChanged),_events.default.off(player,"unpause",onPlayPauseStateChanged),_events.default.off(player,"timeupdate",onTimeUpdate),currentPlayer=null,hideNowPlayingBar())}(),currentPlayer=player,player&&(refreshFromPlayer(player),_events.default.on(player,"playbackstart",onPlaybackStart),_events.default.on(player,"statechange",onPlaybackStart),_events.default.on(player,"repeatmodechange",onRepeatModeChange),_events.default.on(player,"shufflequeuemodechange",onQueueShuffleModeChange),_events.default.on(player,"playbackstop",onPlaybackStopped),_events.default.on(player,"volumechange",onVolumeChanged),_events.default.on(player,"pause",onPlayPauseStateChanged),_events.default.on(player,"unpause",onPlayPauseStateChanged),_events.default.on(player,"timeupdate",onTimeUpdate)))}_events.default.on(_playbackManager.default,"playerchange",(function(){bindToPlayer(_playbackManager.default.getCurrentPlayer())})),bindToPlayer(_playbackManager.default.getCurrentPlayer()),document.addEventListener("viewbeforeshow",(function(e){e.detail.options.enableMediaControl?isVisibilityAllowed||(isVisibilityAllowed=!0,currentPlayer?refreshFromPlayer(currentPlayer):hideNowPlayingBar()):isVisibilityAllowed&&(isVisibilityAllowed=!1,hideNowPlayingBar())}))}));
//# sourceMappingURL=nowPlayingBar.js.map
