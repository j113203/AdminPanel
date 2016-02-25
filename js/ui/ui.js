function em(input) {
    var emSize = parseFloat($("body").css("font-size"));
    return (emSize * input);
}
function px(input) {
    var emSize = parseFloat($("body").css("font-size"));
    return (input / emSize);
}


$("body").on("mousedown", ".movable>span", function(e) {
	$(this).parents().eq(0).addClass('moving');
	var offset_ = $(this).offset();
	var top_ = e.pageY - offset_.top;
	var left_ = e.pageX - offset_.left;
	$("body").on('mousemove', function(e) {
		$(".moving>span").css('cursor', 'move');
		var top = e.pageY-top_;
		if (top<0){
			top=0;
		}else if (top>$("html").height()-$(".moving").height()-em(4)){
			top=$("html").height()-$(".moving").height()-em(4);
		}
		var left = e.pageX-left_;
		if (left<0){
			left=0;
		}else if (left>$("html").width()-$(".moving").width() - em(2)){
			left=$("html").width()-$(".moving").width() - em(2);
		}
		var datetime_ = $("ui#datetime").offset();
		if ( top>datetime_.top-$(".moving").height() - em(4) && left< datetime_.left+$(".moving").width() - em(2.5) ){
			top = datetime_.top-$(".moving").height() - em(4);
		}
		$(".moving").offset({
			top: top,
			left: left,
		});	
	});
});


$("body").on('mouseup' , function() {
	$(".moving>span").css('cursor', 'initial');
    $(".moving").removeClass('moving');
});

function ui_(e){	
	var sender = (e && e.target) || (window.event && window.event.srcElement);
	//alert((new ui($(sender).parents().eq(1).attr('id'))));
	return (new ui($(sender).closest("ui").attr('id')));
};
function ui(e){
	this.e = e;
	this.prototype = function(){
		return $("ui#"+this.e+">ui-body");
	};
	this.render = function(title_ , class_ , height_ , width_ , url_ , body_ ,  style_ ,arg_, e){
		if ($("ui#"+this.e).length){return;}
		e = e || "body";
		style_ = style_ || "";
		url_ = url_ || "";
		body_ =  body_  ||"";
		title_ = title_ || this.e;
		class_ = class_ || "movable";
		arg_ = arg_ || "";
		if (height_){
			height_ = ' height="'+height_+'" ';
		}else{
			height_="";
		}
		if (width_){
			width_ = ' width="'+width_+'" ';
		}else{
			width_="";
		}
		$('<ui id="'+this.e+'" title="'+title_+'" class="'+class_+ '"'+height_+width_+'" url="'+url_+'" style="'+style_+'" '+arg_+'><span>'+title_+'</span><ui-body>'+body_+'</ui-body></ui>').appendTo(e).hide();
	};
	this.shown = function(position,callback){	
		position = position || "";
		this.progessbar.remove();
		var instant = this;
		$("ui#"+this.e).animate({
			width: $("ui#"+instant.e).attr("width") , 
			height: $("ui#"+instant.e).attr("height")
		}, 1000, function() {
			instant.position(position);
			$("ui#"+instant.e+ ">ui-body").fadeIn();
			if($("ui#"+instant.e).attr("canMaximum")){
				$("ui#"+instant.e+">span").dblclick(function() {
					if ($("ui#"+instant.e).attr("canMaximum")==0){
						$("ui#"+instant.e).attr("canmaximum","1");
						instant.restore();
					}else{
						$("ui#"+instant.e).attr("canmaximum","0");
						instant.maximum();
					}
				});
			}
			if (typeof(callback) == "function"){callback();}
		});	
	};
	this.show = function(position,callback){
		if ($("ui#"+this.e).is(":visible")){return;}
		position = position || "";
		this.restore_ = position;
		var exist=$("ui#"+this.e).length;
		if (!exist){
			this.render();
		}
		$("ui#"+this.e+ ">ui-body").hide();
		$("ui#"+this.e).height("1.5em");
		$("ui#"+this.e).width("10em");
		this.progessbar = new progessbar("ui#"+this.e+">progessbar");
		this.progessbar.create();
		this.position(position);
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
						instant.shown(position,callback);
					}).fail(function(){
						instant.progessbar.setValue("100",function(){
							instant.error("compile error");
						});
					});
				});
			}else{
				instant.shown(position,callback);
			}		
		});			
	};
	this.hide = function(callback){
		$("ui#"+this.e).fadeOut(1000).promise().done(callback);
	};
	this.kill = function (){
		var instant = this;
		this.hide(function(){
			$("ui#"+instant.e).remove();
		});
	};
	this.maximum = function(){
		this.position("top left");
		$("ui#"+this.e).width("calc(100% - 1.6em)");
		$("ui#"+this.e).height("calc(100% - 3.8em)");
	};
	this.restore = function(){		
		$("ui#"+this.e).width($("ui#"+this.e).attr("width"));
		$("ui#"+this.e).height($("ui#"+this.e).attr("height"));
		this.position(this.restore_);
	};
	this.minimum = function(){
		
	};
	this.error = function(a , callback){
		//callback=callback||function(){};
		$("ui#"+this.e).css('background', '#C0c0c0');
		$("ui#"+this.e).css('color', '#2a2a2a');
		$("ui#"+this.e+">span").css('background', '#2a2a2a');
		$("ui#"+this.e+">span").css('color', '#C0c0c0');
		$("ui#"+this.e+">progessbar>span").css('background', '#2a2a2a');
		$("ui#"+this.e+">progessbar").css('background', '#C0c0c0');
		this.progessbar.setStatus(a);
		var instant = this;
		$("ui#"+this.e).click(function(e){
			if ( e.target.nodeName != "SPAN" && e.target.nodeName != "I" ){
				callback();
				instant.kill();
			}		
		});
	};
	this.centerScreen = function(){
		this.position("middle middle");
	};
	this.position = function(value){
		value = value || "";
		value = value.split(" ");
		if (value.length==2){
			if (value[0]=="top"){
				$("ui#"+this.e).css('top',0);
			}else if (value[0]=="middle"){
				$("ui#"+this.e).css('top',( $("html").height() - $("ui#"+this.e).height() ) /2);
			}else if (value[0]=="bottom"){
				$("ui#"+this.e).css('top', $("html").height() - $("ui#"+this.e).height() - em(4));
			}
			if (value[1]=="left"){
				if (value[0]=="bottom"){
					$("ui#"+this.e).css('left', $("ui#datetime").width()+em(1));
				}else{
					$("ui#"+this.e).css('left',0);
				}		
			}else if (value[1]=="middle"){
				$("ui#"+this.e).css('left',( $("html").width() - $("ui#"+this.e).width() )/2);
			}else if (value[1]=="right"){
				$("ui#"+this.e).css('left', $("html").width()-$("ui#"+this.e).width()-em(2) );			
			}
		}
	};
	this.rename = function(value){
		$("ui#"+this.e+">span").html(value);
	};
}