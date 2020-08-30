define(["exports","browser","appSettings","events"],(function(_exports,_browser,_appSettings,_events){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _setLayout(instance,layout,selectedLayout){layout===selectedLayout?(instance[layout]=!0,document.documentElement.classList.add("layout-"+layout)):(instance[layout]=!1,document.documentElement.classList.remove("layout-"+layout))}Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0,_browser=_interopRequireDefault(_browser),_appSettings=_interopRequireDefault(_appSettings),_events=_interopRequireDefault(_events);var _default=new(function(){function LayoutManager(){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,LayoutManager)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(LayoutManager,[{key:"setLayout",value:function setLayout(layout,save){layout&&"auto"!==layout?(_setLayout(this,"mobile",layout),_setLayout(this,"tv",layout),_setLayout(this,"desktop",layout),!1!==save&&_appSettings.default.set("layout",layout)):(this.autoLayout(),!1!==save&&_appSettings.default.set("layout","")),_events.default.trigger(this,"modechange")}},{key:"getSavedLayout",value:function getSavedLayout(layout){return _appSettings.default.get("layout")}},{key:"autoLayout",value:function autoLayout(){_browser.default.mobile?this.setLayout("mobile",!1):_browser.default.tv||_browser.default.xboxOne||_browser.default.ps4?this.setLayout("tv",!1):this.setLayout(this.defaultLayout||"tv",!1)}},{key:"init",value:function init(){var saved=this.getSavedLayout();saved?this.setLayout(saved,!1):this.autoLayout()}}]),LayoutManager}());_exports.default=_default}));
//# sourceMappingURL=layoutManager.js.map
