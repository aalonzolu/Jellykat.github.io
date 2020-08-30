"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=_default;var _globalize=_interopRequireDefault(require("globalize"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function processForgotPasswordResult(result){if(result.Success){var msg=_globalize.default.translate("MessagePasswordResetForUsers");return msg+="<br/>",msg+="<br/>",msg+=result.UsersReset.join("<br/>"),void Dashboard.alert({message:msg,title:_globalize.default.translate("HeaderPasswordReset"),callback:function callback(){window.location.href="index.html"}})}Dashboard.alert({message:_globalize.default.translate("MessageInvalidForgotPasswordPin"),title:_globalize.default.translate("HeaderPasswordReset")})}function _default(view,params){view.querySelector("form").addEventListener("submit",(function onSubmit(e){return ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Users/ForgotPassword/Pin"),dataType:"json",data:JSON.stringify({Pin:view.querySelector("#txtPin").value})}).then(processForgotPasswordResult),e.preventDefault(),!1}))}
//# sourceMappingURL=index.js.map
