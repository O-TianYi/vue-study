$(document).ready(function(){
    var length=$('ul li').length;
     var a;
    // 初始化的时候图片滑下来效果
    setTimeout(init,200);
    function init(){
        $(".tu").addClass('tu1');
    }

    // 点击li时候触发的展开事件
    $(".gezi").click(function(){
        a=$(this).index();
        $(this).addClass('active');
        $(".main").addClass('main1');
        $('.after').show();
        $('.before').show();
    })


    // 叉叉的关闭功能实现
    $(".cha").click(function(e){
        e.stopPropagation();
        $(".gezi").removeClass('active');
        $(".main").removeClass('main1');
        $('.after').hide();
        $('.before').hide();
    })


    //下一张上一张触发事件
    $('.before').click(function(){
        a--;
        if(a==-1){a=length-1};
        var before=$('.main li:eq('+a+')').css('background-image');
        alert(before);
        $(".main li").css('background','url('+before+')');



    })


})