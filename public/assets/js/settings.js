//当选择logo图片时
$('#logo').on('change',function(){
    //获取选择到的图片
    var file = this.files[0];
    //创建formData对象  实现二进制文件的上传
    var formData = new FormData();
    //将选择到的文件添加到formData对象中
    formData.append('logo',file);
    //向服务器发送请求  实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response);
            //将logo地址存储在隐藏域中
            $('#hiddenLogo').val(response[0].logo)
            //将logo显示在页面中
            $('#preview').attr('src', response[0].logo)  
        }
    })
})

//当网站设置表单发送提交行为时
$('#settingsForm').on('submit',function(){
    //获取表单中输入的内容
    var formData = $(this).serialize();
    //向服务器发送请求  实现网站设置数据的添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(){
            location.reload();
        }
    })
    return false;  
})

//向服务器端发送请求   索要网站设置数据
$.ajax({
    type: 'get' ,
    url: '/settings' ,
    success: function(response){
        //console.log(response);
       if(response){
        //将logo地址存储在隐藏域中
        $('#hiddenLogo').val(response.logo);
        //将logo显示在页面中
        $('#preview').attr('src', response.logo);
        //将站点名称显示在页面中
        $('input[name="title"]').val(response.title);
        //将站点描述显示在页面中
        $('#description').html(response.description);
        //将站点关键字显示在页面中
        $('input[name="keywords"]').val(response.keywords);
        //将开启评论与否显示在页面中
        $('input[name="comment"]').prop('checked',response.comment);
        //将评论经过人工批准与否显示在页面中
        $('input[name="review"]').prop('checked',response.review);
        
         
        }
    }
})  