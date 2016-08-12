/**
 * @author <%= authorName %>
 * @description <%= pageDesc %>
 * @date <%= createDate %>
 */

require([
    '<%= projectName %>/<%= pageName %>/list',
    'common/fastclick'
], function(
    List,
    fastclick
) {

    fastclick.attach(document.body);

    // 响应式布局
    $('html').css({
        fontSize:100*$('body').width()/750+'px'
    });

    //hcj-demo列表
    var list = new List({
        el: '#Hcjlist'
    });

    //对象事件绑定
    list.on({
        'get.data': function(data) {
            console.log(data);
            //todo
        }
    });
   
});
