var role = {
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
            id: "optionsRadiosInline",
            isnull: false,
            p: "status",
            paramtype: "value"
        },
        {
            type: "select",
            id: "p_type",
            isnull: false,
            p: "type",
            paramtype: "value"
        }
    ],
    loaddata: function (page) {
        var param = {
            Name: $("#s_name").val(),
            status: $("#s_status").val(),
            // GroupName:$("#s_groupname").val(),

        }
        console.log(param);
        var url = document.urlmanager.base.url + "/roleinfo/select/" + page + "/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#table_rolelist tbody").html("");
                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html = "<tr>";
                    html += "<td>" + data.data.Items[i].name + "</td>";
                    html += "<td>" + (data.data.Items[i].status == 0 ? "启用" : "停用") + "</td>";
                    html += "<td>" + (data.data.Items[i].type == 1 ? "菜单角色" : "操作角色") + "</td>";
                    html += "<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=role.loadbyid('" + data.data.Items[i].id + "')>[维护]</a> </td>";
                    html += "</tr>"
                    $("#table_rolelist tbody").append(html);

                }
                tool.paper("page", page, Math.ceil(data.data.Total / 10), 10, function (page) {
                    role.loaddata(page);
                });
            }

        })
    },
    search: function () {
        this.loaddata(1);
    },
    loadbyid: function (id) {
        role.reloadvalidator();
        var url = document.urlmanager.base.url + "/roleinfo/selectbyid/" + id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                let f = new fromtool(role.allp, data.data);
                f.fill_data();
                var rightsstr = "";
                $("#table_rightlist tbody").html("");
                data.data.rights.forEach(role => {
                    rightsstr += role.id + ",";
                    var html = "";
                    html = "<tr>";
                    html += "<td><input type='checkbox' onclick='role.checkedclick(this)' checked value='" + role.id + "'></td>";
                    html += "<td>" + role.name + "</td>";
                    html += "</tr>"
                    $("#table_rightlist tbody").append(html);
                });
                $("#t_rights").html(rightsstr);
            }
        })

    },
    checkedclick: function (obj) {
        if (obj.checked) {
            $("#t_rights").html($("#t_rights").html() + $(obj).val() + ",");
        } else {
            var roles = $("#t_rights").html();
            var roles_array = roles.split(',');
            var newvalue = "";
            roles_array.forEach(role => {
                if (role != $(obj).val()) {
                    if (role != "") {
                        newvalue += role + ",";
                    }
                }
            })
            $("#t_rights").html(newvalue);
        }
    },
    selectright: function () {
        var param = {
            name: $("#ssrightname").val()
        }
        var url = document.urlmanager.base.url + "/operation/select/1/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#table_rightlist tbody").html("");
                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html += "<tr>";
                    var rights = $("#t_rights").html().split(',');
                    if (role.checkoruncheck(rights, data.data.Items[i].id)) {
                        html += "<td><input type='checkbox' onclick='role.checkedclick(this)' checked value='" + data.data.Items[i].id + "'></td>";
                    } else {
                        html += "<td><input type='checkbox' onclick='role.checkedclick(this)' value='" + data.data.Items[i].id + "'></td>";

                    }
                    html += "<td>" + data.data.Items[i].name + "</td>";
                    html += "</tr>"
                    $("#table_rightlist tbody").append(html);

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
    cleanform: function () {
        let f = new fromtool(role.allp);
        f.clean_data();
        $("#table_rightlist tbody").html("");
        $("#t_rights").html("");
        role.reloadvalidator();
    },
    reloadvalidator:function(){
        form1.data('bootstrapValidator').destroy();
        form1.data('bootstrapValidator',null);
        f.form_validator_init(form1,"b_save",role.save);
    },
    save: function () {
        var bv = form1.data('bootstrapValidator');
        bv.validate();
        if (!bv.isValid()) { //获取验证结果，如果成功，执行下面代码
            //alert("yes"); //验证成功后的操作，如ajax                }
            return;
        }
        let f = new fromtool(role.allp);
        let data = f.load_data();
        if(data.id=="")
        {
            data.id="0";
        }
        data.rightids = $("#t_rights").html().substr(0, $("#t_rights").html().length - 1).split(',');
        if(data.rightids[0]=="")
        {
            alert("请选择权限");
            return;
        }
        console.log(JSON.stringify(data));
        var url = document.urlmanager.base.url + "/roleinfo/save";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, data, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                alert("保存成功");
                role.cleanform();
                role.search();
            }
        })
    }
}