//表单发送提交行为时
$('#userForm').on('submit',function(){
    //获取用户在表单输入的内容,并转换为参数字符串
    var formData = $(this).serialize();

    var email = $('#email').val();
    var password = $('#password').val();
    var nickName = $('#password').val();
    //判断用户是否输入了邮箱地址
    if(email.trim().length == 0){
      alert('请输入邮箱');
      return;
    }
    //判断用户是否输入了密码
    if(password.trim().length == 0){
      alert('请输入密码');
      return;
    }
     //判断用户是否输入了密码
     if(nickName.trim().length == 0){
        alert('请输入昵称');
        return;
      }
    //向服务器端发送请求  添加用户
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(){
            //添加成功,刷新页面
            location.reload();
        },
        error: function(response){
            alert('用户添加失败')
        }
    })
    //阻止表单的默认提交行为
    return false;
})
//当用户选择文件的时候
$('#modifyBox').on('change','#avatar',function(){
    var formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData: false,
         //告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response){
            console.log(response);
            //实现头像预览功能
            $('#preview').attr('src',response[0].avatar);
            //图片地址
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})

//向服务器发送请求  索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response){
        //console.log(response);
        //使用模板引擎将数据和html字符串进行拼接
        var html = template('userTpl',{data: response});
        //console.log(html);
        //将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
})

//通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click','.edit',function(){
    //获取被点击用户的id
    var id = $(this).attr('data-id');
    //根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response){
           // console.log(response);
            var html = template('modifyTpl',response);
            //console.log(html);
            $('#modifyBox').html(html)
        }
    })
})

//为修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function(){
    //获取用户在表单输入的内容
    var formData = $(this).serialize();
    //console.log(formData);
    //获取要修改的用户的id
    var id = $(this).attr('data-id');
    
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response){
            //console.log(response);
            location.reload()
        }
    })
    //阻止表单的默认提交行为
    return false;
})

//当点击删除按钮时
$('#userBox').on('click','.delete',function(){
    if(confirm('你确定要删除这个用户吗?')){
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/'+id,
            success: function(){
                location.reload();
            }
        })
    }
})

//获取全选按钮
var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany');
//当全选按钮的状态发送变化时
selectAll.on('change',function(){
    //获取到全选按钮当前的状态
    var status = $(this).prop('checked');

    if(status){
        deleteMany.show()
    }else{
        deleteMany.hide()
    }
    //获取到所有的用户  并将所有用户按钮状态和全选按钮状态同步
    $('#userBox').find('input').prop('checked',status)
}) 

$('#userBox').on('change','.userStatus',function(){
    //获取所有用户  在所有用户中过滤出选中的用户
    //判断选中的用户数量和所有用户的数量是否一致
    //如果一致  就说明所有的用户都是选中的
    //否则  就是有用户没有被选中
    var inputs = $('#userBox').find('input');
    if(inputs.length == inputs.filter(':checked').length){
        //所有用户都是选中的
        selectAll.prop('checked',true);
    }else{
        //不是所有用户都是选中的
        selectAll.prop('checked',false);
    }

    if(inputs.filter(':checked').length > 0){
        deleteMany.show()
    }else{
        deleteMany.hide()
    }
})

//为批量删除按钮添加点击事件
deleteMany.on('click',function(){
    var ids = [];
    var checkedUser = $('#userBox').find('input').filter(':checked');
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'))
    });

    if(confirm('您真的要批量删除这些用户吗?')){
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function(){
                location.reload();
            }
            
        })
    }
})