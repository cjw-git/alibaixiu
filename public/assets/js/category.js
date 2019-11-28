$('#addCategory').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(){
            location.reload();
        }
    })
    return false;
})

//发送ajax请求 向服务器端索要分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response){
        //console.log(response);
        //将服务器端返回的数据和HTML模板进行拼接
        var html = template('categoryListTpl',{data: response});
        //console.log(html);
        //将拼接好的内容放到页面中
        $('#categoryBox').html(html)
    }
})

//为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function(){
    //获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    //根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response){
            //console.log(response);
            var html = template('modifyCategoryTpl',response);
            //console.log(html);
            $('#formBox').html(html)
        }
    })
})

//当修改分类数据表单发生提交行为时
$('#formBox').on('submit','#modifyCategory',function(){
    //获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    //获取要修改的分类的id
    var id = $(this).attr('data-id')
    //发送请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/'+ id,
        data: formData,
        success: function(){
            location.reload()
        }
    })
    //阻止表单的默认提交行为
    return false;
})

$('#categoryBox').on('click','.delete',function(){
    
    if(confirm('您真的要执行删除操作吗?')){
        //获取要删除的分类数据的id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/'+ id,
            success: function(){
                location.reload()
            }
        })
    }
})