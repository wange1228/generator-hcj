/**
 * @author <%= authorName %>
 * @description <%= projectDesc %>
 * @date <%= createDate %>
 */

define(['zepto', 'util-demo', 'md5'], function($, util) {
    function HcjDemo() {
        this.init();
    }
    
    HcjDemo.prototype = {
        init: function() {
            console.log($);
            console.log(hex_md5);
            console.log(util.test);
        }
    };

    new HcjDemo();
});
