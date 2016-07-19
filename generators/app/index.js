'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var cfg = require('./hcj-config/basic-conf.js');

var generators = yeoman.generators;

var HCJGenerator = generators.Base.extend({
    prompting: function () {
        var that = this;
        var done = this.async();
        this.log(yosay(
            '欢迎使用 ' + chalk.red('HCJ 前端开发工作流')
        ));
        this.log(chalk.green('=== 开始配置 ==='));

        var prompts = [
            {
                name: 'projectName',
                message: '项目名称：',
                type: 'input',
                default: 'project-xxx'
            },
            {
                name: 'authorName',
                message: '开发人员：',
                type: 'input',
                default: this.user.git.username + ' ' + '<' + this.user.git.email + '>'
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
                name: 'projectDesc',
                message: '项目描述：',
                type: 'input',
                default: ''
            }
        ];

        this.prompt(prompts, function (props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }
            this.createDate = this.getDate();
            this.log(chalk.green('=== 配置完成 ==='));
            done();
        }.bind(this));
    },
    getDate: function() {
        var date = new Date();
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    },
    writing: function() {
        var project = this.projectType;
        var from = path.join('demo', project);
        var to = cfg[this.projectType].path.src;
        
        // 复制模板文件
        this.directory(path.join(from, 'srcPages/hcj-demo'), path.join(to['pages'], this.projectName));

        this.directory(path.join(from, 'srcStyles/hcj-demo'), path.join(to['styles'], this.projectName));
        this.directory(path.join(from, 'srcScripts/hcj-demo'), path.join(to['scripts'], this.projectName));
        this.directory(path.join(from, 'srcImages/hcj-demo'), path.join(to['images'], this.projectName));
        this.directory('hcj-config', 'hcj-config');
        
        // 复制证书
        this.directory('_ssl', 'ssl');

        // 复制配置文件
        this.copy('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_package.json', 'package.json');
        this.copy('_.hcjrc', '.hcjrc');
    },

    end: function() {
        this.installDependencies({
            bower: false,
            npm: true,
            callback: function () {
                // this.spawnCommand('grunt', ['dev']);
                this.log(chalk.green('=== 安装完成 ==='));
            }.bind(this)
        });
    }
});

module.exports = HCJGenerator;
