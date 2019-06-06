var template={
    allp: [
        {
            type: "input",
            id: "p_Id",
            isnull: false,
            p: "Id",
            paramtype: "value"
        },
        {
            type: "input",
            id: "p_Title",
            isnull: false,
            p: "Title",
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
            id: "p_Category",
            isnull: false,
            p: "Category",
            paramtype: "value"
        },
        {
            type: "select",
            id: "p_Type",
            isnull: false,
            p: "Type",
            paramtype: "value"
        },
        {
            type: "select",
            id: "p_Organization",
            isnull: false,
            p: "Organization",
            paramtype: "object"
        },
        {
            type: "input",
            id: "p_Path",
            isnull: false,
            p: "Path",
            paramtype: "value"
        }
    ],
    addshow:function () {
        $("#orgsave").modal("show");
        $("#p_Path").val("");
        $("#p_Title").val("");
    },
    save:function () {
        var param={
            Id:$("#p_Id").val(),
            Title:$("#p_Title").val(),
            Category:$("#p_Category").val(),
            Type:$("#p_Type").val(),
            Organization:{
                id:$("#p_Organization").val()
            },
            Path:$("#p_Path").val(),
            Status:$("input[name='optionsRadiosInline']:checked").val()
        }
        if(param.Title.trim()=="")
        {
            alert("标题不能为空");
            return;
        }
        if(param.Path.trim()=="")
        {
            alert("路径不能为空");
            return;
        }
        if(param.Id==""){
            param.Id=0;
        }
        var url = document.urlmanager.base.url + "/report/template/saveorupdate";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#orgsave").modal("hide");
            }
        })
    },
    load:function (page) {
        var param={
            Title:$("#s_name").val()
        }
        if($("#s_status").val()!="-1"){
            param.Status=$("#s_status").val();
        }
        param.OrgId=$("#jglist").val();
        var url = document.urlmanager.base.url + "/report/template/get/list/"+page+"/20";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#table_apilist tbody").html("");
                for (var i = 0; i < data.data.Items.length; i++) {
                    var html = "";
                    html = "<tr>";
                    html += "<td>" + data.data.Items[i].Title + "</td>";
                    html += "<td>" + (data.data.Items[i].Status == 0 ? "启用" : "停用") + "</td>";
                    if(data.data.Items[i].Category==0){
                        html += "<td>word</td>";
                    }
                    else if(data.data.Items[i].Category==1)
                    {
                        html += "<td>excel</td>";
                    }
                    else if(data.data.Items[i].Category==2)
                    {
                        html += "<td>html</td>";
                    }
                    else if(data.data.Items[i].Category==3)
                    {
                        html += "<td>pdf</td>";
                    }
                    else {
                        html += "<td></td>";
                    }

                    html += "<td>" + (data.data.Items[i].Type==0?"日报":"简报") + "</td>";
                    html += "<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=template.loadbyid('" + data.data.Items[i].Id + "')>[维护]</a>&nbsp;" +
                        "&nbsp;<a onclick=template.fenleishow('"+data.data.Items[i].Id+"','"+data.data.Items[i].Organization.id+"')>[添加分类]</a>" +
                        "&nbsp;<a onclick=template.fenleideleshow('"+data.data.Items[i].Id+"')>[删除分类]</a></td>";
                    html += "</tr>"
                    $("#table_apilist tbody").append(html);

                }
                tool.paper("page", page, Math.ceil(data.data.Total / 10), 10, function (page) {
                    api.loaddata(page);
                });
            }

        })
    },
    fenleishow:function (tmid,ogid) {
        $("#table_jzdslist tbody").html("");
        $("#p_fname").val("");
        $("#p_mbid").val("");
        select_bind.mbflselect("p_parentId",tmid,"",undefined);
        select_bind.fenleiselect_1(ogid,"orgfllist",undefined);
        $("#addbgfl").modal("show");
        $("#p_mbid").val(tmid);
    },
    fenleideleshow:function(id){
        $("#bgfllist").modal("show");
        var url = document.urlmanager.base.url + "/report/template/query/classification/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#table_mbfllist tbody").html("");
            $.each(data.data,function(i){
                var html="<tr>";
                html+="<td><input type='hidden' value='"+data.data[i].id+"'/>"+data.data[i].name+"</td>";
                var flname = "";
                $.each(data.data[i].classifications,function (i,o) {
                    flname+=o.name+",";
                })
                flname=tool.stringtool.cleandh(flname);
                html+="<td title='"+flname+"'>"+tool.stringtool.substr(flname,20)+"</td>";
                html+="<td onclick=template.fenleidele('"+data.data[i].id+"',this)>删除</td>";
                html+="</tr>";
                $("#table_mbfllist tbody").append(html);
            })

        })
    },
    fenleidele:function(id,obj){
        var url = document.urlmanager.base.url + "/report/template/classification/delete/"+id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $(obj).parent().remove();
            }

        })
    },
    jgfldele:function(obj){
        $(obj).parent().remove();
    },
    addjgfl:function () {
        var flobj={
            id:"",
            name:""
        }
        flobj.id=$("#orgfllist").val();
        flobj.name=$("#orgfllist option:checked").text();
        var html="<tr>";
        html+="<td><input type='hidden' value='"+flobj.id+"'/>"+flobj.name+"</td>";
        html+="<td onclick=template.jgfldele(this)>删除</td>";
        html+="</tr>";
        $("#table_jzdslist tbody").append(html);
    },
    getjgfl:function () {
        var result=[];
        var trs = $("#table_jzdslist tbody").find("tr");
        $.each(trs,function (i,o) {
            var jgid = $(o).find("input").eq(0).val();
            result.push({id:jgid});
        })
        return result;
    },
    savefj:function () {
        var param={
            name:$("#p_fname").val(),
            parentId:$("#p_parentId").val(),
            classifications:[]
        }
        var mbid = $("#p_mbid").val();
        param.classifications = template.getjgfl();
        console.log(JSON.stringify(param));
        var url = document.urlmanager.base.url + "/report/template/classification/insertorupdate/"+mbid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                $("#addbgfl").modal("hide");
            }

        })
    },
    loadbyid: function (id) {
        // api.reloadvalidator();
        var url = document.urlmanager.base.url + "/report/template/find/" + id;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, null, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                let f = new fromtool(template.allp, data.data);
                f.fill_data();
            }
        })

    },
}
