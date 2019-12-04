$(document).ready(function(){
    var isClick1=false;  //判断按钮1是否被点击
    var isClick2=false;  //判断按2是否被点击
    var isClick3=false;  //判断按钮3是否被点击
    var isClick4=false;  //判断按钮4是否被点击
    var isClick5=false;  //判断按5是否被点击
    var isClick6=false;  //判断按钮6是否被点
    // 鼠标悬浮放大图片的效果
    $(".center li").hover(function(){
        $(this).css({width:'+=100px',height: '+=20px'});
    },function(){
        $(this).css({width:'-=100px',height: '-=20px'}
            )
    })
     $(".b1").click(function(){
    isClick1 = true;
    isClick2 = false;
    isClick3 = false;
    isClick4 = false;
    isClick5 = false;
    isClick6 = false;
    })
     $(".b2").click(function(){
    isClick2 = true;
    isClick1 = false;
    isClick3 = false;
    isClick4 = false;
    isClick5 = false;
    isClick6 = false;
    })
     $(".b3").click(function(){
    isClick3 = true;
    isClick2 = false;
    isClick1 = false;
    isClick4 = false;
    isClick5 = false;
    isClick6 = false;
    })
     $(".b4").click(function(){
    isClick4 = true;
    isClick2 = false;
    isClick3 = false;
    isClick1 = false;
    isClick5 = false;
    isClick6 = false;
    })
     $(".b5").click(function(){
    isClick5 = true;
    isClick2 = false;
    isClick3 = false;
    isClick4 = false;
    isClick1 = false;
    isClick6 = false;
    })
     $(".b6").click(function(){
    isClick6 = true;
    isClick2 = false;
    isClick3 = false;
    isClick4 = false;
    isClick5 = false;
    isClick1 = false;
    })

    $(".center li").click(function(){
        if(isClick1==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('background');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask1');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask1');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else if(isClick2==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('background');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask1');
        $(".big_2").addClass('mask2');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask2');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
    }
        else if(isClick3==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('background');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask1');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask3');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask3');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else if(isClick4==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('background');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask1');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask4');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask4');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else if(isClick5==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('background');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask1');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask5');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask5');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else if(isClick6==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('background');
        $(".big_2").removeClass('mask1');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask6');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask6');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else{
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('background');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b});//设置获取的样式在大盒子上
        //使mask动画进行完之后展示完整的图
            $(".big_2").text(a).css({background:b});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
    })
});