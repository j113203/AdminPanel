function LoadUI(e){
	$( e + "> div" ).hide();
	createProgessBar(e);
	$( e ).height("2em");
	var a = $( e ).attr("title") || "";
	$( e ).prepend("<span>"+a+"</span>");		
	$( e ).fadeIn(3000);
	setProgessBar(10,e +"> div.ProgessBar");
	setProgessStatus($( e ).attr("title") , e +"> div.ProgessBar > a");
	if ($( e ).attr("url")){
		setProgessBar(80,e +"> div.ProgessBar");
		$.get($( e ).attr("url"), function( data ) {
			$( e + "> div" ).append(data);
			UI_Complete(e);
		}).fail(function() {
			setProgessBar(100,e +"> div.ProgessBar");
			setProgessStatus("runtime error" , e +"> div.ProgessBar > a");
		});
	}else{
		UI_Complete(e);
	}			
}
function UI_Complete(e){
	setProgessBar(100,e +"> div.ProgessBar");
	setProgessStatus("done" , e +"> div.ProgessBar > a");
	remoteProgessBar(e);
	$( e + "> div" ).show();
	$( e ).height($( e ).attr("height"));
	$( e ).width($( e ).attr("width"));
}