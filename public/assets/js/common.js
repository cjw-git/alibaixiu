//向服务器端发送请求 索要登录用户的信息
$.ajax({
  type: 'get',
  url: '/users/'+ userId,
  success: function(response){
    //console.log(response);   
    $('.profile .avatar').attr('src',response.avatar);
    $('.profile .name').html(response.nickName);
  }
})

$('#logout').on('click',function(){
    var isConfirm = confirm('您真的要退出登录吗?');
    if(isConfirm){
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function(){
          location.href = 'login.html'
        },
        error: function(){
          alert('退出失败')
        }
      })
    }
})

//处理日期时间格式
function formateDate(date){
  date = new Date(date);
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate()
} 

