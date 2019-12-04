 $(document).ready(function(){
            var length=$('.center .div1').length;
            //移动滚动条来旋转木马移动位置
                $('.scroll').scroll(function(){//鼠标单击离开时候触发
                    var a=$(this).scrollLeft();//获取滚动的大小，单位为相数
                    $('.center').css('transform','rotateY('+a/2+'deg)');//除以2是因为旋转的角度过大
                })

            //点击图片显示大图
            $('.center .div1').click(function(){
                    var a=$(this).find('a').attr('href');
                    $('.center').hide();
                    $('.scroll').hide();
                    $('header').hide();
                    $('.hidden').show().css({'backgroundImage':'url('+a+')','background-size':'cover','background-position':'center,center'});
                    return false;
            })

            //前进和后退被点击
                //点击图片时候触发的效果
             $('.center .div1').click(function(){
                var length=$('.center .div1').length;//获取li的长度，用来为下面下一张来作比较是否最后一张
                var a=$(this).find("a").attr('hrft');
                var num=$(this).index();//获取点击的盒子在兄弟盒子中排行，用于切换图片
                //前进和后退被点击
                $('.hidden .after').click(function(){
                        num++;
                       if(num==length){
                        num=0;
                       }
                       var next=num+1;
                       var  go=$('.center .div1:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css({'background':'url('+go+')','background-size':'cover','background-position':'center,center'});
                 })
                 $('.hidden .before').click(function(){
                        num--;
                       if(num==-1){
                        num=length-1;
                       }
                       var next=num+1;
                       var  go=$('.center .div1:nth-child('+next+')').find("a").attr('href');
                       $('.hidden').css({'background':'url('+go+')','background-size':'cover','background-position':'center,center'})
                 })
             })



              //点击hieen盒子执行盒子返回最初页面
            $('.hidden').click(function(e){
                    if(e.target == this) {//点击目标为当前盒子就执行事件，必须为该盒子，其后代盒子被点击也无效
                      e.stopPropagation();
                     $(".hidden").hide("explode",1000);
                     $(".center").show("explode",1000);
                     $(".scroll").show("explode",1000);
                     $("header").show();
                    }
            });



  })