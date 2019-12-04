$(document).ready(function(){
    $(".center li").click(function(){
        if(isClick1==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('backgroundImage');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask1');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b,'background-size': 'cover'});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b,'background-size': 'cover'});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask1');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else if(isClick2==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('backgroundImage');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask1');
        $(".big_2").addClass('mask2');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b,'background-size': 'cover'});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b,'background-size': 'cover'});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐

        },1800);

        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask2');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
    }
        else if(isClick3==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('backgroundImage');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask1');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask3');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b,'background-size': 'cover'});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b,'background-size': 'cover'});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask3');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else if(isClick4==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('backgroundImage');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask1');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask4');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b,'background-size': 'cover'});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b,'background-size': 'cover'});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask4');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else if(isClick5==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('backgroundImage');
        $(".big_2").removeClass('mask6');
        $(".big_2").removeClass('mask1');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask5');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b,'background-size': 'cover'});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b,'background-size': 'cover'});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask5');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else if(isClick6==true){
        var a=$(this).text();//获取点击li的文本内容
        var b=$(this).css('backgroundImage');
        $(".big_2").removeClass('mask1');
        $(".big_2").removeClass('mask5');
        $(".big_2").removeClass('mask4');
        $(".big_2").removeClass('mask3');
        $(".big_2").removeClass('mask2');
        $(".big_2").addClass('mask6');
        //获取当前li的背景颜色
        $(".big_1").text(a).css({background:b,'background-size': 'cover'});//设置获取的样式在大盒子上

        //使mask动画进行完之后展示完整的图
        setTimeout(function(){
            $(".big_2").text(a).css({background:b,'background-size': 'cover'});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        },1800);
        setTimeout(function(){
            // $(".big_1").css('z-index','1');
            $(".big_2").removeClass('mask6');
        },2000);
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
        else{
        var a=$(this).text();//获取点击li的文本内容
        var a1=$(this).find('span').text();//获取点击li的文本内容
        var b=$(this).css('backgroundImage');
        //获取当前li的背景颜色
        $(".big_1").text(a+a1).css({background:b,'background-size': 'cover'});//设置获取的样式在大盒子上
        //使mask动画进行完之后展示完整的图
        $(".big_2").text(a+a1).css({background:b,'background-size': 'cover'});//第二个盒子在1.8s后改变为第一个盒子的样式，下次就会当前背景渐隐
        //里面的定时器为同时计数的，所以当动画运动到1.8s后，显示完整图，动画进行2s后，即展示大图后0.2s，去除mask效果，时间衔接不好会出现卡图的情况
        }
    })




});