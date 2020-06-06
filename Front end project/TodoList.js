$("ul").on("click","li", function(){
	$(this).toggleClass("completed");
});
//even.stoppropogation is used because span is inside li. So while clicking it was taking li not span
$("ul").on("click","span", function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});
	event.stopPropagation();
});
//13 has means enter in js
//learn difference b/w click and on('click')
$("input[type='text']").keypress(function(event)
{
	if(event.which===13){
		var todo = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class="fa fa-trash"></i></span> "+todo+"</li>")
	}
})

$(".fa-plus").click(function(){
	("input[type='text']").fadeToggle();
});