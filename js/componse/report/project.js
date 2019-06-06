var report={
    rychange:function(id,targetid){
        var url = document.urlmanager.base.url + "/userinfo/selectbyid/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if(data.res==0){
                $("#"+targetid).text(data.data.realname);
            }
        })
    },
    add:function () {
        report.refresh();
        $("#orgsave").modal("show");

    },
    fyry_add:function () {
        var id=tool.uuid();
        var zjid=tool.uuid();
        var sjid=tool.uuid();
        var html="<tr class='fyry_add'>";
        html+="<td style='width:20%'><select id='"+id+"'></select></td>";
        html+="<td style='width:10%'><span id='"+zjid+"'></span></td>";
        html+="<td style='width:10%'><span id='"+sjid+"'></span></td>";
        html+="<td style='width:50%'><p class='fa fa-minus-circle' style='color: #b52b27' onclick='report.fyry_dele(this)'></p></td>";
        html+="</tr>"
        $("#fyrylist").append(html);
        select_bind.selectuser(id,0);

    },
    fyry_dele:function(obj){
        $(obj).parent().parent().remove();
    },
    fyry_change:function(obj,zjid,sjid){
        var id=$(obj).val();
        var url = document.urlmanager.base.url + "/userinfo/selectbyid/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if(data.res==0){
                $("#"+zjid).html("");
                $("#"+sjid).html(data.data.mobile==null?"":data.data.mobile);
            }
        })
    },
    fyry_get:function(){
        var result=[];
        var trs = $("#fyrylist").children("tr");
        $.each(trs,function (i,o) {
            var fyry=$(o).children("td").eq(0).children("select").eq(0);
            result.push({id:$(fyry).val()});
        })
        return result;
    },
    fyry_init:function(list){
        $("#fyrylist").html("");
        $.each(list,function (i,o) {
            var id=tool.uuid();
            var zjid=tool.uuid();
            var sjid=tool.uuid();
            var html="<tr class='fyry_add'>";
            html+="<td style='width:20%'><select id='"+id+"' onchange=report.fyry_change(this,'"+zjid+"','"+sjid+"')></select></td>";
            html+="<td style='width:10%'><span id='"+zjid+"'></span></td>";
            html+="<td style='width:10%'><span id='"+sjid+"'>"+o.mobile+"</span></td>";
            html+="<td style='width:50%'><p class='fa fa-minus-circle' style='color: #b52b27' onclick='report.fyry_dele(this)'></p></td>";
            html+="</tr>"
            $("#fyrylist").append(html);
            select_bind.selectuser(id,o.id);
            $("#"+id).val(o.id);
        })
    },
    sx_add:function (title, context) {
        $("#pweihu").modal("show");
        // sxlist
        var html=" <div class='form-group'> <label>"+title+"</label><p class='fa fa-minus-circle' style='color: #b52b27' onclick='report.sx_dele(this)'></p><input class='form-control' id='p_name' value='"+context+"'></div>";
        $("#sxlist").append(html);
    },
    sx_close:function () {
        $("#pweihu").modal("hide");
    },
    sx_show:function(){
        $("#pweihu").modal("show");
    },
    sx_build:function () {
        var title = $("#sxtitle").val();
        var context = $("#sxcontext").val();
        if(title==""){
            alert("事项名称不能为空");
            return;
        }
        report.sx_add(title,context);
        $("#pweihu").modal("hide");

    },
    sx_dele:function(obj){
        $(obj).parent().remove();
    },
    sx_get:function(){
        var result=[];
        var divs = $("#sxlist").children("div");
        $.each(divs,function (i,o) {
            var key = $(o).children("label").eq(0);
            var value=$(o).children("input").eq(0);
            var data={
                Title:$(key).text(),
                Remark:$(value).val()
            }
            result.push(data);
        })
        return result;
    },
    sx_init:function(list){
        $("#sxlist").html("");
        $.each(list,function (i,o) {
            var html=" <div class='form-group'> <label>"+o.Title+"</label><p class='fa fa-minus-circle' style='color: #b52b27' onclick='report.sx_dele(this)'></p><input class='form-control' id='p_name' value='"+o.Remark+"'></div>";
            $("#sxlist").append(html);
        })
    },
    ckzl_add:function () {
        var html=" <div class='form-group'><p class='fa fa-minus-circle' style='color: #b52b27' onclick='report.ckzl_dele(this)'></p><input type='text' class='form-control' id='p_name'></div>";
        $("#ckzllist").append(html);
    },
    ckzl_dele:function(obj){
        $(obj).parent().remove();
    },
    ckzl_get:function(){
       var divs= $("#ckzllist").children("div");
       var result="";
       $.each(divs,function (i,o) {
            var v=$(o).children("input").eq(0).val();
            result+=v+",";
       })
        result=result.substr(0, result.length - 1);
       return result.split(",");
    },
    ckzl_init:function(list){
        $("#ckzllist").html("");
        $.each(list,function (i,o) {
            var html=" <div class='form-group'><p class='fa fa-minus-circle' style='color: #b52b27' onclick='report.ckzl_dele(this)'></p><input type='text' class='form-control' id='p_name' value='"+o+"'></div>";
            $("#ckzllist").append(html);
        })
    },
    ts_add:function () {
        var id=tool.uuid();
        var jsid=tool.uuid();
        var html="<table class='xqtable' style='height: 100%;margin-top: 3px;'><tr><td colspan='6'><input type='hidden' value='0'><span onclick='report.ts_dele(this)'>[删除]</span></td></tr><tr><td>日期</td><td><input type='text' id='tsrq' class='form_datetime' /></td></tr><tr><td>部门</td><td><select id='g"+id+"'></select></td><td>翻译责任人</td><td><select id='"+id+"'></select></td><td>客户投诉人</td><td><select type='text' id='"+jsid+"'></select></td></tr><tr><td>投诉问题描述</td><td colspan='5'><textarea id='tswtms'></textarea></td></tr> <tr><td>备注</td><td colspan='5'><textarea id='tsbz'></textarea></td></tr> </table>";
        $("#ketslist").append(html);
        select_bind.selectuser(id,"0");
        select_bind.selectuser(jsid,"0");
        //select_bind.selectusergrop("g"+id,"0");
        select_bind.selectdepart("g"+id,"0");
        $(".form_datetime").datetimepicker({
            format: 'yyyy-mm-dd hh:ii', //显示格式
            todayHighlight: 1, //今天高亮
            minView: 0, //设置只显示到月份
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            autoclose: 1 //选择后自动关闭
        });
    },
    ts_dele:function(obj){
        $(obj).parent().parent().parent().parent().remove();
    },
    ts_init:function(list) {
        $("#ketslist").html("");
        $.each(list,function (i,o) {
            var fyselectid= tool.uuid();
            var khselectid=tool.uuid();
            var html="<table class='xqtable' style='height: 100%;margin-top: 3px;'>";
            html+="<tr><td colspan='6'><input type='hidden' value='"+o.Id+"'> <span onclick='report.ts_dele(this)'>[删除]</span></td></tr>";
            html+="<tr><td>日期</td><td><input type='text' id='tsrq' class='form_datetime' value='"+o.CreateTime.replace('T',' ')+"' /></td></tr>"
            html+="<tr><td>部门</td>";
            html+="<td><select id='g"+fyselectid+"'></select></td>";
            html+="<td>翻译责任人</td><td><select id='"+fyselectid+"'></select></td>" +
                "<td>客户投诉人</td><td><select  id='"+khselectid+"'></select></td></tr>" +
                "<tr><td>投诉问题描述</td><td colspan='5'><textarea id='tswtms'>"+o.Question+"</textarea></td></tr> " +
                "<tr><td>备注</td><td colspan='5'><textarea id='tsbz'>"+o.Remark+"</textarea></td></tr> </table>";
            $("#ketslist").append(html);
            select_bind.selectuser(fyselectid,o.Translater.id);
            select_bind.selectdepart("g"+fyselectid,"0");
            select_bind.selectuser(khselectid,o.Receiving.id);
        })
        $(".form_datetime").datetimepicker({
            format: 'yyyy-mm-dd hh:ii', //显示格式
            todayHighlight: 1, //今天高亮
            minView: 0, //设置只显示到月份
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            autoclose: 1 //选择后自动关闭
        });
    },
    ts_get:function () {
        var result=[];
        var tables=$("#ketslist").children("table");
        $.each(tables,function (i,o) {
            var data={};
            var trs = $(o).children("tbody").eq(0).children("tr");
            var td_input_id=$(trs[0]).children("td").eq(0).children("input").eq(0);
            var td_input_createtime=$(trs[1]).children("td").eq(1).children("input").eq(0);
            var td_select_fyzrr=$(trs[2]).children("td").eq(3).children("select").eq(0);
            var td_select_khtsr=$(trs[2]).children("td").eq(5).children("select").eq(0);
            var td_textarea_tswtms=$(trs[3]).children("td").eq(1).children("textarea").eq(0);
            var td_textarea_bz=$(trs[4]).children("td").eq(1).children("textarea").eq(0);
            data.Id=$(td_input_id).val();
            data.CreateTime=$(td_input_createtime).val();
            data.Translater={id:$(td_select_fyzrr).val()};
            data.Receiving={id:$(td_select_khtsr).val()};
            data.Question=$(td_textarea_tswtms).val();
            data.Remark=$(td_textarea_bz).val();
            result.push(data);
        })
        return result;
    },
    bg_add:function () {
        var html = "<tr>";
        html += "<td><input type='text' style='display:none' value='0'/>";
        html +=
            "<select><option value='0'>日报</option><option value='2'>周报</option><option value='3'>月报</option><option value='4'>季报</option><option value='5'>年报</option><select>";
        html += "</td>";
        html += "<td>";
        html += "<table class='xqtable' style='height: 100%'>";
        html += "<tr>";
        html += "<td>翻译完成时间" + "</td>";
        html += "<td><input type='text'>" + "</td>";
        html += "<td>时间备注" + "</td>";
        html += "<td><input type='text'>" + "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td>备注信息" + "</td>";
        html += "<td><input type='text'>" + "</td>";
        html += "</tr>";
        html += "<tr>";
        html += "<td>报告提交时间" + "</td>";
        html += "<td><input type='text'>" + "</td>";
        html += "<td>新闻上传时间" + "</td>";
        html += "<td><input type='text'>" + "</td>";
        html += "</tr>";
        html += "</table>"
        html += "</td>";
        html += "<td ><p class='fa fa-minus-circle' style='color: #b52b27' onclick='report.bg_dele(this)'></p></td>"
        html += "</tr>";
        $("#bgl").append(html);
    },
    bg_dele:function (obj) {
        $(obj).parent().parent().remove();
    },
    bg_get:function () {
        var result = [];
        var trs = $("#bgl tbody").eq(0).children("tr");
        $.each(trs, function (i, o) {
            var td_1 = $(o).children("td").eq(0);
            var input_bg_id = $(td_1).children("input").eq(0)
            var select_bg_type = $(td_1).children("select").eq(0);
            var td_2 = $(o).children("td").eq(1);
            var table_bginfo = $(td_2).children("table").eq(0);
            var td_bginfo = $(table_bginfo).find("td");
            var fywcsj = $($(td_bginfo).eq(1).children("input").eq(0)).val();
            var sjbz = $($(td_bginfo).eq(3).children("input").eq(0)).val();
            var bzxx = $($(td_bginfo).eq(5).children("input").eq(0)).val();
            var bgtjsj = $($(td_bginfo).eq(7).children("input").eq(0)).val();
            var xwscsj = $($(td_bginfo).eq(9).children("input").eq(0)).val();
            var obj={
                Id:$(input_bg_id).val(),
                ReportType:$(select_bg_type).val(),
                TranslateOverTime:fywcsj,
                TranslateOverTimeRemark:sjbz,
                Remark:bzxx,
                ReportSubmitTime:bgtjsj,
                ReportUploadTime:xwscsj
            }
            result.push(obj);
            //console.log(JSON.stringify(obj));
        })
        return result;
    },
    bg_init:function (list) {
        $("#bgl").html("<tbody></tbody>");
        $.each(list, function (i, o) {
            var html = "<tr>";
            html += "<td><input type='text' style='display:none' value='"+o.Id+"'/>";
            html +="<select id='select"+i+"'><option value='0'>日报</option><option value='2'>周报</option><option value='3'>月报</option><option value='4'>季度</option><option value='5'>年报</option><select>";
            html += "</td>";
            html += "<td>";
            html += "<table>";
            html += "<tr>";
            html += "<td>翻译完成时间" + "</td>";
            html += "<td><input type='text' value='" + o.TranslateOverTime + "'>" + "</td>";
            html += "<td>时间备注" + "</td>";
            html += "<td><input type='text' value='" + o.TranslateOverTimeRemark + "'>" + "</td>";
            html += "</tr>";
            html += "<tr>";
            html += "<td>备注信息" + "</td>";
            html += "<td><input type='text' value='" + o.Remark + "'>" + "</td>";
            html += "</tr>";
            html += "<tr>";
            html += "<td>报告提交时间" + "</td>";
            html += "<td><input type='text' value='" + o.ReportSubmitTime + "'>" + "</td>";
            html += "<td>新闻上传时间" + "</td>";
            html += "<td><input type='text' value='" + o.ReportUploadTime + "'>" + "</td>";
            html += "</tr>";
            html += "</table>"
            html += "</td>";
            html += "<td><p class='fa fa-minus-circle' style='color: #b52b27' onclick='report.bg_dele(this)'></p></td>"
            html += "</tr>";
            $("#bgl").append(html);
            $("#select"+i).val(o.ReportType);
        })
    },
    all_save:function () {
        var SelfContext=$("#SelfContext").val().replace("，",",");
        var CompetitorsContext=$("#CompetitorsContext").val().replace("，",",");
        var ClipsElements=$("#jianbao").val().replace('，',",");
        var range=[];

        $("input[name='jcfw']").each(function (i,o) {
            var temp = $(o).prop('checked');
            if(temp){
                //alert($(o).val());
                range.push(parseInt($(o).val()));
            }
        });
        var ReportSenderInfos=[];
        var rbt={
            Type:0,
            SenderType:0,
            SenderTime:$("#ribao").val()
        }
        var zbt={
            Type:2,
            SenderType:2,
            SenderTime:$("#zhoubao").val()
        }
        var ybt={
            Type:3,
            SenderType:3,
            SenderTime:$("#yuebao").val()
        }
        var jbt={
            Type:4,
            SenderType:4,
            SenderTime:$("#jibao").val()
        }
        var nbt={
            Type:5,
            SenderType:5,
            SenderTime:$("#nianbao").val()
        }
        ReportSenderInfos.push(rbt);
        ReportSenderInfos.push(zbt);
        ReportSenderInfos.push(ybt);
        ReportSenderInfos.push(jbt);
        ReportSenderInfos.push(nbt);
        var data={
            Id:$("#jbid").val(),
            Name:$("#Name").val(),
            Organization:{id:$("#jglist").val()},
            Type:$("#Type").val(),
            StartTime:moment(new Date($("#btime").val())).format("YYYY-MM-DD hh:mm"),
            ExpiryTime:moment(new Date($("#etime").val())).format("YYYY-MM-DD hh:mm"),
            IsTrial:report.stringtobool($("#sfsy").val()),
            NormalRequirement:{
                Id:$("#normalid").val(),
                SelfContext:SelfContext.split(","),
                CompetitorsContext:CompetitorsContext.split(","),
                Range:range,
                TVMonitorInfomation:report.stringtobool($("#TVMonitorInfomation").val()),
                TranslateInfomation:report.stringtobool($("#TranslateInfomation").val()),
                ClipsElements:ClipsElements.split(","),
                ReportSenderInfos:ReportSenderInfos,
                IsOriginalReport:report.stringtobool($("#IsOriginalReport").val()),
                IsPrint:report.stringtobool($("#IsPrint").val()),
                ScanRemark:$("#ScanRemark").val(),
                InternetRemark:$("#InternetRemark").val(),
                SystemPlatformRemark:$("#SystemPlatformRemark").val(),
                SalesManager:{id:$("#SalesManager").val()},
                MonitorManager:{id:$("#MonitorManager").val()},
                CustomServiceManager:{id:$("#CustomServiceManager").val()},
                TranslateManager:{id:$("#TranslateManager").val()}
            },
            Translater:report.fyry_get(),
            TimeInfos:report.bg_get(),
            Attentions:report.sx_get(),
            ReferenceInformation:report.ckzl_get(),
            FeedbackInfomartions:report.ts_get()
        };

        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." })
        var url = document.urlmanager.base.url + "/project/save";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, data, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                report.select();
            }
            $.bootstrapLoading.end();
            $("#orgsave").modal("hide");
        })
        console.log(JSON.stringify(data));
    },
    all_init:function (id) {
        report.refresh();
        $("#orgsave").modal("show");
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." })
        var url = document.urlmanager.base.url + "/project/find/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                data=data.data;
                $("#jbid").val(data.Id);
                $("#normalid").val(data.NormalRequirement.Id);
                $("#Name").val(data.Name);
                $("#Type").val(data.Type);
                $("#btime").val(moment(new Date(data.StartTime.replace("T"," "))).format("YYYY-MM-DD hh:mm"));
                $("#etime").val(moment(new Date(data.ExpiryTime.replace("T"," "))).format("YYYY-MM-DD hh:mm"));
                
                $("#sfsy").val(""+data.IsTrial+"");
                $("#SelfContext").val(data.NormalRequirement.SelfContext);
                $("#CompetitorsContext").val(data.NormalRequirement.CompetitorsContext);
                $.each(data.NormalRequirement.Range,function (ii,oo) {
                    $("input[name='jcfw']").each(function (i,o) {

                        if($(o).val()==oo){
                            $(o).attr("checked","true")
                        }
                    });
                })

                $("#TVMonitorInfomation").val(""+data.NormalRequirement.TVMonitorInfomation+"");
                $("#TranslateInfomation").val(""+data.NormalRequirement.TranslateInfomation+"");
                $("#ClipsElements").val(data.NormalRequirement.ClipsElements);
                $.each(data.NormalRequirement.ReportSenderInfos,function (i,o) {
                    if(o.Type==0){
                        $("#ribao").val(o.SenderTime);
                    }
                    else if(o.Type==2){
                        $("#zhoubao").val(o.SenderTime);
                    }
                    else if(o.Type==3){
                        $("#yuebao").val(o.SenderTime);
                    }
                    else if(o.Type==4){
                        $("#jibao").val(o.SenderTime);
                    }
                    else if(o.Type==5){
                        $("#nianbao").val(o.SenderTime);
                    }
                });
                $("#IsOriginalReport").val(""+data.NormalRequirement.IsOriginalReport+"");
                $("#IsPrint").val(""+data.NormalRequirement.IsPrint+"");
                $("#ScanRemark").val(data.NormalRequirement.ScanRemark);
                $("#InternetRemark").val(data.NormalRequirement.InternetRemark);
                $("#SystemPlatformRemark").val(data.NormalRequirement.SystemPlatformRemark);
                $("#SalesManager").val(data.NormalRequirement.SalesManager.id);
                $("#MonitorManager").val(data.NormalRequirement.MonitorManager.id);
                $("#CustomServiceManager").val(data.NormalRequirement.CustomServiceManager.id);
                $("#TranslateManager").val(data.NormalRequirement.TranslateManager.id);
                report.fyry_init(data.Translater);
                report.bg_init(data.TimeInfos);
                report.sx_init(data.Attentions);
                report.ckzl_init(data.ReferenceInformation);
                report.ts_init(data.FeedbackInfomartions)
            }
            $.bootstrapLoading.end();
        })
    },
    select:function () {
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." })
        var url = document.urlmanager.base.url + "/project/query/"+$("#jglist").val()+"/1/10000";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#reports").html("");
                $.each(data.data.Items,function (i,o) {
                    var html = "<div><div class='report_title'>" + o.Name + "</div>";
                    html += "<div class='report_title'>常规需求 <p class='fa fa-download'></p></div>";
                    html += "<div class='report_title'>翻译需求 <p class='fa fa-download'></p></div>";
                    html += "<div class='report_title'><span>"+moment(new Date(o.CreateTime)).format("YYYY-MM-DD")+"</span>  <p class='fa fa-trash-o' " +
                        "onclick=report.dele('"+o.Id+"')></p></div>";
                    html+="<div class='report_operate'><span href='#' onclick=report.all_init('"+o.Id+"')>维护</span></div>"
                    html += "</div>";
                    $("#reports").append(html);

                })
            }
            $.bootstrapLoading.end();

        })

    },
    stringtobool:function (v) {
        if(v=="true"){
            return true;
        }
        else {
            return false;
        }
    },
    jgchange:function () {
        report.select();
    },
    dele:function (id) {
        $.bootstrapLoading.start({ loadingTips: "正在处理数据，请稍候..." })
        var url = document.urlmanager.base.url + "/project/delete/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                report.select();
            }
            $.bootstrapLoading.end();
        })
    },
    refresh:function () {
        $("#jbid").val("0");
        $("#normalid").val("0");
        $("#Name").val("");
        $("#Type").val("");
        $("#btime").val("");
        $("#etime").val("");

        $("#sfsy").val("");
        $("#SelfContext").val("");
        $("#CompetitorsContext").val("");
        $("input[name='jcfw']").each(function (i, o) {
            $(o).removeAttr("checked");
        });
        $("#TVMonitorInfomation").val("");
        $("#TranslateInfomation").val("");
        $("#ClipsElements").val("");
        $("#ribao").val("");
        $("#zhoubao").val("");
        $("#yuebao").val("");
        $("#jibao").val("");
        $("#nianbao").val("");
        $("#IsOriginalReport").val("");
        $("#IsPrint").val("");
        $("#ScanRemark").val("");
        $("#InternetRemark").val("");
        $("#SystemPlatformRemark").val("");
        $("#SalesManager").val("");
        $("#MonitorManager").val("");
        $("#CustomServiceManager").val("");
        $("#TranslateManager").val("");
        report.fyry_init([]);
        report.bg_init([]);
        report.sx_init([]);
        report.ckzl_init([]);
        report.ts_init([])
    }
    
}