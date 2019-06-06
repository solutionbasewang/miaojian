var fanyi={
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
        //         $(obj).attr("class","new_fenlei_item_select");
        //     }
        // })
    },
    orglistchange: function () {
        var orgid = $("#orglist").val();
        select_bind.fenleiselect_new_fj(orgid, "fenleilist",function () {

        });
        // news.getcolinfo();
    },
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
    news_dateselect:function (id) {
        $("#new_date span").each(function (i, obj) {
            $(obj).attr("class","new_type_select_no");
        })
        $("#" + id).attr("class","new_type_select");
    },
    new_fystate:function (id) {
        $("#news_fastate span").each(function (i, obj) {
            $(obj).attr("class","new_type_select_no");
        })
        $("#" + id).attr("class","new_type_select");
    },
    news_xwdxselect:function(id){
        $("#news_xwdx span").each(function (i,obj) {
            $(obj).attr("class","new_type_select_no");
        })
        $("#" + id).attr("class","new_type_select");
    },
    load_order:function (page) {
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        fanyi.cleandata();
        var pagesize=30;
        $("#orderlists").html("");
        var url = document.urlmanager.base.url + "/order/query/" + page + "/"+pagesize;
        var orgs = [];
        orgs.push($("#orglist").val());
        var param =
            {
                OrgIds: orgs,
                ContextIds: [],
                Sponsor: null,
                Executor: null,
                StartTime: $("#btime").val(),
                StopTime: $("#etime").val(),
                OrderFlag: 0,
                OrderCategory: 0,
                Title: $("#search_title").val(),
            }
        $("#fenleilist div").each(function (i, obj) {
            if ($(obj).attr("select") == "1") {
                param.ClsId = $(obj).attr("clsid");
            }
        })
        $("#news_xwdx span").each(function (i, obj) {
            if ($(obj).attr("class") == "new_type_select") {
                if ($(obj).attr("value") != "-1") {
                    param.ReportType = $(obj).attr("value");
                }
            }
        })
        $("#new_date span").each(function (i, obj) {
            if ($(obj).attr("class") == "new_type_select") {
                param.TimerType = $(obj).attr("value");
            }
        })
        $("#news_fastate span").each(function (i, obj) {
            if ($(obj).attr("class") == "new_type_select") {
                if ($(obj).attr("value") != "-1") {
                    param.TranslateStatus = $(obj).attr("value");
                }
            }
        })
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
        console.log(JSON.stringify(param));
        fanyi.load_order_count(param);
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                $("#table_newslist").html("");
                var html=fanyi.buildorder(data.data.Items, 1);
                $("#table_newslist").append(html);
                tool.paper("page", page, Math.ceil(data.data.Total / pagesize), pagesize, function (page) {
                    fanyi.load_order(page);
                });
                $.bootstrapLoading.end();
            }
        });

    },
    load_order_count:function(param){
        var url = document.urlmanager.base.url +"/order/query/statistic";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                var fj = data.data.Translate;
                $("#news_fastate_1").html("全部("+(fj.全部)+ ")");
                $("#news_fastate_4").html("翻译完成("+fj.已翻译+ ")");
                $("#news_fastate_2").html("未翻译("+fj.未翻译+ ")");
                $("#news_fastate_3").html("正在翻译("+fj.翻译中+ ")");
            }
        })

    },
    load_news:function(obj,order_id){

        if($("#editbutton").attr("value")=="1") {
            alert("请先退出当前编辑的新闻");
            return false;
        }
        fanyi.cleandata();
        fanyi.init_newsselect();
        if($(obj).attr("class")=="newslist_row_select"){
            return false;
        }
        else {
            $(obj).attr("class","newslist_row_select");
        }
        // fanyi.select_order(obj)
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url + "/order/query/"+order_id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
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
                fanyi.loadp(context.Id);
                $.bootstrapLoading.end();
            }
        })
    },
    load_context:function(contextid){
        $("#yulan_context").html("");
        var url = document.urlmanager.base.url + "/context/get/"+contextid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {

                $("#yulan_context").html(data.data.Content);
                $("#fjsj").html(data.data.CreateTime.replace("T"," "));
                var fl = data.data.Allocations;
                if(fl.length>0){
                    $("#ycfl").html(fl[0].Classification.name);
                }

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
    buildorder:function(list,flag){
        var html="";
        $.each(list,function (i,o) {
            html+="<div class='' onclick=fanyi.load_news(this,'"+o.Id+"')>";
            html+="<div style='width:3%;'><input type='checkbox' value='"+o.Id+"'></div>";
            html+="<div style='width:27%;' title='"+o.Items[0].Context.Title+"'>"+tool.stringtool.substr(o.Items[0].Context.Title,10)+"</div>";
            html+="<div style='width:30%;' title='"+o.Items[0].Context.MediaName+"'>"+o.Items[0].Context.MediaName+"</div>";
            html+="<div style='width:20%;' title=''>"+o.Items[0].Context.CreateTime.replace('T',' ')+"</div>";
            html+="<div style='width:20%;' title=''>";
            if(o.IsPressing) {
                html += "<a class='tag_a_jj'><i class='fa fa-globe' aria-hidden='true'></i></a>";
            }
            else {
                html += "<a class='tag_a'><i class='fa fa-globe' aria-hidden='true'></i></a>";
            }
            if(o.Items[0].Context.GeneratedDayReport) {
                html += "<a class='tag_a_do'><i class='fa fa-sun-o' aria-hidden='true'></i></a>";
            }
            else {
                html += "<a class='tag_a_nodo'><i class='fa fa-sun-o' aria-hidden='true'></i></a>";
            }
            if(o.Items[0].Context.GeneratedClipsReport)
            {
                html+="<a class='tag_a_do'><i class='fa fa-file-text-o' aria-hidden='true'></i></a>"
            }
            else {
                html+="<a class='tag_a_nodo'><i class='fa fa-file-text-o' aria-hidden='true'></i></a>"

            }


            html+="</div>";
            html+="</div>";
        });
        return html;
    },
    init_newsselect:function(){
        $("#table_newslist").children("div").each(function (i,o) {
            $(o).attr("class","");
        })
    },
    newsedit:function (obj) {
        var contextid=$("#contextid").val();
        var orderid=$("#orderid").val();
        var isselect=false;
        // var isgo=false;
        $("#table_newslist").children("div").each(function (i,o) {
            var t = $(o).attr("class");
            if(t=="newslist_row_select");
            {
                isselect=true;
                return;
            }
        })
        // var eurl= document.urlmanager.base.url + "/locker/exists/"+orderid+"/"+init.get.userinfo().data.userinfo.userid;
        // tool.ajaxTool.ajax(eurl, tool.ajaxTool.ajaxtype.get, null, false, function (data) {
        //     if (data.res != -2) {
        //
        //         isgo=true;
        //     }
        //     else {
        //
        //     }
        // })
        // if(!isgo){
        //     alert("新闻已锁定,请稍后重试")
        //     return;
        // }
        if(isselect&&contextid!=""&&orderid!=""){
            if($(obj).attr("value")=="0") {
                var eurl= document.urlmanager.base.url + "/order/editor/entry/"+orderid+"/"+init.get.userinfo().data.userinfo.userid;
                tool.ajaxTool.ajax(eurl, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
                    if (data.res != 0) {
                        alert(data.msg);
                    }
                    else {
                        $("#btn_title").show();
                        $("#btn_sx").show();
                        $("#btn_context").show();
                        buju.open_yulan();
                        $(obj).attr("value","1");
                        $(obj).text("退出编辑");
                    }
                })
                console.log(eurl);
            }
            else {
                var surl= document.urlmanager.base.url + "/order/editor/exit/"+orderid+"/"+init.get.userinfo().data.userinfo.userid;
                tool.ajaxTool.ajax(surl, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
                    if (data.res >=-99&&data.res<0) {
                        alert(data.msg);
                    }
                    else if(data.res<-99){
                        alert("系统错误");
                    }
                    else {
                        $("#btn_title").hide();
                        $("#btn_sx").hide();
                        $("#btn_context").hide();
                        buju.close_yulan();
                        $(obj).attr("value","0");
                        $(obj).text("进入编辑");
                        fanyi.init_newsselect();
                    }
                })


            }
        }
        else {
            alert("请选择要编辑的新闻");
        }
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
    tool_mouseget:function(){
        var value = fanyi.getSelectedText();
        $("#youdaoresult").val(value);
    },
    additem_title_zhaoyao:function () {
        var orderid=$("#orderid").val();
        var contextid=$("#contextid").val();
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
                fanyi.order_log();
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
    cleandata:function () {
        $("#yuanwen").val("");
        $("#yiwen").val("");
        $("#yulan_title").html("");
        $("#url").html("");
        $("#jz").html("");
        $("#fbsj").html("");
        $("#yulan_zhaiyao").html("");
        $("#yulan_context").html("");
        $("#engtitle").val("");
        $("#engzhaiyao").val("");
        $("#mtmc").val("");
        $("#mtmc_eng").val("");
        $("#ly").val("");
        $("#ly_eng").val("");
        $("#lm").val("");
        $("#lm_eng").val("");
        $("#plist tbody").html("");
        $("#engcontextresult").val("");
        $("#itemlist tbody").html("<tr><td colspan='3' style='text-align: center;'>没有翻译记录</td></tr>")
        $("#contextid").val("");
        $("#orderid").val("");
        fanyi.init_newsselect();
    },
    hebing:function () {
        var orders = fanyi.getSelectedcheck();
        console.log(JSON.stringify(orders));
        if(orders.length>=2){
            var url = document.urlmanager.base.url +"/order/combin";
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, orders, true, function (data) {
                $.bootstrapLoading.end();
                if (data.res != 0) {
                    alert(data.msg);
                } else {
                    alert("合并成功")
                }
            })
        }
        else {
            alert("请选择要合并的订单");
        }
    },
    getSelectedcheck:function () {
        var checkboxs =$("#table_newslist").find("input");
        var orders=[];
        $.each(checkboxs,function (i,o) {
            var isChecked = $(o).prop("checked");
            if(isChecked){
                orders.push($(o).attr("value"));
            }
        })
        return orders;
    },
    zhankai:function (contextid) {

    },
    loadp:function(contextid){
        var url = document.urlmanager.base.url +"/context/get/"+contextid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $.bootstrapLoading.end();
            if (data.res != 0) {
                alert(data.msg);
            } else {
                var p = data.data.Properties;
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
            }
        })
    },
    orderdele:function () {
        var orders = fanyi.getSelectedcheck();
        if(orders.length==0){
            alert("请选择要删除的订单");
            return false;
        }
        var url = document.urlmanager.base.url +"/order/delete";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, orders, true, function (data) {
            $.bootstrapLoading.end();
            if (data.res != 0) {
                alert(data.msg);
            } else {
                alert("删除成功");
            }
        })
    },
    order_log:function () {
        var orderid=$("#orderid").val();
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." });
        var url = document.urlmanager.base.url + "/order/query/"+orderid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res >=-99&&data.res<0) {
                alert(data.msg);
            }
            else if(data.res<-99){
                alert("系统错误");
            } else {
                fanyi.load_log(data.data.Items);
                $.bootstrapLoading.end();
            }
        })
    }
}