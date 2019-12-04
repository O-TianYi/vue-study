$(document).ready(function(){
    // 画卷展开实现
    $(".div1").animate({left: "-800px"}, 1000);
    $(".div2").animate({left: "800px"}, 1000);
    $(".div3").animate({'width':'820px','right':'-1300px'},1000);
    $(".div4").animate({'width':'820px','left':'-=800px'},1000,function(){
            $(".main").fadeIn(500);
    });


        $(".top ").animate({opacity: 1}, 1000,function(){
            $(".top .top1").animate({opacity: 1}, 2000);
            $(".top .bottoml").animate({opacity: 1}, 2000);
            $(".top .bottomr").animate({opacity: 1}, 2000);
        });







});