//向服务器端发送请求  索要随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(response){
        //console.log(response);
        var randomTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
        {{/each}}
        `;
        var html = template.render(randomTpl,{data: response});
        $('#randomBox').html(html);
    }
})

//向服务器端发送请求  索要最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(response){
        //console.log(response);
        //img里的src {{$value.author.avatar}}
        //span里的作者itcast改成  {{$value.author.nickName}}
        var commentsTpl=`
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <div class="avatar">
            <img src="uploads/avatar_1.jpg" alt="">
          </div>
          <div class="txt">
            <p>
              <span>itcast</span>{{$imports.formateDate($value.createAt)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
        {{/each}}
        `;
        var html = template.render(commentsTpl,{data: response})
        $('#commentsBox').html(html)
    }
})

//处理日期时间格式
function formateDate(date){
    date = new Date(date);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+ date.getDate()
} 

//向服务器端发送请求  索要文章分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response){
        //console.log(response);
        var navTpl = `
        {{each data}}
        <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(navTpl,{data: response})
        $('#navBox').html(html)
        $('#topNavBox').html(html)
    }
})

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

 //获取搜索表单   并为其添加表单提交事件
 $('.search form').on('submit',function(){
    //获取用户在表单中输入的搜索关键字
    var keys = $(this).find('.keys').val();
    //跳转到搜索结果页面  并将用户输入的关键字传递到搜索结果页面
    location.href = "/search.html?key="+keys;
    
    return false;
 })
 //从地址栏中获取文章id
var postId =  getUrlParams('id');

