function updateDateTime(){
	var a = new Date();
	updateTime(a);
	$( "div#sys_DateTime > p.date" ).text( [ "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday", "Friday" , "Saturday" ][a.getDay()] + " "+ a.getDate() +" , "+ ["February","March","April","May","June","July", "August","September", "October","November", "December"][a.getMonth()] + " " + a.getFullYear() );
	setInterval(updateTime, 60000);
}
function updateTime(a){
	a = a || new Date();
	$( "div#sys_DateTime > p.time" ).text( (a.getHours() < 10 ? "0" : "") + a.getHours() +":"+ (a.getMinutes() < 10 ? "0" : "") + a.getMinutes() );
}