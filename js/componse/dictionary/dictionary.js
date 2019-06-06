var dic={
    load:function (page) {
        var param = {
            Name:$("#s_name").val()
        }
        var url=document.urlmanager.base.url+"/dictionary/query/"+page+"/20";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.post,param,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                $("#table_rightlist tbody").html("");
                for(var i=0;i<data.data.Items.length;i++){
                    var html="";
                    html="<tr>";
                    html+="<td>"+data.data.Items[i].name+"</td>";
                    html+="<td>"+data.data.Items[i].createTime.replace("T"," ")+"</td>";
                    html+="<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=dic.loadbyid('"+data.data.Items[i].id+"')>维护</a></td>";
                    html+="</tr>";
                    // if(data.data.Items[i].children)
                    $.each(data.data.Items[i].children,function (ii,o) {
                        html+="<tr>";
                        html+="<td>&nbsp;&nbsp;&nbsp;&nbsp;<p class='fa fa-angle-right'></p>"+o.name+"</td>";
                        html+="<td>"+o.createTime.replace("T"," ")+"</td>";
                        html+="<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=dic.loadbyid('"+o.id+"')>维护</a></td>";
                        html+="</tr>";
                    })
                    $("#table_rightlist tbody").append(html);
                }
                tool.paper("page",page,Math.ceil(data.data.Total/20),20,function(page){
                    dic.load(page);
                });
            }

        })
    },
    loadbyid:function (id) {
        var url=document.urlmanager.base.url+"/dictionary/get/"+id;
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.get,null,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                $("#p_id").val(data.data.id);
                $("#p_name").val(data.data.name);
                $("#p_value").val(data.data.value);
                $("#p_parentid").val(data.data.parentId);
            }
        })
    },
    save:function () {
        var param={
            Id:$("#p_id").val(),
            Name:$("#p_name").val(),
            Value:$("#p_value").val(),
            Type:1,
            ParentId:$("#p_parentid").val(),
            Children:null
        }
        if(param.Id==""){
            param.Id="0";
        }
        if(param.Name.trim()==""){
            alert("名称必填");
            return;
        }
        if(param.Value.trim()==""){
            alert("值必填");
            return;
        }
        var url=document.urlmanager.base.url+"/dictionary/saveorupdate";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.post,param,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                alert("保存成功");
                dic.load(1);
            }
        })
    },
    init_parent:function () {
        select_bind.selectdic("p_parentid","0",undefined);
    },
    cleanform:function () {
        $("#p_id").val("");
        $("#p_name").val("");
        $("#p_value").val("");
        $("#p_parentid").val("0");
        $("#orgsave").modal("show");
    }
}