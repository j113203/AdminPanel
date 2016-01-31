function ui(e){
	this.e = e;
	this.render = function(title_ , class_ , height_ , width_ , url_ , body_ ,  style_ , e){
		e = e || "body";
		style_ = style_ || "";
		url_ = url_ || "";
		body_ =  body_  ||"";
		title_ = title_ || this.e;
		class_ = class_ || "ui";
		height_ = ' height="'+height_+'" '|| "";
		width_ = ' width="'+width_+'" '| "";
		$('<ui id="'+this.e+'" title="'+title_+'" class="'+class_+ '"'+height_+width_+'" url="'+url_+'" style="'+style_+'"><span>'+title_+'</span><ui-body>'+body_+'</ui-body></ui>').appendTo(e).hide();
	};
	this.show = function(){
		//var cur = $('ui#'+this.e).closest('body');
		//while (cur.closest('body').length > 1){
		////	cur = cur.closest('body');
		//}	
		var exist=$("ui#"+this.e).length;
		if (!exist){
			this.render();
		}
		$("ui#"+this.e+ ">ui-body").hide();
		$("ui#"+this.e).height("1.5em");
		$("ui#"+this.e).width("10em");
		this.progessbar = new progessbar("ui#"+this.e+">progessbar");
		this.progessbar.create();
		$("ui#"+this.e).fadeIn();
		this.progessbar.setStatus("rendering..");
		var instant = this;
		this.progessbar.setValue("10",function(){
			if (!exist){
				instant.progessbar.setValue("100",function(){
						instant.error("compile error");
				});
			}else if ($("ui#"+instant.e).attr("url")){				
				instant.progessbar.setStatus("fetching resource..");
				instant.progessbar.setValue("80",function(){					
					$.get($("ui#"+instant.e).attr("url"), function( data ) {
						$("ui#"+instant.e+ ">ui-body").append(data);
						instant.progessbar.remove();
						$("ui#"+instant.e).animate({
							width: $("ui#"+instant.e).attr("width") , 
							height: $("ui#"+instant.e).attr("height")
						}, 1000, function() {	
							$("ui#"+instant.e+ ">ui-body").fadeIn();
						});	
					}).fail(function(){
						instant.progessbar.setValue("100",function(){
							instant.error("compile error");
						});
					});
				});
			}else{
				instant.progessbar.remove();
				$("ui#"+instant.e).animate({
					width: $("ui#"+instant.e).attr("width") , 
					height: $("ui#"+instant.e).attr("height")
				}, 1000, function() {	
					$("ui#"+instant.e+ ">ui-body").fadeIn();
				});	
			}		
		});			
	};
	this.maximum = function(){
		
	};
	this.minimum = function(){
		
	};
	this.error = function(a){
		$("ui#"+this.e).css('background', '#C0c0c0');
		$("ui#"+this.e).css('color', '#2a2a2a');
		$("ui#"+this.e+">span").css('background', '#2a2a2a');
		$("ui#"+this.e+">span").css('color', '#C0c0c0');
		$("ui#"+this.e+">progessbar>span").css('background', '#2a2a2a');
		$("ui#"+this.e+">progessbar").css('background', '#C0c0c0');
		this.progessbar.setStatus(a);
	};
}