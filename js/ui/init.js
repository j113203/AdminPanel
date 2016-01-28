function getVersion(){
	var a = new Date(document.lastModified);
	return a.getFullYear() + (a.getMonth() < 10 ? "0" : "") + a.getMonth() + (a.getDate() < 10 ? "0" : "") + a.getDate();
}
function getScript(url, callback , errorcallback){
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	script.onload = callback;
	script.onerror = errorcallback;
	document.getElementsByTagName('head')[0].appendChild(script);
}
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
function getCSS(url, callback , errorcallback){
	var script = document.createElement('link');
	script.type = 'text/css';
	script.rel = 'stylesheet';
	script.href = url;
	script.onload = callback;
	script.onerror = errorcallback;
	document.getElementsByTagName('head')[0].appendChild(script);
}
function init(a,b,c,d){
	if (a.length>=1) {
		if (a[0].endsWith(".css")){
			getCSS(a[0],function(){
				setProgessBar(c);
				a.shift();
				init(a,b,c+10,d);
			},function(){
				ErrorHandle(b);
			});
		}else{
			getScript(a[0],function(){
				setProgessBar(c);
				a.shift();
				init(a,b,c+10,d);
			},function(){
				ErrorHandle(b);
			});
		}
	}else{
		d();
	}
}