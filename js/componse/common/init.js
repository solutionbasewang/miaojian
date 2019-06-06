document.title = '苗建全文搜索系统';
document.urlmanager={
    base:{
        url:"http://111.202.151.11:8082/api"
    }
}
document.disposetime=20;
var checkUserinfo;
var init = {
    check:{
        userinfo:{
            func:function(){
                var value = tool.localStorageTool.getLocalStorage(keyvalue.userinfo.key);
                if(tool.isEmpry(value)){
                    window.location.href="login.html";
                    this.close();
                }
            },
            open:function(){
                checkUserinfo = setInterval(this.func,2000);
            },
            close:function(){
                setInterval(checkUserinfo);
            }
        }
    },
    get:{
        userinfo:function () {
            var value = tool.localStorageTool.getLocalStorage(keyvalue.userinfo.key);
            if (tool.isEmpry(value)) {
                return null;
            }
            else {
                return JSON.parse(value);
            }
        }
    }
}
