function datetime(e){
	this.e = e;
	$('<ui id="datetime" class=""><div><div><p id="time"></p><p id="date"></p></div><rss></rss></div></ui>').appendTo("body")
	this.update = function(){
		var a = new Date();
		this.updateTime();
		$(this.e+">div>div>p#date").text([ "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday", "Friday" , "Saturday" ][a.getDay()] + " , "+ a.getDate() +" "+ ["February","March","April","May","June","July", "August","September", "October","November", "December"][a.getMonth()] + " " + a.getFullYear() )
		setInterval(this.updateTime, 60000);
		var hover = function(event){
			$(e).unbind('click');
			$(e).click(function(){
				$(e).unbind('click');		
				$(e+">div>div").fadeOut();
				$(e+">div>rss").fadeOut();
				$(e).animate({
					opacity: 0.6,
					width: "16em",
					height: "7.5em"
				}, 1000, function() {					
					$(e).removeClass("hover");
					$(e).css("display","block");
					$(e+">div>div").css("display","block");
					$(e+">div>rss").css("display","none");
					$(e).click(hover);
					$(e+">div").fadeIn(1000).css("display","block");
				});	
			});	
			$(e+">div").hide();
			$(e).animate({
				opacity: 0.8,
				width: "100%",
				height: "100%"
			}, 1000, function() {
				$(e).addClass("hover");
				$(e).css("display","table");
				$(e+">div").fadeIn(1000).css("display","table-row");
				$(e+">div>div").css("display","table-cell");
				$(e+">div>rss").css("display","table-cell");
				$(e+">div>rss").html("");
				$(e+">div>rss").rss("http://rss.appleactionews.com/rss.xml", {
					limit: 5,
					entryTemplate: '<p href="{url}">{title}</p>|',
					effect: 'slideFastSynced'
				}).show();
			});	
		}
		$(e).click(hover);
		$(e).hover(function(){
			$(e).animate({opacity:0.8});
		}, function(){
			$(e).animate({opacity:0.6});
		});
	};
	this.updateTime = function(a){
		a = a || new Date();
		$(this.e+">div>div>p#time").text( (a.getHours() < 10 ? "0" : "") + a.getHours() +":"+ (a.getMinutes() < 10 ? "0" : "") + a.getMinutes() );
	};
}