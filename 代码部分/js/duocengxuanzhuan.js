 $(document).ready(function(){
            //移动滚动条来旋转木马移动位置
                $('.scroll').scroll(function(){//鼠标单击离开时候触发
                    var a=$(this).scrollLeft();//获取滚动的大小，单位为相数
                    $('.center').css('transform','rotateY('+a/2+'deg)');//除以2是因为旋转的角度过大
                })

            //点击图片显示大图
            $('.center li').click(function(){
                    var a=$(this).find('a').attr('href');
                    $('.center').hide();
                    $('.scroll').hide();
                    $('.hidden').show().css('backgroundImage','url('+a+')');
                    return false;
            })

            //前进和后退被点击
                //点击图片时候触发的效果
             $('.ul1 li').click(function(){
                var length=$('.ul1 li').length;//获取li的长度，用来为下面下一张来作比较是否最后一张
                var a=$(this).find("a").attr('href');
                var num=$(this).index();//获取点击的盒子在兄弟盒子中排行，用于切换图片
                //前进和后退被点击
                $('.hidden .after').click(function(){
                        num++;
                       if(num==length){
                        num=0;
                       }
                       var next=num+1;
                       var  go=$('.ul1 li:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css('background','url('+go+')');
                 })
                 $('.hidden .before').click(function(){
                        num--;
                       if(num==-1){
                        num=length-1;
                       }
                       var next=num+1;
                       var  go=$('.ul1 li:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css('background','url('+go+')');
                 })
             })

               //点击图片时候触发的效果
             $('.ul2 li').click(function(){
                var length=$('.ul2 li').length;//获取li的长度，用来为下面下一张来作比较是否最后一张
                var a=$(this).find("a").attr('href');
                var num=$(this).index();//获取点击的盒子在兄弟盒子中排行，用于切换图片
                //前进和后退被点击
                $('.hidden .after').click(function(){
                        num++;
                       if(num==length){
                        num=0;
                       }
                       var next=num+1;
                       var  go=$('.ul2 li:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css('background','url('+go+')');
                 })
                 $('.hidden .before').click(function(){
                        num--;
                       if(num==-1){
                        num=length-1;
                       }
                       var next=num+1;
                       var  go=$('.ul2 li:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css('background','url('+go+')');
                 })
             })


              //点击图片时候触发的效果
             $('.ul3 li').click(function(){
                var length=$('.ul3 li').length;//获取li的长度，用来为下面下一张来作比较是否最后一张
                var a=$(this).find("a").attr('href');
                var num=$(this).index();//获取点击的盒子在兄弟盒子中排行，用于切换图片
                //前进和后退被点击
                $('.hidden .after').click(function(){
                        num++;
                       if(num==length){
                        num=0;
                       }
                       var next=num+1;
                       var  go=$('.ul3 li:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css('background','url('+go+')');
                 })
                 $('.hidden .before').click(function(){
                        num--;
                       if(num==-1){
                        num=length-1;
                       }
                       var next=num+1;
                       var  go=$('.ul3 li:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css('background','url('+go+')');
                 })
             })


              //点击hieen盒子执行盒子返回最初页面
            $('.hidden').click(function(e){
                    if(e.target == this) {//点击目标为当前盒子就执行事件，必须为该盒子，其后代盒子被点击也无效
                      e.stopPropagation();
                     $(".hidden").hide("explode",1000);
                     $(".center").show("explode",1000);
                     $(".scroll").show("explode",1000);
                    }
            });



  })