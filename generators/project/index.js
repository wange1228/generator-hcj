'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var currentPath = process.cwd();
var cfgPath = path.join(currentPath, 'hcj-config/basic-conf.js');
var cfg = require(cfgPath);

console.log(cfgPath)
module.exports = yeoman.Base.extend({
    initializing: function() {
        var me = this;
        var done = this.async();
        me.projectFile = 'hcj-config/projects-conf.js';
        fs.readFile(me.projectFile, 'utf-8', function(err, data) {
            me.projectData = data;
            done();
        });
    },
    prompting: function () {
        var me = this;
        var done = this.async();
        this.log(yosay(
            '欢迎使用 ' + chalk.red('HCJ 前端开发工作流')
        ));
        this.log(chalk.green('=== 添加项目 ==='));
        this.createDate = this._getDate();
        this.authorName = this.user.git.username + ' ' + '<' + this.user.git.email + '>';

        var prompts = [
            {
                name: 'gitName',
                message: '仓库名称',
                type: 'list',
                choices: [
                    {
                        name: '理财',
                        value: 'finance'
                    },
                    {
                        name: '保险',
                        value: 'insurance'
                    },
                    {
                        name: '活动',
                        value: 'activities'
                    }
                ]
            },
            {
                name: 'projectType',
                message: '项目类型：',
                type: 'list',
                choices: [
                    {
                        name: '桌面端',
                        value: 'desktop'
                    },
                    {
                        name: '移动端',
                        value: 'mobile'
                    }
                ]
            },
            {
                name: 'projectName',
                message: '项目名称：',
                type: 'input',
                default: 'project-xxx'
            },
            {
                name: 'pageName',
                message: '页面名称：',
                type: 'input',
                default: 'index'
            },
            {
                name: 'pageDesc',
                message: '页面描述：',
                type: 'input'
            }
        ];

        this.prompt(prompts, function (props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }
            this.staticSvrHost = cfg.basic[this.projectType].host.statics;
            this.pathName = this.gitName == 'activities' ? '' : '/mobile';
            done();
        }.bind(this));
    },
    _getDate: function() {
        var date = new Date();
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    },
    writing: function() {
        var me = this;
        var project = this.projectType;
        var from = path.join('demo', project);
        var to = cfg[this.projectType].path.src;
        var done = this.async();

        var projectName = me.projectType + ':' + me.projectName;
        var pageName = projectName + ':' + me.pageName;
        var data = JSON.parse(me.projectData);
        var pageExt = me.projectType == 'mobile' ? '.html' : '.ftl';

        if(data.indexOf(pageName) !== -1){
            me.log(chalk.red(me.projectType + '/' + me.projectName + '/' + me.pageName + '页面已经创建，请勿重复创建!'));
        }else{
            if(data.indexOf(projectName) === -1){
                data.push(projectName);
            }
            data.push(pageName);
            data = JSON.stringify(data);
            data = data.replace(/,/g, ',\n\r').replace(/\[/g, '\[\n\r').replace(/\]/g, '\n\r\]').replace(/(".*?")/g, '    $1');
            fs.writeFile(me.projectFile, data, function (err) {
                if (err) throw err;
                // 复制模板文件
                me.copy(path.join(from, 'srcPages/hcj-demo', 'index.html'), path.join(to['pages'], me.projectName, me.pageName + pageExt));

                me.directory(path.join(from, 'srcStyles/hcj-demo'), path.join(to['styles'], me.projectName, me.pageName));
                me.directory(path.join(from, 'srcScripts/hcj-demo'), path.join(to['scripts'], me.projectName, me.pageName));
                me.directory(path.join(from, 'srcImages/hcj-demo'), path.join(to['images'], me.projectName));


                me.log(chalk.green('=== 创建完成 ==='));
                done();
            });

        }
    }
});
