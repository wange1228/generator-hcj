'use strict'

let Fs = require('fs');
let Path = require('path');

module.exports = {
    conf: null, //基础配置
    projects: null, //项目配置
    isSingle: false,
    setConfig: function(isSingle, task) {
        let basicPath = Path.resolve(__dirname, '../basic-conf.js');
        let projectPath = Path.resolve(__dirname, '../projects-conf.js');
        let conf = require(basicPath);
        let projects = Fs.readFileSync(projectPath, 'utf-8');
        conf = JSON.stringify(conf);
        conf = conf.replace(/\\\\/g, '/');
        this.conf = JSON.parse(conf);
        this.projects = JSON.parse(projects);
        this.isSingle = isSingle;
        this.task = task;
    },
    getSrc: function(env){
        return this.conf[env].path.src;
    },
    getDist: function(env){
        return this.conf[env].path.build;
    },
    // 合并/压缩移动端m.js，请勿颠倒次序！
    getMobileLib: function(){
        let srcJs = this.getSrc('mobile').scripts;
        return [
            srcJs + '/lib/underscore/underscore.js',
            srcJs + '/lib/zepto/zepto.js',
            srcJs + '/lib/template/doT.js',
            srcJs + '/lib/backbone/backbone.js',
            srcJs + '/lib/requirejs/require.js'
        ];
    },
    removeOne: function(list, val){
        var _list = list.slice();
        list.forEach(function(o, i) {
            if(o == val){
                _list.splice(i, 1);
            }
        });
        return _list;
    },
    getProjects: function(){
        let p = this.projects.slice();
        let _tmp = [];
        let task = this.task;

        //选择某个项目
        if(this.isSingle){
            let _current = task.slice(1).join(':');
            p.forEach(function(o, i) {

                if(o.indexOf(_current) === 0){
                    _tmp.push(o);
                }
            });

            let seperatorArray = _current.match(/:/g);
            if(_tmp.length > 1 && seperatorArray instanceof Array){
                //mobile:balance:recharge mobile:balance:rechargeSuccess
                if(seperatorArray.length > 1){
                    _tmp = [_current];
                }else if(seperatorArray.length == 1){
                    //mobile:balance
                    _tmp = this.removeOne(_tmp, _current);
                }

            }

            p = _tmp;
        }

        return p;
    },
    /**
     * [获取指定项目/页面静态路径]
     */
    getPath: function(env, project, page){
        let src = this.getSrc(env);
        let dist = this.getDist(env);
        let result = {
            srcImg: src.images + '/' + project,
            distImg: dist.images + '/' + project,
            srcCss: src.styles + '/' + project,
            distCss: dist.styles + '/' + project,
            srcJs: src.scripts + '/' + project,
            distJs: dist.scripts + '/' + project,
            srcPage: src.pages + '/' + project,
            distPage: dist.pages + '/' + project,
            page: page,
            project: project,
            env: env
        };

        //打包某页面
        if(page){
            result.srcCss += '/' + page;
            result.distCss += '/' + page;
            result.srcJs += '/' + page;
            result.distJs += '/' + page;
        }

        return result;
    }
};
