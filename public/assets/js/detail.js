//从地址栏中获取文章id
var postId =  getUrlParams('id');
//评论是否经过人工审核
var review;
//向服务器发送请求  根据文章id获取文章详细信息
$.ajax({
    type: 'get',
    url: '/posts/'+ postId ,
    success: function(response){
        //console.log(response);
        var html = template('detailTpl',response);
        //console.log(html);
        $('.article').html(html)
    }
})

//点赞功能
$('.article').on('click','#like',function(){
   //向服务器端发送请求  执行点赞操作
   $.ajax({
       type: 'post',
       url: '/posts/fabulous/'+postId,
       success: function(){
           alert('点赞成功,感谢您的支持');
       }
   })
})

//获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response){
        console.log(response);
        review = response.review;
        //判断管理员是否开启了评论功能
        if(response.comment){
            //管理员开启了评论功能  渲染评论模板
            var html = template('commentTpl')
            //console.log(html);
            $('#comment').html(html)
        }
        
    }
})

$('#comment').on('submit','form',function(){
    //获取用户输入的评论内容
    var content = $(this).find('textarea').val();
    if(review){
        //需要经过人工审核
        state = 0;
    }else{
        //不需要经过人工审核
        state = 1;
    }
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function(){
            alert('评论成功');
            location.reload();
        },  
        error: function(){
            alert('评论失败');
        }
    })
    return false;
})