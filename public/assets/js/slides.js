//当选择文件时
$('#file').on('change',function(){
    //选择到的文件
    var file = this.files[0];
    //创建formData对象实现二进制文件上传
    var formData = new FormData();
    //将选择到的文件添加到formData对象中
    formData.append('image',file);
    //向服务器发送请求  实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            console.log(response[0].image);
            $('#image').val(response[0].image)
        }
    })
})

$('#slidesForm').on('submit',function(){
    //获取表单中输入的内容
    var formData = $(this).serialize();
    //向服务器端发送请求  添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(){
            location.reload();
        }
    })
    return false;
})

//向服务器端发送请求  获取轮播图列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response){
        //console.log(response);
        var html = template('slidesTpl',{data: response})
        //console.log(html);
        $('#slidesBox').html(html)
        
    }
})

$('#slidesBox').on('click','.delete',function(){
    if(confirm('您确定要进行删除操作吗?')){
        //获取要删除的轮播图的id
        var id = $(this).attr('data-id');
        //向服务器端发送请求  告诉服务器要删除哪个轮播图
        $.ajax({
            type: 'delete',
            url: '/slides/'+id,
            success: function(){
                location.reload();
            }
        })
    }
})