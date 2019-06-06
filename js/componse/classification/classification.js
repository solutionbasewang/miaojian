var fenlei = {
    allp: [{
            type: "input",
            id: "p_id",
            isnull: false,
            p: "id",
            paramtype: "value"
        },
        {
            type: "input",
            id: "p_name",
            isnull: false,
            p: "name",
            paramtype: "value"
        },
        {
            type: "radio",
            id: "unsortedflagRadiosInline",
            isnull: false,
            p: "unsortedflag",
            paramtype: "value"
        },
        {
            type: "radio",
            id: "optionsRadiosInline",
            isnull: false,
            p: "status",
            paramtype: "value"
        },
        {
            type:"select",
            id:"p_orgid",
            isnull:false,
            p:"orgid",
            paramtype:"value"
        },
        {
            type:"select",
            id:"p_parentid",
            isnull:false,
            p:"parentId",
            paramtype:"value"
        }
    ],
    loaddata: function (page) {
        var param = {
            Name: $("#s_name").val(),
            Status: $("#s_status").val(),
            OrgId:$("#orglist").val()
        }
        var url = document.urlmanager.base.url + "/classification/select/" + page + "/10";
        console.log(JSON.stringify(param));
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#table_fenleilist tbody").html("");

                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html = "<tr>";
                    html += "<td>" + data.data.Items[i].name + "</td>";
                    html += "<td>" + (data.data.Items[i].status == 0 ? "启用" : "停用") + "</td>";
                    html += "<td>" + data.data.Items[i].organization.name + "</td>";
                    html += "<td>" + data.data.Items[i].parentname + "</td>";
                    html += "<td><a href='#'  onclick=fenlei.loadbyid('" + data.data.Items[i].id + "',1)>[维护]</a> &nbsp;";
                    // html+="<a href='#' onclick=fenlei.add_model(" + data.data.Items[i].id + ",1,"+data.data.Items[i].organization.id+")>[添加子类]</a></td>";
                    html += "</tr>"
                    $("#table_fenleilist tbody").append(html);

                }
                tool.paper("page", page, Math.ceil(data.data.Total / 10), 10, function (page) {
                    fenlei.loaddata(page);
                });
            }

        })
    },
    search: function () {
        this.loaddata(1);
    },
    loadbyid: function (id,flag) {
        fenlei.reloadvalidator();
        $("#orgsave").modal("show");
            var url = document.urlmanager.base.url + "/classification/selectbyid/" + id;
            tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
                if (data.res != 0) {
                    alert("系统错误");
                } else {
                    if(data.data.unsortedflag){
                        data.data.unsortedflag=0;
                    }
                    else {
                        data.data.unsortedflag=1;
                    }
                    let f = new fromtool(fenlei.allp, data.data);
                    f.fill_data();
                    fenlei.orgchange(data.data.parentId);
                    var apisstr = "";
                    var tagsstr = "";
                    if(data.data.parentId=="0"){
                        $("#p_parentId").val("0");
                    }
                    $("#table_apilist tbody").html("");
                    $("#table_taglist tbody").html("");
                    data.data.apiinfo.forEach(api => {
                        apisstr += api.id + ",";
                        var html = "";
                        html = "<tr>";
                        html += "<td><input type='checkbox' onclick='fenlei.checkedclick(this,1)' checked value='" + api.id + "'></td>";
                        html += "<td>" + api.name + "</td>";
                        html += "</tr>"
                        $("#table_apilist tbody").append(html);
                    });

                    data.data.tags.forEach(tag => {
                        if(tag!=""){
                        tagsstr += tag + ",";
                        var html = "";
                        html = "<tr>";
                        html += "<td><input type='checkbox' onclick='fenlei.checkedclick(this,2)' checked value='" + tag + "'></td>";
                        html += "<td>" + tag + "</td>";
                        html += "</tr>"
                        $("#table_taglist tbody").append(html);
                        }
                    });
                    $("#t_apis").html(apisstr);
                    $("#t_tags").html(tagsstr);
                }
            })

    },
    checkedclick: function (obj, type) {
        if (obj.checked) {
            if (type == 1) {
                $("#t_apis").html($("#t_apis").html() + $(obj).val() + ",");
            } else if (type == 2) {
                $("#t_tags").html($("#t_tags").html() + $(obj).val() + ",");
            }
        } else {
            if (type == 1) {
                var apis = $("#t_apis").html();
                var apis_array = apis.split(',');
                var newvalue = "";
                apis_array.forEach(api => {
                    if (api != $(obj).val()) {
                        if (api != "") {
                            newvalue += api + ",";
                        }
                    }
                })
                $("#t_apis").html(newvalue);
            } else if (type == 2) {
                var tags = $("#t_tags").html();
                var tags_array = tags.split(',');
                var newvalue_tag = "";
                tags_array.forEach(tag => {
                    if (tag != $(obj).val()) {
                        if (tag != "") {
                            newvalue_tag += tag + ",";
                        }
                    }
                })
                $("#t_tags").html(newvalue_tag);
            }
        }
    },
    selectapi: function () {
        var param = {
            name: $("#ss_apiname").val()
        }
        if(param.name==""){
            param.name="null";
        }
        var url = document.urlmanager.base.url + "/api/query?interfaceName="+param.name;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#table_apilist tbody").html("");
                for (var i = 0; i < data.data.length; i++) {
                    var html = "";
                    html = "<tr>";
                    var apis = $("#t_apis").html().split(',');
                    if (fenlei.checkoruncheck(apis, data.data[i].id)) {
                        html += "<td><input type='checkbox' onclick='fenlei.checkedclick(this,1)' checked value='" + data.data[i].id + "'></td>";
                    } else {
                        html += "<td><input type='checkbox' onclick='fenlei.checkedclick(this,1)' value='" + data.data[i].id + "'></td>";

                    }
                    html += "<td>" + data.data[i].name + "</td>";
                    html += "</tr>"
                    $("#table_apilist tbody").append(html);

                }
            }

        })
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
    selecttag: function () {
        var param = {
            name: $("#ss_tagname").val(),
            apis:$("#t_apis").html().substr(0, $("#t_apis").html().length - 1).split(',')
        }
        if(param.name==""){
            param.name="null";
        }

        var url = document.urlmanager.base.url + "/interfaceinfo/tag/query/"+param.name;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param.apis, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#table_taglist tbody").html("");
                for (var i = 0; i < data.data.length; i++) {
                    var html = "";
                    html = "<tr>";
                    var tags = $("#t_tags").html().split(',');
                    if (fenlei.checkoruncheck(tags, data.data[i].Name)) {
                        html += "<td><input type='checkbox' onclick='fenlei.checkedclick(this,2)' checked value='" + data.data[i].Name + "'></td>";
                    } else {
                        html += "<td><input type='checkbox' onclick='fenlei.checkedclick(this,2)' value='" + data.data[i].Name + "'></td>";
                    }
                    // html += "<td><input type='checkbox' value='" + data.data.Items[i].id + "'></td>";
                    html += "<td>" + data.data[i].Name + "</td>";
                    html += "</tr>"
                    $("#table_taglist tbody").append(html);

                }
            }

        })
    },
    cleanform: function () {
        let f = new fromtool(fenlei.allp);
        f.clean_data();
        $("#table_apilist tbody").html("");
        $("#table_taglist tbody").html("");
        $("#t_apis").html("");
        $("#t_tags").html("");
    },
    save:function() {
        var bv = form1.data('bootstrapValidator');
        bv.validate();
        if (!bv.isValid()) { //获取验证结果，如果成功，执行下面代码
            //alert("yes"); //验证成功后的操作，如ajax                }
            return;
        }
        let f = new fromtool(fenlei.allp);
        let data = f.load_data();
        if (data.id == "")
        {
            data.id="0";
        }
        data.apiinfo =[];
        var apis = $("#t_apis").html().substr(0, $("#t_apis").html().length - 1).split(',');
        $.each(apis,function (i,api) {
            if(api!=""){
            data.apiinfo.push({id:api});
            }
        })
        if(data.apiinfo.length==0){
            alert("请选择数据接口");
            return;
        }
        if($("#t_tags").html()!=""){
        data.tags=$("#t_tags").html().substr(0, $("#t_tags").html().length - 1).split(',');
        }
        else {
            data.tags=[];
        }
        if(data.tags.length==0){
            alert("请选择标签");
            return;
        }
        if(data.name.trim()=="")
        {
            alert("分类名称不能为空");
            return;
        }
        if(data.id==data.parentId){
            alert("不能选择自己为上级分类");
            return;
        }
        console.log(JSON.stringify(data));
        var url=document.urlmanager.base.url+"/classification/save";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.post,data,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                alert("保存成功");
                fenlei.cleanform();
                fenlei.search();
            }
        })
    },
    add_model:function (fenleiid,flag,orgid) {
        fenlei.reloadvalidator();
        // if(flag=="0")
        // {
        //   $("#div_parent").hide();
        //     fenlei.orgchange();
        // }
        // else {
        //     $("#div_parent").show();
        // }
        //
        // fenlei.cleanform();
        if(flag=="0"){
            $("#div_parent").hide();
        }
        else {
            // select_bind.orgselect("p_orgid",function () {
            //     select_bind.selectfenlei("p_parentid",$("#p_orgid").val(),"0");
            // },orgid);
            fenlei.orgchange(fenleiid);
            $("#div_parent").show();
        }
        fenlei.cleanform();
        $("#orgsave").modal("show");
    },
    orgchange:function (defaultid) {
        select_bind.selectfenlei("p_parentid",$("#p_orgid").val(),defaultid);
    },
    reloadvalidator:function(){
        $("#form1").data('bootstrapValidator').destroy();
        $('#form1').data('bootstrapValidator',null);
        f.form_validator_init(form1,"b_save",fenlei.save);
    },
    checkall:function (obj) {
       var flag= $(obj).prop('checked');
        var checks = $("#table_taglist tbody").find("input");
       if(flag){
           var value="";
            $.each(checks,function (i,o) {
                $(o).attr("checked", true);
                value+=$(o).val()+",";
                // console.log($(o).val());
            })
           $("#t_tags").html(value);
       }
       else {
           $.each(checks,function (i,o) {
               $(o).attr("checked", false);
               console.log($(o).val());
           })
           $("#t_tags").html("");
       }
    }
}