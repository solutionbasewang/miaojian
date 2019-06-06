var right = {
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
        }
    ],
    reloadvalidator:function(){
        form1.data('bootstrapValidator').destroy();
        form1.data('bootstrapValidator',null);
        f.form_validator_init(form1,"b_save",right.save);
    },
    loaddata: function (page) {
        var param = {
            Name: $("#s_name").val(),
            status: $("#s_status").val(),
            RoleName:$("#s_rolename").val(),
        }
        console.log(param);
        var url = document.urlmanager.base.url + "/operation/select/" + page + "/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#table_rightlist tbody").html("");
                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html = "<tr>";
                    html += "<td>" + data.data.Items[i].name + "</td>";
                    html += "<td>" + (data.data.Items[i].status == 0 ? "启用" : "停用") + "</td>";
                    html += "<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=right.loadbyid('" + data.data.Items[i].id + "')>[维护]</a> </td>";
                    html += "</tr>"
                    $("#table_rightlist tbody").append(html);

                }
                tool.paper("page", page, Math.ceil(data.data.Total / 10), 10, function (page) {
                    right.loaddata(page);
                });
            }

        })
    },
    search: function () {
        this.loaddata(1);
    },
    loadbyid: function (id) {
        right.reloadvalidator();
        var url = document.urlmanager.base.url + "/operation/selectbyid/" + id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                let f = new fromtool(right.allp, data.data);
                f.fill_data();
                var menusstr = "";
                $("#table_menulist tbody").html("");
                data.data.menus.forEach(menu => {
                    menusstr += menu.id + ",";
                    var html = "";
                    html = "<tr>";
                    html += "<td><input type='checkbox' onclick='right.checkedclick(this)' checked value='" + menu.id + "'></td>";
                    html += "<td>" + menu.name + "</td>";
                    html += "</tr>"
                    $("#table_menulist tbody").append(html);
                });
                $("#t_menus").html(menusstr);
            }
        })

    },
    checkedclick: function (obj) {
        if (obj.checked) {
            $("#t_menus").html($("#t_menus").html() + $(obj).val() + ",");
        } else {
            var menus = $("#t_menus").html();
            var menus_array = menus.split(',');
            var newvalue = "";
            menus_array.forEach(menu => {
                if (menu != $(obj).val()) {
                    if (menu != "") {
                        newvalue += menu + ",";
                    }
                }
            })
            $("#t_menus").html(newvalue);
        }
    },
    selectmenus: function () {
        var param = {
            name: $("#ssmenuname").val()
        }
        var url = document.urlmanager.base.url + "/menus/select";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                $("#table_menulist tbody").html("");
                for (var i = 0; i < data.data.length; i++) {
                    var html = "";
                    html += "<tr>";
                    var menus = $("#t_menus").html().split(',');
                    if (right.checkoruncheck(menus, data.data[i].id)) {
                        html += "<td><input type='checkbox' onclick='right.checkedclick(this)' checked value='" + data.data[i].id + "'></td>";
                    } else {
                        html += "<td><input type='checkbox' onclick='right.checkedclick(this)' value='" + data.data[i].id + "'></td>";

                    }
                    html += "<td>" + data.data[i].name + "</td>";
                    html += "</tr>"
                    $("#table_menulist tbody").append(html);

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
        let f = new fromtool(right.allp);
        f.clean_data();
        $("#table_menulist tbody").html("");
        $("#t_menus").html("");
        right.reloadvalidator();
    },
    save: function () {
        var bv = form1.data('bootstrapValidator');
        bv.validate();
        if (!bv.isValid()) { //获取验证结果，如果成功，执行下面代码
            //alert("yes"); //验证成功后的操作，如ajax                }
            return;
        }
        let f = new fromtool(right.allp);
        let data = f.load_data();
        if(data.id=="")
        {
            data.id="0";
        }
        data.menuids = $("#t_menus").html().substr(0, $("#t_menus").html().length - 1).split(',');
        if(data.menuids[0]=="")
        {
            alert("请选择菜单权限");
            return;
        }
        console.log(JSON.stringify(data));
        var url = document.urlmanager.base.url + "/operation/save";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, data, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                alert("保存成功");
                right.cleanform();
                right.search();
            }
        })
    }
}