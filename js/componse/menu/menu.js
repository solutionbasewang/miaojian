var menus={
    loadMenu:function(container,index){
       var userinfo= tool.localStorageTool.getLocalStorage(keyvalue.userinfo.key);
       if(!tool.isEmpry(userinfo))
       {
           userinfo = JSON.parse(userinfo);
           var html="";
            for(i=0;i<userinfo.data.menus.length;i++)
            {
                var active="";
                var lis="";
                for(r=0;r<userinfo.data.menus[i].children.length;r++)
                {
                    if(index==userinfo.data.menus[i].children[r].index){
                        active="class='active'";
                        lis+=' <li><a href="'+userinfo.data.menus[i].children[r].url+'" '+active+'>'+userinfo.data.menus[i].children[r].name+'</a></li>';
                    }
                    else{
                        lis+=' <li><a href="'+userinfo.data.menus[i].children[r].url+'">'+userinfo.data.menus[i].children[r].name+'</a></li>';
                    }
                }
                html='<li '+active+'><a href="#"><i class="glyphicon glyphicon-menu-hamburger"></i>'+userinfo.data.menus[i].name+'<span class="fa arrow"></span></a>';
                html+='<ul class="nav nav-second-level">';
                html+=lis;
                html+="</ul></li>";
                $("#"+container).append(html);
            }
            $('#'+container).metisMenu();
       }
    }
}