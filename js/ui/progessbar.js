function createProgessBar(e){
	$( e ).addClass( "ProgessBar" );
	$( e ).append('<div class="ProgessBar"><a><a></div>');
}
function remoteProgessBar(e){
	$( e +"> div.ProgessBar" ).remove();
	$( e ).removeClass( "ProgessBar" );
}
function setProgessStatus(value,e){
	e = e || "div#sys_progessbar > div.ProgessBar > a";
	document.querySelector(e).innerHTML = value;
}
function setProgessBar(value,e){
	e = e || "div#sys_progessbar > div.ProgessBar";
	if (value<0){value=0}
	if (value>100){value=100}
	document.querySelector(e).style.width = value+"%";
}