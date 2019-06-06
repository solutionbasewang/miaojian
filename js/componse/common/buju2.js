var buju = {
    init:function (classname,classname1) {
        var h = document.body.clientHeight;
        $("#left").css("width","15%");
        $("#center").css("width","65%");
        $("#body_right").css("width","20%");
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
                    $("#center").css("width","80%");
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
                    $("#center").css("width","65%");
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
                // $("#center").css("width","100%");
                // t.attr("flag","1");
                // $("#right_bar").attr("class","fa fa-chevron-left");
                // // var center_body_left_width=$("#center_body_left").width();
                // $("#right_bar_c").offset({left: w });
            }
            else {
                t.show();
                t.attr("flag", "0");
                $("#right_bar").attr("class","fa fa-chevron-right");
                if(left_c.attr("flag")=="0")
                {
                    $("#center").css("width","65%");
                }
                else {
                    $("#center").css("width","80%");
                }
                // var left_width= $("#body_right").width();
                $("#right_bar_c").offset({left: $("#center").offset().left+$("#center").width()+10 });

                // $("#center").css("width","65%");
                // t.attr("flag", "1");
                // $("#right_bar").attr("class", "fa fa-chevron-right")
                // var center_body_right =$("#cbody_right").offset();
                // $("#right_bar_c").offset({left: center_body_right.left-10});
            }
        }
    },
    yulan:function (classname) {
        $("#center_body_right").css("width","50%");
        $("#center_body_left").css("width","50%");
        var center_body_right =$("#center_body_right").offset();
        var center_body_right_height=$("#center_body_right").height();
        var center_bar = $("."+classname).eq(0);
        $(center_bar).offset({ top: (center_body_right_height/2), left: center_body_right.left-10 });

    },
    clearyulan:function (classname) {
        $("#center_body_right").css("width","20%");
        $("#center_body_left").css("width","80%");
        var center_body_right =$("#center_body_right").offset();
        var center_body_right_height=$("#center_body_right").height();
        var center_bar = $("."+classname1).eq(0);
        $(center_bar).offset({ top: (center_body_right_height/2), left: center_body_right.left-10 });
    },
    screeninit:function () {

        var sc = window.screen.height;
        if(sc<=800){
            $("#simple_list").css("height","300px");
        }
        else if(sc>800&&sc<=900)
        {
            $("#simple_list").css("height","400px");
        }
        else if(sc>900)
        {
            $("#simple_list").css("height","500px");
        }
    }
}