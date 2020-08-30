define(["exports","playbackManager","focusManager","appRouter","dom","apphost"],(function(_exports,_playbackManager,_focusManager,_appRouter,_dom,_apphost){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.notify=notify,_exports.notifyMouseMove=notifyMouseMove,_exports.idleTime=idleTime,_exports.select=_select,_exports.on=on,_exports.off=off,_exports.handleCommand=handleCommand,_exports.default=void 0,_playbackManager=_interopRequireDefault(_playbackManager),_focusManager=_interopRequireDefault(_focusManager),_appRouter=_interopRequireDefault(_appRouter),_dom=_interopRequireDefault(_dom),_apphost=_interopRequireDefault(_apphost);var lastInputTime=(new Date).getTime();function notify(){lastInputTime=(new Date).getTime(),handleCommand("unknown")}function notifyMouseMove(){lastInputTime=(new Date).getTime()}function idleTime(){return(new Date).getTime()-lastInputTime}function _select(sourceElement){sourceElement.click()}var eventListenerCount=0;function on(scope,fn){eventListenerCount++,_dom.default.addEventListener(scope,"command",fn,{})}function off(scope,fn){eventListenerCount&&eventListenerCount--,_dom.default.removeEventListener(scope,"command",fn,{})}var commandTimes={};function handleCommand(commandName,options){lastInputTime=(new Date).getTime();var sourceElement=options?options.sourceElement:null;if(sourceElement&&(sourceElement=_focusManager.default.focusableParent(sourceElement)),!sourceElement){sourceElement=document.activeElement||window;var dialogs=document.querySelectorAll(".dialogContainer .dialog.opened"),dlg=dialogs.length?dialogs[dialogs.length-1]:null;dlg&&!dlg.contains(sourceElement)&&(sourceElement=dlg)}if(eventListenerCount){var customEvent=new CustomEvent("command",{detail:{command:commandName},bubbles:!0,cancelable:!0});if(!sourceElement.dispatchEvent(customEvent))return}var action=function keyActions(command){return{up:function up(){_focusManager.default.moveUp(sourceElement)},down:function down(){_focusManager.default.moveDown(sourceElement)},left:function left(){_focusManager.default.moveLeft(sourceElement)},right:function right(){_focusManager.default.moveRight(sourceElement)},home:function home(){_appRouter.default.goHome()},settings:function settings(){_appRouter.default.showSettings()},back:function back(){_appRouter.default.canGoBack()?_appRouter.default.back():_apphost.default.supports("exit")&&_apphost.default.exit()},select:function select(){_select(sourceElement)},nextchapter:function nextchapter(){_playbackManager.default.nextChapter()},next:function next(){_playbackManager.default.nextTrack()},nexttrack:function nexttrack(){_playbackManager.default.nextTrack()},previous:function previous(){_playbackManager.default.previousTrack()},previoustrack:function previoustrack(){_playbackManager.default.previousTrack()},previouschapter:function previouschapter(){_playbackManager.default.previousChapter()},guide:function guide(){_appRouter.default.showGuide()},recordedtv:function recordedtv(){_appRouter.default.showRecordedTV()},livetv:function livetv(){_appRouter.default.showLiveTV()},mute:function mute(){_playbackManager.default.setMute(!0)},unmute:function unmute(){_playbackManager.default.setMute(!1)},togglemute:function togglemute(){_playbackManager.default.toggleMute()},channelup:function channelup(){_playbackManager.default.channelUp()},channeldown:function channeldown(){_playbackManager.default.channelDown()},volumedown:function volumedown(){_playbackManager.default.volumeDown()},volumeup:function volumeup(){_playbackManager.default.volumeUp()},play:function play(){_playbackManager.default.unpause()},pause:function pause(){_playbackManager.default.pause()},playpause:function playpause(){_playbackManager.default.playPause()},stop:function stop(){(function checkCommandTime(command){var last=commandTimes[command]||0,now=(new Date).getTime();return!(now-last<1e3)&&(commandTimes[command]=now,!0)})("stop")&&_playbackManager.default.stop()},changezoom:function changezoom(){_playbackManager.default.toggleAspectRatio()},increaseplaybackrate:function increaseplaybackrate(){_playbackManager.default.increasePlaybackRate()},decreaseplaybackrate:function decreaseplaybackrate(){_playbackManager.default.decreasePlaybackRate()},changeaudiotrack:function changeaudiotrack(){_playbackManager.default.changeAudioStream()},changesubtitletrack:function changesubtitletrack(){_playbackManager.default.changeSubtitleStream()},search:function search(){_appRouter.default.showSearch()},favorites:function favorites(){_appRouter.default.showFavorites()},fastforward:function fastforward(){_playbackManager.default.fastForward()},rewind:function rewind(){_playbackManager.default.rewind()},seek:function seek(){_playbackManager.default.seekMs(options)},togglefullscreen:function togglefullscreen(){_playbackManager.default.toggleFullscreen()},disabledisplaymirror:function disabledisplaymirror(){_playbackManager.default.enableDisplayMirroring(!1)},enabledisplaymirror:function enabledisplaymirror(){_playbackManager.default.enableDisplayMirroring(!0)},toggledisplaymirror:function toggledisplaymirror(){_playbackManager.default.toggleDisplayMirroring()},nowplaying:function nowplaying(){_appRouter.default.showNowPlaying()},repeatnone:function repeatnone(){_playbackManager.default.setRepeatMode("RepeatNone")},repeatall:function repeatall(){_playbackManager.default.setRepeatMode("RepeatAll")},repeatone:function repeatone(){_playbackManager.default.setRepeatMode("RepeatOne")}}[command]}(commandName);void 0!==action?action.call():console.debug("inputManager: tried to process command with no action assigned: ".concat(commandName))}_dom.default.addEventListener(document,"click",notify,{passive:!0});var _default={handleCommand:handleCommand,notify:notify,notifyMouseMove:notifyMouseMove,idleTime:idleTime,on:on,off:off};_exports.default=_default}));
//# sourceMappingURL=inputManager.js.map
