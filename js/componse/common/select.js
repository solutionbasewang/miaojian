var select_bind={
    orgselect: function (selectid,callback,defaultid) {
        var url = document.urlmanager.base.url + "/organization/select";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            $.each(data.data,function(i){
                if(defaultid!=undefined&&defaultid==data.data[i].id){
                    $("#"+selectid).append("<option selected value='" + data.data[i].id + "'>" + data.data[i].name + "</option>")
                }
                else {
                $("#"+selectid).append("<option value='" + data.data[i].id + "'>" + data.data[i].name + "</option>")
                }
            })
            if(callback!=undefined)
            {
                callback();
            }
        })
    },
    fenleiselect:function(orgid,selectid,callback)
    {
        var url = document.urlmanager.base.url + "/classification/select/"+orgid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            $.each(data.data,function(i){
                $("#"+selectid).append("<li class='fenleili' select='0' onmouseup='news.newfj(this,event)' clsid='"+data.data[i].id+"'><a href='#' onclick='news.fenleichaxun(this)'>"+data.data[i].name+"</a> <span onclick='news.check_classification(this)' cid='"+data.data[i].id+"' showtype='1' class='glyphicon glyphicon-eye-open selectclass' style='cursor: pointer'></span></li>")
            })
            if(callback!=undefined)
            {
                callback();
            }
        })
    },
    fenleiselect_new:function(orgid,selectid,callback)
    {
        var url = document.urlmanager.base.url + "/classification/select/"+orgid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            $.each(data.data,function(i){
                if(i==0){
                    $("#"+selectid).append("<div class='new_fenlei_item_select' select='1' onmouseup='news.newfj(this,event)' clsid='"+data.data[i].id+"' onclick='news.fenleichaxun(this)'>"+data.data[i].name+"</div>");

                }
                else {
                $("#"+selectid).append("<div class='new_fenlei_item' select='0' onmouseup='news.newfj(this,event)' clsid='"+data.data[i].id+"' onclick='news.fenleichaxun(this)'>"+data.data[i].name+"</div>");
                }
                // $("#"+selectid).append("<li class='fenleili' select='0' onmouseup='news.newfj(this,event)' clsid='"+data.data[i].id+"'><a href='#' onclick='news.fenleichaxun(this)'>"+data.data[i].name+"</a> <span onclick='news.check_classification(this)' cid='"+data.data[i].id+"' showtype='1' class='glyphicon glyphicon-eye-open selectclass' style='cursor: pointer'></span></li>")
            })
            if(callback!=undefined)
            {
                callback();
            }
        })
    },
    fenleiselect_new_fj:function(orgid,selectid,callback)
    {
        var url = document.urlmanager.base.url + "/classification/select/"+orgid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            $.each(data.data,function(i){
                if(i==0){
                    $("#"+selectid).append("<div class='new_fenlei_item_select' select='1'  clsid='"+data.data[i].id+"' onclick='fanyi.fenleichaxun(this)'>"+data.data[i].name+"</div>");

                }
                else {
                    $("#"+selectid).append("<div class='new_fenlei_item' select='0'  clsid='"+data.data[i].id+"' onclick='fanyi.fenleichaxun(this)'>"+data.data[i].name+"</div>");
                }
                // $("#"+selectid).append("<div class='new_fenlei_item' select='0' onclick='fanyi.fenleichaxun(this)' clsid='"+data.data[i].id+"'>"+data.data[i].name+"</div>");
                // $("#"+selectid).append("<li class='fenleili' select='0' onmouseup='news.newfj(this,event)' clsid='"+data.data[i].id+"'><a href='#' onclick='news.fenleichaxun(this)'>"+data.data[i].name+"</a> <span onclick='news.check_classification(this)' cid='"+data.data[i].id+"' showtype='1' class='glyphicon glyphicon-eye-open selectclass' style='cursor: pointer'></span></li>")
            })
            if(callback!=undefined)
            {
                callback();
            }
        })
    },
    fenleiselect_1:function(orgid,selectid,callback)
    {
        var url = document.urlmanager.base.url + "/organization/selectbyid/"+orgid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            $.each(data.data.classifications,function(i){
                $("#"+selectid).append("<option value='"+data.data.classifications[i].id+"' >"+data.data.classifications[i].name+"</option>")
            })
            if(callback!=undefined)
            {
                callback();
            }
        })
    },
    selectdepart:function(selectid,defaultvalue){
        $("#"+selectid).append("<option value='1' >翻译</option>");
        $("#"+selectid).append("<option value='2' >客服</option>");
        $("#"+selectid).append("<option value='3' >销售</option>");
        $("#"+selectid).append("<option value='4' >其他</option>");
    },
    fenleiselect_none:function(orgid,selectid,defaultid,callback)
    {
        var url = document.urlmanager.base.url + "/organization/selectbyid/"+orgid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            $("#"+selectid).append("<option value='-1' >"+无+"</option>")
            $.each(data.data.classifications,function(i){
                if(data.data.classifications[i].id==defaultid){
                $("#"+selectid).append("<option selected value='"+data.data.classifications[i].id+"' >"+data.data.classifications[i].name+"</option>")
                }
                else {
                    $("#"+selectid).append("<option value='"+data.data.classifications[i].id+"' >"+data.data.classifications[i].name+"</option>")

                }
            })
            if(callback!=undefined)
            {
                callback();
            }

        })
    },
    mbflselect:function(selectid,bmid,defaultid,callback){
        var url = document.urlmanager.base.url + "/report/template/query/classification/"+bmid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            $("#"+selectid).append("<option value='0' >无</option>")
            $.each(data.data,function(i){
                if(data.data[i].id==defaultid){
                    $("#"+selectid).append("<option selected value='"+data.data[i].id+"' >"+data.data[i].name+"</option>")
                }
                else {
                    $("#"+selectid).append("<option value='"+data.data[i].id+"' >"+data.data[i].name+"</option>")
                }
            })
            if(callback!=undefined)
            {
                callback();
            }

        })
    },
    selectsource:function(selectid)
    {
        var url = document.urlmanager.base.url + "/dictionary/get/listresult/0/null/0/2";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            $.each(data.data,function(i){
                $("#"+selectid).append("<option value='" + data.data[i].id + "'>" + data.data[i].name + "</option>");
            })
        })
    },
    selectdomain:function (selectid,callback) {
        var url =document.urlmanager.base.url + "/dictionary/get/listresult/1809301141159761000000001/null";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            var list = data.data[0].children;
            $("#"+selectid).html("");
            $.each(list,function(i){
                $("#"+selectid).append("<option value='" + list[i].id + "'>" + list[i].name + "</option>");
            })
            if(callback!=undefined){
                callback();
            }
        })
    },
    selectjzds:function (selectid,domainid) {
        var url =document.urlmanager.base.url +"/organization/query/domain/"+domainid+"/null";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            var list = data.data;
            $("#"+selectid).html("");
            $.each(list,function(i){
                $("#"+selectid).append("<option value='" + list[i].id + "'>" + list[i].name + "</option>");
            })
        })
    },
    selectfenlei:function (selectid,orgid,defaultid) {
        var url =document.urlmanager.base.url +"/classification/select/"+orgid;
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            var list = data.data;
            $("#"+selectid).html("");
            $.each(list,function(i){
                if(defaultid!=undefined&&defaultid==list[i].id){
                    $("#"+selectid).append("<option selected value='" + list[i].id + "'>" + list[i].name + "</option>");
                }
                else {
                $("#"+selectid).append("<option value='" + list[i].id + "'>" + list[i].name + "</option>");
                }
            })
            if(defaultid!="0"){
            $("#"+selectid).append("<option value='0'>无</option>");
            }
            else {
                $("#"+selectid).append("<option selected value='0'>无</option>");
            }
        })
    },
    selectuser:function (selectid,defaultid) {
        var url =document.urlmanager.base.url +"/userinfo/select";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            var list = data.data;
            $("#"+selectid).html("");
            $.each(list,function(i){
                if(defaultid!=undefined&&defaultid==list[i].id){
                    $("#"+selectid).append("<option selected value='" + list[i].id + "'>" + list[i].name + "</option>");
                }
                else {
                    $("#"+selectid).append("<option value='" + list[i].id + "'>" + list[i].name + "</option>");
                }
            })
            $("#"+selectid).append("<option value='0'>无</option>");
        })
    },
    selecthours:function (id) {
        for(var i=0;i<24;i++){
            $("#"+id).append("<option value='"+i+"'>"+i+"</option>");
        }
    },
    selectmin:function (id) {
        for(var i=0;i<60;i++){
            $("#"+id).append("<option value='"+i+"'>"+i+"</option>");
        }
    },
    selectusergrop:function (selectid,defaultid,callback) {
        var url =document.urlmanager.base.url +"/usergroup/select/1/1000";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, {}, true, function (data) {
            var list = data.data.Items;
            $("#"+selectid).html("");
            $.each(list,function(i){
                if(defaultid!=undefined&&defaultid==list[i].id){
                    $("#"+selectid).append("<option selected value='" + list[i].id + "'>" + list[i].name + "</option>");
                }
                else {
                    $("#"+selectid).append("<option value='" + list[i].id + "'>" + list[i].name + "</option>");
                }
            })
            if(callback!=undefined){
                callback();
            }
        })
    },
    selectbg:function (selectid,orgid,callback,onclick) {
        var url = document.urlmanager.base.url + "/report/template/get/list/1/1000/-1/-1/-1/"+orgid+"/-1/null";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            tool.localStorageTool.setLocalStorage("mb",JSON.stringify(data.data.Items));
            $.each(data.data.Items,function(i,o){
                $("#"+selectid).append("<li class='fenleili' select='0' mbid='"+o.Id+"' onclick='"+onclick+"(this)'><a href='#'>"+o.Title+"</a> <button disabled type='button' style='float: right;' class='btn btn-primary btn-xs' onclick=report.bgbuild('"+o.Id+"')>生成</button></li>")
            })
            if(callback!=undefined)
            {
                callback();
            }
        })
    },
    selectbg1:function (selectid,orgid,callback,onclick) {
        var url = document.urlmanager.base.url + "/report/template/get/list/1/1000/-1/-1/-1/"+orgid+"/-1/null";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.get, null, true, function (data) {
            $("#"+selectid).html("");
            tool.localStorageTool.setLocalStorage("mb",JSON.stringify(data.data.Items));
            $.each(data.data.Items,function(i,o){
                $("#"+selectid).append("<li class='fenleili' select='0' mbid='"+o.Id+"' onclick='"+onclick+"(this)'><a href='#'>"+o.Title+"</a></li>")
            })
            if(callback!=undefined)
            {
                callback();
            }
        })
    },
    selectdic:function (selectid,defaultid,callback) {
        var url=document.urlmanager.base.url+"/dictionary/query/1/1000";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, {}, true, function (data) {
            var list = data.data.Items;
            $("#"+selectid).html("");
            $.each(list,function(i){
                if(defaultid!=undefined&&defaultid==list[i].id){
                    $("#"+selectid).append("<option selected value='" + list[i].id + "'>" + list[i].name + "</option>");
                }
                else {
                    $("#"+selectid).append("<option value='" + list[i].id + "'>" + list[i].name + "</option>");
                }
            })
            if(callback!=undefined){
                callback();
            }
            if(defaultid!="0"){
                $("#"+selectid).append("<option value='0'>无</option>");
            }
            else {
                $("#"+selectid).append("<option selected value='0'>无</option>");
            }
        })
    }

}