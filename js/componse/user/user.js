var users={
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
            type:"input",
            id:"p_realname",
            isnull:false,
            p:"realname",
            paramtype:"value"
        },
        {
            type:"input",
            id:"p_title",
            isnull:false,
            p:"title",
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
            type:"select",
            id:"p_orgid",
            isnull:false,
            p:"orginfo",
            paramtype:"object",
            key:"id"
        },
        {
            type:"input",
            id:"p_email",
            isnull:false,
            p:"email",
            paramtype:"value"
        },
        {
            type:"input",
            id:"p_mobile",
            isnull:false,
            p:"mobile",
            paramtype:"value"
        }
    ],
    loaddata:function(page){
        var param = {
            UserName:$("#s_name").val(),
            RealName:$("#s_realname").val(),
            Status:$("#s_status").val()
        }
        var url=document.urlmanager.base.url+"/userinfo/select/"+page+"/10";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.post,param,true,function(data){
            if(data.res!="0"){
                alert("系统错误");
            }
            else{
                $("#dataresult tbody").html("");
                for(var i=0;i<data.data.Items.length;i++){
                    var html="";
                    html="<tr>";
                    html+="<td>"+data.data.Items[i].name+"</td>";
                    html+="<td>"+(data.data.Items[i].status==0?"启用":"停用")+"</td>";
                    html+="<td>"+data.data.Items[i].orginfo.name+"</td>";
                    html+="<td>"+data.data.Items[i].realname+"</td>";
                    html+="<td><a href='#' data-toggle='modal' data-target='#orgsave' onclick=users.loadbyid('"+data.data.Items[i].id+"')>维护</a>";
                    html+="&nbsp;&nbsp;<a href='#' onclick=users.reset_show('"+data.data.Items[i].id+"')>密码重置</a></td>";
                    html+="</tr>"
                    $("#dataresult tbody").append(html);

                }
                tool.paper("page",page,Math.ceil(data.data.Total/10),10,function(page){
                    users.loaddata(page);
                });
            }

        })
    },
    search:function(){
        this.loaddata(1);
    },
    loadbyid:function(id){
        users.reloadvalidator();
        var url=document.urlmanager.base.url+"/userinfo/selectbyid/"+id;
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.get,null,true,function(data){
            if(data.res!=0){
                alert("系统错误");
            }
            else{
                let f = new fromtool(users.allp,data.data);
                f.fill_data();
            }

        })
       
    },
    loadform:function(data){

    },
    save:function(){
            var bv = form1.data('bootstrapValidator');
        bv.validate();
            if (!bv.isValid()) { //获取验证结果，如果成功，执行下面代码
                //alert("yes"); //验证成功后的操作，如ajax                }
                return;
            }
        let f = new fromtool(users.allp);
        let data = f.load_data();
        if(data.id=="")
        {
            data.id="0";
        }
        console.log(data);
        var url=document.urlmanager.base.url+"/userinfo/save";
        tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.post,data,true,function(data){
            if(data.res!=0) {
                if (data.res == -1) {
                    alert("用户名重复");
                }
                else {
                    alert("系统错误");
                }
            }
            else{
                alert("保存成功");
                users.search();
            }
        })
    },
    cleanform:function(){
        f.clean_data();
        users.reloadvalidator();
    },
    reset:function () {
        var p1 = $("#password_1").val();
        var p2 = $("#password_2").val();
        if(p1!=p2){
            alert("密码不一致，请重新输入");
            return;
        }
        else {
            var url=document.urlmanager.base.url+"/userinfo/reset/password/"+$("#u_id").val()+"/"+p1;
            tool.ajaxTool.ajax(url,tool.ajaxTool.ajaxtype.get,null,true,function(data){
                if(data.res!=0) {
                    alert("系统错误");
                }
                else{
                    alert("保存成功");
                    users.search();
                    $("#resetpassword").modal("hide");
                    $("#password_1").val("");
                    $("#password_2").val("");
                }
            })
        }
    },
    reset_show:function (userid) {
        $("#u_id").val(userid);
        $("#resetpassword").modal("show");
    },
    reloadvalidator:function(){
        $("#form1").data('bootstrapValidator').destroy();
        $('#form1').data('bootstrapValidator',null);
        f.form_validator_init(form1,"b_save",users.save);
    },

}