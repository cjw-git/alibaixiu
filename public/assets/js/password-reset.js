$('#modifyForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        data: formData,
        url: '/users/password',
        success: function(){
            location.href = "/admin/login.html"
        }
    })
    //阻止表单的默认行为
    return false;
})