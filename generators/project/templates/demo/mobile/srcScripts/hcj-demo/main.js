/**
 * @author <%= authorName %>
 * @description <%= pageDesc %>
 * @date <%= createDate %>
 */

define(function($, util) {
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
