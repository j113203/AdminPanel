function ErrorHandle(e){
	var r="div#sys_progessbar > div.ProgessBar";
	document.querySelector(r+">a").innerHTML=e;
	document.querySelector(r).style.width="100%";
	if(window.jQuery){
		$("div#sys_progessbar").fadeIn();
		$(r).fadeIn();
	}		
	document.querySelector(r).style.display="line";
	document.querySelector("div#sys_progessbar").style.display="line";
}
window.onerror=function(){
	ErrorHandle("the browser is not supported")
};