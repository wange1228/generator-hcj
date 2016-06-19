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
                name: 'pagesSvrPath',
                message: '静态页面服务器路径：',
                type: 'input',
                default: config.desktop.server.pages.path
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'pagesSvrPath',
                message: '静态页面服务器路径：',
                type: 'input',
                default: config.mobile.server.pages.path
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'pagesSvrHost',
                message: '静态页面域名：',
                type: 'input',
                default: config.desktop.server.pages.host
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'pagesSvrHost',
                message: '静态页面域名：',
                type: 'input',
                default: config.mobile.server.pages.host
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'staticSvrPath',
                message: '静态资源服务器路径：',
                type: 'input',
                default: config.desktop.server.static.path
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'staticSvrPath',
                message: '静态资源服务器路径：',
                type: 'input',
                default: config.mobile.server.static.path
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'staticSvrHost',
                message: '静态资源域名：',
                type: 'input',
                default: config.desktop.server.static.host
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'staticSvrHost',
                message: '静态资源域名：',
                type: 'input',
                default: config.mobile.server.static.host
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
                name: 'srcBase',
                message: 'Base 开发路径：',
                type: 'input',
                default: function(response) {
                    return config.desktop.path.src.base;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'mobile';
                },
                name: 'srcBase',
                message: 'Base 开发路径：',
                type: 'input',
                default: function(response) {
                    return config.mobile.path.src.base;
                }
            },
            {
                when: function(response) {
                    return response.projectType === 'desktop';
                },
                name: 'srcPages',
                message: 'HTML 开发路径：',
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
                message: 'HTML 开发路径：',
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
                message: 'CSS 开发路径：',
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
                message: 'CSS 开发路径：',
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
                message: 'JavaScript 开发路径：',
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
                message: 'JavaScript 开发路径：',
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
                message: 'Image 开发路径：',
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
                message: 'Image 开发路径：',
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
                message: 'HTML 打包路径：',
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
                message: 'HTML 打包路径：',
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
                message: 'CSS 打包路径：',
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
                message: 'CSS 打包路径：',
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
                message: 'JavaScript 打包路径：',
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
                message: 'JavaScript 打包路径：',
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
                message: 'Image 打包路径：',
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
                message: 'Image 打包路径：',
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

            this.log(chalk.green('=== 配置完成 ==='));
            done();
        }.bind(this));
    },

    writing: function() {
        // 复制模板文件
        this.directory('demo/'+this.projectType+'/srcPages/hcj-demo', this.srcPages);
        this.directory('demo/'+this.projectType+'/srcPages/common', config[this.projectType].path.src.pages + '/common');
        this.directory('demo/'+this.projectType+'/srcStyles/hcj-demo', this.srcStyles);
        this.directory('demo/'+this.projectType+'/srcScripts/hcj-demo', this.srcScripts);
        this.directory('demo/'+this.projectType+'/srcScripts/lib', config[this.projectType].path.src.scripts + '/lib');
        this.directory('demo/'+this.projectType+'/srcImages/hcj-demo', this.srcImages);

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
