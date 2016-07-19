'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var cfg = require('../hcj-config/basic-conf.js');

var generators = yeoman.generators;

var HCJGenerator = generators.Base.extend({
    initializing: function() {
        
    },
    prompting: function () {
        var that = this;
        var done = this.async();
        this.log(yosay(
            '欢迎使用 ' + chalk.red('HCJ 前端开发工作流')
        ));
        this.log(chalk.green('=== 添加项目 ==='));
        this.createDate = this._getDate();
        this.authorName = this.user.git.username + ' ' + '<' + this.user.git.email + '>';
        var prompts = [
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
                name: 'projectDesc',
                message: '项目描述：',
                type: 'input'
            }
        ];

        this.prompt(prompts, function (props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }
            console.log(this.projectName)
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
        var projectConf = 'hcj-config/projects-conf.js';

        fs.readFile(projectConf, 'utf-8', function(err, data) {
            var projectName = me.projectType + ':' + me.projectName;
            data = JSON.parse(data);
            if(data.indexOf(projectName) !== -1){
                me.log(chalk.red(me.projectType + '/' + me.projectName + '项目已经创建，请勿重复创建!'));
            }else{
                data.push(projectName)
                data = JSON.stringify(data);
                fs.writeFile(projectConf, data, function (err) {
                    if (err) throw err;
                    // 复制模板文件
                    console.log(from, path.join(from, 'srcPages/hcj-demo'), path.join(to['pages'], me.projectName))
                    me.directory(path.join(from, 'srcPages/hcj-demo'), path.join(to['pages'], me.projectName));

                    me.directory(path.join(from, 'srcStyles/hcj-demo'), path.join(to['styles'], me.projectName));
                    me.directory(path.join(from, 'srcScripts/hcj-demo'), path.join(to['scripts'], me.projectName));
                    me.directory(path.join(from, 'srcImages/hcj-demo'), path.join(to['images'], me.projectName));
                    
                    
                    me.log(chalk.green('=== 创建完成 ==='));
                    done();
                });
                
            }
        });
    }
});

module.exports = HCJGenerator;
