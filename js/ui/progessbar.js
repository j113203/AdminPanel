function progessbar(e){
	this.e = e;
	this.create = function(){

		//alert($(this.e).parents().eq(0).html());
		$(this.e.substring(0,this.e.lastIndexOf(">"))).append('<progessbar class="ProgessBar"><span style="width:100%"></span><a></a></progessbar>');
	};
	this.remove = function(){
		$(this.e).remove();
	};
	this.getValue = function(){
		return $(this.e+">span").width();
	};
	this.setValue = function(value,callback){
		callback=callback||function(){};
		$(this.e+">span").animate({width:value+"%"},500,callback);
		//$(this.e+">span").width(value+"%");
	};
	this.getStatus = function(){
		return $(this.e+">a").html();
	};
	this.setStatus = function(status){
		$(this.e+">a").html(status);
	};
}