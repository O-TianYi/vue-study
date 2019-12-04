 $(document).ready(function(){
            // 鼠标移动为mousemove，即鼠标移动触发的时间
            $(document).on('mousemove',function(e){
                 e.preventDefault();//取消默认形式，例如默认事件双击鼠标会获取所有文档内容
                var x=e.pageX-570;//获取当前鼠标的位置
                var y=e.pageY-30;
                var div='<div class="sbyd" style="left: '+x+'px;top:'+y+'px;"></div>';//设置盒子的固定位置，并给他一个类名，以方便后面来直接通过类名找到盒子进行删除
                $("body").append(div);//把生成的每一个盒子添加到body上显示

                //删除生成的每一个盒子
                $(".sbyd").each(function(){
                    var div1=$(this);//获取当前生成的盒子，0.1s后进行删除
                    setTimeout(function(){
                    $(div1).remove();
                      },100);
                })

        })
    })