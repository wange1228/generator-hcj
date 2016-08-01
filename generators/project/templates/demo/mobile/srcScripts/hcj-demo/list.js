/**
 * @author <%= authorName %>
 * @description <%= pageDesc %>
 * @date <%= createDate %>
 */

define([
    'text!./list.tpl',
    './model'
], function(
    tpl,
    Model
) {
    
    var E_GET_DATA = 'get.data'; //抛出事件

    var K = Backbone.View.extend({
        initialize: function() {
            var me = this;
            me._model = new Model;
            me._tpl = doT.template(tpl);
            //单个请求
            me.querySingle();
            //多个请求
            // me.queryMulti();
        },
        events: {
            
        },
        /**
         * [查询XXX]
         */
        querySingle: function(){
            var me = this;
            // me._model.query1({
            //     data: {id: 'XXX'}
            // }).done(function(res){
            //     //todo
            // });
            
            //假装请求并拿到了数据，呵呵
            setTimeout(function(){
                var data = [{
                    name: '产品1',
                    pic: '//<%= staticSvrHost %>/mobile/images/<%= projectName %>/hcj-demo.jpg'
                },{
                    name: '产品2',
                    pic: '//<%= staticSvrHost %>/mobile/images/<%= projectName %>/hcj-demo.jpg'
                }];
                me.render(data);
                me.trigger(E_GET_DATA, data);
            }, 300);
        },
        /**
         * [查询XXX]
         */
        queryMulti: function(){
            var me = this;
            $.when(
                me._model.query1({
                    id: 'XXX'
                }),
                me._model.query2({
                    id: 'XXX'
                })
            ).done(function() {
                //todo
            });
        },
        render: function(data) {
            var me = this;
            
            me.$el.html(me._tpl({
                list: data || []
            }));

            
        }
    });

    return K;

});
