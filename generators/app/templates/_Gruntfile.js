module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var path = require('path');
    //配置文件
    var config = grunt.file.readJSON('.hcjrc');
    var conf = require('./hcj-config/basic-conf.js');
    var projects = grunt.file.readJSON('./hcj-config/projects-conf.js');

    //指定项目相关配置
    var _projects = projects.slice();
    var fileMap = {};
    var task = '';
    var isSingleProject = false;
    try{
        task = grunt.cli.tasks[0];
        task = task.split(':');
        //设置项目
        isSingleProject = task.length > 2 ? true : false; 

    }catch(e){
        throw e;
    }

    function setFileMap(map){
        var srcJs = conf.mobile.path.src.scripts;
        var distJs = conf.mobile.path.build.scripts;
        var srcImg = conf.mobile.path.src.images;
        var distImg = conf.mobile.path.build.images;
        var srcCss = conf.mobile.path.src.styles;
        var distCss = conf.mobile.path.build.styles;

        map.copyImagesF = [];
        map.lessBuildF = [];
        map.uglifyF = [];
        map.filerev = [];
        map.htmlminF = [];
        map.includeF = {};
        map.useminF = {
            options: {
                assetsDirs: [
                    // config.path.build.styles.replace(config.project.name, ''),
                    // config.path.build.scripts.replace(config.project.name, ''),
                    // config.path.build.images.replace(config.project.name, '')
                ],
                patterns: {
                    pages: [
                        // [new RegExp('(\/'+config.project.name+'\/[a-zA-Z0-9\-_]*\.css)', 'g'), 'replace styles in pages'],
                        // [new RegExp('(\/'+config.project.name+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in pages'],
                        // [new RegExp('(\/(lib|common)\/.*\/[a-zA-Z0-9\-_]*\.js)', 'g'), 'replace scripts in pages'],
                        // [new RegExp(': *[\'\"](('+config.project.name+'|lib|common)\/.*\)[\'\"]', 'g'), 'replace require config in pages', function(match) {
                            
                        //     var base = config.path.build.scripts.replace(config.project.name, '');
                        //     var summary = {};

                        //     for (var i in grunt.filerev.summary) {
                        //         var key = i.replace(/\\/g, '/'),
                        //             val = grunt.filerev.summary[i].replace(/\\/g, '/');
                        //         summary[key] = val;
                        //     }

                        //     return summary[
                        //         base + match + '.js'
                        //     ].replace(base, '').replace('.js', '');
                        // }]
                    ],
                    styles: [
                        // [new RegExp('(\/'+config.project.name+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in styles']
                    ]
                }
            },
            pages: [],
            styles: []
            // pages: config.path.build.pages + '/**.html',
            // styles: config.path.build.styles + '/**.css'
        };

        map.cleanF = {
            pages: [],
            styles: [],
            scripts: [],
            images: [],
            build: []
        };

        //清除多余公用文件
        map.cleanF.longversion = [
            distJs + '/lib/**/*.*.*.**.{js,map}',
            distJs + '/common/**/*.*.*.**.{js,map}'
        ];
        
        if(!isSingleProject){
            map.uglifyF.push({
                expand: true,
                cwd: srcJs + '/common',
                src: ['**/*.js'],
                dest: distJs + '/common',
                extDot: 'last',
                ext: '.js'
            });
            map.uglifyF.push({
                expand: true,
                cwd: srcJs + '/lib',
                src: ['**/*.js'],
                dest: distJs + '/lib',
                extDot: 'last',
                ext: '.js'
            });
            map.filerev.push({
                expand: true,
                cwd: distJs + '/lib',
                src: ['**/*.js', '!**/*.**.*.js'],
                dest: distJs + '/lib',
                extDot: 'last',
                ext: '.js'
            });
            map.filerev.push({
                expand: true,
                cwd: distJs + '/common',
                src: ['**/*.js', '!**/*.**.*.js'],
                dest: distJs + '/common',
                extDot: 'last',
                ext: '.js'
            });
            
        }

        
    }

    /**
     * [获取当前项目]
     */
    function getProjects(){
        var p = _projects;

        //选择某个项目
        if(isSingleProject){
            p = task.slice(1).join(':');
            p = [p];
        }
        
        p.forEach(function(o, i){
            var env = o.split(':')[0];
            var project = o.split(':')[1];
            var cwd = conf[env].path;
            var srcImg = path.join(cwd.src.images, project);
            var distImg = path.join(cwd.build.images, project);
            var srcCss = path.join(cwd.src.styles, project);
            var distCss = path.join(cwd.build.styles, project);
            var srcJs = path.join(cwd.src.scripts, project);
            var distJs = path.join(cwd.build.scripts, project);
            var srcPage = path.join(cwd.src.pages, project);
            var distPage = path.join(cwd.build.pages, project);
            fileMap.copyImagesF.push({
                expand: true,
                cwd: srcImg,
                src: '**',
                dest: distImg,
                filter: 'isFile'
            });
            fileMap.lessBuildF.push({
                expand: true,
                cwd: srcCss,
                src: ['**/*.less'],
                dest: distCss,
                ext: '.css'
            });
            fileMap.uglifyF.push({
                expand: true,
                cwd: srcJs,
                src: ['**/*.js'],
                dest: distJs,
                ext: '.js'
            });
            fileMap.filerev.push({
                expand: true,
                cwd: distCss,
                src: ['*.css'],
                dest: distCss,
            });
            fileMap.filerev.push({
                expand: true,
                cwd: distJs,
                src: ['*.js'],
                dest: distJs
            });
            fileMap.filerev.push({
                expand: true,
                cwd: distImg,
                src: ['*.{png,jpg,gif,webp}'],
                dest: distImg
            });

            fileMap.cleanF.pages.push(distPage);
            fileMap.cleanF.styles.push(distCss);
            fileMap.cleanF.scripts.push(distJs);
            fileMap.cleanF.images.push(distImg);
            
            fileMap.htmlminF.push({
                expand: true,
                cwd: distPage,
                src: ['**/*.html'],
                dest: distPage,
                ext: '.html'
            });
            
            fileMap.includeF[project] = {
                options: {
                    includePath: srcPage
                },
                files: [{
                    expand: true,
                    cwd: srcPage,
                    src: ['**/*.html'],
                    dest: distPage,
                    ext: '.html'
                }]
            };
            
            fileMap.useminF.pages.push(distPage + '/**.html');
            fileMap.useminF.styles.push(distCss + '/**.css');
            fileMap.useminF.options.patterns.pages.push([new RegExp('(\/'+project+'\/[a-zA-Z0-9\-_]*\.css)', 'g'), 'replace styles in pages']);
            fileMap.useminF.options.patterns.pages.push([new RegExp('(\/'+project+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in pages']);
            fileMap.useminF.options.patterns.pages.push([new RegExp('(\/(lib|common)\/.*\/[a-zA-Z0-9\-_]*\.js)', 'g'), 'replace scripts in pages']);
            fileMap.useminF.options.patterns.pages.push([new RegExp(': *[\'\"](('+project+'|lib|common)\/.*\)[\'\"]', 'g'), 'replace require config in pages', function(match) {

                var base = distJs.replace(project, '');
                base = base.replace(/\\/g, '/');
                var summary = {};

                for (var i in grunt.filerev.summary) {

                    var key = i.replace(/\\/g, '/');
                    
                    var val = grunt.filerev.summary[i].replace(/\\/g, '/');
                        
                    summary[key] = val;
                }

                var result = summary[
                    base + match + '.js'
                ].replace(base, '').replace('.js', '');
                return result;
            }]);
            fileMap.useminF.options.assetsDirs.push(distJs.replace(project, ''));
            fileMap.useminF.options.assetsDirs.push(distCss.replace(project, ''));
            fileMap.useminF.options.assetsDirs.push(distImg.replace(project, ''));

        });
        console.log(fileMap.includeF)
        return p;
    }


    /**
     * [初始化grunt配置]
     */
    function init(){
        
        grunt.initConfig({
            connect: {
                options: {
                    port: conf.basic.server.port,
                    hostname: '127.0.0.1',
                    livereload: conf.basic.server.livereload,
                    protocol: 'https',
                    key: grunt.file.read('ssl/server.key').toString(),
                    cert: grunt.file.read('ssl/server.crt').toString(),
                    ca: grunt.file.read('ssl/ca.crt').toString()
                },
                src: {
                    options: {
                        base: [
                            conf.desktop.server.pages.path,
                            conf.mobile.server.pages.path,
                            conf.desktop.server.statics.path,
                            conf.mobile.server.statics.path,
                            './'
                        ]
                    }
                },
                build: {
                    options: {
                        keepalive: true,
                        livereload: false,
                        base: [
                            conf.desktop.server.pages.path,
                            conf.mobile.server.pages.path,
                            conf.desktop.server.statics.path,
                            conf.mobile.server.statics.path,
                            './'
                        ]
                    }
                }
            },

            // watch: {
            //     pages: {
            //         files: [config.path.src.pages + '/**.html'],
            //         tasks: ['clean:pages', 'includes'],
            //         options: {
            //             livereload: config.server.livereload
            //         }
            //     },
            //     styles: {
            //         files: [config.path.src.styles + '/**.less'],
            //         tasks: ['clean:styles', 'less:dev'],
            //         options: {
            //             livereload: config.server.livereload
            //         }
            //     },
            //     scripts: {
            //         files: [config.path.src.scripts + '/**.js'],
            //         tasks: ['clean:scripts', 'uglify:dev'],
            //         options: {
            //             livereload: config.server.livereload
            //         }
            //     },
            //     images: {
            //         files: [config.path.src.images + '/**.*'],
            //         tasks: ['clean:images', 'copy:images'],
            //         options: {
            //             livereload: config.server.livereload
            //         }
            //     }
            // },

            copy: {
                images: {
                    files: fileMap.copyImagesF
                }
            },

            htmlmin: {
                build: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: fileMap.htmlminF
                }
            },

            less: {
                // dev: {
                //     options: {
                //         sourceMapRootpath: '/',
                //         sourceMap: true,
                //         sourceMapFileInline: true,
                //         paths: config.server.static.path,
                //         compress: true
                //     },
                //     files: [{
                //         expand: true,
                //         cwd: config.path.src.styles,
                //         src: ['**/*.less'],
                //         dest: config.path.build.styles,
                //         ext: '.css'
                //     }]
                // },
                build: {
                    options: {
                        // paths: config.server.static.path,
                        compress: true
                    },
                    files: fileMap.lessBuildF
                }
            },

            uglify: {
                // dev: {
                //     options: {
                //         mangle: true,
                //         sourceMap: true
                //     },
                //     files: [{
                //         expand: true,
                //         cwd: config.path.src.scripts,
                //         src: ['**/*.js'],
                //         dest: config.path.build.scripts,
                //         ext: '.js'
                //     }, {
                //         expand: true,
                //         cwd: config.path.src.scripts.replace(config.project.name, '') + 'lib',
                //         src: ['**/*.js'],
                //         dest: config.path.build.scripts.replace(config.project.name, '') + 'lib',
                //         extDot: 'last',
                //         ext: '.js'
                //     }, {
                //         expand: true,
                //         cwd: config.path.src.scripts.replace(config.project.name, '') + 'common',
                //         src: ['**/*.js'],
                //         dest: config.path.build.scripts.replace(config.project.name, '') + 'common',
                //         extDot: 'last',
                //         ext: '.js'
                //     }]
                // },
                build: {
                    options: {
                        mangle: true
                    },
                    files: fileMap.uglifyF
                }
            },

            filerev: {
                options: {
                    algorithm: 'md5',
                    length: 7
                },
                build: {
                    files: fileMap.filerev
                }
            },

            usemin: fileMap.useminF,
            clean: fileMap.cleanF,

            includes: fileMap.includeF
        });
    }

    setFileMap(fileMap);

    getProjects();

    init();

    grunt.registerTask('dev', [
        'clean',
        'includes',
        'less:dev',
        'uglify:dev',
        'copy:images',
        'connect:src',
        'watch'
    ]);


    var buildTasks = [
        'clean',
        'includes',
        'htmlmin',
        'less:build',
        'uglify:build',
        'copy:images',
        'filerev',
        'usemin',
        // 'connect:build'
    ];

    grunt.registerTask('build:all', buildTasks);

    if(isSingleProject){
        grunt.registerTask(task.join(':'), buildTasks);
    }
    
};
