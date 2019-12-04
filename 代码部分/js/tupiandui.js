 $(document).ready(function(){
             //ul1的js部分
             var length=$('.ul1 li').length;//获取li的长度，用来为下面下一张来作比较是否最后一张
            //随机生成随机图片位置
            for(var i=1;i<=length;i++){
                //随机生成图片的位置
                var left=(i-1)*20+Math.random()*100;
                var top=50+Math.random()*-50+Math.random()*250;
                var r=-45+Math.random()*80;
                $('.ul1 li:nth-child('+i+')').css({
                'left':left,
                'top':top,
                'transform':'rotate('+r+'deg)'
            })
            }
            //点击盒子展开图片并可以控制轮番切
            //鼠标放在任意图片上，该图片显示完整的
            $('.ul1 li').hover(function(){
                $(this).css('z-index','999');
            },function(){
                $(this).css('z-index','0') ;
                           })
            //点击图片时候触发的效果
             $('.ul1 li').click(function(){
                var a=$(this).find("a").attr('href');
                var num=$(this).index();//获取点击的盒子在兄弟盒子中排行，用于切换图片
                $('.div1').hide();
                $('.hidden').show().css({'background':'url('+a+')','background-size':'cover','background-position':'center'});
                //前进和后退被点击
                $('.hidden .after').click(function(){
                        num++;
                       if(num==length){
                        num=0;
                       }
                       var next=num+1;
                       var  go=$('.ul1 li:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css({'background':'url('+go+')','background-size':'cover','background-position':'center'});
                 })
                 $('.hidden .before').click(function(){
                        num--;
                       if(num==-1){
                        num=length-1;
                       }
                       var next=num+1;
                       var  go=$('.ul1 li:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css({'background':'url('+go+')','background-size':'cover','background-position':'center'});
                 })
             return false;
            })//点击图片事件结束


             //点击hieen盒子执行盒子返回最初页面
            $('.hidden').click(function(e){
                    if(e.target == this) {//点击目标为当前盒子就执行事件，必须为该盒子，其后代盒子被点击也无效
                      e.stopPropagation();
                     $(".hidden").hide();
                     $(".div1").show();
                    }
            });

})