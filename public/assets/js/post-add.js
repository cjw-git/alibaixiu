//向服务器发送请求 获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response){
        //console.log(response);
        var html = template('categoryTpl',{data: response});
        //console.log(html);
        $('#category').html(html);
    }
})

//当选择文件的时候  触发事件
$('#father').on('change','#feature',function(){
    //获取到管理员选择到的文件
    var file = this.files[0];
    //创建formData对象 实现二进制文件上传
    var formData = new FormData();
    //将选择到的文件追加到formData对象中
    formData.append('cover',file);
    //实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        //告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function(response){
            //console.log(response);
            $('#thumbnail').val(response[0].cover)
        }
    })
})

//当添加文章表单提交的时候
$('#addForm').on('submit',function(){
    //获取在表单中输入的内容
    var formData = $(this).serialize()
    //向服务器端发送请求  实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(){  
            location.href='/admin/posts.html'
        }
    })
    //阻止表单默认提交的行为
    return false;
})

//获取浏览器的地址栏中的id参数
var id = getUrlParams('id')
//修改文章操作
if(id != -1){
    $.ajax({
        type: 'get',
        url: '/posts/'+id,
        success: function(response){
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories){
                    response.categories = categories;
                    var html = template('modifyTpl',response);
                    //console.log(html);
                    $('#parentBox').html(html)
                }
            })
           

        }
    })
}

//从浏览器的地址栏中获取查询参数
function getUrlParams(name){
   var paramsAry = location.search.substr(1).split('&');
    //循环数据
    for(var i = 0; i < paramsAry.length ; i++){
        var tmp = paramsAry[i].split('=');
        if(tmp[0] == name){
            return tmp[1];
            
        }
    }
    return -1;
}

$('#parentBox').on('submit','#modifyForm',function(){
    var formData = $(this).serialize();
    var id = $(this).attr("data-id");
    $.ajax({
        type: 'put',
        url: '/posts/'+id,
        data: formData,
        success: function(){
            location.href = '/admin/posts.html'
        }
    })
    return false;
})
