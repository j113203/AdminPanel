var setVersion = new Date(document.lastModified);
var index = {
	getVersion: function(){
		return setVersion.getFullYear() + (setVersion.getMonth() < 10 ? "0" : "") + (setVersion.getMonth()+1) + (setVersion.getDate() < 10 ? "0" : "") + setVersion.getDate();},
	getCSS : function(source, callback, errorcallback){
		var css = document.createElement('link');
		css.type = 'text/css';
		css.rel = 'stylesheet';
		css.href = source+"?"+index.getVersion();
		css.onload = callback;
		css.onerror = errorcallback;
		document.getElementsByTagName('head')[0].appendChild(css);},
	getScript : function(source, callback, errorcallback){
		var script = document.createElement('script');
		var prior = document.getElementsByTagName('script')[0];
		script.async = 1;
		prior.parentNode.insertBefore(script, prior);
		script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null;
            script = undefined;
            if(!isAbort) { if(callback) callback(); }
        }
		};
		script.onerror = errorcallback;
		script.src = source+"?"+index.getVersion();},
	init : function(source , percent , progessbar , errormsg , callbacks){
		if (source.length>0){
			if (percent>90){
				percent=90;
			}
			if (source[0].match(".js$")) {	
				$.ajaxSetup({cache: false});				
				$.getScript(source[0] ).done(function(data, textStatus, jqxhr) {		
					if (setVersion < new Date(jqxhr.getResponseHeader('Last-Modified'))){
						setVersion=new Date(jqxhr.getResponseHeader('Last-Modified'));
					};		
					progessbar.setValue(percent,function(){
						source.shift();
						index.init(source , percent+10 , progessbar , errormsg , callbacks);
					});					
				}).fail(function(){
					progessbar.setStatus(errormsg);
					progessbar.setValue(100);
				});
			}else if (source[0].match(".css$")) {
				index.getCSS(source[0],function(){
					progessbar.setValue(percent,function(){
						source.shift();
						index.init(source , percent+10 , progessbar , errormsg , callbacks);
					});
				},function(){
					progessbar.setStatus(errormsg);
					progessbar.setValue(100);
				});
			}
		}else{
			callbacks();
		}
	}
};

if (window.location.protocol != "https:"){
	window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}
index.getScript("./js/jquery-2.2.0.min.js",function(){
	$.ajaxSetup({cache: false});
	$.getScript( "./js/ui/progessbar.js" ).done(function() {
		var progessbar_init = new progessbar("progessbar#init");
		progessbar_init.setStatus("fetching component..");
		$("progessbar#init>span").width("0%");
		progessbar_init.setValue(10,function(){
			index.init(["./js/disablecpr.js","./css/normalize.css","./plugin/font-awesome-4.5.0/css/font-awesome.min.css","./css/ui/ui.css","./js/ui/datetime.js","./js/jquery.rss.min.js","./js/ui/ui.js","./js/md5.js","./js/ui/alert.js","./js/ui/shortcut.js"],20,progessbar_init,"unable to load required component.",function(){
				progessbar_init.setStatus("rendering..");
				progessbar_init.setValue(90,function(){
					if (typeof(dev_) == "function"){dev_();}
					var datetime_init = new datetime("ui#datetime");
					datetime_init.update();
					$('<img/>').attr('src', './img/bg.jpg?'+index.getVersion()).load(function() {						
						progessbar_init.setStatus("built v"+ index.getVersion());
						var instant = this;
						progessbar_init.setValue(100,function(){
							$("progessbar#init" ).fadeOut(1000).promise().done(function() {
								$("body").css("background-image", 'url(./img/bg.jpg?'+index.getVersion()+')');
								$(instant).remove();
								$("body").hide();
								$("body").fadeIn(1000);
								$("ui#datetime").fadeIn();
								if (typeof(dev) == "function"){dev();}
								//var ui_test = new ui("test");
								//ui_test.render("Demo" , "ui" , "15em" , "30em","ui/test.html","test");
								//ui_test.show();
							});
						});						
					}).error(function(){
						progessbar_init.setStatus("garbage collection fail.");
						progessbar_init.setValue(100);
					});
				});
				
			});
		});
		
	}).fail(function() {
		document.querySelector("progessbar#init>a").innerHTML = "component not working properly.";
	});
},function(){
	document.querySelector("progessbar#init>a").innerHTML = "initialize failed.";
});