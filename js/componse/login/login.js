var login = {
    login:function(username,password,obj)
    {
        if($(obj).attr("disabled")=="disabled"){
            return;
        }
        $(obj).attr("disabled","disabled");
        if($("#"+username).val()=="")
        {
            message.error("msgcontainer","请输入用户名称");
            return false;
        }

        if($("#"+password).val()=="")
        {
            message.error("msgcontainer","请输入密码");
            return false;
        }
        tool.ajaxTool.ajax(document.urlmanager.base.url+"/login/"+$("#"+username).val()+"/"+$("#"+password).val(),tool.ajaxTool.ajaxtype.get,null,true,function(data){

            if(data.res==0){
                tool.localStorageTool.setLocalStorage("userinfo",JSON.stringify(data));
                data.data.menus=null;
                tool.cookiesTool.setCookies("userinfo",JSON.stringify(data));
                window.location.href="index.html";
            }else{
                message.error("msgcontainer","登录错误，请检查用户名密码");
            }
            $(obj).removeAttr("disabled");
        });
    }
}