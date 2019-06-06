var api = {
    allp: [
        {
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
            type: "input",
            id: "p_appkey",
            isnull: false,
            p: "appkey",
            paramtype: "value"
        },
        {
            type: "input",
            id: "p_taskid",
            isnull: false,
            p: "taskId",
            paramtype: "value"
        },
        {
            type: "select",
            id: "p_type",
            isnull: false,
            p: "type",
            paramtype: "value"
        },
        {
            type: "select",
            id: "p_source",
            isnull: false,
            p: "source",
            paramtype: "value"
        },
        {
            type: "input",
            id: "p_service",
            isnull: false,
            p: "service",
            paramtype: "value"
        },
        {
            type: "input",
            id: "p_requesturl",
            isnull: false,
            p: "requestUrl",
            paramtype: "value"
        },
        {
            type: "input",
            id: "p_themenumber",
            isnull: false,
            p: "themenumber",
            paramtype: "value"
        }
    ],
    loaddata: function (page) {
        var param = {
            name: $("#s_name").val(),
            status: $("#s_status").val()
        }
        if(param.status=="-1")
        {
            param.status=null;
        }
        var url = document.urlmanager.base.url + "/api/select/" + page + "/10";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#table_apilist tbody").html("");
                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html = "<tr>";
                    html += "<td>" + data.data.Items[i].name + "</td>";
                    html += "<td>" + (data.data.Items[i].status == 0 ? "启用" : "停用") + "</td>";
                    html += "<td>" + data.data.Items[i].service + "</td>";
                    html += "<td>" + data.data.Items[i].appkey + "</td>";
                    if(data.data.Items[i].source==0){
                    html += "<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=api.loadbyid('" + data.data.Items[i].id + "')>[维护]</a>&nbsp;&nbsp; <a href='#' onclick=api.syntag('"+data.data.Items[i].appkey+"','"+data.data.Items[i].themenumber+"')>[同步标签]</a></td>";
                    }
                    else {
                        html += "<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=api.loadbyid('" + data.data.Items[i].id + "')>[维护]</a></td>";
                    }
                    html += "</tr>"
                    $("#table_apilist tbody").append(html);

                }
                tool.paper("page", page, Math.ceil(data.data.Total / 10), 10, function (page) {
                    api.loaddata(page);
                });
            }

        })
    },
    search: function () {
        this.loaddata(1);
    },
    loadbyid: function (id) {
        api.reloadvalidator();
        var url = document.urlmanager.base.url + "/api/selectbyid/" + id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                let f = new fromtool(api.allp, data.data);
                f.fill_data();
            }
        })

    },
    reloadvalidator:function(){
        form1.data('bootstrapValidator').destroy();
        form1.data('bootstrapValidator',null);
        f.form_validator_init(form1,"b_save",api.save);
    },
    cleanform: function () {
        let f = new fromtool(api.allp);
        f.clean_data();
    },
    save: function () {
        var bv = form1.data('bootstrapValidator');
        bv.validate();
        if (!bv.isValid()) { //获取验证结果，如果成功，执行下面代码
            //alert("yes"); //验证成功后的操作，如ajax                }
            return;
        }
        let f = new fromtool(api.allp);
        let data = f.load_data();
        if(data.id=="")
        {
            data.id="0";
        }
        console.log(JSON.stringify(data));
        var url = document.urlmanager.base.url + "/api/save";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, data, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                alert("保存成功");
                api.cleanform();
                api.search();
                $("#orgsave").modal("hide");
            }
        })
    },
    addapi:function () {
        api.reloadvalidator();
        $("#orgsave").modal("show");
        api.cleanform();
    },
    syntag:function (appkey,num) {
        // if($("#p_source").val()!="0")
        // {
        //     alert("非海量数据接口不能同步标签");
        //     return;
        // }
        var url = document.urlmanager.base.url + "/interfaceinfo/tag/sync/"+appkey+"/"+num;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                alert("同步成功");
            }
        })
    }
}