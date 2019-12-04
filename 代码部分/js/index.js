$(document).ready(function(){
    $(".div1").animate({left: "-400px"}, 1000);
    $(".div2").animate({left: "400px"}, 1000);
    $(".div3").animate({'width':'420px','right':'-900px'},1000);
    $(".div4").animate({'width':'420px','left':'-=400px'},1000,function(){
            $(".main").fadeIn(500);
});
    $(".top").animate({opacity: 1}, 1000);
    });