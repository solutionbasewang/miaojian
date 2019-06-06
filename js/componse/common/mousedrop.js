function mousefrop() {
    this.move_tar=function (container_id) {
        $("#"+container_id).on("mousemove",function () {
            $("#"+container_id).css("-webkit-user-select", "none");
            $("#"+container_id).css("-moz-user-select", "none");
            $("#"+container_id).css("-ms-user-select:none", "none");
            $("#"+container_id).css("user-select:none", "none");
            var e = event || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            var x = e.pageX || e.clientX + scrollX;
            var y = e.pageY || e.clientY + scrollY;
            var groupid = $("#mousepanl").val();
            if (groupid != "") {
                console.log(groupid);
                document.body.style.cursor = "move"
            }
            else {
                document.body.style.cursor = "default"
            }
        })

    }
    this.move_down=function (class_name) {
        $("."+class_name).children("div").on("mousedown",this,function () {
            console.log(this);
        })
    }
    // this.init=function () {
    //     $("#news_container").on("mousedown",function () {
    //         $("#downorup").html("1");
    //         news.buildmousediv(news.find_checknew_group());
    //         var newlist = news.find_checknew_group();
    //         if(newlist.length>0) {
    //             var e = event || window.event;
    //             var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    //             var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    //             var x = e.pageX || e.clientX + scrollX;
    //             var y = e.pageY || e.clientY + scrollY;
    //             $("#mousepanl").css("left", x + 5);
    //             $("#mousepanl").css("top", y);
    //             $("#mousepanl").show();
    //             $("#news_container").css("-webkit-user-select", "none");
    //             $("#news_container").css("-moz-user-select", "none");
    //             $("#news_container").css("-ms-user-select:none", "none");
    //             $("#news_container").css("user-select:none", "none");
    //         }
    //     })
    //     $("#news_container").on("mouseup",function () {
    //         $("#downorup").html("0");
    //         $("#mousepanl").hide();
    //         $("#mousepanl").html("");
    //         //console.log("up");
    //     })
    //     $("#menu_container").on("mousemove",function (event) {
    //         var e = event || window.event;
    //         var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    //         var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    //         var x = e.pageX || e.clientX + scrollX;
    //         var y = e.pageY || e.clientY + scrollY;
    //         if($("#downorup").html()=="1"){
    //             $("#mousepanl").css("left",x+5);
    //             $("#mousepanl").css("top",y);
    //         }
    //     })
    //     $("#menu_container").on("mouseup",function () {
    //         $("#downorup").html("0");
    //         $("#mousepanl").hide();
    //         $("#mousepanl").html("");
    //     })
    //     $("#news_container").on("mousemove",function (event) {
    //         var e = event || window.event;
    //         var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    //         var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    //         var x = e.pageX || e.clientX + scrollX;
    //         var y = e.pageY || e.clientY + scrollY;
    //         if($("#downorup").html()=="1"){
    //             $("#mousepanl").css("left",x+5);
    //             $("#mousepanl").css("top",y);
    //         }
    //     })
    // }
}