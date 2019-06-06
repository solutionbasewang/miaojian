var fanyi={
    select_shuxing:function (obj) {
        $("#fanyi_title span").each(function (i,o) {
            $(o).attr("class","title_noselected");
        });
        $("#tab_fanyi").hide();
        $("#tab_jbsxfy").hide();
        $("#tab_qwfy").hide();
        $("#tab_fanyilog").hide();
        $(obj).attr("class","title_selected");
        var containner=$(obj).attr("target");
        $("#"+containner).show();
    },
    select_sourcetype:function(obj){
        $("#new_type span").each(function (i,o) {
            $(o).attr("class","title_noselected");
        });
        $(obj).attr("class","title_selected");
    },
    select_tag:function(obj){
        $("div[name='tag']").each(function (i,o) {
            $(o).attr("class","tag_css_stop");
        })
        $(obj).attr("class","tag_css");
    },
    select_order:function(obj){

       var orgorders =  $(".orgorder");
       $.each(orgorders,function (i,o) {
           $(o).find("div").each(function (ii,oo) {
               $(oo).attr("class","newslist_row");
           })
       })
        $(obj).attr("class","newslist_row_select");
    },
    load_order:function (page) {

        fanyi.load_order_count();
        $("#orderlists").html("");
        var url = document.urlmanager.base.url +"/order/query/"+page+"/5";
        var orgs = $("#orglist").selectpicker('val');
        var param=
        {
            OrderId: null,
            ContextIds :[],
            Sponsor: null,
            Executor: null,
            StartTime: null,
            StopTime: null,
            OrderFlag: 0,
            OrderCategory: 0,
            Title: $("#search_title").val()
        }

        if(orgs.length==0) {
            var conid=tool.uuid();
            param.OrgId = null;
            param.OrgIds=[];
            console.log(JSON.stringify(param));
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
                if (data.res != 0) {
                    alert("系统错误");
                } else {
                    var html="<div class='orgteam'>";
                    html+="<div class='orgname'>全部("+data.data.Total+")</div>";
                    html+="<div class='orgorder' id='"+conid+"'>";
                    html+=fanyi.buildorder(data.data.Items,1);
                    html+="</div>";
                    html+="<div class='orgfoot' pagenum='1' orgid='0' onclick=fanyi.pagemore(this,'"+conid+"')>更多</div>";
                    html+="</div>";
                    $("#orderlists").append(html);
                    $.bootstrapLoading.end();
                    fanyi.fristinit();
                }
            })
        }
        else {
            $.each(orgs,function (i,o) {
                var conid=tool.uuid();
                var orginfo=tool.uuid();
                param.OrgIds=[];
                param.OrgIds.push(o);
                tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
                    if (data.res != 0) {
                        alert("系统错误");
                    } else {
                        var html="<div class='orgteam'>";
                        html+="<div class='orgname' id='"+orginfo+"'></div>";
                        html+="<div class='orgorder' id='"+conid+"'>";
                        html+=fanyi.buildorder(data.data.Items,1);
                        html+="</div>";
                        html+="<div class='orgfoot' pagenum='1' orgid='"+o+"' onclick=fanyi.pagemore(this,'"+conid+"')>更多</div>";
                        html+="</div>";
                        $("#orderlists").append(html);
                        fanyi.getorginfo(o,orginfo,data.data.Total);
                        fanyi.fristinit();
                    }
                })
            })
        }

    },
    load_order_count:function(page){
        var url = document.urlmanager.base.url +"/order/query/statistic";
        var param=
            {
                OrderId: null,
                ContextIds :[],
                Sponsor: null,
                Executor: null,
                StartTime: null,
                StopTime: null,
                OrderFlag: 0,
                OrderCategory: 0,
                Title: $("#search_title").val(),
                OrgIds:[]
            }
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                var type=data.data.Statistics;
                var fj = data.data.Translate;
                $("#allcount").html("全部("+(fj.全部)+ ")");
                $("#yfy_count").html("已翻译("+fj.已翻译+ ")");
                $("#wfy_count").html("未翻译("+fj.未翻译+ ")");
                $("#zzfy_count").html("翻译中("+fj.翻译中+ ")");
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
                $("#shipin").html("视频("+type.视频+ ")");
                $("#guangbo").html("广播("+type.广播+ ")");
                $("#dianshi").html("电视("+type.电视+ ")");
                $("#app").html("App("+type.App+ ")");

            }
        })

    },
    getorginfo:function(orgid,conid,count){
        var url=document.urlmanager.base.url +"/organization/selectbyid/"+orgid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#"+conid).html(data.data.name+"("+count+")");
            }
        })
    },
    buildorder:function(list,flag){
        var html="";
        $.each(list,function (i,o) {
            if(i==0&&flag==1){
                html += "<div class='newslist_row' onclick=fanyi.load_news('"+o.Id+"',this)>";
            }
            else {
            html += "<div class='newslist_row' onclick=fanyi.load_news('"+o.Id+"',this)>";
            }
            html += "<div style='width:40%;padding:5px;' title='"+o.Items[0].Context.Title+"'>"+tool.stringtool.substr(o.Items[0].Context.Title,10)+"</div>";
            html += "<div style='width:30%;padding:5px;'>"+o.CreateTime.replace('T',' ')+"</div>";
            if(o.Status==2||o.Status==8||o.Status==16)
            {
                html += "<div style='width:30%;padding:5px;'><span class='operate_active' onclick='fanyi.showsace(event)'>[翻译]</span>&nbsp;&nbsp;<span class='operate_active' orderstate='"+o.Status+"' onclick=fanyi.ordercancel('" + o.Id + "',this)>[取消]</span>&nbsp;&nbsp;<span class='operate_active'  orderstate='"+o.Status+"' onclick=fanyi.orderfinish('" + o.Id + "',this)>[翻译完成]</span></div>";
            }
            else if(o.Status==0){
                html += "<div style='width:30%;padding:5px;'><span class='operate_active'  orderstate='"+o.Status+"' onclick=fanyi.orderaccept('" + o.Id + "',this)>[受理]</span>&nbsp;&nbsp;<span class='operate_active'  orderstate='"+o.Status+"' onclick=fanyi.ordercancel('" + o.Id + "',this)>[取消]</span></div>";
            }
            else if(o.Status==64)
            {
                html += "<div style='width:30%;padding:5px;'>[翻译完成]</div>";
            }
            html += "</div>";
        });
        return html;
    },
    showsace:function(){

        $("#btn_context").show();
        $("#btn_sx").show();
        $("#btn_title").show();
    },
    pagemore:function(obj,containerid) {
        var oldhtml = $(obj).html();
        $(obj).html("<img src='../images/loadsmall.gif'>");
        var paper = $(obj).attr("pagenum");
        var orgid = $(obj).attr("orgid");
        paper = parseInt(paper) + 1;
        var url = document.urlmanager.base.url + "/order/query/" + paper + "/5";
        var orgs = $("#orglist").selectpicker('val');
        var param = {
            OrderId: null,
            ContextIds: [],
            Sponsor: null,
            Executor: null,
            StartTime: null,
            StopTime: null,
            OrderFlag: 0,
            OrderCategory: 0,
            Title: $("#search_title").val(),
            OrgIds: []
        }
        if(orgid!="0"){
            param.OrgIds.push(orgid);
        }
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#"+containerid).append(fanyi.buildorder(data.data.Items,0))
                $(obj).attr("pagenum",paper);
                $(obj).html(oldhtml);
            }
        })
    },
    orderaccept:function(contextid,obj){
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url + "/order/accept/"+contextid+"/"+init.get.userinfo().data.userinfo.userid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $.bootstrapLoading.end();
            if (data.res != 0) {
                alert("系统错误");
            } else {
                // fanyi.load_order(1);
                var html = "<span class='operate_active' onclick='fanyi.showsace(event)'>[翻译]</span>&nbsp;&nbsp;<span class='operate_active' orderstate='2' onclick=fanyi.ordercancel('" + contextid + "',this)>[取消]</span>&nbsp;&nbsp;<span class='operate_active'  orderstate='2' onclick=fanyi.orderfinish('" + contextid + "',this)>[翻译完成]</span>";
                $(obj).parent().html(html);
            }
        })
    },
    ordercancel:function(orderid,obj){

        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url +"/order/cancel/"+orderid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $.bootstrapLoading.end();
            if (data.res != 0) {
                alert(data.msg);
            } else {
                fanyi.load_order(1);
            }
        })
    },
    orderfinish:function(orderid,obj){
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url +"/order/status/change/"+orderid+"/64";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $.bootstrapLoading.end();
            if (data.res != 0) {
                alert(data.msg);
            } else {
                //fanyi.load_order(1);
                var html = "[翻译完成]";
                $(obj).parent().html(html);
            }
        })
    },
    load_news:function(order_id,obj){
        if($(obj).attr("class")=="newslist_row_select"){
            return;
        }
        fanyi.select_order(obj)
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url + "/order/query/"+order_id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                if(data.data.Status==64)
                {
                    $("#btn_context").hide();
                    $("#btn_sx").hide();
                    $("#btn_title").hide();
                }

                fanyi.load_log(data.data.Items);
                var context=data.data.Items[0].Context;
                fanyi.load_context(context.Id);
                $("#orderid").val(data.data.Id);
                $("#contextid").val(context.Id);
                $("#yulan_title").html(context.Title);
                $("#yulan_zhaiyao").html(context.Summary);
                $("#url").html(tool.stringtool.substr(context.Url,40));
                $("#jz").html(context.Author);
                $("#fbsj").html(context.CreateTime.replace("T"," "));
                $("#mtmc").val(context.MediaName);
                $("#ly").val(context.ContentResource);
                $("#lm").val(context.Navigation);
                $("#plist tbody").html("");
                var p = context.Properties;
                $.each(p,function (i,o) {
                    var uuid = tool.uuid();
                    var html="";
                    if(o.Type==4){
                        html="<tr>";
                        html+="<td ptype='0' pname='"+o.Name+"' style='width:20%;'>"+o.Name+"</td>";
                        html+="<td><input style='width: 60%;' class='form-control' value='"+o.Value+"' name='zdyss' targetid='"+uuid+"'></td>";
                        html+="</tr>";
                        html+="<tr>";
                        html+="<td ptype='0' pname='"+o.Name+"'  style='width:20%;'>ENG</td>";
                        html+="<td><input style='width: 60%;' class='form-control' id='"+uuid+"'></td>";
                        html+="</tr>";
                    }
                    else if(o.Type==2)
                    {
                        html="<tr>";
                        html+="<td ptype='2' pname='"+o.Name+"' style='width:20%;'>"+o.Name+"</td>";
                        html+="<td>";
                        html+="<select class='form-control' style='width: 60%;' name='zdyss' targetid='"+uuid+"'>";
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
                        html+="<tr>";
                        html+="<td ptype='0' pname='"+o.Name+"' style='width:20%;'>ENG</td>";
                        html+="<td><input style='width: 60%;' class='form-control' id='"+uuid+"'></td>";
                        html+="</tr>";
                    }
                    else if(o.Type==16)
                    {
                        html="<tr>";
                        html+="<td ptype='1' pname='"+o.Name+"' style='width:20%;'>"+o.Name+"</td>";
                        html+="<td><input class='form-control' style='width: 60%;' value='"+o.Value+"' targetid='"+uuid+"'></td>";
                        html+="</tr>";
                        html+="<tr>";
                        html+="<td ptype='0' pname='"+o.Name+"' style='width:20%;'>ENG</td>";
                        html+="<td><input style='width: 60%;' class='form-control' id='"+uuid+"'></td>";
                        html+="</tr>";
                    }
                    $("#plist tbody").append(html);
                })
                $.bootstrapLoading.end();
            }
        })
    },
    load_context:function(contextid){
        $("#yulan_context").html("");
        var url = document.urlmanager.base.url + "/context/get/"+contextid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {

                $("#yulan_context").html(data.data.Content);
            }
        })
    },
    load_log:function(logs){
        tool.localStorageTool.setLocalStorage("itemsfanyi",JSON.stringify(logs));
        if(logs.length==1){
            $("#itemlist tbody").html("<td colspan='3' style='text-align: center'>没有翻译记录</td>");
            return;
        }
        $("#itemlist tbody").html("");
        $.each(logs,function (i,o) {
            if(o.Data!="this is translate title") {
                var html = "<tr onclick=fanyi.load_log_context('"+o.Id+"')>";
                html += "<td>" + o.CreateTime.replace('T', ' ') + "</td>";
                html += "<td>-</td>";
                html += "<td>" + o.Operator.realname + "</td>";
                html += "</tr>";
                $("#itemlist tbody").append(html);
            }
        })
    },
    load_log_context:function(itemid){
        console.log(itemid);
        var logs = tool.localStorageTool.getLocalStorage("itemsfanyi");
        logs = JSON.parse(logs);
        $.each(logs,function (i,o) {
            if(o.Id==itemid){
                $("#yuanwen").val(o.Title);
                $("#yiwen").val(o.Data);
                return false;
            }
        })
    },
    tool_mouseget:function(){
        var value = fanyi.getSelectedText();
        $("#youdaoresult").val(value);
    },
    load_yulan:function () {

    },
    load_jbshuxing:function () {

    },
    load_kzshuxing:function () {
        
    },
    joinzhaiyao:function(){
        var youdaoresult = $("#youdaoresult").val();
        $("#engzhaiyao").val(youdaoresult);
    },
    jointitle:function(){
        var youdaoresult = $("#youdaoresult").val();
        $("#engtitle").val(youdaoresult);
    },
    getSelectedText() {
        if (window.getSelection) {
            // This technique is the most likely to be standardized.
            // getSelection() returns a Selection object, which we do not document.
            return window.getSelection().toString();
        }
        else if (document.getSelection) {
            // This is an older, simpler technique that returns a string
            return document.getSelection();
        }
        else if (document.selection) {
            // This is the IE-specific technique.
            // We do not document the IE selection property or TextRange objects.
            return document.selection.createRange().text;
        }
    },
    fristinit:function () {
        var orgorders =  $(".orgorder");
        $.each(orgorders,function (i,o) {
            $(o).find("div").each(function (ii,oo) {
                if(ii==0){
                    $(oo).trigger("click");
                    return false;
                }
                // if($(oo).attr("class")=="newslist_row_select"){
                //
                // }
            })
        })
    },
    additem_title_zhaoyao:function () {
        var orderid=$("#orderid").val();
        var contextid=$("#contextid").val();
        var url = document.urlmanager.base.url + "/order/item/add/"+orderid;
        var param=[];
        var title=$("#yulan_title").html();
        var zhaiyao=$("#yulan_zhaiyao").html();
        var engtitle=$("#engtitle").val();
        var engzhaoyao = $("#engzhaiyao").val();
        if(engtitle.trim()!=""){
            param.push({
                Id:0,
                Context:{
                    Id:contextid
                },
                Operator:{
                    Id:init.get.userinfo().data.userinfo.userid
                },
                ItemType:0,
                Data:engtitle,
                Title:title
            })
        }
        if(engzhaoyao.trim()!=""){
            param.push({
                Id:0,
                Context:{
                    Id:contextid
                },
                Operator:{
                    Id:init.get.userinfo().data.userinfo.userid
                },
                ItemType:1,
                Data:engzhaoyao,
                Title:zhaiyao
            })
        }
        console.log(JSON.stringify(param));
        fanyi.additem_common(param,orderid);

    },
    additem_shuxing:function () {
        var orderid=$("#orderid").val();
        var contextid=$("#contextid").val();
        var url = document.urlmanager.base.url + "/order/item/add/"+orderid;
        var param=[];
        var mtmc=$("#mtmc").val();
        var mtmc_eng=$("#mtmc_eng").val();
        var ly=$("#ly").val();
        var ly_eng = $("#ly_eng").val();
        var lm=$("#lm").val();
        var lm_eng = $("#lm_eng").val();
        if(mtmc_eng.trim()!=""){
            param.push({
                Id:0,
                Context:{
                    Id:contextid
                },
                Operator:{
                    Id:init.get.userinfo().data.userinfo.userid
                },
                ItemType:3,
                Data:mtmc_eng,
                Title:mtmc
            })
        }
        if(ly_eng.trim()!=""){
            param.push({
                Id:0,
                Context:{
                    Id:contextid
                },
                Operator:{
                    Id:init.get.userinfo().data.userinfo.userid
                },
                ItemType:3,
                Data:ly_eng,
                Title:ly
            })
        }
        if(lm_eng.trim()!=""){
            param.push({
                Id:0,
                Context:{
                    Id:contextid
                },
                Operator:{
                    Id:init.get.userinfo().data.userinfo.userid
                },
                ItemType:3,
                Data:lm_eng,
                Title:lm
            })
        }
        var sslist = $("[name='zdyss']");
        $.each(sslist,function (i,o) {
            var title = $(o).val();
            var engvalue = $("#"+$(o).attr("targetid")).val();
            if(engvalue.trim()!=""){
            param.push({
                Id:0,
                Context:{
                    Id:contextid
                },
                Operator:{
                    Id:init.get.userinfo().data.userinfo.userid
                },
                ItemType:4,
                Data:engvalue,
                Title:title
            })
            }
        })
        console.log(JSON.stringify(param));
        fanyi.additem_common(param,orderid);
    },
    additem_context:function () {
        var orderid=$("#orderid").val();
        var contextid=$("#contextid").val();
        var url = document.urlmanager.base.url + "/order/item/add/"+orderid;
        var engcontext = $("#engcontextresult").val();
        var context = $("#yulan_context").html();
        var param=[];
        if(engcontext.trim()!=""){
        param.push({
            Id:0,
            Context:{
                Id:contextid
            },
            Operator:{
                Id:init.get.userinfo().data.userinfo.userid
            },
            ItemType:4,
            Data:engcontext,
            Title:context
        })
        }
        console.log(JSON.stringify(param));
        fanyi.additem_common(param,orderid);
    },
    additem_common:function (param,orderid) {
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url +"/order/item/add/range/"+orderid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            $.bootstrapLoading.end();
            if (data.res != 0) {
                alert(data.msg);
            } else {
                alert("翻译项已添加")
            }
        })
    }
}