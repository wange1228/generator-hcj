define('hcj-demo', ['zepto', 'md5'], function($) {
    function HcjDemo() {
        this.init();
    }

    HcjDemo.prototype = {
        init: function() {
            console.log($);
            console.log(hex_md5);
        }
    };

    new HcjDemo();
});
