var buju = {
    init:function (classname,classname1) {
        var h = document.body.clientHeight;
        $("#left").css("width","20%");
        $("#center").css("width","80%");
        var left_width= $("#left").width();
        var bar = $("."+classname).eq(0);
        $(bar).offset({ top: (h+100)/2, left: left_width });
        $("#center_body_right").css("width","20%");
        $("#center_body_left").css("width","80%");
        var center_body_right =$("#center_body_right").offset();
        var center_body_right_height=$("#center_body_right").height();
        var center_bar = $("."+classname1).eq(0);
        $(center_bar).offset({ top: (center_body_right_height/2), left: center_body_right.left-10 });

    },
    showorhide:function (target,type) {
        var t = $("#"+target);
        var w = document.body.clientWidth-10;
        if(type=="left")
        {
            if(t.attr("flag")=="0")
            {
                t.hide();
                // pp2.css("width",w);
                $("#center").css("width","100%");
                t.attr("flag","1");
                $("#left_bar").attr("class","fa fa-chevron-right");
                $("#left_bar_c").offset({left: 0 });
                // $("#right_bar_c").offset({left: w });
                if($("#center_body_right").attr("flag")=="1")
                {

                }
                else {
                var center_body_right =$("#center_body_right").offset();
                //if(center_body_right.le)
                $("#right_bar_c").offset({left: center_body_right.left-10});
                }

            }
            else {
                t.show();
                $("#center").css("width","80%");
                t.attr("flag", "0");
                $("#left_bar").attr("class", "fa fa-chevron-left")
                var left_width= $("#left").width();
                $("#left_bar_c").offset({left: left_width });
                var center_body_right =$("#center_body_right").offset();
                $("#right_bar_c").offset({left: center_body_right.left-10});
            }
        }
        else {

            if(t.attr("flag")=="0")
            {
                t.hide();
                $("#center_body_left").css("width","100%");
                t.attr("flag","1");
                $("#right_bar").attr("class","fa fa-chevron-left");
                // var center_body_left_width=$("#center_body_left").width();
                $("#right_bar_c").offset({left: w });
            }
            else {
                t.show();
                $("#center_body_left").css("width","80%");
                t.attr("flag", "0");
                $("#right_bar").attr("class", "fa fa-chevron-right")
                var center_body_right =$("#center_body_right").offset();
                $("#right_bar_c").offset({left: center_body_right.left-10});
            }
        }
    }
}