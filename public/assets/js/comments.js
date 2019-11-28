/*  //测试用  创建评论  添加一些模拟数据
$.ajax({
    type: 'post',
    url: '/comments',
    data: {
        author:  '5dda6ebeb2b3fb3dc78502d7',
            
        content: '66666666666666666666666666',
        post: '5dda6ebeb2b3fb3dc78502d7',
        state: 1,
        createAt: "2019-03-17",
       
    },
     success: function(){}
}) */
  

//获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response){
        //console.log(response);
        var html = template('commentsTpl',response);
        //console.log(html);
        $('#commentsBox').html(html);
        var pageHTML = template('pageTpl',response);
        //console.log(pageHTML);
        $('#pageBox').html(pageHTML);
    }
})

//实现分页
function changePage (page){
    $.ajax({
      type: 'get',
      url: '/comments',
      data: {
        page: page
      },
      success: function(response){
        //console.log(response);
        var html = template('commentsTpl',response);
        //console.log(html);
        $('#commentsBox').html(html);
        var pageHTML = template('pageTpl',response);
        //console.log(pageHTML);
        $('#pageBox').html(pageHTML);
      }
    })
}

//点击审核按钮时
$('#commentsBox').on('click','.status',function(){
    //获取当前评论的状态
    var status = $(this).attr('data-status');
    //获取当前评论的id
    var id = $(this).attr('data-id');
    //向服务器发送请求  更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id ,
        data:{
            state: status == 0 ? 1 : 0
        },
        success: function(){
            location.reload()
        }
    })
})

//点击删除按钮  添加删除评论事件
$('#commentsBox').on('click','.delete',function(){
    if(confirm('您确定要删除此评论吗?')){
        //获取当前要删除的评论的id
        var id = $(this).attr('data-id');
        //向服务器发送请求  删除选中的评论
        $.ajax({
            type: 'delete',
            url: '/comments/'+id,
            success: function(){
                location.reload();
            }
        })
    }
})