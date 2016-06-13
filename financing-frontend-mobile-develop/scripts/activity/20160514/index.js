define('index', ['zepto', 'util', 'template'], function($, util, template) {
    $('html').css({
        fontSize:100*$('body').width()/720+'px'
    });

    $('#template-id').replaceWith(
        template('template-id', {
            name: 'wange.zhu',
            gender: 'male'
        })
    );
});
