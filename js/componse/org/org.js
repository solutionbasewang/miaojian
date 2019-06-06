var org={
    allp:[
        {
            type:"input",
            id:"p_id",
            isnull:false,
            p:"id",
            paramtype:"value"
        },
        {
            type:"input",
            id:"p_name",
            isnull:false,
            p:"name",
            paramtype:"value"
        },
        {
            type:"radio",
            id:"optionsRadiosInline",
            isnull:false,
            p:"status",
            paramtype:"value"
        },
        {
            type:"radio",
            id:"isplatformradio",
            isnull:false,
            p:"isplatform",
            paramtype:"value"
        },
        {
            type:"select",
            id:"p_domain",
            isnull:false,
            p:"domain",
            paramtype:"object",
            key:"id"
        }
    ],
    reloadvalidator:function(){
    },
    loaddata:function(page){
        var param = {
            name:$("#s_name").val(),
            status:$("#s_status").val()
        }
        var url=document.urlmanager.base.url+"/organization/select/"+page+"/10";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.post,param,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                $("#table_orglist tbody").html("");
                for(var i=0;i<data.data.Items.length;i++){
                    var html="";
                    html="<tr>";
                    html+="<td>"+data.data.Items[i].name+"</td>";
                    html+="<td>"+(data.data.Items[i].status==0?"启用":"停用")+"</td>";
                    html+="<td>"+data.data.Items[i].createtime.replace("T"," ")+"</td>";
                    html+="<td>"+(data.data.Items[i].isplatform?"是":"否")+"</td>";
                    html+="<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=org.loadbyid('"+data.data.Items[i].id+"')>维护</a></td>";
                    html+="</tr>"
                    $("#table_orglist tbody").append(html);
                }
                tool.paper("page",page,Math.ceil(data.data.Total/10),10,function(page){
                    org.loaddata(page);
                });
            }

        })
    },
    search:function(){
        this.loaddata(1);
    },
    loadbyid:function(id){
        var checkboxs = $("#table_col tbody").find("input");
        $.each(checkboxs,function (ii,oo) {
            $(oo).prop("checked",false);
        })
        var url=document.urlmanager.base.url+"/organization/selectbyid/"+id;
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.get,null,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                let f = new fromtool(org.allp,data.data);
                f.fill_data();
                $.each(data.data.columninfos,function (i,o) {
                    var checkboxs = $("#table_col tbody").find("input");
                    $.each(checkboxs,function (ii,oo) {
                        if($(oo).attr("value")==o.id){
                            $(oo).prop("checked",true);
                            return false;
                        }
                    })
                })
                var jzdsstr = "";
                $("#table_jzdslist tbody").html("");
                $("#t_jzds").html("");
                data.data.competitors.forEach(jzds => {
                    jzdsstr += jzds.id + ",";
                    var html = "";
                    html = "<tr>";
                    html += "<td><input type='checkbox' onclick='org.checkedclick(this)' checked value='" + jzds.id + "'></td>";
                    html += "<td>" + jzds.name + "</td>";
                    html += "</tr>"
                    $("#table_jzdslist tbody").append(html);
                });
                $("#t_jzds").html(jzdsstr);
            }

        })
       
    },
    save:function(){
        org.reloadvalidator();
        let f = new fromtool(org.allp);
        let data = f.load_data();
        if(data.id=="")
        {
            data.id="0";
        }
        data.columninfos=[];
        var checkboxs = $("#table_col tbody").find("input");
        $.each(checkboxs,function (i,o) {
            if($(o).prop("checked")){
                data.columninfos.push({id:$(o).val()})
            }
        })
        data.Competitors=[];
        var jzdslist  = $("#t_jzds").html().substr(0, $("#t_jzds").html().length - 1).split(',');
        $.each(jzdslist,function (i,jzds) {
            if(jzds!=""){
            data.Competitors.push({id:jzds})
            }
        })
        if(data.name.trim()==""){
            alert("机构名称不能为空");
            return;
        }
        console.log(JSON.stringify(data));
        var url=document.urlmanager.base.url+"/organization/save";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.post,data,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                alert("保存成功");
                org.cleanform();
                org.search();
            }
        })
    },
    cleanform:function(){
        let f = new fromtool(org.allp);
        f.clean_data();
        $("#table_jzdslist tbody").html("");
        var checkboxs = $("#table_col tbody").find("input");
        $.each(checkboxs,function (i,o) {
            $(o).prop("checked", false);
        })
        // org.reloadvalidator();
    },
    selectjzds: function () {
        var param = {
            domainid: $("#p_domain").val()
        }
        var url =document.urlmanager.base.url +"/organization/query/domain/"+param.domainid+"/0";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#table_jzdslist tbody").html("");
                for (var i = 0; i < data.data.length; i++) {
                    var html = "";
                    html += "<tr>";
                    var jzds = $("#t_jzds").html().split(',');
                    if (org.checkoruncheck(jzds, data.data[i].id)) {
                        html += "<td><input type='checkbox' onclick='org.checkedclick(this)' checked value='" + data.data[i].id + "'></td>";
                    } else {
                        html += "<td><input type='checkbox' onclick='org.checkedclick(this)' value='" + data.data[i].id + "'></td>";

                    }
                    html += "<td>" + data.data[i].name + "</td>";
                    html += "</tr>"
                    $("#table_jzdslist tbody").append(html);

                }
            }

        })
    },
    checkedclick: function (obj) {
        if (obj.checked) {
            $("#t_jzds").html($("#t_jzds").html() + $(obj).val() + ",");
        } else {
            var roles = $("#t_jzds").html();
            var roles_array = roles.split(',');
            var newvalue = "";
            roles_array.forEach(role => {
                if (role != $(obj).val()) {
                    if (role != "") {
                        newvalue += role + ",";
                    }
                }
            })
            $("#t_jzds").html(newvalue);
        }
    },
    checkoruncheck: function (t_array, value) {
        var flag = false;
        for (let index = 0; index < t_array.length; index++) {
            const element = t_array[index];
            if (element == value) {
                flag = true;
                break;
            }
        }
        return flag;
    },
    load_col:function () {
        var url=document.urlmanager.base.url+"/dictionary/get/1811081125313181000000001";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.get,null,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                $("#table_col tbody").html("");
                $.each(data.data.children,function (i,o) {
                    var html="";
                    html+="<tr>";
                    html+="<td><input type='checkbox' value='"+o.id+"'></td>";
                    html+="<td>"+o.name+"</td>";
                    html+="</tr>";
                    $("#table_col tbody").append(html);
                })
            }
        })
    }
}