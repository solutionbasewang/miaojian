var usergroup = {
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
            type: "input",
            id: "p_description",
            isnull: false,
            p: "description",
            paramtype: "value"
        },
        {
            type: "radio",
            id: "optionsRadiosInline",
            isnull: false,
            p: "status",
            paramtype: "value"
        }
    ],
    loaddata: function (page) {
        var param = {
            Name: $("#s_name").val(),
            Status: $("#s_status").val(),
            UserName:$("#s_username").val(),
            UserRealName:$("#s_realname").val(),
        }
        console.log(param);
        var url = document.urlmanager.base.url + "/usergroup/select/" + page + "/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#usergroup_list tbody").html("");
                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html = "<tr>";
                    html += "<td>" + data.data.Items[i].name + "</td>";
                    html += "<td>" + (data.data.Items[i].status == 0 ? "启用" : "停用") + "</td>";
                    html += "<td>" + data.data.Items[i].description + "</td>";
                    html += "<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=usergroup.loadbyid('" + data.data.Items[i].id + "')>[维护]</a> </td>";
                    html += "</tr>"
                    $("#usergroup_list tbody").append(html);

                }
                tool.paper("page", page, Math.ceil(data.data.Total / 10), 10, function (page) {
                    usergroup.loaddata(page);
                });
            }

        })
    },
    search: function () {
        this.loaddata(1);
    },
    loadbyid: function (id) {
        usergroup.reloadvalidator();
        var url = document.urlmanager.base.url + "/usergroup/selectbyid/" + id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                let f = new fromtool(usergroup.allp, data.data);
                f.fill_data();
                var rolesstr = "";
                var usersstr = "";
                $("#table_rolelist tbody").html("");
                $("#table_userlist tbody").html("");
                data.data.roles.forEach(role => {
                    rolesstr += role.id + ",";
                    var html = "";
                    html = "<tr>";
                    html += "<td><input type='checkbox' onclick='usergroup.checkedclick(this,1)' checked value='" + role.id + "'></td>";
                    html += "<td>" + role.name + "</td>";
                    html += "</tr>"
                    $("#table_rolelist tbody").append(html);
                });
                data.data.users.forEach(user => {
                    usersstr += user.id + ",";
                    var html = "";
                    html = "<tr>";
                    html += "<td><input type='checkbox' onclick='usergroup.checkedclick(this,2)' checked value='" + user.id + "'></td>";
                    html += "<td>" + user.name + "</td>";
                    html += "<td>" + user.realname + "</td>";
                    html += "</tr>"
                    $("#table_userlist tbody").append(html);
                });
                $("#t_roles").html(rolesstr);
                $("#t_users").html(usersstr);
            }
        })

    },
    checkedclick: function (obj, type) {
        if (obj.checked) {
            if (type == 1) {
                $("#t_roles").html($("#t_roles").html() + $(obj).val() + ",");
            } else if (type == 2) {
                $("#t_users").html($("#t_users").html() + $(obj).val() + ",");
            }
        } else {
            if (type == 1) {
                var roles = $("#t_roles").html();
                var roles_array = roles.split(',');
                var newvalue = "";
                roles_array.forEach(role => {
                    if (role != $(obj).val()) {
                        if (role != "") {
                            newvalue += role + ",";
                        }
                    }
                })
                $("#t_roles").html(newvalue);
                //$("#t_roles").html($("#t_roles").html()+$(obj).val()+",");
            } else if (type == 2) {
                var users = $("#t_users").html();
                var users_array = users.split(',');
                var newvalue_user = "";
                users_array.forEach(user => {
                    if (user != $(obj).val()) {
                        if (user != "") {
                            newvalue_user += user + ",";
                        }
                    }
                })
                $("#t_users").html(newvalue_user);
                //$("#t_users").html($("#t_users").html()+$(obj).val()+",");
            }
        }
    },
    selectrole: function () {
        var param = {
            name: $("#ssrolename").val()
        }
        var url = document.urlmanager.base.url + "/roleinfo/select/1/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#table_rolelist tbody").html("");
                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html = "<tr>";
                    var roles = $("#t_roles").html().split(',');
                    if (usergroup.checkoruncheck(roles, data.data.Items[i].id)) {
                        html += "<td><input type='checkbox' onclick='usergroup.checkedclick(this,1)' checked value='" + data.data.Items[i].id + "'></td>";
                    } else {
                        html += "<td><input type='checkbox' onclick='usergroup.checkedclick(this,1)' value='" + data.data.Items[i].id + "'></td>";

                    }
                    html += "<td>" + data.data.Items[i].name + "</td>";
                    html += "</tr>"
                    $("#table_rolelist tbody").append(html);

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
    selectuser: function () {
        var param = {
            name: $("#ss_username").val()
        }
        var url = document.urlmanager.base.url + "/userinfo/select/1/10000";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#table_userlist tbody").html("");
                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html = "<tr>";
                    var users = $("#t_users").html().split(',');
                    if (usergroup.checkoruncheck(users, data.data.Items[i].id)) {
                        html += "<td><input type='checkbox' onclick='usergroup.checkedclick(this,2)' checked value='" + data.data.Items[i].id + "'></td>";
                    } else {
                        html += "<td><input type='checkbox' onclick='usergroup.checkedclick(this,2)' value='" + data.data.Items[i].id + "'></td>";
                    }
                    // html += "<td><input type='checkbox' value='" + data.data.Items[i].id + "'></td>";
                    html += "<td>" + data.data.Items[i].name + "</td>";
                    html += "<td>" + data.data.Items[i].realname + "</td>";
                    html += "</tr>"
                    $("#table_userlist tbody").append(html);

                }
            }

        })
    },
    cleanform: function () {
        let f = new fromtool(usergroup.allp);
        f.clean_data();
        $("#table_userlist tbody").html("");
        $("#table_rolelist tbody").html("");
        $("#t_roles").html("");
        $("#t_users").html("");
        usergroup.reloadvalidator();
    },
    save:function(){
        var bv = form1.data('bootstrapValidator');
        bv.validate();
        if (!bv.isValid()) { //获取验证结果，如果成功，执行下面代码
            //alert("yes"); //验证成功后的操作，如ajax                }
            return;
        }
        let f = new fromtool(usergroup.allp);
        let data = f.load_data();
        if(data.id=="")
        {
            data.id="0";
        }
        data.roleids = $("#t_roles").html().substr(0, $("#t_roles").html().length - 1).split(',');
        data.userids=$("#t_users").html().substr(0, $("#t_users").html().length - 1).split(',');
        if(data.roleids[0]==""){
            alert("请选择角色");
            return;
        }
        if(data.userids[0]==""){
            alert("请添加人员");
            return;
        }

        var url=document.urlmanager.base.url+"/usergroup/save";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.post,data,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                alert("保存成功");
            }
        })
    },
    reloadvalidator:function(){
        $("#form1").data('bootstrapValidator').destroy();
        $('#form1').data('bootstrapValidator',null);
        f.form_validator_init(form1,"b_save",usergroup.save);
    },
}