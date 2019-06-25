var tool = {
    arraytool:{
        isin:function (target,array) {
            var returnvalue = false;
            $.each(array,function (i,o) {
                if(target==("col_"+o)){
                    returnvalue = true;
                }
            })
            return returnvalue;
        }
    },
    isEmpry: function (value) {
        for (var name in value) {
            return false;
        }
        return true;
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    s4:function(){
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },
    uuid:function(){
        return (tool.s4()+tool.s4()+"-"+tool.s4()+"-"+tool.s4()+"-"+tool.s4()+"-"+tool.s4()+tool.s4()+tool.s4());
    },
    uuidtext:function(){
        return "t"+(tool.s4()+tool.s4()+""+tool.s4()+""+tool.s4()+""+tool.s4()+""+tool.s4()+tool.s4()+tool.s4());
    },
    ajaxTool: {
        ajaxtype: {
            post: "post",
            get: "get"
        },
        ajax: function (url, type, data, async, callback) {
            if (tool.isEmpry(url)) {
                console.log("url is nill");
                return false;
            }
            if (tool.isEmpry(type) == "undefined") {
                console.log("type is nill");
                return false;
            }
            if (type == this.ajaxtype.post && tool.isEmpry(data) == "undefined") {
                console.log("data is nill");
                return false;
            }
            if (tool.isEmpry(async) == "undefined") {
                console.log("async is nill");
                return false;
            }
            if (tool.isEmpry(callback) == "undefined") {
                console.log("callback is nill");
                return false;
            }
            if(type=="post"){
            $.ajax({
                type: type,
                contentType: "application/json",
                url: url,
                dataType: "JSON",
                data: JSON.stringify(data),
                async: async,
                success: function (data) {
                    if (callback != undefined) {
                        callback(data)
                    }
                }
            });
            }
            else {
                $.ajax({
                    type: type,
                    contentType: "application/json",
                    url: url,
                    dataType: "JSON",
                    async: async,
                    success: function (data) {
                        if (callback != undefined) {
                            callback(data)
                        }
                    }
                });
            }
        }
    },
    localStorageTool: {
        setLocalStorage: function (key, value) {
            localStorage.setItem(key, value);
        },
        getLocalStorage: function (key) {
           return localStorage.getItem(key);
        }
    },
    cookiesTool: {
        setCookies: function (key, value) {
            let t = new Date();
            let t_s = t.getTime();
            t.setTime(t_s + 1000 * 60 * document.disposetime);
            $.cookie(key, value, {
                expires: t,
                path: '/'
            });
        },
        getCookies: function (key) {
            return $.cookie(key);
        }
    },
    paper: function (id, currentpage, allpages, pagessize, callback) {
        if (allpages == 0) {
            allpages = 1;
        }
        var options = {
            currentPage: currentpage, //1,
            totalPages: allpages, //100,
            numberOfPages: 10,
            shouldShowPage:true,
            bootstrapMajorVersion: 3,
            itemTexts: function (type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            },
            onPageClicked: function (event, originalEvent, type, page) {
                //alert(page);
                callback(page);
            }
        }
        $('#' + id).bootstrapPaginator(options);
    },
    stringtool: {
        substr: function (str, len) {
            if (str == null) {
                return "";
            }
            if (str.length > len) {
                return str.substring(0, len - 1) + "...";
            }
            return str;
        },
        cleandh:function (str) {
            return str.substring(0, str.length-1);
        }
    },
    percent_conversion_size:function(font_size,...p){
        var width=document.documentElement.clientWidth;
        var nums=p;
        var size = nums.reduce(function(a,b){
            return a*b;
        })*width;
        return Math.ceil(size/font_size)


        // var size=width;
        // for(var i=0;i<nums.length;i++){
        //     size=nums[i]*width;
        // }
        

    }
}