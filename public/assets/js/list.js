//获取地址栏中的categoryId参数
var categoryId =  getUrlParams('categoryId');

//根据分类id查询文章列表
$.ajax({
    type: 'get',
    url: '/posts/category/'+categoryId,
    success: function(response){
        //console.log(response);
        var html = template('listTpl',{data: response})
        //console.log(html);
        $('#listBox').html(html)
        
    }
})  

//根据id查询分类
$.ajax({
    type: 'get',
    url: '/categories/'+ categoryId,
    success: function(response){
        //console.log(response);
        $('#categoryTitle').html(response.title);
    }
})