'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var config = require('./config.js');

var HCJGenerator = yeoman.generators.Base.extend({
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
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'pagesSvr',
                message: '静态页面服务器目录：',
                type: 'input',
                default: config.desktop.server.pages
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'pagesSvr',
                message: '静态页面服务器目录：',
                type: 'input',
                default: config.mobile.server.pages
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'staticSvr',
                message: '静态资源服务器目录：',
                type: 'input',
                default: config.desktop.server.static
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'staticSvr',
                message: '静态资源服务器目录：',
                type: 'input',
                default: config.mobile.server.static
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'port',
                message: '本地服务端口：',
                type: 'input',
                default: config.desktop.server.port
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'port',
                message: '本地服务端口：',
                type: 'input',
                default: config.mobile.server.port
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'livereload',
                message: 'livereload 端口：',
                type: 'input',
                default: config.desktop.server.livereload
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'livereload',
                message: 'livereload 端口：',
                type: 'input',
                default: config.mobile.server.livereload
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'srcPages',
                message: 'HTML 开发目录：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.src.pages + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'srcPages',
                message: 'HTML 开发目录：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.src.pages + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'srcStyles',
                message: 'CSS 开发目录：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.src.styles + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'srcStyles',
                message: 'CSS 开发目录：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.src.styles + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'srcScripts',
                message: 'JavaScript 开发目录：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.src.scripts + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'srcScripts',
                message: 'JavaScript 开发目录：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.src.scripts + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'srcImages',
                message: 'Image 开发目录：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.src.images + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'srcImages',
                message: 'Image 开发目录：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.src.images + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'buildPages',
                message: 'HTML 打包目录：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.build.pages + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'buildPages',
                message: 'HTML 打包目录：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.build.pages + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'buildStyles',
                message: 'CSS 打包目录：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.build.styles + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'buildStyles',
                message: 'CSS 打包目录：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.build.styles + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'buildScripts',
                message: 'JavaScript 打包目录：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.build.scripts + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'buildScripts',
                message: 'JavaScript 打包目录：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.build.scripts + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'buildImages',
                message: 'Image 打包目录：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.build.images + '/' + response.projectName;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'buildImages',
                message: 'Image 打包目录：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.build.images + '/' + response.projectName;
                }
            }
        ];

        this.prompt(prompts, function (props) {
            for (var prop in props) {
                if (props.hasOwnProperty(prop)) {
                    this[prop] = props[prop];
                }
            }

            done();

            this.log(chalk.green('=== 配置完成 ==='));
        }.bind(this));
    },

    writing: function() {
        // 根据配置创建目录
        this.mkdir(this.destinationRoot() + '/' + this.srcPages);
        this.mkdir(this.destinationRoot() + '/' + this.srcStyles);
        this.mkdir(this.destinationRoot() + '/' + this.srcScripts);
        this.mkdir(this.destinationRoot() + '/' + this.srcImages);

        // 复制模板文件
        this.copy('demo/'+this.projectType+'/hcj-demo.html',
                            this.srcPages+'/hcj-demo.html');
        this.copy('demo/'+this.projectType+'/hcj-demo.less',
                            this.srcStyles+'/hcj-demo.less');
        this.copy('demo/'+this.projectType+'/hcj-demo.js',
                            this.srcScripts+'/hcj-demo.js');

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
                this.log(chalk.green('=== 安装完成 ==='));
            }.bind(this)
        });
    }
});

module.exports = HCJGenerator;
