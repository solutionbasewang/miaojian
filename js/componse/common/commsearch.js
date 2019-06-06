
function commsearch(targetid, data, selectid, searchinputid, condition_container, searchcondition) {
    this.targetid = targetid;
    this.data = data;
    this.condition_delete=function(e){
        $(e).remove();
        var conditioncounts = $("#conditions div");
        $("#conditions").css("width", (conditioncounts.length * 20) + "%");
        $("#searcher").css("width", (100 - conditioncounts.length * 20) + "%");
    }
    this.init = function (t) {
        var offset = $("#" + targetid)[0];
        var top = offset.offsetTop;
        var left = offset.offsetLeft;
        console.log(top + "," + left);
        $("#"+searchcondition).css("left",left);
        $("#"+searchcondition).css("top",30+top);
        $("#" + selectid).on("change", function (e) {
            var l = $("#" + selectid + " option:selected");
            var vlist = $(l).attr("value").split(':');
            if (vlist[1] == undefined || vlist[1] == "" || vlist[1] == "") {
                $("#" + searchinputid).val("");
                $("#" + selectid).val("");
                $("#" + searchcondition).hide();
                return;
            }
            if (vlist[0] == "🀄︎") {
                var len=4;
                //title
                $("#" + condition_container).append("<div onclick='t.condition_delete(this)' title='"+ vlist[1]+"' value='Title," + vlist[1] + "'>"+tool.stringtool.substr(vlist[1],len)+"</div>")
            } else if (vlist[0] == "🀀") {
                //meidianame
                $("#" + condition_container).append("<div onclick='t.condition_delete(this)' title='"+ vlist[1]+"' value='Media," + vlist[1] + "'>"+tool.stringtool.substr(vlist[1],len)+"</div>")
            } else if (vlist[0] == "🀁") {
                //keyword
                $("#" + condition_container).append("<div onclick='t.condition_delete(this)' title='"+ vlist[1]+"' value='Keyword," + vlist[1] + "'>"+tool.stringtool.substr(vlist[1],len)+"</div>")
            }
            var conditioncounts = $("#conditions div");
            console.log(conditioncounts.length);
            $("#conditions").css("width", (conditioncounts.length * 20) + "%");
            $("#searcher").css("width", (100 - conditioncounts.length * 20) + "%");
            $("#" + searchinputid).val("");
            $("#" + selectid).val("");
            $("#" + searchcondition).hide();
        })
        $("#" + searchinputid).on("click", function (e) {
            $("#" + searchcondition).show();
            $("#" + selectid + " option").each(function (i, obj) {
                var value = $(obj).attr("value");
                if (value.indexOf("🀄︎") != -1) {
                    $(obj).html("标题-");
                    $(obj).val("🀄︎:");
                } else if (value.indexOf("🀀") != -1) {
                    $(obj).html("媒体名称-");
                    $(obj).val("🀀:");
                } else if (value.indexOf("🀁") != -1) {
                    $(obj).html("特征词-");
                    $(obj).val("🀁:");
                }
            });
        })
        $("#" + searchinputid).on("input", function (e) {
            var tvalue = $("#" + searchinputid).val();
            $("#" + selectid + " option").each(function (i, obj) {
                var value = $(obj).attr("value");
                if (value.indexOf("🀄︎") != -1) {
                    $(obj).html("标题-" + tvalue);
                    $(obj).val("🀄︎:" + tvalue);
                } else if (value.indexOf("🀀") != -1) {
                    $(obj).html("媒体名称-" + tvalue);
                    $(obj).val("🀀:" + tvalue);
                } else if (value.indexOf("🀁") != -1) {
                    $(obj).html("特征词-" + tvalue);
                    $(obj).val("🀁:" + tvalue);
                }
            });
        })
    }
}
