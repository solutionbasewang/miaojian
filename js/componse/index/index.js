this.init.check.userinfo.open();
var index = {
    loadcount_fanyi:function () {
        var url = document.urlmanager.base.url +"/order/query/statistic";
        var param=
            {
                OrderId: null,
                ContextIds :[],
                Sponsor: null,
                Executor: null,
                StartTime: null,
                StopTime: null,
                OrderFlag: 0,
                OrderCategory: 0,
                Title: $("#search_title").val(),
                OrgIds:[]
            }
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != 0) {
                alert("系统错误");
            } else {
                // var type=data.data.Statistics;
                var fj = data.data.Translate;
                $("#wfy").html(fj.未翻译);
                // $("#allcount").html("全部("+(fj.全部)+ ")");
                // $("#yfy_count").html("已翻译("+fj.已翻译+ ")");
                // $("#wfy_count").html("未翻译("+fj.未翻译+ ")");
                // $("#zzfy_count").html("翻译中("+fj.翻译中+ ")");
                // var quanbu=type.平面+type.网络+type.微信+type.微博+type.论坛+type.贴吧+type.博客+type.问答+type.视频+type.广播+type.电视+type.App;
                // $("#quanbu").html("全部("+quanbu+ ")");
                // $("#pingming").html("平面("+type.平面+ ")");
                // $("#wangluo").html("网络("+type.网络+ ")");
                // $("#weixin").html("微信("+type.微信+ ")");
                // $("#Weibo").html("微博("+type.微博+ ")");
                // $("#BBS").html("论坛("+type.论坛+ ")");
                // $("#TieBa").html("贴吧("+type.贴吧+ ")");
                // $("#Blog").html("博客("+type.博客+ ")");
                // $("#wenda").html("问答("+type.问答+ ")");
                // $("#shipin").html("视频("+type.视频+ ")");
                // $("#guangbo").html("广播("+type.广播+ ")");
                // $("#dianshi").html("电视("+type.电视+ ")");
                // $("#app").html("App("+type.App+ ")");

            }
        })
    },
    loadcount_fenjian:function () {
        var param={Keywords:{},CombineType:"1",StartTime:moment().subtract('days',7).format("YYYY-MM-DD 00:00:00"),StopTime:moment().format("YYYY-MM-DD 23:59:59"),OrganizationId:"0"}
        console.log(JSON.stringify(param));
        var url=document.urlmanager.base.url + "/context/group/statistics/query";
        tool.ajaxTool.ajax(url, tool.ajaxTool.ajaxtype.post, param, true, function (data) {
            if (data.res != "0") {
                alert("系统错误");
            } else {
                // var type=data.data.Statistics;
                var fj = data.data.Allocations;
                // $("#news_count").html("全部("+(fj.未分拣+fj.已分拣)+ ")");
                // $("#news_yfj").html("已分拣("+fj.已分拣+ ")");
                $("#wfj").html(fj.未分拣);
                // var quanbu=type.平面+type.网络+type.微信+type.微博+type.论坛+type.贴吧+type.博客+type.问答+type.视频+type.广播+type.电视+type.App;
                // $("#quanbu").html("全部("+quanbu+ ")");
                // $("#pingming").html("平面("+type.平面+ ")");
                // $("#wangluo").html("网络("+type.网络+ ")");
                // $("#weixin").html("微信("+type.微信+ ")");
                // $("#Weibo").html("微博("+type.微博+ ")");
                // $("#BBS").html("论坛("+type.论坛+ ")");
                // $("#TieBa").html("贴吧("+type.贴吧+ ")");
                // $("#Blog").html("博客("+type.博客+ ")");
                // $("#wenda").html("问答("+type.问答+ ")");
                // $("#shipin").html("视频("+type.视频+ ")");
                // $("#guangbo").html("广播("+type.广播+ ")");
                // $("#dianshi").html("电视("+type.电视+ ")");
                // $("#app").html("App("+type.App+ ")");
            }

        })
    }
}