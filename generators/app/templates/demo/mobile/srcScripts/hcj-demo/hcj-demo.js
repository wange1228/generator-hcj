define('hcj-demo', ['zepto'], function($) {
    function HcjDemo() {

        this.init();
    }

    HcjDemo.prototype = {
        init: function() {
            console.log($);
        }
    };

    new HcjDemo();
});
