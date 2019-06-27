var news = {
    pxselect:function(obj){
        // var pagesize=20;
        // var param = news.getcondition();
        var ps= $("#news_list_title").find("p");
        $.each(ps,function (i,o) {
            $(o).attr("state",0);
        })
        $(obj).attr("state","1");
        // var orderby={};
        // var objs="orderby."+key+"="+$(obj).attr("sort");
        // eval(objs);
        if($(obj).attr("sort")=="Asc") {
            $(obj).attr("sort", "Desc")
        }
        else {
            $(obj).attr("sort", "Asc")
        }
        // param.OrderBys=orderby;
        // console.log(param);
        news.loadnews(1);

    },
    hbxs: function () {
        //合并相似
        alert("选择新闻纪录合并新闻");
    },
    chaijie:function(){
        var oldzhankaidiv = $("#zhankaidivid").val();
        if(oldzhankaidiv==""){
            alert("请选择要拆分的新闻");
            return;
        }
        var ids = oldzhankaidiv.split(',');
        var cids=[];
        var ns=$("#"+ids[0]);
        var checks = ns.find("input");
        $.each(checks,function (i,o) {
            if($(o).is(':checked')){
                cids.push($(o).attr("cid"));
            }
        })
        if(cids.length==0){
            alert("请选择要拆分的新闻");
            return false;
        }
        var url =  document.urlmanager.base.url +"/context/group/separate/"+ids[1];
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, cids, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            }else {
                alert("拆分成功");
                news.loadnews(1);
            }
        })
        console.log(cids.length);
    },
    comm_exit_baogao:function(type){
        var contextids=news.find_checknew_contextid_bgid(type);
        var orgid=$("#orglist").val();
        var url=document.urlmanager.base.url +"/report/leave/"+orgid;
        $.bootstrapLoading.start({ loadingTips: "操作提交中，请稍候..." })
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, contextids, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                // $(obj).attr("class","tag_a_nodo");
                $.each(contextids,function (i,o) {
                    if(type==1) {
                        $("#j" + o.value).attr("class", "tag_a_nodo");
                        $("#jj" + o.value).attr("class", "tag_a_nodo");
                        $("#c"+o.value).attr("jbid", "null");
                    }
                    else {
                        $("#r" + o.value).attr("class", "tag_a_nodo");
                        $("#rr" + o.value).attr("class", "tag_a_nodo");
                        $("#c"+o.value).attr("rbid", "null");
                    }
                })

            }
            $.bootstrapLoading.end();

        })
    },
    comm_baogao:function(groupid,type,obj){

        var orgid=$("#orglist").val();
        var userid=init.get.userinfo().data.userinfo.userid
        var url = document.urlmanager.base.url;
        if(type=="1"){
            //简报
            url+="/report/clips/join/"+orgid+"/"+userid+"/"+groupid;
        }
        else if(type=="2")
        {
            //日报
            url+="/report/day/join/"+orgid+"/"+userid+"/"+groupid;
        }
        $.bootstrapLoading.start({ loadingTips: "操作提交中，请稍候..." })
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {

                // news.loadnews(1);
                if(type=="1"){
                    $("#c"+groupid).attr("jbid",data.data);
                    $("#cc"+groupid).attr("jbid",data.data);
                    if($(obj).attr("class")=="tag_a_nodo") {
                        $(obj).attr("class", "tag_a");
                    }
                    else {
                        $(obj).attr("class", "tag_a_nodo");
                    }
                }
                else if(type=="2")
                {
                    $("#c"+groupid).attr("rbid",data.data);
                    $("#cc"+groupid).attr("rbid",data.data);
                    if($(obj).attr("class")=="tag_a_nodo") {
                        $(obj).attr("class", "tag_a");
                    }
                    else {
                        $(obj).attr("class", "tag_a_nodo");
                    }
                }
                $.bootstrapLoading.end();
            }
        })

    },
    comm_baogao_all:function(type){
        // var type=$("#bgtype_all").val();
        var url=document.urlmanager.base.url;
        var orgid=$("#orglist").val();
        var userid=init.get.userinfo().data.userinfo.userid
        var list = news.find_checknew_contextid();
        if(list.length==0){
            alert("请选择新闻");
            return;
        }
        if(type=="1"){
            //简报
            url+="/report/clips/join/"+orgid+"/"+userid;
        }
        else if(type=="2")
        {
            //日报
            url+="/report/day/join/"+orgid+"/"+userid;
        }
        $.bootstrapLoading.start({ loadingTips: "操作提交中，请稍候..." })
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, list, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                // news.loadnews(1);
                $.each(list,function (i,o) {
                    $("#"+o).attr("")
                    if(type=="1"){
                        if($("#j"+o).attr("class")=="tag_a_nodo") {
                            $("#j"+o).attr("class", "tag_a");
                            $("#jj"+o).attr("class", "tag_a");
                        }
                        else {
                            $("#j"+o).attr("class", "tag_a_nodo");
                            $("#jj"+o).attr("class", "tag_a_nodo");
                        }
                    }
                    else if(type=="2")
                    {
                        if($("#r"+o).attr("class")=="tag_a_nodo") {
                            $("#r"+o).attr("class", "tag_a");
                            $("#rr"+o).attr("class", "tag_a");
                        }
                        else {
                            $("#r"+o).attr("class", "tag_a_nodo");
                            $("#rr"+o).attr("class", "tag_a_nodo");
                        }
                    }
                    $.bootstrapLoading.end();

                })
                $.each(data.data,function (ii,oo) {
                    if(type=="1") {
                        $("#c" + oo.Key).attr("jbid", oo.Value);
                        $("#cc" + oo.Key).attr("jbid", oo.Value);
                    }
                    else {
                        $("#c"+oo.Key).attr("rbid",oo.Value);
                        $("#cc"+oo.Key).attr("rbid",oo.Value);
                    }
                })
            }
        })
        $("#bg_timearea_all").modal("hide");
    },
    comm_qxbaogao:function(contextid,groupid,reportid,obj){
        var orgid=$("#orglist").val();
        var url = document.urlmanager.base.url + "/report/leave/"+orgid+"/"+contextid+"/"+reportid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                //alert("保存成功")
                // news.loadnews(1);
                $(obj).attr("class","tag_a_nodo");
            }

        })
    },
    comm_qxbaogao_all:function(){
        var orgid=$("#orglist").val();
        var url=document.urlmanager.base.url +"/report/leave/"+orgid;


    },
    joinjianbao: function (obj,e,cid,groupid) {

        news.comm_baogao(cid,"1",obj);

    },
    qxjianbao:function(groupid,contextid){
        confirm(function () {
            var url = document.urlmanager.base.url + "/context/group/leave/"+groupid+"/"+contextid;
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
                if (data.res >=-99&&data.res<0) {
                    alert(data.msg);
                }
                else if(data.res<-99){
                    alert("系统错误");
                }else {
                    news.loadnews(1);
                }
            })

        },null,"确定取消简报吗？");
    },
    joinjianbao_all:function(){
        news.comm_baogao_all("1");
    },
    joinribao: function (obj,e,id,groupid) {
        news.comm_baogao(id,"2",obj);
    },
    qxribao:function(groupid,contextid){
        confirm(function () {
            var url = document.urlmanager.base.url + "/context/group/leave/"+groupid+"/"+contextid;
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
                if (data.res >=-99&&data.res<0) {
                    alert(data.msg);
                }
                else if(data.res<-99){
                    alert("系统错误");
                }else {
                    news.loadnews(1);
                }
            })

        },null,"确定取消日报吗？");
    },
    joinribao_all:function(){
        news.comm_baogao_all("2");
        // var orgid= $("#orglist").val();
        // var list = news.find_checknew();
        // if(list.length==0){
        //     alert("请选择要加入日报的新闻");
        //     return;
        // }
        // confirm(function () {
        //     var url = document.urlmanager.base.url + "/context/group/join/dayreport/"+orgid;
        //     tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, list, true, function (data) {
        //         if (data.res != "0") {
        //             alert("系统错误");
        //         } else {
        //             news.loadnews(1);
        //         }
        //     })
        // },null,"确定将"+list.length+"条新闻加入日报吗？");
    },
    hebing:function(){
        if($("#news_xsd_select").val()=="0")
        {
            alert("当前查询结果不支持合并操作，请选择其他的相似度。")
            return false;
        }
        var orgid= $("#orglist").val();
        var url =  document.urlmanager.base.url +"/context/group/combine/"+orgid+"/0";
        var list  = news.find_checknew_group();
        if(list.length==0){
            alert("请选择你要合并的新闻");
            return;
        }
        console.log(list);
        confirm(function () {
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, list, true, function (data) {
                if (data.res >=-99&&data.res<0) {
                    alert(data.msg);
                }
                else if(data.res<-99){
                    alert("系统错误");
                }else {
                    alert("合并成功");
                    var pagenum = $("#pagenum").val();
                    news.loadnews(pagenum);
                }
            })
        },null,"确定将"+list.length+"条新闻进行合并吗？");

    },
    fuzhi_show:function(){
        var groupids = news.find_checknew_group();
        if(groupids.length==0){
            alert("请选择要复制的新闻")
            return;
        }
        if($("#news_xsd_select").val()=="0")
        {
            alert("当前查询结果不支持合并操作，请选择其他的相似度。")
            return;
        }
        $("#news_fuzhi").modal("show");
    },
    fuzhi:function(){
        var groupids = news.find_checknew_group();
        if(groupids.length==0){
            return;
        }
        var param ={
            clsId:$("#fuzhi_fenlist").val(),
            orgId:$("#fuzhi_jglist").val(),
            groupids:groupids,
            userid:init.get.userinfo().data.userinfo.userid
        }
        if(param.userid==null){
            alert("登录凭证失效，请重新登录");
            return;
        }
        if(param.clsId==""||param.clsId=="0")
        {
            alert("请选择分类")
            return;
        }
        if(param.orgId==""||param.orgId=="0")
        {
            alert("请选择机构")
            return;
        }
        if($("#o_type").val()=="1") {
            var url = document.urlmanager.base.url + "/context/allocation/true";
        }
        else {
            var url = document.urlmanager.base.url + "/context/allocation/false";
        }
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {

            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            }
            else {
                alert("复制成功");
                var pagenum = $("#pagenum").val();
                news.loadnews(pagenum);
            }
            $.bootstrapLoading.end();

        });
    },
    joinfanyi: function (obj,event,contextid,orderstate1,orderid) {
        event.stopPropagation();
        var orderstate = $(obj).attr("fystate");
        var url = document.urlmanager.base.url;
        $.bootstrapLoading.start({ loadingTips: "操作提交中，请稍候..." })
        if(orderstate==0){
            url+="/order/apply";
            var param = {
                Id:0,
                Executor:{},

                Sponsor:{
                    id:init.get.userinfo().data.userinfo.userid
                },
                Type:0,
                Status:0,
                Remark:"翻译此文章",

                Items:[
                    {
                        Context:{
                            Id:contextid
                        },
                        Operator:{
                            Id:init.get.userinfo().data.userinfo.userid
                        },
                        Title:"Title",
                        Data:"this is translate title",
                        ItemType:1,
                        IsPressing:false
                    }
                ]
            }
            console.log(JSON.stringify(param));
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
                $.bootstrapLoading.end();
                if (data.res != 0) {
                    alert("系统错误");
                } else {
                    // news.loadnews(1);
                    $(obj).attr("orderid",data.data.Id);
                    $("#orderid").val(data.data.Id);
                    $(obj).attr("class","tag_a_ytz");
                    $(obj).attr("fystate","2");
                }
            })

        }
        else if(orderstate==2){
            url+="/order/express/marking/"+contextid;
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
                $.bootstrapLoading.end();
                if (data.res != 0) {
                    alert("系统错误");
                } else {
                    // news.loadnews(1);
                    $(obj).attr("fystate","3");
                    $(obj).attr("class","tag_a_jj");
                }
            })
        }
        else if(orderstate==3){
            var param = new Array();
            param.push(orderid);
            url+="/order/delete";
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
                $.bootstrapLoading.end();
                if (data.res != 0) {
                    alert("系统错误");
                } else {
                    $(obj).attr("fystate","0");
                    $(obj).attr("class","tag_a_nodo");
                }
            })
        }
        else if(orderstate==5){
            alert("翻译中不可更改");
            $.bootstrapLoading.end();
        }
        else if(orderstate==1){
            alert("该新闻已经翻译完成，不能再发起翻译申请");
            $.bootstrapLoading.end();
            // url+="/order/status/change/"+orderid+"/2";
            // tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            //     $.bootstrapLoading.end();
            //     if (data.res != 0) {
            //         alert("系统错误");
            //     } else {
            //         //news.loadnews(1);
            //         $(obj).attr("class","tag_a_ywc");
            //     }
            // })
        }
        // var url = document.urlmanager.base.url + "/order/apply";


    },
    joinfanyibatch:function() {
        var param =[];
        var contextids = news.find_checknew_contextid();
        if(contextids.length==0){
            alert("请选择要翻译的新闻");
            return false;
        }
        var url = document.urlmanager.base.url+"/order/batch/apply";

        $.each(contextids,function (i,o) {
            param.push({
                Id:0,
                Executor:{},

                Sponsor:{
                    id:init.get.userinfo().data.userinfo.userid
                },
                Type:0,
                Status:0,
                Remark:"翻译此文章",

                Items:[
                    {
                        Context:{
                            Id:o
                        },
                        Operator:{
                            Id:init.get.userinfo().data.userinfo.userid
                        },
                        Title:"Title",
                        Data:"this is translate title",
                        ItemType:1,
                        IsPressing:false
                    }
                ]
            })
        })
        $.bootstrapLoading.start({ loadingTips: "操作提交中，请稍候..." })
        console.log(JSON.stringify(param));
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {

            console.log(data);
            if (data.res != 0) {
                alert("系统错误");
            } else {
                // news.loadnews(1);
                var f = JSON.stringify(data);
                $.each(contextids,function (i,o) {

                    // var temp = eval('data.'+o);
                    f = f.replace(o,'f'+o);

                })
                var temp = JSON.parse(f);
                // console.log(temp);
                $.each(contextids,function (i,o) {
                    var s = eval('temp.data.f'+o);
                    //console.log(s);
                    if(s.Value==2){
                        $("#f"+o).attr("class","tag_a_ytz");
                        $("#ff"+o).attr("class","tag_a_ytz");
                    }
                    else if(s.Value==3)
                    {
                        $("#f"+o).attr("class","tag_a_jj");
                        $("#ff"+o).attr("class","tag_a_jj");
                    }
                })


            }
            $.bootstrapLoading.end();
        })

    },
    record_jianbao: function (obj,e,id,groupid,bgid) {
        event.stopPropagation();
        if ($(obj).attr("jtype") == "0") {
            // $(obj).attr("class", "do_jianbao_tag");
            // $(obj).attr("jtype", "1");
            news.joinjianbao(obj,e,id,groupid);

        } else {
            // $(obj).attr("class", "jianbao_tag");
            // $(obj).attr("jtype", "0");
            news.comm_qxbaogao(id,groupid,bgid);
        }
    },
    record_ribao: function (obj,e,id,groupid,bgid) {
        event.stopPropagation();
        if ($(obj).attr("rtype") == "0") {
            // $(obj).attr("class", "do_ribao_tag");
            // $(obj).attr("rtype", "1");
            news.joinribao(obj,e,id,groupid);
        } else {
            // $(obj).attr("class", "ribao_tag");
            // $(obj).attr("rtype", "0");
            news.comm_qxbaogao(id,groupid,bgid,obj);
        }
    },
    dele: function (id,obj) {
        event.stopPropagation();
        var clis="";
        $("#fenleilist div").each(function (i,obj) {
            if($(obj).attr("select")=="1")
            {
                clis=$(obj).attr("clsid");
                return;
            }
        })
        var orgid=$("#orglist").val();
        confirm(function () {
            var url="";
            if(clis!="") {
                url = document.urlmanager.base.url + "/context/delete/" + orgid + "/" + clis;
            }
            var cids = [];
            cids.push(id);
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, cids, true, function (data) {
                if (data.res != 0) {
                    alert(data.msg);
                } else {
                    alert("删除成功");
                    // news.loadnews(1);
                    $(obj).parent().parent().parent().remove();
                }
            })

        },null,"确定删除新闻吗？");
    },
    dele_all: function () {
        var list = news.find_checknew_contextid();
        if(list.length==0){
            alert("请选择要删除的新闻");
            return;
        }
        var clis="";
        $("#fenleilist div").each(function (i,obj) {
            if($(obj).attr("select")=="1")
            {
                clis=$(obj).attr("clsid");
                return;
            }
        })
        if(clis==""){
            alert("请选择分类");
            return false;
        }
        var orgid=$("#orglist").val();
        confirm(function () {
            var url = document.urlmanager.base.url + "/context/delete/"+orgid+"/"+clis;
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, list, true, function (data) {
                if (data.res != 0) {
                    //alert("系统错误");
                    alert(data.msg);
                } else {
                    alert("删除成功");
                    // news.loadnews(1);
                    $.each(list,function (i,o) {
                        $("#j"+o).parent().parent().parent().remove();
                        $("#jj"+o).parent().parent().parent().remove();
                    })
                }
            })

        },null,"确定删除"+list.length+"条新闻吗？");
    },
    yulan: function (url) {
        $("#yulanurl").attr("src",url);
        $("#yulanmodel").modal("show");
    },
    zhankai:function(id,obj,pagenum,type) {
        var ds = $(obj).parent().parent().children("div");
        event.stopPropagation();
        var oldzhankaidiv=$("#zhankaidivid").val();
        if(oldzhankaidiv!=""){
            var ids = oldzhankaidiv.split(',');
            $("#"+ids[0]).remove();
            $("#"+ids[1]).attr("class","fa fa-sort-down");
        }
        if($(obj).attr("did")=="0") {
            $($(ds[1]).find("img")[0]).hide();
            $(obj).attr("class","fa fa-sort-up");
            var uuid=tool.uuid();
            var url=document.urlmanager.base.url+"/context/group/query/item/"+id+"/"+pagenum+"/10";
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
                if (data.res != "0") {
                    alert("系统错误");
                } else {
                    var html = "";
                    if(type==2){
                        html="<div id='" + uuid + "' style='padding-left: 2%;width:100%;'>"
                    }
                    else {
                        html="<div id='" + uuid + "' style='width:100%;'>"
                    }
                    $.each(data.data.Items, function (i, o) {
                        var centerwidth = $("#center").attr("widths");
                        var len=tool.percent_conversion_size(14,parseFloat(centerwidth),0.22);
                        html+="<div class='zhankainews' style='width:100%'>";
                        html+="<div style='width:3%;'><input type='checkbox' cid='"+o.Context.Id+"' value='"+o.Context.Id+"'></div>";
                        html+="<div name='cols' vv='col_title' title='"+o.Context.Title+"' style='width: 22%;' onclick=news.news_select('"+o.Context.Id+"','',this)>"+tool.stringtool.substr(news.news_qingxi(o.Context.Title), len)+"</div>";
                        html+="<div name='cols' vv='col_medianame' title='"+o.Context.MediaName+"' style='width: 15%;'>"+tool.stringtool.substr(news.news_qingxi(o.Context.MediaName), 4)+"</div>";
                        html+="<div style='width:15%;font-size:12px;' name='cols' vv='col_createtime' title='"+o.Context.CreateTime+"'>"+o.Context.CreateTime.replace("T", " ")+"</div>";
                        html+="<div style='width:10%;' name='cols' vv='col_keywords' title='"+o.Context.Keywords+"'>"+tool.stringtool.substr(news.news_qingxi(o.Context.Keywords), len)+"</div>";
                        html+="<div style='width:8%;' name='cols' vv='col_author'>"+(o.Context.Author==""?"-":o.Context.Author)+"</div>";
                        html+="<div style='width:5%;' name='cols' vv='col_relativity'>"+(o.Context.Relativity==-1?"敏感":"非敏感")+"</div>";
                        html+="<div style='width:8%;' name='colss' vv='col_xsd'>&nbsp;</div>";
                        html+="<div style='width:19%'>"+"<div class='form-inline tag_action'>";
                        html+="<a name='zhankai_x' id='s"+o.Id+"' name='shownews' value='"+o.Id+"' onclick=news.new_open('"+o.Context.Url+"') class='tag_a_nodo'><i class='fa fa-info-circle' aria-hidden='true' title='显示属性'></i></a>";
                        if(o.Context.ExistsBriefReport)
                        {
                            html+="<a id='j"+o.Context.Id+"'value='"+o.Context.Id+"' onclick=news.record_jianbao(this,event,'"+o.Context.Id+"','"+o.Context.Id+"','"+o.Context.BriefReportGroupId+"') jtype='1' class='tag_a'><i class='fa fa-file-text-o' aria-hidden='true' title='已做简报'></i></a>";
                            // html+="<div id='j"+obj.groupid+"' class='do_jianbao_tag' value='"+newst.Id+"' onclick=news.record_jianbao(this,event,'"+newst.Id+"','"+obj.groupid+"','"+newst.BriefReportGroupId+"') jtype='1'>简</div>";
                        }
                        else {
                            // html+="<div id='j"+obj.groupid+"' class='jianbao_tag' value='"+newst.Id+"' onclick=news.record_jianbao(this,event,'"+newst.Id+"','"+obj.groupid+"') jtype='0'>简</div>";
                            html+="<a id='j"+o.Context.Id+"'value='"+o.Context.Id+"' onclick=news.record_jianbao(this,event,'"+o.Context.Id+"','"+o.Context.Id+"','"+o.Context.BriefReportGroupId+"') jtype='0' class='tag_a_nodo'><i class='fa fa-file-text-o' aria-hidden='true' title='加入简报'></i></a>";

                        }
                        if(o.Context.ExistsDayReport)
                        {
                            html+="<a id='r"+o.Context.Id+"' class='tag_a' value='"+o.Context.Id+"' onclick=news.record_ribao(this,event,'"+o.Context.Id+"','"+o.Context.Id+"','"+o.Context.DayReportGroupId+"') rtype='1'><i class='fa fa-sun-o' aria-hidden='true' title='已做日报'></i></a>";
                        }
                        else {
                            html+="<a id='r"+o.Context.Id+"' class='tag_a_nodo' value='"+o.Context.Id+"' onclick=news.record_ribao(this,event,'"+o.Context.Id+"','"+o.Context.Id+"','"+o.Context.DayReportGroupId+"') rtype='0'><i class='fa fa-sun-o' aria-hidden='true' title='加入日报'></i></a>";
                        }
                        if(o.Context.TranslateStatus==0){
                            html+="<a class='tag_a_nodo' fystate='"+o.Context.TranslateStatus+"' value='"+o.Context.Id+"' onclick=news.joinfanyi(this,event,'"+o.Context.Id+"',"+o.Context.TranslateStatus+",'"+o.Context.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='申请翻译'></i></a>";
                        }
                        else if(o.Context.TranslateStatus==2) {
                            html+="<a class='tag_a_ytz' fystate='"+o.Context.TranslateStatus+"' value='"+o.Context.Id+"' onclick=news.joinfanyi(this,event,'"+o.Context.Id+"',"+o.Context.TranslateStatus+",'"+o.Context.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='已通知'></i></a>";
                            // html+="<div class='ytz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>译</div>";
                        }
                        else if(o.Context.TranslateStatus==3) {
                            html+="<a class='tag_a_jj' fystate='"+o.Context.TranslateStatus+"' value='"+o.Context.Id+"' onclick=news.joinfanyi(this,event,'"+o.Context.Id+"',"+o.Context.TranslateStatus+",'"+o.Context.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='紧急'></i></a>";
                            // html+="<div class='jz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>译</div>";
                        }
                        else if(o.Context.TranslateStatus==5) {
                            html+="<a class='tag_a_fyz' fystate='"+o.Context.TranslateStatus+"' value='"+o.Context.Id+"' onclick=news.joinfanyi(this,event,'"+o.Context.Id+"',"+o.Context.TranslateStatus+",'"+o.Context.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='已通知'></i></a>";

                            // html+="<div class='fyz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>中</div>";
                        }
                        else if(o.Context.TranslateStatus==1) {
                            html+="<a class='tag_a_ywc' fystate='"+o.Context.TranslateStatus+"' value='"+o.Context.Id+"' onclick=news.joinfanyi(this,event,'"+o.Context.Id+"',"+o.Context.TranslateStatus+",'"+o.Context.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='翻译完成'></i></a>";
                        }

                        html+="<a onclick=news.dele('"+obj.groupid+"',this) class='tag_a_nodo'><p class='fa fa-trash-o' ></p></a>";
                        html+="</div></div></div>";
                    })
                    html+="</div>";
                    var div = $(obj).parent().parent();
                    $(div).after(html);
                    $(obj).attr("did", uuid);
                    $("#zhankaidivid").val(uuid+","+id);
                    news.new_showcol();
                }

            })
        }
        else {
            $($(ds[1]).find("img")[0]).show();
            $("#"+$(obj).attr("did")).remove();
            $(obj).attr("did","0");
            $(obj).attr("class","fa fa-sort-down");
        }
        

    },
    liulanmoshi: function () {
        alert("浏览模式功能开发中");
    },
    newfj:function(obj) {
        $("#downorup").html("0");
        //news.buildmousediv(news.find_checknew_group());

        //alert("up");
        var groupids = [];
        if($("#mousepanl").val()!=""){
            groupids.push($("#mousepanl").val());
        }
        if(groupids.length==0){
            return;
        }
        //
        var param ={
            clsId:$(obj).attr("clsid"),
            orgId:$("#orglist").val(),
            groupids:groupids,
            userid:init.get.userinfo().data.userinfo.userid

        }
        confirm(function () {
            var url = document.urlmanager.base.url + "/context/allocation";
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {

                if (data.res >=-99&&data.res<0) {
                    alert(data.msg);
                }
                else if(data.res<-99){
                    alert("系统错误");
                } else {
                    $("#mousepanl").val("");
                    //alert("分拣成功");
                    news.loadnews(1);
                }
                // $.bootstrapLoading.end();

            })

        },null,"确定要将"+groupids.length+"(条)新闻分拣吗？");

    },
    loadnews: function (page) {
        news.cleandata();
        $("#pagenum").val(page);
        var pagesize=20;
        var param = news.getcondition();
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." })
        var url="";
        var xsd="";
        $("#news_xsd span").each(function (i,o) {
            if($(o).attr("class")=="new_type_select")
            {
                xsd=$(o).attr("value");
                return false;
            }
        })
        if(xsd!="0") {
            url = document.urlmanager.base.url + "/context/group/query/" + page + "/"+pagesize;
        }
        else {
            url=document.urlmanager.base.url + "/context/query/list/" + page + "/"+pagesize;
        }
        $("#searchcondition").hide();
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                if(data.data!=null){
                var newdata = news.buildnews(data.data.Items);
                news.loadnews_simple(newdata);
                news.loadnews_xiangxi(newdata);
                tool.paper("page", page, Math.ceil(data.data.Total / pagesize), pagesize, function (page) {
                    news.loadnews(page);
                });
                news.loadnews_count(param);
                }
                else {
                    tool.paper("page", page, Math.ceil(0 / pagesize), pagesize, function (page) {
                        news.loadnews(page);
                    });
                }
                if(param.CombineType==undefined){
                    var cols = $("div[name='colss']");
                    $.each(cols,function (ii,oo) {

                        $(oo).hide();

                    })
                }
                else {
                    var cols = $("div[name='colss']");
                    $.each(cols,function (ii,oo) {

                        $(oo).show();

                    })
                }
            }
            $.bootstrapLoading.end();
        })
    },
    loadnews_simple:function(data){
        // console.log();
        var centerwidth = $("#center").attr("widths");
        console.log(parseFloat(centerwidth));
        var len = tool.percent_conversion_size(14,parseFloat(centerwidth),0.22);
        $("#table_newslist").html("");
        var xsd="";
        $("#news_xsd span").each(function (i,o) {
            if($(o).attr("class")=="new_type_select")
            {
                xsd=$(o).attr("value");
                return false;
            }
        })
        $.each(data, function (i, obj) {
            if(!tool.isEmpry(obj.master)) {
                var newst = obj.master.Context;
                var news_master = obj.master;
                var list = obj.list;
                var xsd=obj.Similarity;
                var html="";
                // if(newst.IsSofted){
                //     html = "<div selectstate='0' onmousedown=news.news_up('"+obj.groupid+"') class='table_news_yifenjian'>";
                // }
                // else{
                // html = "<div selectstate='0' onmousedown=news.news_up('"+obj.groupid+"') >";
                // }
                html = "<div selectstate='0' onmousedown=news.news_up('"+obj.groupid+"') >";
                if(newst.Relativity=="-1"){
                    if(newst.IsSofted){
                        html+="<div style='width:3%'><input id='c"+newst.Id+"' type='checkbox'  groupid='"+obj.groupid+"' value='"+newst.Id+"' jbid='"+newst.BriefReportGroupId+"' rbid='"+newst.DayReportGroupId+"'/></div><div name='cols' vv='col_title' title='"+news.news_qingxi(newst.Title)+"' style='width:22%;'><img src='../images/img1.png'/><span name='title_select' style='cursor: pointer;color: #7e94a5' onclick=news.news_select('"+newst.Id+"','"+obj.groupid+"',this)>" + tool.stringtool.substr(news.news_qingxi(newst.Title), len) +"</span><span style='background-color: #b52b27;color:#ffffff;width:20px;text-align: center;height: 20px;line-height: 20px;margin-right: 10%;'>敏</span><span style='color: #b52b27'></span></div>";
                    }
                    else {
                        html+="<div style='width:3%'><input id='c"+newst.Id+"' type='checkbox'  groupid='"+obj.groupid+"' value='"+newst.Id+"' jbid='"+newst.BriefReportGroupId+"' rbid='"+newst.DayReportGroupId+"'/></div><div name='cols' vv='col_title' title='"+news.news_qingxi(newst.Title)+"' style='width:22%;'><img src='../images/img1.png'/><span name='title_select' style='cursor: pointer;' onclick=news.news_select('"+newst.Id+"','"+obj.groupid+"',this)>" + tool.stringtool.substr(news.news_qingxi(newst.Title), len) +"</span><span style='background-color: #b52b27;color:#ffffff;width:20px;text-align: center;height: 20px;line-height: 20px;margin-right: 10%;'>敏</span><span style='color: #b52b27'></span></div>";

                    }
                }
                else {
                    if(newst.IsSofted) {
                        html+="<div style='width:3%'><input id='c"+newst.Id+"' type='checkbox'  groupid='"+obj.groupid+"' value='"+newst.Id+"' jbid='"+newst.BriefReportGroupId+"' rbid='"+newst.DayReportGroupId+"'/></div><div name='cols' vv='col_title' title='"+news.news_qingxi(newst.Title)+"' style='width:22%;'><img src='../images/img1.png'/><span name='title_select' style='cursor: pointer;color: #7e94a5' onclick=news.news_select('"+newst.Id+"','"+obj.groupid+"',this)>" + tool.stringtool.substr(news.news_qingxi(newst.Title), len) +"</span></div>";
                    }
                    else {
                        html+="<div style='width:3%'><input id='c"+newst.Id+"' type='checkbox'  groupid='"+obj.groupid+"' value='"+newst.Id+"' jbid='"+newst.BriefReportGroupId+"' rbid='"+newst.DayReportGroupId+"'/></div><div name='cols' vv='col_title' title='"+news.news_qingxi(newst.Title)+"' style='width:22%;'><img src='../images/img1.png'/><span name='title_select' style='cursor: pointer' onclick=news.news_select('"+newst.Id+"','"+obj.groupid+"',this)>" + tool.stringtool.substr(news.news_qingxi(newst.Title), len) +"</span></div>";

                    }
                }
                html+="<div style='width:15%' title='" + newst.MediaName + "' name='cols' vv='col_medianame'>"+(newst.MediaName==""?"-":tool.stringtool.substr(newst.MediaName, 8)) +"</div>";
                if(xsd=="0"){
                    html+="<div style='width:15%' name='cols' vv='col_createtime'>"+ news_master.Context.CreateTime.replace("T", " ") +"</div>";

                }
                else {
                    html+="<div style='width:15%' name='cols' vv='col_createtime'>"+ news_master.Context.CreateTime.replace("T", " ") +"</div>";

                }
                html+="<div style='width:10%' name='cols' vv='col_keywords'>"+ (newst.Keywords==""?"-":tool.stringtool.substr(newst.Keywords, 5)) +"</div>";
                html+="<div style='width:8%' name='cols' vv='col_author'>"+(newst.Author==""?"-":newst.Author)+"</div>";
                html+="<div style='width:5%' name='cols' vv='col_relativity'>"+(newst.Relativity==-1?"敏感":"非敏感") +"</div>";
                html+="<div style='width:8%' name='colss' vv='col_xsd'>"+ xsd +"<p class='fa fa-sort-down' id='"+obj.groupid+"' style='cursor: pointer' state='0' did='0' onclick=news.zhankai('"+obj.groupid+"',this,1,1)></p></div>";
                html+="<div style='width:19%'><div class='form-inline tag_action'>" +
                    "<a id='s"+obj.groupid+"' name='shownews' value='"+newst.Id+"'  onclick=news.new_open('"+newst.Url+"') class='tag_a_nodo'><i class='fa fa-info-circle' aria-hidden='true' title='显示属性'></i></a>";
                    // "<div id='s"+obj.groupid+"' class='jianbao_tag' name='shownews' value='"+newst.Id+"' onclick=news.news_select('"+newst.Id+"','',this)>显</div>";
                if(newst.GeneratedClipsReport)
                {
                    html+="<a id='j"+newst.Id+"'value='"+newst.Id+"' onclick=news.record_jianbao(this,event,'"+newst.Id+"','"+obj.groupid+"','"+newst.BriefReportGroupId+"') jtype='1' class='tag_a'><i class='fa fa-file-text-o' aria-hidden='true' title='已做简报'></i></a>";
                    // html+="<div id='j"+obj.groupid+"' class='do_jianbao_tag' value='"+newst.Id+"' onclick=news.record_jianbao(this,event,'"+newst.Id+"','"+obj.groupid+"','"+newst.BriefReportGroupId+"') jtype='1'>简</div>";
                }
                else {
                    // html+="<div id='j"+obj.groupid+"' class='jianbao_tag' value='"+newst.Id+"' onclick=news.record_jianbao(this,event,'"+newst.Id+"','"+obj.groupid+"') jtype='0'>简</div>";
                    html+="<a id='j"+newst.Id+"'value='"+newst.Id+"' onclick=news.record_jianbao(this,event,'"+newst.Id+"','"+obj.groupid+"','"+newst.BriefReportGroupId+"') jtype='0' class='tag_a_nodo'><i class='fa fa-file-text-o' aria-hidden='true' title='加入简报'></i></a>";

                }
                if(newst.GeneratedDayReport)
                {
                    html+="<a id='r"+newst.Id+"' class='tag_a' value='"+newst.Id+"' onclick=news.record_ribao(this,event,'"+newst.Id+"','"+obj.groupid+"','"+newst.DayReportGroupId+"') rtype='1'><i class='fa fa-sun-o' aria-hidden='true' title='已做日报'></i></a>";
                }
                else {
                    html+="<a id='r"+newst.Id+"' class='tag_a_nodo' value='"+newst.Id+"' onclick=news.record_ribao(this,event,'"+newst.Id+"','"+obj.groupid+"','"+newst.DayReportGroupId+"') rtype='0'><i class='fa fa-sun-o' aria-hidden='true' title='加入日报'></i></a>";
                }
                if(newst.TranslateStatus==0){
                    html+="<a id='f"+newst.Id+"' class='tag_a_nodo' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' orderid='"+newst.OrderId+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='申请翻译'></i></a>";
                }
                else if(newst.TranslateStatus==2) {
                    html+="<a id='f"+newst.Id+"' class='tag_a_ytz' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' orderid='"+newst.OrderId+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='已通知'></i></a>";
                    // html+="<div class='ytz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>译</div>";
                }
                else if(newst.TranslateStatus==3) {
                    html+="<a id='f"+newst.Id+"' class='tag_a_jj' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' orderid='"+newst.OrderId+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='紧急'></i></a>";
                    // html+="<div class='jz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>译</div>";
                }
                else if(newst.TranslateStatus==5) {
                    html+="<a id='f"+newst.Id+"' class='tag_a_fyz' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' orderid='"+newst.OrderId+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-circle-o-notch' aria-hidden='true' title='翻译中'></i></a>";

                    // html+="<div class='fyz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>中</div>";
                }
                else if(newst.TranslateStatus==1) {
                    html+="<a id='f"+newst.Id+"' class='tag_a_ywc' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' orderid='"+newst.OrderId+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='翻译完成'></i></a>";
                }

                html+="<a onclick=news.dele('"+newst.Id+"',this) class='tag_a_nodo'><p class='fa fa-trash-o' ></p></a>";
                html+="</div></div>";
                html += "</div>";
                $("#table_newslist").append(html);
            }

            // html += "<td  style='width:30%' title='" + news.Title + "'><input type='checkbox' groupid='"+obj.groupid+"' value='"+news.Id+"'/>&nbsp;&nbsp;" + tool.stringtool.substr(news.Title, len) + "</td>";
            // html += "<td style='width:10%' title='" + news.MediaName + "'>" + tool.stringtool.substr(news.MediaName, 4) + "</td>";
            // html += "<td style='width:15%'>" + news.PublishTime.replace("T", " ") + "</td>";
            // html += "<td style='width:15%' title='" + news.Keywords + "'>" + tool.stringtool.substr(news.Keywords, len) + "</td>";
            // html+="<td style='width:15%'><div class='form-inline tag_action'>";

            // html+="<div style='background-color:#ffb36e;border-radius:12px;line-height: 24px;height:24px;width:24px;color:white;text-align: center;float: left;cursor: pointer;' ><p class='fa fa-trash-o' onclick=news.dele('"+obj.groupid+"')></p></div>";
            // html += "</div><td style='width:15%'><a href='#' onclick=news.yulan('"+news.Url+"')>预览</a>&nbsp;&nbsp;<a href='#' flag='0' onclick=news.news_select('"+news.Id+"')>属性</a> &nbsp;&nbsp;<a href='#' flag='0' onclick=news.zhankai(this,"+i+","+list.length+",'"+news_master.Id+"','"+news_master.Id+"',this)>展开</a></td></tr>";
            //     $("#table_newslist tbody").append(html);
            // }
        });

        $("input[type='checkbox']").click(function(e){
            e.stopPropagation();
        });
        news.new_showcol();

        news.hightlight1("table_newslist");
    },
    loadnews_xiangxi:function(data){
        $("#xiangxi_list_table").html("");
        $.each(data, function (i, obj) {
            var newst = obj.master.Context;
            if(!tool.isEmpry(news)){
                var html="";
                html = "<div selectstate='0' onmousedown=news.news_up('"+obj.groupid+"')  class='xiangxi_list_item' style='width:100%;'>";

                html+="<div style='width:5%;' class='xiangxi_title'> <input type='checkbox' id='cc"+newst.Id+"' groupid='"+obj.groupid+"' value='"+newst.Id+"' jbid='"+newst.BriefReportGroupId+"' rbid='"+newst.DayReportGroupId+"'></div>";
                html+="<div style='width:95%;' class='xiangxi_body'>";
                if(newst.IsSofted){
                    if(newst.Relativity=="-1"){
                        html+="<div class='xiangxi_news_title' style='color:#7e94a5'><span name='title_select' onclick=news.news_select('"+newst.Id+"','"+obj.groupid+"',this)>"+newst.Title+"</span><span style='background-color: #b52b27;color:#ffffff;width:20px;text-align: center;height: 20px;line-height: 20px;'>敏</span><span style='color: #3d8b3d'>("+obj.Similarity+")</span> <p class='fa fa-sort-down' id='"+obj.groupid+"' style='cursor: pointer' state='0' did='0' onclick=news.zhankai('"+obj.groupid+"',this,1,2)></p></div>";
                    }
                    else {
                        html+="<div class='xiangxi_news_title' style='color:#7e94a5'><span name='title_select' onclick=news.news_select('"+newst.Id+"','"+obj.groupid+"',this)>"+newst.Title+"</span><span style='color: #3d8b3d'>("+obj.Similarity+")</span> <p class='fa fa-sort-down' id='"+obj.groupid+"' style='cursor: pointer' state='0' did='0' onclick=news.zhankai('"+obj.groupid+"',this,1,2)></p></div>";
                    }
                }
                else {
                    if(newst.Relativity=="-1") {
                        html+="<div class='xiangxi_news_title'><span onclick=news.news_select('"+newst.Id+"','"+obj.groupid+"',this)>"+newst.Title+"</span><span style='background-color: #b52b27;color:#ffffff;width:20px;text-align: center;height: 20px;line-height: 20px;'>敏</span><span style='color: #3d8b3d'>("+obj.Similarity+")</span> <p class='fa fa-sort-down' id='"+obj.groupid+"' style='cursor: pointer' state='0' did='0' onclick=news.zhankai('"+obj.groupid+"',this,1,2)></p></div>";

                    }
                    else {
                        html+="<div class='xiangxi_news_title'><span onclick=news.news_select('"+newst.Id+"','"+obj.groupid+"',this)>"+newst.Title+"</span><span style='color: #3d8b3d'>("+obj.Similarity+")</span> <p class='fa fa-sort-down' id='"+obj.groupid+"' style='cursor: pointer' state='0' did='0' onclick=news.zhankai('"+obj.groupid+"',this,1,2)></p></div>";

                    }

                }

                html+="<div class='xiangxi_news_twotitle' style='margin-top: 10px;'>";
                html+="<span>媒体："+newst.MediaName+"</span><span>新闻时间："+newst.CreateTime.replace("T", " ")+"</span><span>特征词："+newst.Keywords+"</span></div>";
                html+="<div class='xiangxi_news_body' style='margin-top: 5px;'>" + newst.Summary+"</div>";

                html+="<div class='xiangxi_news_operate' style='margin-top: 5px;'>";
                html+="<a id='ss"+obj.groupid+"' name='shownews' value='"+newst.Id+"' onclick=news.new_open('"+newst.Url+"') class='tag_a_nodo'><i class='fa fa-info-circle' aria-hidden='true' title='显示属性'></i></a>";
                //<div id='ss"+obj.groupid+"' class='do_jianbao_tag' value='"+newst.Id+"' onclick=news.news_select('"+newst.Id+"','',this)>显</div>
                if(newst.ExistsBriefReport)
                {
                    html+="<a id='jj"+newst.Id+"' class='tag_a' value='"+newst.Id+"' onclick=news.record_jianbao(this,event,'"+newst.Id+"','"+obj.groupid+"','"+newst.BriefReportGroupId+"') jtype='1'><i class='fa fa-file-text-o' aria-hidden='true' title='已做简报'></i></a>";
                }
                else {
                    html+="<a id='jj"+newst.Id+"' class='tag_a_nodo' value='"+newst.Id+"' onclick=news.record_jianbao(this,event,'"+newst.Id+"','"+obj.groupid+"') jtype='0'><i class='fa fa-file-text-o' aria-hidden='true' title='加入简报'></i></a>";
                }
                if(newst.ExistsDayReport)
                {
                    html+="<a id='rr"+newst.Id+"' class='tag_a' value='"+newst.Id+"' onclick=news.record_ribao(this,event,'"+newst.Id+"','"+obj.groupid+"','"+newst.DayReportGroupId+"') rtype='1'><i class='fa fa-sun-o' aria-hidden='true' title='已做日报'></i></a>";
                }
                else {
                    html+="<a id='rr"+newst.Id+"' class='tag_a_nodo' value='"+newst.Id+"' onclick=news.record_ribao(this,event,'"+newst.Id+"','"+obj.groupid+"') rtype='0'><i class='fa fa-sun-o' aria-hidden='true' title='加入日报'></i></a>";
                }
                if(newst.TranslateStatus==0){
                    html+="<a id='ff"+newst.Id+"' class='tag_a_nodo' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='申请翻译'></i></a>";
                }
                else if(newst.TranslateStatus==2) {
                    html+="<a id='ff"+newst.Id+"' class='tag_a_ytz' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='已通知'></i></a>";
                    // html+="<div class='ytz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>译</div>";
                }
                else if(newst.TranslateStatus==3) {
                    html+="<a id='ff"+newst.Id+"' class='tag_a_jj' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='紧急'></i></a>";
                    // html+="<div class='jz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>译</div>";
                }
                else if(newst.TranslateStatus==5) {
                    html+="<a id='ff"+newst.Id+"' class='tag_a_fyz' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='已通知'></i></a>";

                    // html+="<div class='fyz_tag' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'>中</div>";
                }
                else if(newst.TranslateStatus==1) {
                    html+="<a id='ff'"+newst.Id+" class='tag_a_ywc' fystate='"+newst.TranslateStatus+"' value='"+newst.Id+"' onclick=news.joinfanyi(this,event,'"+newst.Id+"',"+newst.TranslateStatus+",'"+newst.OrderId+"') rtype='1'><i class='fa fa-globe' aria-hidden='true' title='翻译完成'></i></a>";
                }
                html+="<a onclick=news.dele('"+newst.Id+"',this) class='tag_a_nodo'><p class='fa fa-trash-o' ></p></a>";
                html+="</div></div></div>";
            $("#xiangxi_list_table").append(html);
            }
        });

        $("input[type='checkbox']").click(function(e){
            e.stopPropagation();
        });
        news.hightlight1("xiangxi_list_table");
    },
    loadnews_count:function(param) {
        var xsd="";
        $("#news_xsd span").each(function (i,o) {
            if($(o).attr("class")=="new_type_select")
            {
                xsd=$(o).attr("value");
                return false;
            }
        })
        var url="";
        url=document.urlmanager.base.url + "/context/statistics/query";
        // if(xsd!="0") {
        //     url = document.urlmanager.base.url + "/context/group/statistics/query";
        // }
        // else {
        //     url=document.urlmanager.base.url + "/context/statistics/query";
        // }
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                var type=data.data.Statistics;
                var fj = data.data.Allocations;
                $("#news_count").html("全部("+(fj.未分拣+fj.已分拣)+ ")");
                $("#news_yfj").html("已分拣("+fj.已分拣+ ")");
                $("#news_wfj").html("未分拣("+fj.未分拣+ ")");
                var quanbu=type.平面+type.网络+type.微信+type.微博+type.论坛+type.贴吧+type.博客+type.问答+type.视频+type.广播+type.电视+type.App;
                $("#quanbu").html("全部("+quanbu+ ")");
                $("#pingming").html("平面("+type.平面+ ")");
                $("#wangluo").html("网络("+type.网络+ ")");
                $("#weixin").html("微信("+type.微信+ ")");
                $("#Weibo").html("微博("+type.微博+ ")");
                $("#BBS").html("论坛("+type.论坛+ ")");
                $("#TieBa").html("贴吧("+type.贴吧+ ")");
                $("#Blog").html("博客("+type.博客+ ")");
                $("#wenda").html("问答("+type.问答+ ")");
                if(type.视频==0){
                    $("#shipin").hide();
                }
                else {
                    $("#shipin").html("视频("+type.视频+ ")");
                    $("#shipin").show();
                }
                if(type.广播==0){
                    $("#guangbo").hide();
                }
                else {
                    $("#guangbo").html("广播("+type.广播+ ")");
                    $("#guangbo").show();
                }
                if(type.电视==0){
                    $("#dianshi").hide();
                }
                else {
                    $("#dianshi").html("电视("+type.电视+ ")");
                    $("#dianshi").show();
                }
                if(type.App==0){
                    $("#app").hide();
                }
                else {
                    $("#app").html("App("+type.App+ ")");
                    $("#app").show();
                }

            }

        })



        // var param = news.getcondition();
        // var url = document.urlmanager.base.url + "/context/group/statistics/query";
        // tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
        //     if (data.res != 0) {
        //         alert("系统错误");
        //     } else {
        //         var count = data.data;
        //         $("#news_count").html("全部(" + count.Total + ")");
        //         $("#news_yfj").html("已分拣(" + count.ProcessorNumber.已分拣 + ")");
        //         $("#news_wfj").html("未分拣(" + count.ProcessorNumber.未分拣 + ")");
        //         $("#News").html("News(" + count.SourceTypeNumber.News + ")");
        //         $("#BBS").html("BBS(" + count.SourceTypeNumber.Forum + ")");
        //         $("#TieBa").html("TieBa(" + count.SourceTypeNumber.TieBa + ")");
        //         $("#Blog").html("Blog(" + count.SourceTypeNumber.Blog + ")");
        //         $("#Weibo").html("Weibo(" + count.SourceTypeNumber.Weibo + ")");
        //
        //     }
        // })
    },
    readingmodeTransformation:function(obj){
        $("#mousepanl").html("");
        if(obj=="simple_model"){
            $("#"+obj).css("color","#4c8cc7");
            $("#xiangxi_model").css("color","#2d2d2d");
            $("#simple_list").show(1);
            $("#xiangxi_list").hide();
            $("#simple_model").attr("active","1");
            $("#xiangxi_model").attr("active","0");
        }
        else if(obj=="xiangxi_model")
        {
            $("#"+obj).css("color","#4c8cc7");
            $("#simple_model").css("color","#2d2d2d");
            $("#simple_list").hide();
            $("#xiangxi_list").show(1);
            $("#xiangxi_model").attr("active","1");
            $("#simple_model").attr("active","0");
        }
    },
    orglistchange: function () {
        var orgid = $("#orglist").val();
        select_bind.fenleiselect_new(orgid, "fenleilist",function () {
            news.getcolinfo();
            news.new_showcol();
            news.loadnews(1);
        });
        // news.getcolinfo();
    },
    buildnews: function (data) {
        var list = [];
        $.each(data, function (i, obj) {
            var record = {
                master: {},
                list: [],
                groupid:obj.Id,
                Similarity:obj.Similarity!=undefined?obj.Similarity:""
            };

            $.each(obj.Items, function (r, obj1) {
                if (obj1.Master) {
                    record.master = obj1;
                } else {
                    record.list.push(obj1);
                }

            })
            list.push(record);
        })
        var str =JSON.stringify(list);
        tool.localStorageTool.setLocalStorage("news",str);
        return list;
    },
    keyup_submit:function (e) {
        var evt = window.event || e;
        if (evt.keyCode == 13) {
            //alert("a");
            news.loadnews(1);
        }
    },
    getcondition:function () {
       var param={};
       var conditions =   $("#conditions div");
       var Keywords={};
       $(conditions).each(function (n,obj) {
           //alert(obj.title);
           var c = $(obj).attr("value");
           var clist = c.split(',');
           eval("Keywords."+clist[0]+"='"+clist[1]+"'");

       })
        param.Keywords = Keywords;
       if($("#searchinput").val()!=""){
           param.Keywords.SpecialTerm=$("#searchinput").val();
       }
        $("#new_type span").each(function (i,obj) {
            if($(obj).attr("class")=="new_type_select")
            {
                if($(obj).attr("ntype")!="0") {
                    param.SourceType = $(obj).attr("ntype");
                }
                return false;
            }
        })
        $("#fenleilist div").each(function (i,obj) {
            if($(obj).attr("select")=="1")
            {
                param.ClassificationId=$(obj).attr("clsid");
            }
        })
        $("#news_fj span").each(function (i,o) {
            if($(o).attr("class")=="new_type_select")
            {
                if($(o).attr("value")=="1") {
                    param.IsSofted = true;
                }
                else if($(o).attr("value")=="0")
                {
                    param.IsSofted = false;
                }
                else {

                }
                return false;
            }
        })
        $("#news_xsd span").each(function (i,o) {
            if($(o).attr("class")=="new_type_select")
            {
                if($(o).attr("value")=="1") {
                    param.CombineType = 1;
                }
                else if($(o).attr("value")=="2")
                {
                    param.CombineType = 2;
                }
                else {

                }
                return false;
            }
        })
        $("#news_xwdx span").each(function (i,o) {
            if($(o).attr("class")=="new_type_select")
            {

                if($(o).attr("value")=="1") {
                    param.Relativity = "1";
                }
                else if($(o).attr("value")=="-1")
                {
                    param.Relativity = "-1";
                }
                else {

                }
                return false;
            }
        })
        if($("#btime").val()==""||$("#etime").val()==""){
            alert("请选择时间范围");
            return;
        }
        if($("#btime").val()==""&&$("#etime").val()==""){
            param.StartTime=moment().format('YYYY-MM-DD')+" 00:00:00";
            param.StopTime=moment().format('YYYY-MM-DD')+" 23:59:59";
        }
        else {
            param.StartTime=$("#btime").val();
            param.StopTime=$("#etime").val();
        }
        if($("#news_ly_select").val()!="-1") {
            param.InterfaceSource = $("#news_ly_select").val();
        }
        param.OrganizationId=$("#orglist").val();

        var ps= $("#news_list_title").find("p");
        $.each(ps,function (i,o) {
            if($(o).attr("state")=="1"){
                var orderby={};
                var objs="orderby."+$(o).attr("sort")+"='"+$(o).attr("key")+"'";
                eval(objs);
                param.OrderBys=orderby;
                return;
            }
        })
        console.log(JSON.stringify(param));
        return param;

    },
    news_typeselect:function (id) {
        $("#new_type span").each(function (i,obj) {
            $(obj).attr("class","new_type_select_no");
        })
        $("#"+id).attr("class","new_type_select");
        news.loadnews(1);
    },
    news_dateselect:function (id) {
        $("#new_date span").each(function (i, obj) {
            $(obj).attr("class","new_type_select_no");
        })
        $("#" + id).attr("class","new_type_select");
        if (id == "d1") {
            $("#etime").val(moment().format("YYYY-MM-DD hh:00:00"))
            $("#btime").val(moment().format("YYYY-MM-DD 00:00:00"))
        }
        else if (id == "d2")
        {
            $("#etime").val(moment().format("YYYY-MM-DD hh:00:00"))
            $("#btime").val(moment().add(-24,"hour").format("YYYY-MM-DD 00:00:00"))
        }
        else if (id == "d3")
        {
            $("#etime").val(moment().format("YYYY-MM-DD hh:00:00"))
            $("#btime").val(moment().add(-3,"day").format("YYYY-MM-DD 00:00:00"))
        }
        else if (id == "d4")
        {
            $("#etime").val(moment().format("YYYY-MM-DD hh:00:00"))
            $("#btime").val(moment().add(-7,"day").format("YYYY-MM-DD 00:00:00"))
        }
        else if (id == "d5")
        {
            $("#etime").val(moment().format("YYYY-MM-DD hh:00:00"))
            $("#btime").val(moment().add(-10,"day").format("YYYY-MM-DD 00:00:00"))
        }
        news.loadnews(1);
    },
    news_xsdselect:function(id){
        $("#news_xsd span").each(function (i,obj) {
            $(obj).attr("class","new_type_select_no");
        })
        $("#"+id).attr("class","new_type_select");
        news.loadnews(1);
    },
    news_xwdxselect:function(id){
        $("#news_xwdx span").each(function (i,obj) {
            $(obj).attr("class","new_type_select_no");
            // $(obj).addClass("new_type_select_no");
        })
        $("#"+id).attr("class","new_type_select");
        news.loadnews(1);
    },
    news_selectstatereset:function(){
        $("#table_newslist").children("div").each(function (i,o) {
            $(o).attr("selectstate","0");
            $(o).css("color","#2d4373");
        })
        $("#xiangxi_list_table").children("div").each(function (i,o) {
            $(o).attr("selectstate","0");
            $(o).css("color","#2d4373");
        })
    },
    news_select_details:function(id){
        var url = document.urlmanager.base.url + "/context/get/details/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#yl_context").html(data.data.Content);
        })
    },
    news_select:function (id,goupid,obj) {
        news.news_select_details(id);
        $.each($("span[name='title_select']"),function (i,o) {
               $(o).css("color","#7e94a5");
        });
        // $.each($("a[name='zhankai_x']"),function (i,o) {
        //     $(o).attr("class","tag_a_nodo")
        // });
        $(obj).css("color","#BFEFFF");
        var url = document.urlmanager.base.url + "/context/get/"+id;
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." })
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                tool.localStorageTool.setLocalStorage("tempnews",JSON.stringify(data.data));
                $("#contextid").val(data.Id);
                $("#orderid").val(data.data.OrderId);
                $("#groupid").val(goupid);
                $("#plist tbody").html("");
                var newss=data.data;
                $("#biaoti").val(newss.Title);
                $("#meitimingcheng").val(newss.MediaName);
                $("#laiyuan").val(newss.ContentResource);
                $("#jizhe").val(newss.Author);
                $("#lanmu").val(newss.Navigation);
                $("#zishu").val(newss.WordCount);
                $("#xinwenshijian").val(newss.CreateTime.replace("T"," "));
                $("#contextid").val(newss.Id);
                $("#yl_yjsj").html(newss.CreateTime.replace("T"," "));
                $("#yl_ycfl").html(newss.Navigation);
                $("#yl_title_fy").html("");
                $("#yl_title").html(newss.Title);
                $("#yl_zhaiyao").val(newss.Summary);
                $("#yl_zhaiyao_fy").html("");
                news.load_fanyilog();
                // $("#yl_context").html(newss.Content);
                var al=[];
                $.each(newss.Allocations,function (i,o) {
                    var flag=true;
                    $.each(al,function (ii,oo) {
                        if(o.Organization.id==oo.key)
                        {
                            oo.value+=","+o.Classification.name;
                            flag=false;
                            return;
                        }
                    })
                    if(flag){
                        al.push({key:o.Organization.id,value:o.Classification.name,orgname:o.Organization.name})
                    }

                })
                var ycfltemp="";
                $.each(al,function (r,obj) {
                    ycfltemp+=obj.orgname+"("+obj.value+")"+"|";
                })
                $("#yl_ycfl").html(ycfltemp);
                console.log(al.length);
                var p = newss.Properties;
                $.each(p,function (i,o) {
                    var id=tool.uuidtext();
                    var html="";
                    if(o.Type==4){
                        html="<tr>";
                        html+="<td style='width: 26%; padding: 5px;' ptype='0' pname='"+o.Name+"'><p class='fa fa-ban' style='color: red;margin:0px;' onclick='news.p_dele(this)'></p>"+o.Name+"</td>";
                        html+="<td style='width:68%;padding: 5px;'><input id='"+id+"' style='width: 176px;height: 22px;' value='"+o.Value+"'></td>";
                        html+="</tr>";
                    }
                    else if(o.Type==2)
                    {
                        html="<tr>";
                        html+="<td style='width: 26%; padding: 5px;' ptype='2' pname='"+o.Name+"'><p class='fa fa-ban' style='color: red;margin:0px;' onclick='news.p_dele(this)'></p>"+o.Name+"</td>";
                        html+="<td style='width:68%;padding: 5px;'>";
                        html+="<select id='"+id+"' style='width: 176px;height: 22px;'>";
                        $.each(o.DictionaryData.children,function (r,dic) {
                            if(o.Value==dic.value){
                                html+="<option selected value='"+dic.parentId+"' parentId='"+dic.parentId+"'>"+dic.name+"</option>";
                            }
                            else{
                                html+="<option value='"+dic.parentId+"' parentId='"+dic.parentId+"'>"+dic.name+"</option>";
                            }
                        })
                        html+="</select>";
                        html+="</td>";
                        html+="</tr>";
                    }
                    else if(o.Type==16)
                    {
                        html="<tr>";
                        html+="<td style='width: 26%; padding: 5px;' ptype='1' pname='"+o.Name+"'><p class='fa fa-ban' style='color: red;margin:0px;' onclick='news.p_dele(this)'></p>"+o.Name+"</td>";
                        html+="<td style='width:68%;padding: 5px;'><input id='"+id+"' style='width: 176px;height: 22px;' value='"+o.Value+"'></td>";
                        html+="</tr>";
                    }
                    $("#plist tbody").append(html);
                    jeDate("#"+id,{
                        festival:false,
                        minDate:"1900-01-01",              //最小日期
                        maxDate:"2099-12-31",              //最大日期
                        method:{
                            choose:function (params) {
                
                            }
                        },
                        format: "YYYY-MM-DD hh:mm:ss"
                    });
                })
                // $.each(p,function (i,obj) {
                //     var html=""
                //     if(obj.Type==4)
                //     {
                //         html="<li><div class='form-inline' ptype='0'><label style='font-size:10px;width:25%'>"+obj.Name+"</label><div class='input-group'><input class='form-control' placeholder='Enter text' value='"+obj.Value+"'></div> &nbsp;<p class='fa fa-ban' style='color: red' onclick='news.p_dele(this)'></p></div></li>";
                //     }
                //     else if(obj.Type==2)
                //     {
                //         html="<li><div class='form-inline' ptype='2'><label style='font-size:10px;width:25%'>"+obj.Name+"</label><div class='input-group' style='width:54%'>";
                //         html+="<select class='form-control'>";
                //         $.each(obj.DictionaryData.children,function (r,dic) {
                //             if(obj.Value==dic.value){
                //                 html+="<option selected value='"+dic.parentId+"' parentId='"+dic.parentId+"'>"+dic.name+"</option>";
                //             }
                //             else{
                //                 html+="<option value='"+dic.parentId+"' parentId='"+dic.parentId+"'>"+dic.name+"</option>";
                //             }
                //         })
                //         html+="</select>";
                //         html+="</div>&nbsp;<p class='fa fa-ban' style='color: red' onclick='news.p_dele(this)'></p></div></li>";
                //
                //     }
                //     else if(obj.Type==16)
                //     {
                //         html="<li><div class='form-inline' ptype='1'><label style='font-size:10px;width:25%'>"+obj.Name+"</label><div class='input-group'><input size='10' type='text' value='"+obj.Value+"' class='form_datetime form-control'></div>&nbsp;<p class='fa fa-ban' style='color: red' onclick='news.p_dele(this)'></p></div></li>"
                //     }
                //     $("#plist").append(html);
                //     $(".form_datetime").datetimepicker({
                //         format: 'yyyy-mm-dd', //显示格式
                //         todayHighlight: 1, //今天高亮
                //         minView: "month", //设置只显示到月份
                //         startView: 2,
                //         forceParse: 0,
                //         showMeridian: 1,
                //         autoclose: 1 //选择后自动关闭
                //     });
                // });
                news.hightlight1('yulan_zhaiyao_title');
                news.hightlight1('yl_zhaiyao');
                news.hightlight1('yl_context');
                var p_offset = $("#news_proptery").offset();
                $("#news_yulan").css("left",p_offset.left-501);
                $("#news_yulan").css("top",p_offset.top);
                $("#news_yulan").show();
                $.bootstrapLoading.end();
            }
        })
    },
    new_open:function(url){
        window.open(url);
    },
    news_clean:function(){
        $("#mousepanl").val("");
    },
    news_up:function(groupid){
        if(groupid!="0"){
            $("#mousepanl").val(groupid);
        }
        else {
            $("#mousepanl").val("");
        }
    },
    news_find:function (id) {
        var returnvaue;
        var news_temp = tool.localStorageTool.getLocalStorage("news");
        news_temp = eval(news_temp);
        for (var i=0;i<news_temp.length;i++)
        {
            if(news_temp[i].master.Id==id)
            {
                returnvaue = news_temp[i].list;
                break;
            }
        }
        return returnvaue;
    },
    find_checknew:function (modeltype) {
        var ids=[];
        var type =$("#simple_model").attr("active");
        if(type=="1")
        {
        var trs = $("#table_newslist").children("div");
        $(trs).each(function(){
            var tdArr = $(this).children("div");
            var check = tdArr.eq(0).find('input').eq(0);
           if($(check).is(':checked'))
           {
               //alert($(check).val());
               ids.push(parseInt($(check).val()))

           }
        });
        }
        else {
            var divs = $(".xiangxi_title");
            $(divs).each(function () {
                var check = $(this).find('input').eq(0);
                if ($(check).is(':checked')) {
                    //alert($(check).val());
                    ids.push($(check).val())

                }
            })

        }
         console.log(ids);
         return ids;
    },
    find_checknew_group:function(){
        var ids=[];
        var type =$("#simple_model").attr("active");
        if(type=="1")
        {
            var trs = $("#table_newslist").children("div");
            $(trs).each(function(){
                var tdArr = $(this).children("div");
                var check = tdArr.eq(0).find('input').eq(0);
                if($(check).is(':checked'))
                {
                    //alert($(check).val());
                    if($(check).attr("groupid")!="0"&&$(check).attr("groupid")!=undefined) {
                        ids.push($(check).attr("groupid"))
                    }

                }
            });
        }
        else {
            var divs = $(".xiangxi_title");
            $(divs).each(function () {
                var check = $(this).find('input').eq(0);
                if ($(check).is(':checked')) {
                    //alert($(check).val());
                    if($(check).attr("groupid")!="0"&&$(check).attr("groupid")!=undefined) {
                        ids.push($(check).attr("groupid"))
                    }
                }
            })

        }
        console.log(ids);
        return ids;
    },
    find_checknew_contextid:function(){
        var ids=[];
        var type =$("#simple_model").attr("active");
        if(type=="1")
        {
            var trs = $("#table_newslist").children("div");
            $(trs).each(function(){
                var tdArr = $(this).find("div");
                var checks = $(this).find('input');
                $.each(checks,function (i,o) {
                    if($(o).is(':checked'))
                    {
                        //alert($(check).val());
                        // if($(check).attr("groupid")!="0"&&$(check).attr("groupid")!=undefined) {
                        //     ids.push($(check).attr("groupid"))
                        // }
                        ids.push($(o).val())
                    }
                })

            });
        }
        else {
            // var divs = $(".xiangxi_title");
            // $(divs).each(function () {
            //     var check = $(this).find('input').eq(0);
            //     if ($(check).is(':checked')) {
            //         //alert($(check).val());
            //         // if($(check).attr("groupid")!="0"&&$(check).attr("groupid")!=undefined) {
            //         //     ids.push($(check).attr("groupid"))
            //         // }
            //         ids.push($(check).val())
            //     }
            // })
            var items = $("#xiangxi_list_table").children("div");
            $(items).each(function(){
                var checks = $(this).find('input');
                $.each(checks,function (i,o) {
                    if($(o).is(':checked'))
                    {
                        //alert($(check).val());
                        // if($(check).attr("groupid")!="0"&&$(check).attr("groupid")!=undefined) {
                        //     ids.push($(check).attr("groupid"))
                        // }
                        ids.push($(o).val())
                    }
                })

            });

        }
        console.log(ids);
        return ids;
    },
    find_checknew_contextid_bgid:function(bgtype){
        var ids=[];
        var type =$("#simple_model").attr("active");
        if(type=="1")
        {
            var trs = $("#table_newslist").children("div");
            $(trs).each(function(){
                var tdArr = $(this).find("div");
                var checks = $(this).find('input');
                $.each(checks,function (i,o) {
                    if($(o).is(':checked'))
                    {
                        var temp = $(o);
                        // ids.push($(o).val())
                        //简报
                        if(bgtype==1){
                            if(temp.attr("jbid")!="null"){
                            ids.push({
                                key:temp.attr("jbid"),
                                value:temp.val()
                            })
                            }
                        }
                        else {
                            //日报
                            if(temp.attr("rbid")!="null"){
                                ids.push({
                                    key:temp.attr("rbid"),
                                    value:temp.val()
                                })
                            }
                        }
                    }
                })

            });
        }
        else {
            var items = $("#xiangxi_list_table").children("div");
            $(items).each(function(){
                var checks = $(this).find('input');
                $.each(checks,function (i,o) {
                    if($(o).is(':checked'))
                    {
                        var temp = $(o);
                        // ids.push($(o).val())
                        //简报
                        if(bgtype==1){
                            if(temp.attr("jbid")!="null"){
                                ids.push({
                                    key:temp.attr("jbid"),
                                    value:temp.val()
                                })
                            }
                        }
                        else {
                            //日报
                            if(temp.attr("rbid")!="null"){
                                ids.push({
                                    key:temp.attr("rbid"),
                                    value:temp.val()
                                })
                            }
                        }
                    }
                })

            });

        }
        // console.log(ids);
        return ids;
    },
    check_all:function (modeltype,obj) {
        var isChecked = $(obj).prop("checked");
        if (modeltype == 1) {
            if (isChecked) {
                var trs = $("#table_newslist").children("div");
                $(trs).each(function () {
                    var check = $(this).eq(0).find('input').eq(0);
                    $(check).prop("checked", true);

                });
            }
            else {
                var trs = $("#table_newslist").children("div");
                $(trs).each(function () {
                    var check = $(this).eq(0).find('input').eq(0);
                    $(check).prop("checked", false);
                });
            }
        }
        else {
            var divs = $(".xiangxi_title");
            if(isChecked)
            {
                $(divs).each(function () {
                    var check = $(this).find("input").eq(0)
                    $(check).prop("checked", true);
                })
            }
            else {
                $(divs).each(function () {
                    var check = $(this).find("input").eq(0)
                    $(check).prop("checked", false);
                })
            }
        }
    },
    find_classification:function () {

        var ids=[];
        var cclass = $("#fenleilist").find("li").find("span");
        $.each(cclass,function (i,obj) {
            if($(obj).hasClass("selectclass")){
                ids.push($(obj).attr("cid"));
            }
        })
        console.log(ids);
        return ids;
        //alert(cclass.length);
    },
    check_classification:function (obj) {

        if($(obj).hasClass("selectclass"))
        {
            $(obj).removeClass("selectclass");
            $(obj).addClass("noselectclass");
        }
        else {
            $(obj).addClass("selectclass");
            $(obj).removeClass("noselectclass");
        }
        event.stopPropagation();
    },
    buildmousediv:function (ids) {
        var news = tool.localStorageTool.getLocalStorage("news");
        var newsobj = eval(news);
        $("#mousepanl").html("");
        $.each(ids,function (i,obj) {
            $.each(newsobj,function (r,obj1) {

                if(obj==obj1.groupid){
                    var title = obj1.master.Context.Title;
                    $("#mousepanl").append("<div>"+title+"</div>");
                    //console.log(title);
                }
            })
        })
    },
    addp:function(){
        var p_name = $("#p_name").val();
        var p_type = $("#p_type").val();
        var p_source = $("#p_source").val();
        if(p_type=="2")
        {
            if(p_source=="")
            {
                alert("请选择数据源");
                return false;
            }

        }
        var id=tool.uuidtext();
        var html="";
        if(p_type=="0"){
            html="<tr>";
            html+="<td style='width: 26%; padding: 5px;' ptype='"+p_type+"' pname='"+p_name+"'><p class='fa fa-ban' style='color: red;margin:0px;' onclick='news.p_dele(this)'></p>"+p_name+"</td>";
            html+="<td style='width:68%;padding: 5px;'><input id='"+id+"' style='width: 176px;height: 22px;'/></td>";
            html+="</tr>";

        }
        else if(p_type=="1")
        {
            html="<tr>";
            html+="<td style='width: 26%; padding: 5px;' ptype='"+p_type+"' pname='"+p_name+"'><p class='fa fa-ban' style='color: red;margin:0px;' onclick='news.p_dele(this)'></p>"+p_name+"</td>";
            html+="<td style='width:68%;padding: 5px;'><input id='"+id+"' size='10' type='text' value='' style='width: 176px;height: 22px;' class='form_datetime'></td>";
            html+="</tr>";

        }
        else if(p_type=="2")
        {
            var url = document.urlmanager.base.url + "/dictionary/get/listresult/0/null/0/2";
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, false, function (data) {
                html="<tr>";
                html+="<td style='width: 26%; padding: 5px;' ptype='"+p_type+"' pname='"+p_name+"'><p class='fa fa-ban' style='color: red;margin:0px;' onclick='news.p_dele(this)'></p>"+p_name+"</td>";
                html+="<td style='width:68%;padding: 5px;'>";
                html+="<select id='"+id+"' style='width: 176px;height: 22px;'>";
                $.each(data.data,function (r,dic) {
                    if(p_source==dic.id){
                        $.each(dic.children,function (i,chi) {
                            html+="<option selected value='"+chi.parentId+"' parentId='"+chi.parentId+"'>"+chi.name+"</option>";
                        })

                    }
                })
                html+="</select>";
                html+="</td>";
                html+="</tr>";

            })

        }
        $("#plist tbody").append(html);
        // $(".form_datetime").datetimepicker({
        //     format: 'yyyy-mm-dd', //显示格式
        //     todayHighlight: 1, //今天高亮
        //     minView: "month", //设置只显示到月份
        //     startView: 2,
        //     forceParse: 0,
        //     showMeridian: 1,
        //     autoclose: 1 //选择后自动关闭
        // });
        
        jeDate("#"+id,{
            festival:false,
            minDate:"1900-01-01",              //最小日期
            maxDate:"2099-12-31",              //最大日期
            method:{
                choose:function (params) {
    
                }
            },
            format: "YYYY-MM-DD hh:mm:ss"
        });

    },
    p_dele:function(e){
      $(e).parent().parent().remove();
    },
    p_get:function(){
        var plist=[];
        var list = $("#plist").find("tr");
        $.each(list,function (i,o) {
            var p = {
                id: 0
            };
            var td1 = $(o).children("td").eq(0);
            var td2 = $(o).children("td").eq(1);
            if ($(td1).attr('ptype') == "0") {
                p.Name = $(td1).attr('pname');
                p.Value = $($(td2).find("input").eq(0)).val();
                p.Type = 4;
                p.DictionaryData = null;

            }
            else if ($(td1).attr('ptype') == "1") {
                p.Name = $(td1).attr('pname');
                p.Value = $($(td2).find("input").eq(0)).val();
                p.Type = 16;
                p.DictionaryData = null;
            }
            else if ($(td1).attr('ptype') == "2") {
                p.Type = 2;
                p.Name = $(td1).attr('pname');
                p.Value = $($(td2).find("select").eq(0)).find("option:selected").text();
                p.DictionaryData = {
                    id: $($(td2).find("select").eq(0)).val()
                };
            }
            plist.push(p);

        })
        //var lis = $("#plist").find("li");

        // $.each(lis,function (i,obj) {
        //     var p={
        //         id:0
        //     };
        //     var div = $(obj).find("div").eq(0);
        //     if($(div).attr('ptype')=="0")
        //     {
        //         p.Name =  $($(div).find("label").eq(0)).text();
        //         var div1 = $(div).find("div").eq(0);
        //         p.Value=$($(div1).find("input").eq(0)).val();
        //         p.Type=4;
        //         p.DictionaryData=null;
        //
        //     }
        //     else if($(div).attr('ptype')=="1")
        //     {
        //         p.Name =  $($(div).find("label").eq(0)).text();
        //         var div1 = $(div).find("div").eq(0);
        //         p.Value=$($(div1).find("input").eq(0)).val();
        //         p.Type=16;
        //         p.DictionaryData=null;
        //     }
        //     else if($(div).attr('ptype')=="2")
        //     {
        //         p.Type=2;
        //         p.Name =  $($(div).find("label").eq(0)).html();
        //         var div1 = $(div).find("div").eq(0);
        //         p.Value=$($(div1).find("select").eq(0)).find("option:selected").text();
        //         p.DictionaryData={
        //             id:$($(div1).find("select").eq(0)).val()
        //         };
        //     }
        //     plist.push(p);
        // })
        // console.log(plist);
        return plist;
    },
    p_save:function(){
        var param = {
            ContextId:$("#contextid").val(),
            Properties:news.p_get(),

        }
        if(param.ContextId=="")
        {
            alert("请选择新闻");
            return;
        }
        // console.log(param);
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url + "/context/properties/processor";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {

            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                var c_temp = {

                    MediaName:$("#meitimingcheng").val(),
                    ContentResource:$("#laiyuan").val(),
                    Author:$("#jizhe").val(),
                    Navigation:$("#lanmu").val(),
                    WordCount:$("#zishu").val(),
                    CreateTime:$("#xinwenshijian").val(),
                    Id:param.ContextId,
                    Title:$("#biaoti").val()
                }
                var t_url=document.urlmanager.base.url + "/context/properties/modifly";
                tool.ajaxTool.ajax(t_url, tool.ajaxTool.ajaxtype.post, c_temp, true, function (data) {
                    if (data.res >=-99&&data.res<0) {
                        alert(data.msg);
                    }
                    else if(data.res<-99){
                        alert("系统错误");
                    }
                        else {
                            news.batchsave();
                            alert("保存成功");

                        }
                    $.bootstrapLoading.end();
                    }

                )
                // $.bootstrapLoading.end();
                // alert("保存成功");
                // var newss=tool.localStorageTool.getLocalStorage("tempnews");
                // newss = JSON.parse(newss);
                // var newobj={};
                // newobj.Title=$("#biaoti").val();
                // newobj.MediaName=$("#meitimingcheng").val();
                // newobj.Author=$("#jizhe").val();
                // newobj.Navigation=$("#lanmu").val();
                // newobj.WordCount=$("#zishu").val();
                // newobj.CreateTime=$("#xinwenshijian").val();
                // newobj.Id=param.ContextId;
                // url=document.urlmanager.base.url + "/context/properties/modifly";
                // console.log(JSON.stringify(newobj));
                // tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, newobj, true, function (data) {
                //         if (data.res != 0) {
                //             alert("系统错误");
                //         }
                //         else {
                //             $.bootstrapLoading.end();
                //             alert("保存成功");
                //
                //         }
                //     }
                // )

            }


        })




    },
    batchsave:function(){
        var url = document.urlmanager.base.url + "/context/group/batch/update/summaryandtitle";
        
        var param={
            ContextId: $("#contextid").val(),
            GroupId: $("#groupid").val(),
            IsBatch: false,
            Summary: $("#yl_zhaiyao").val(),
            Title: $("#biaoti").val()
          }
          console.log(JSON.stringify(param));
          if($("#flag_zypcl").prop('checked')){
              param.IsBatch=true;
          }
          tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, false, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            }


        })
    },
    context_save:function(){
        var newobj={};
        newobj.Title=$("#biaoti").val();
        newobj.MediaName=$("#meitimingcheng").val();
        newobj.Author=$("#jizhe").val();
        newobj.Navigation=$("#lanmu").val();
        newobj.WordCount=$("#zishu").val();
        newobj.CreateTime=$("#xinwenshijian").val();
        newobj.ContextId=$("#contextid").val();
        var url = document.urlmanager.base.url + "/context/saveorupdate";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {


            }


        })
    },
    fenleisearch:function () {

    },
    ptypechange:function()
    {
        var ptype =$("#p_type").val();
        if(ptype=="2")
        {
            $("#div_sourcetype").show();
        }
        else {
            $("#div_sourcetype").hide();
        }
    },
    p_edit:function (obj) {
        if($("#contextid").val()=="0"||$("#contextid").val()==""){
            alert("请选择要编辑的新闻");
            return;
        }
       var flag= $(obj).attr("flag");
       if(flag=="0"){
           $(obj).html("<p class='fa fa-edit' style='margin-bottom:0px;'></p>取消编辑");
           $(obj).attr("flag","1");
           $("#flag_add").show();
           $("#zdy_operate").show();
           var p_offset = $("#news_proptery").offset();
           $("#news_yulan").css("left",p_offset.left-501);
           $("#news_yulan").css("top",p_offset.top);
           $("#news_yulan").show();
           // $("#showflag").attr("showflag","1");
           // $("#showflag").html("预览隐藏");
           // $("#showflag").show();

       }
       else {
           $(obj).html("<p class='fa fa-edit' style='margin-bottom:0px;'></p>进入编辑");
           $(obj).attr("flag","0");
           $("#flag_add").hide();
           $("#zdy_operate").hide();
           $("#news_yulan").hide();
           // $("#showflag").attr("showflag","0");
           // $("#showflag").html("预览显示");
           // $("#showflag").hide();
       }
    },
    fenleichaxun:function (obj,evt) {
        $("#fenleilist").find("div").each(function (r,oo) {
            $(oo).attr("class","new_fenlei_item");
            $(oo).attr("select","0");
        })
        $(obj).attr("select","1");
        $(obj).attr("class","new_fenlei_item_select");
        // $.each($("#fenleilist").find("div"),function (i,li) {
        //     var t1 = $(obj).html();
        //     var t2 = $(li).html();
        //     if(t1==t2){
        //         // alert(t1);
        //         if($(obj).attr("select")=="0"){
        //             $(obj).attr("select","1");
        //             $(obj).attr("class","new_fenlei_item_select");
        //         }
        //         else
        //         {
        //             $(obj).attr("select","0");
        //             $(obj).attr("class","new_fenlei_item");
        //         }
        //
        //     }
        //     else {
        //         $(li).attr("select","0");
        //         $(obj).attr("class","new_fenlei_item");
        //     }
        // })

        news.loadnews(1);
        return false;
    },
    highlight:function (value,keywords) {
        var valuetemp=value;
        var arr = news.attribute(keywords);
        for (var i=0;i<arr.length;i++){
            valuetemp.replace(arr[i],"<p>"+arr[i]+"</p>");
        }
    },
    attribute:function (arr) {
        var arrsort=arr.sort();
        var newarr=[];
        newarr.push(arrsort[0]);
        for(var i=1;i<arrsort.length;i++){
            if(arrsort[i]!==newarr[newarr.length-1]){newarr.push(arrsort[i])}
        }
        return newarr;
    },
    news_qingxi:function (text) {
        return text.replace(/<[^>]+>/g,"");//去掉所有的html标记
    },
    fuzhi_jg_change:function () {
        select_bind.selectfenlei("fuzhi_fenlist",$("#fuzhi_jglist").val(),"0");
    },
    hightlight1:function (id) {
        // Keyword: "ccc"
        // Media: "bbb"
        // Title: "aa"
        var keys=[];
        var key=news.getcondition().Keywords;
        for (x in key) {

            keys.push(key[x]);

        }
        $.each(keys,function (i,o) {
            var oDiv = document.getElementById(id),
                sText = oDiv.innerHTML,
                bgColor = bgColor || "orange",
                sKey = "<span style='background-color: "+bgColor+";'>"+o+"</span>",
                num = -1,
                rStr = new RegExp(o, "g"),
                rHtml = new RegExp("\<.*?\>","ig"), //匹配html元素
                aHtml = sText.match(rHtml); //存放html元素的数组
            sText = sText.replace(rHtml, '{~}');  //替换html标签
            sText = sText.replace(rStr,sKey); //替换key
            sText = sText.replace(/{~}/g,function(){  //恢复html标签
                num++;
                return aHtml[num];
            });

            oDiv.innerHTML = sText;
        })

    },
    new_isfenjianselect:function (obj) {
        $("#news_fj span").each(function (i,o) {
            $(o).attr("class","new_type_select_no");
        })
        $(obj).attr("class","new_type_select");
        news.loadnews(1);
    },
    searchfl:function () {
        var lis = $("#fenleilist div");
        var keyword = $("#sstext").val();
        $.each(lis,function (i,o) {
            var text = $(o).text();
            // console.log(text);
            // var i=str.indexOf("3") != -1
            if(text.indexOf(keyword) == -1){
                $(o).hide();
            }
            else {
                $(o).show();
            }
        })
    },
    getcolinfo:function () {
        var orgid = $("#orglist").val();
        var url = document.urlmanager.base.url + "/organization/mini/find/"+orgid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, false, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                var cols = data.data.columninfos;
                tool.localStorageTool.setLocalStorage("cols",JSON.stringify(cols));
                $("#new_cols tbody").html("");
                $.each(cols,function (i,o) {
                    var html = "<tr>";
                    if(i<=4){
                    html+="<td><input type='checkbox' value='"+o.value+"' checked /></td>";
                    }
                    else {
                        html+="<td><input type='checkbox' value='"+o.value+"'/></td>";

                    }
                    html+="<td>"+o.name+"</td>";
                    $("#new_cols tbody").append(html);
                })
            }
        })
    },
    new_opencolsmodal:function () {
        $("#news_cols").modal("show");
    },
    new_showcol:function () {
        var vs =[];
        var cols = $("#new_cols tbody").find("input");
        $.each(cols,function (i,o) {
            var isChecked = $(o).prop('checked');
            if(isChecked){
                // console.log($(o).attr("value"));
                vs.push($(o).attr("value"))
            }
        })
        if(vs.length>5){

            alert("所选列数不能大于5列");
            return;
        }
        else if(vs.length==0){
            alert("请选择要显示的列");
            return;
        }
        var cols = $("div[name='cols']");
        $.each(cols,function (ii,oo) {

            if(tool.arraytool.isin($(oo).attr("vv"),vs))
            {
                $(oo).show();
            }
            else {
                $(oo).hide();
            }

        })
    },
    yulanshowandhide:function (obj) {
        var t = $(obj);
        if(t.attr("showflag")=="1"){
            $("#news_yulan").hide();
            t.attr("showflag","0");
            t.html("预览显示");
        }
        else {
            $("#news_yulan").show();
            t.attr("showflag","1");
            t.html("预览隐藏");
        }
    },
    cleandata:function () {
        $("#contextid").val("");
        $("#meitimingcheng").val("");
        $("#laiyuan").val("");
        $("#biaoti").val("");
        $("#lanmu").val("");
        $("#zishu").val("");
        $("#jizhe").val("");
        $("#xinwenshijian").val("");
        $("#plist tbody").html("");
    },
    tab_select_p:function (obj,t) {
        $("div[name='p_t']").each(function (i,o) {
            $(o).attr("class","");
        })
        $(obj).attr("class","p_select")
        if(t=="p_tab"){
            $("#fanyi_tab").hide();
            $("#p_tab").show();
        }
        else {
            $("#fanyi_tab").show();
            $("#p_tab").hide();
            var orderid=$("#orderid").val();
            if(orderid!="0"){
            news.load_fanyilog();
            }
        }
    },
    load_fanyilog:function () {
        $("#yuanwen").val("");
        $("#yiwen").val("");
        var orderid=$("#orderid").val();
        if(orderid==""){
            $("#itemlist tbody").html("<td colspan='3' style='text-align: center'>没有翻译记录</td>");
            return false;
        }
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url + "/order/query/"+orderid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                news.load_log(data.data.Items);
            }
            $.bootstrapLoading.end();
        })
    },
    load_log:function(logs){
        tool.localStorageTool.setLocalStorage("news_itemsfanyi",JSON.stringify(logs));
        if(logs.length==1){
            $("#itemlist tbody").html("<td colspan='3' style='text-align: center'>没有翻译记录</td>");
            return;
        }
        $("#itemlist tbody").html("");
        $.each(logs,function (i,o) {
            if(o.Data!="this is translate title") {
                var html = "<tr onclick=news.load_log_context('"+o.Id+"')>";
                html += "<td>" + o.CreateTime.replace('T', ' ') + "</td>";
                html += "<td>-</td>";
                html += "<td>" + o.Operator.realname + "</td>";
                html += "</tr>";
                $("#itemlist tbody").append(html);
                if(o.ItemType==0){
                    $("#yl_title_fy").html(o.Data);
                }
                else if(o.ItemType==1){
                    $("#yl_zhaiyao_fy").html(o.Data);
                }
            }
        })
    },
    load_log_context:function(itemid){
        console.log(itemid);
        var logs = tool.localStorageTool.getLocalStorage("news_itemsfanyi");
        logs = JSON.parse(logs);
        $.each(logs,function (i,o) {
            if(o.Id==itemid){
                $("#yuanwen").val(o.Title);
                $("#yiwen").val(o.Data);
                return false;
            }
        })
    },
}