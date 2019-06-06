var lsreport={
    loadreport:function (page) {
        var pagesize=20;
        var param = lsreport.getcondition();
        if(param.StartTime==""){
            alert("选择开始时间")
            return;
        }
        if(param.StopTime==""){
            alert("选择结束时间")
            return;
        }
        if(param.TemplateId==""||param.TemplateId==undefined){
            alert("选择模板");
            return;
        }
        console.log(JSON.stringify(param));
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." })
        var url=document.urlmanager.base.url + "/report/query/" + page + "/"+pagesize;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            $("#table_newslist").html("");
            if (data.res != "0") {
                alert("系统错误");
            } else {
                var items = data.data.Items;
                $.each(items,function (i,o) {
                    var html="<div class='report'>";
                    if(o.type==0){
                    html+="<div class='report_title'><p class='fa fa-file-word-o' style='color: #63B8FF;'></p></div>";
                    }
                    else if(o.type==1)
                    {
                        html+="<div class='report_title'><p class='fa fa-file-excel-o' style='color: #66CD00;'></p></div>";
                    }
                    else if(o.type==2)
                    {
                        html+="<div class='report_title'><p class='fa fa-file-pdf-o' style='color: #CD2626;'></p></div>";
                    }
                    html+="<div class='report_boby'>"+o.title+"</div>";
                    html+="<div class='report_foot'>"+o.createtime.replace("T"," ")+"<span class='glyphicon glyphicon-download-alt' style='cursor: point;' onclick=lsreport.download('"+o.path+"')></span></div>";
                    html+="</div>";
                    $("#table_newslist").append(html);
                })
                tool.paper("page", page, Math.ceil(data.data.Total / pagesize), pagesize, function (page) {
                    lsreport.loadreport(page);
                });
            }
            $.bootstrapLoading.end();
        })
    },
    selectmbid:function (obj) {
        $("#bglist").find("li").each(function (i,o) {
            $(o).attr("class","fenleili");
        })
        if($(obj).attr("class")=="fenleili") {
            $(obj).attr("class", "fenleiliselect");
        }
        else if($(obj).attr("class")=="fenleiliselect") {
            $(obj).attr("class", "fenleili");
        }
    },
    getcondition:function () {
        var param={
            Orgid:$("#orglist").val()
        };
        param.StartTime=$("#btime").val();
        param.StopTime=$("#etime").val();
        var tmid="";
        $("#bglist").find("li").each(function (i,o) {
            if($(o).attr("class")=="fenleiliselect")
            {
                tmid=$(o).attr("mbid");
                return;
            }
        })
        if(tmid!="")
        {
            param.TemplateId=tmid;
        }
        if($("#report_name").val()!=""){
            param.ReportName=$("#report_name").val();
        }

        return param;
    },
    download:function (url) {
        try{
            if(url==""){
                alert("无法找到下载文件");
                return;
            }
            var elemIF = document.createElement("iframe");
            elemIF.src = url;
            elemIF.style.display = "none";
            document.body.appendChild(elemIF);
        }catch(e){

        }
    },
    orglistchange:function () {
        var orgid=$("#orglist").val();
        select_bind.selectbg1("bglist",orgid,undefined,"lsreport.selectmbid");
    }
}