var message={
    error:function(containerid,message){
        var templatehtml="<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>警告！</strong>"+message+"</div>"
        $("#"+containerid).html(templatehtml);
        setTimeout(
            function () {
                $("#"+containerid).html("");
            }, 2000
        );
    }
}