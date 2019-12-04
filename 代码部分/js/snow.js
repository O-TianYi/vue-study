$(document).ready(function(){
             var flak = $("<div class='xh'></div>").css({'position':"absolute",'left':'50%',"top":"-50%",'color':'white'}).html("❄");//定义一个雪花,高度为负值，默认会从左上角开始，导致一堆在的、角积累，显示不好看，所以要加负值
            //alert("siohdio");//prepend,append
            setInterval(function(){
            var size=Math.random()*50;
            var tm=0.7+Math.random()*0.3;
            var sjh=Math.random()*$(".main").height();//雪花随机生成飘落的高度，即从开始位置开始飘落到消失的最大高度
            var sjw=Math.random()*$(".main").width();//雪花随机生成飘落的宽度，即从开始位置开始飘落到消失的最大宽度
            var sjs=Math.random()*3000+2000;//用作动画的时间，即动画飘落到最终点的时间
            flak.clone().appendTo($(".main")).css({'font-size':size,'opacity': tm,}).animate({'top': sjh,'left': sjw,},sjs,function(){
                $(this).remove()//动画做完后进行移除
            });
        },50);//定时器结束
})