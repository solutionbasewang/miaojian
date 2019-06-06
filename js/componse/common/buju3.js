var buju = {
    init:function (classname,classname1) {
        var h = document.body.clientHeight;
        $("#left").css("width","15%");
        $("#center").css("width","50%");
        $("#body_right").css("width","35%");
        var left_width= $("#left").width();
        var bar = $("."+classname).eq(0);
        $(bar).offset({ top: (h+100)/2, left: left_width });
        var center_body_right =$("#body_right").offset();
        var center_body_right_height=$("#body_right").height();
        var center_bar = $("."+classname1).eq(0);
        $(center_bar).offset({ top: (center_body_right_height/2), left: center_body_right.left-10 });
    },
    showorhide:function (target,type) {
        var t = $("#"+target);
        var left_c = $("#left");
        var right_c = $("#body_right");
        var w = document.body.clientWidth-10;
        if(type=="left")
        {
            if(t.attr("flag")=="0"){
                t.hide();
                t.attr("flag","1");
                $("#left_bar").attr("class","fa fa-chevron-right");
                $("#left_bar_c").offset({left: 0 });
                if(right_c.attr("flag")=="0")
                {
                    $("#center").css("width","65%");
                }
                else {
                    $("#center").css("width","100%");
                }
            }
            else {
                t.show();
                t.attr("flag","0");
                $("#left_bar").attr("class","fa fa-chevron-left");
                var left_width= $("#left").width();
                $("#left_bar_c").offset({left: left_width });
                if(right_c.attr("flag")=="0")
                {
                    $("#center").css("width","50%");
                }
                else {
                    $("#center").css("width","85%");
                }
            }
        }
        else {

            if(t.attr("flag")=="0")
            {
                t.hide();
                t.attr("flag","1");
                $("#right_bar").attr("class","fa fa-chevron-left");
                // var center_body_left_width=$("#center").width();
                $("#right_bar_c").offset({left: w });
                if(left_c.attr("flag")=="0")
                {
                    $("#center").css("width","85%");
                }
                else {
                    $("#center").css("width","100%");
                }
            }
            else {
                t.show();
                t.attr("flag", "0");
                $("#right_bar").attr("class","fa fa-chevron-right");
                if(left_c.attr("flag")=="0")
                {
                    $("#center").css("width","50%");
                }
                else {
                    $("#center").css("width","65%");
                }
                $("#right_bar_c").offset({left: $("#center").offset().left+$("#center").width()+10 });

            }
        }
    },
    open_yulan:function () {
        $("#left").hide();
        $("#left_bar_c").hide();
        $("#right_bar_c").hide();
        $("#center_yulan").show();
        $("#left").css("width","25%");
        $("#center_yulan").css("width","25%");
        $("#body_right").css("width","25%");

    },
    close_yulan:function () {
        $("#left").show();
        $("#left_bar_c").show();
        $("#right_bar_c").show();
        $("#center_yulan").hide();
        $("#left").css("width","15%");
        $("#center").css("width","50%");
        $("#body_right").css("width","35%");
    }
}