function shortcut(e){
	this.e = e;
	this.href = function(){
	};
	this.render = function(title_, icon_ , callback , style_, class_ , arg_ , e){
		if ($("shortcut#"+this.e).length){return;}
		this.href = callback || function(){};
		e = e || "body";
		style_ = style_ || "";
		icon_ = icon_ || "";
		class_ = class_ || "movable";
		title_ = title_ || this.e;
		arg_ = arg_ || "";
		$('<shortcut id="'+this.e+'" title="'+title_+'" class="'+class_+ '" style="'+style_+'" '+arg_+'><span>'+icon_+'</span><shortcut-body>'+title_+'</shortcut-body></shortcut>').appendTo(e).hide();
		//var width =  title_.length/2;
		//if (width>10){
		//	width=10
		//}
		//$("shortcut#"+this.e).width(width+"em");
	};
	this.show = function(top_ ,left_,callback){
		top_ = top_ || "2em";
		left_ = left_ || "2em";
		$("shortcut#"+this.e).css("top",top_);
		$("shortcut#"+this.e).css("left",left_);
		$("shortcut#"+this.e).fadeIn();
		var instant = this;
		$("shortcut#"+this.e ).dblclick(function(e){
			if ( e.target.nodeName != "SPAN" && e.target.nodeName != "I" ){
				instant.href();
			}		
		});
	};
}