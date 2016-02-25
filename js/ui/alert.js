function random(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}
(function(proxied) {
  window.alert = function(message,callback) {
	var ui_alert = new ui("alert_"+Math.floor(Math.random()*(1e6)));
	var length = message.length/2+"em" || "10em";
	ui_alert.render("<i class='fa fa-exclamation-triangle'></i>","","2em",length,"",message,"top:100;left:100;");
    ui_alert.show("middle middle");
	ui_alert.error("",callback);
  };
})(window.alert);
//});