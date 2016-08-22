'use strict';

var Fs = require('fs');
var Path = require('path');

module.exports = {
    conf: null, //基础配置
    projects: null, //项目配置
    isSingle: false,
    setConfig: function setConfig(isSingle, task) {
        var basicPath = Path.resolve(__dirname, '../../basic-conf.js');
        var projectPath = Path.resolve(__dirname, '../../projects-conf.js');
        var conf = require(basicPath);
        var projects = Fs.readFileSync(projectPath, 'utf-8');
        conf = JSON.stringify(conf);
        conf = conf.replace(/\\\\/g, '/');
        this.conf = JSON.parse(conf);
        this.projects = JSON.parse(projects);
        this.isSingle = isSingle;
        this.task = task;
    },
    getSrc: function getSrc(env) {
        return this.conf[env].path.src;
    },
    getDist: function getDist(env) {
        return this.conf[env].path.build;
    },
    // 合并/压缩移动端m.js，请勿颠倒次序！
    getMobileLib: function getMobileLib() {
        var srcJs = this.getSrc('mobile').scripts;
        return [srcJs + '/lib/underscore/underscore.js', srcJs + '/lib/zepto/zepto.js', srcJs + '/lib/template/doT.js', srcJs + '/lib/backbone/backbone.js', srcJs + '/lib/requirejs/require.js'];
    },
    removeOne: function removeOne(list, val) {
        var _list = list.slice();
        list.forEach(function (o, i) {
            if (o == val) {
                _list.splice(i, 1);
            }
        });
        return _list;
    },
    getProjects: function getProjects() {
        var _this = this;

        var p = this.projects.slice();
        var _tmp = [];
        var task = this.task;

        //选择某个项目
        if (this.isSingle) {
            (function () {
                var _current = task.slice(1).join(':');
                p.forEach(function (o, i) {

                    if (o.indexOf(_current) === 0) {
                        _tmp.push(o);
                    }
                });

                var seperatorArray = _current.match(/:/g);
                if (_tmp.length > 1 && seperatorArray instanceof Array) {
                    //mobile:balance:recharge mobile:balance:rechargeSuccess
                    if (seperatorArray.length > 1) {
                        _tmp = [_current];
                    } else if (seperatorArray.length == 1) {
                        //mobile:balance
                        _tmp = _this.removeOne(_tmp, _current);
                    }
                }

                p = _tmp;
            })();
        }

        return p;
    },
    /**
     * [获取指定项目/页面静态路径]
     */
    getPath: function getPath(env, project, page) {
        var src = this.getSrc(env);
        var dist = this.getDist(env);
        var result = {
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
        if (page) {
            result.srcCss += '/' + page;
            result.distCss += '/' + page;
            result.srcJs += '/' + page;
            result.distJs += '/' + page;
        }

        return result;
    }
};