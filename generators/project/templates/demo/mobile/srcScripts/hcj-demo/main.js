/**
 * @author <%= authorName %>
 * @description <%= pageDesc %>
 * @date <%= createDate %>
 */

require([
    'common/fastclick'
], function(
    fastclick
) {

    fastclick.attach(document.body);

    // 响应式布局
    $('html').css({
        fontSize:100*$('body').width()/750+'px'
    });

   
});
