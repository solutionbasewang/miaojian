var report={
    orgchange:function (obj) {
        var orgid = $(obj).val();
        select_bind.fenleiselect_1(orgid, "fenleiselect",function () {
            var clsid=$("#fenleiselect").val();
            select_bind.selectbg("bglist",orgid,undefined,"report.getmbfl");
        });
    },
    fenleichange:function (obj) {
        var orgid = $("#orglist").val();
        var clsid=$(obj).val();
        select_bind.selectbg("bglist","",orgid,clsid,undefined);
    },
    tag_click:function (obj) {
        $('.news_cz div[name="tag"]').attr('class','tag_css_stop');
        $('.news_cz div[name="tag"]').attr('flag','0');
        $(obj).attr("class","tag_css");
        $(obj).attr("flag","1");
    },
    select:function (page) {
        
    },
    getcondition:function (cfids) {
        var param={
            Orgid:$("#orglist").val()
        };
        if($("#datetype").val()=="1"){
            param.IsContextTime=true;
        }
        else {
            param.IsContextTime=false;
        }
        param.StartTime=$("#btime").val();
        param.StopTime=$("#etime").val();
        param.ClassificationId=cfids;
        var types = $("div[name='tag']");
        $.each(types,function (i,o) {
            if($(o).attr("flag")=="1"){
                param.Type=$(o).attr("v");
            }
        })

        return param;
    },
    getmbfl:function (obj) {
        var mbid=$(obj).attr("mbid");
        $(obj).parent().find("li").each(function (i,o) {
            $(o).attr("state","0");
            $(o).find("ul").eq(0).remove();
            $($(o).find("button").eq(0)).attr("disabled","disabled");
        })
        $(obj).attr("state","1");
        $(obj).find("button").eq(0).removeAttr("disabled",false);
        $(obj).find("ul").eq(0).remove();
        var flagmb=null;
        var mbs = tool.localStorageTool.getLocalStorage("mb")
        mbs = JSON.parse(mbs);
        $.each(mbs,function (i,o) {
            if(mbid==o.Id){
                flagmb=o;
                return;
            }
        })
        if(flagmb==null){
            alert("aa");
        }
        var mbfl=flagmb.TemplateClassifications;
        var mbflhtml="<ul>";
        $(mbfl).each(function (i,o) {
            mbflhtml+="<li id='"+o.id+"'>"+o.name+"</li>";
        })
        mbflhtml+="</ul>"
        $(obj).append(mbflhtml);
        report.getlsbg(mbid);
    },
    getlsbg:function (mbid) {
        $("#lsbg").html("");
        var param={
            Orgid:$("#orglist").val(),
            TemplateId:mbid
        }
        var url =document.urlmanager.base.url +"/report/query/1/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            var list = data.data.Items;
            $.each(list,function (i,o) {
                $("#lsbg").append("<li class='fenleili' select='0' mbid='"+o.Id+"' onclick='"+onclick+"(this)'>"+o.createtime.replace('T',' ')+"<a href='#' style='float: right;'>"+o.title+"</a></li>")
            })
        })
    },
    getclsid:function(){
        var obj=[];
        var mbid="";
        var flagmb=null;
        $("#bglist").find("li").each(function (i,o) {
            if($(o).attr("state")=="1"){
                mbid=$(o).attr("mbid");
                return;
            }
        })

        var mbs = tool.localStorageTool.getLocalStorage("mb")
        mbs = JSON.parse(mbs);
        $.each(mbs,function (i,o) {
            if(mbid==o.Id){
                flagmb=o;
                return;
            }
        })
        if(flagmb==null){
            alert("请选择报告模板");
            return;
        }
        var tcfs=flagmb.TemplateClassifications;
        $.each(tcfs,function (i,o) {
            var tt={
                id:o.id,
                name:o.name,
                clsid:[]
            };
            $.each(o.classifications,function (ii,oo) {
                tt.clsid.push(oo.id);
            })
            obj.push(tt);
        })
        return obj;
    },
    getnews:function () {
        $("#table_newslist").html("");
        var mb_cls=report.getclsid();
        $.each(mb_cls,function (i,o) {
            var param = report.getcondition(o.id);
            // console.log(JSON.stringify(param));
            report.getnewsbybgfl(param,o);
        })
    },
    getnewsbybgfl:function (param,o) {
        var tid="t"+o.id;
        var html="<div tid=g"+o.id+" style='width:100%;'>";
        html+="<div class='table_mbtitle'>"+o.name+"&nbsp;&nbsp;<p class='fa fa-refresh' onclick=report.refresh('"+tid+"')></p></div>";
        html+="<div id='"+tid+"' class='table_news'></div></div>";
        $("#table_newslist").append(html);
        var url =document.urlmanager.base.url +"/report/allocation/query/1/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            tool.localStorageTool.setLocalStorage(tid,JSON.stringify(o));
            console.log(JSON.stringify(data));
            var list = data.data.Items;
            if(list.length==0){
                var temp="<div style='width:100%;text-align: center;'>没有数据</div>";
                $("#"+tid).append(temp);
                return;
            }
            $.each(list,function (i,o) {
                var flag="";
                if(i==0){
                    flag="frist";
                }
                else if(i==list.length-1){
                    flag="last";
                }
                $.each(o.Items,function (ii,oo) {
                    $.each(oo.Contexts,function (iii,ooo) {
                        // $.each(ooo.Items,function (iiii,oooo) {
                        //     var htmlnews="<div style='width:100%;'>";
                        //     htmlnews+="<div style='width:30%'><input type='checkbox' raloid='"+o.Id+"' groupid='"+oooo.Id+"' cid='"+oooo.Context.Id+"' value=''/>&nbsp;"+tool.stringtool.substr(oooo.Context.Title, 20)+"</div>";
                        //     htmlnews+="<div style='width:10%'>"+tool.stringtool.substr(oooo.Context.MediaName,20)+"</div>";
                        //     htmlnews+="<div style='width:15%'>"+oooo.Context.CreateTime.replace("T"," ")+"</div>";
                        //     htmlnews+="<div style='width:30%'>"+tool.stringtool.substr(oooo.Context.Keywords,20)+"</div>";
                        //     htmlnews+="<div style='width:15%' flag='"+flag+"'><p class='fa fa-arrow-up' style='cursor: pointer' onclick=report.newsup(this,'"+o.Id+"','"+tid+"')></p> <p class='fa fa-arrow-down' style='cursor: pointer' onclick=report.newsdown(this,'"+o.Id+"','"+tid+"')></p></div>";
                        //     htmlnews+="</div>";
                        //     $("#"+tid).append(htmlnews);
                        // })
                            var htmlnews="<div style='width:100%;'>";
                            htmlnews+="<div style='width:30%'><input type='checkbox' raloid='"+o.Id+"' groupid='"+ooo.Id+"' cid='"+ooo.Id+"' value=''/>&nbsp;"+tool.stringtool.substr(ooo.Title, 20)+"</div>";
                            htmlnews+="<div style='width:10%'>"+tool.stringtool.substr(ooo.MediaName,20)+"</div>";
                            htmlnews+="<div style='width:15%'>"+ooo.CreateTime.replace("T"," ")+"</div>";
                            htmlnews+="<div style='width:30%'>"+tool.stringtool.substr(ooo.Keywords,20)+"</div>";
                            htmlnews+="<div style='width:15%' flag='"+flag+"'><p class='fa fa-arrow-up' style='cursor: pointer' onclick=report.newsup(this,'"+o.Id+"','"+tid+"')></p> <p class='fa fa-arrow-down' style='cursor: pointer' onclick=report.newsdown(this,'"+o.Id+"','"+tid+"')></p></div>";
                            htmlnews+="</div>";
                            $("#"+tid).append(htmlnews);
                    })
                })
            })
        })
    },
    refresh:function(tid){
        $("#"+tid).html("");
        var templocal = tool.localStorageTool.getLocalStorage(tid);
        var local=JSON.parse(templocal);
        var param = report.getcondition(local.id);
        var url =document.urlmanager.base.url +"/report/allocation/query/1/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            var list = data.data.Items;
            if(list.length==0){
                var temp="<div style='width:100%;text-align: center;'>没有数据</div>";
                $("#"+tid).append(temp);
                return;
            }
            $.each(list,function (i,o) {
                var flag="";
                if(i==0){
                    flag="frist";
                }
                else if(i==list.length-1){
                    flag="last";
                }
                $.each(o.Items,function (ii,oo) {
                    $.each(oo.Contexts,function (iii,ooo) {
                        var htmlnews="<div style='width:100%;'>";
                        htmlnews+="<div style='width:30%'><input type='checkbox' raloid='"+o.Id+"' groupid='"+ooo.Id+"' cid='"+ooo.Id+"' value=''/>&nbsp;"+tool.stringtool.substr(ooo.Title, 20)+"</div>";
                        htmlnews+="<div style='width:10%'>"+tool.stringtool.substr(ooo.MediaName,20)+"</div>";
                        htmlnews+="<div style='width:15%'>"+ooo.CreateTime.replace("T"," ")+"</div>";
                        htmlnews+="<div style='width:30%'>"+tool.stringtool.substr(ooo.Keywords,20)+"</div>";
                        htmlnews+="<div style='width:15%' flag='"+flag+"'><p class='fa fa-arrow-up' style='cursor: pointer' onclick=report.newsup(this,'"+o.Id+"','"+tid+"')></p> <p class='fa fa-arrow-down' style='cursor: pointer' onclick=report.newsdown(this,'"+o.Id+"','"+tid+"')></p></div>";
                        htmlnews+="</div>";
                        $("#"+tid).append(htmlnews);
                    })
                })
            })
        })
        console.log(param);
    },
    bgbuild:function (bgid) {
        $("#report_name").val("");
        $("#bgid").val(bgid);
        $("#report_name_modal").modal("show");
    },
    bgsave:function(){
        var param = {
            organization:{
                id:$("#orglist").val()
            },
            template:{
                Id:$("#bgid").val()
            },
            items:[],
            name:$("#report_name").val(),
            type:$("#bgtype").val()
        }
        var groups= $(".table_news");
        $.each(groups,function (i,o) {
            var records = $(o).children("div");
            $.each(records,function (ii,oo) {
                var field1 = $(oo).children("div").eq(0);
                var checkbox =$(field1).find("input").eq(0)
                if($(checkbox).prop('checked')) {
                    var obj={Id:$(checkbox).attr("raloid")};
                    param.items.push(obj);
                    // console.log($(checkbox).attr("raloid"));
                }
            })
        })
        console.log(JSON.stringify(param));
        $("#report_name_modal").modal("hide");
    },
    newsup:function (obj,id,tid) {
        var flag = $(obj).parent().attr("flag");
        if(flag=="frist"){
            alert("不可移动");
            return;
        }
        var url =document.urlmanager.base.url +"/report/allocation/up/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            var result = data;
            if(result.res==0){
                report.refresh(tid);
            }
        })
    },
    newsdown:function (obj,id,tid) {
        var flag = $(obj).parent().attr("flag");
        if(flag=="last"){
            alert("不可移动");
            return;
        }
        var url =document.urlmanager.base.url +"/report/allocation/down/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            var result = data;
            if(result.res==0){
                report.refresh(tid);
            }
        })
    }
}