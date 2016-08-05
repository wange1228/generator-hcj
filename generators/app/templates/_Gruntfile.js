module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var fs = require('fs');
    //配置文件
    
    var conf = require('./hcj-config/basic-conf.js');
    var projects = grunt.file.readJSON('./hcj-config/projects-conf.js');

    conf = JSON.stringify(conf);
    conf = conf.replace(/\\\\/g, '/');
    conf = JSON.parse(conf);

    //指定项目相关配置
    var _projects = projects.slice();
    var fileMap = {};
    var task = '';
    var isSingleProject = false;
    var isDev = false;
    try{
        task = grunt.cli.tasks[0];

        isDev = task.indexOf('dev') !== -1;
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
                assetsDirs: [],
                patterns: {
                    pages: [],
                    styles: []
                }
            },
            pages: [],
            styles: []
        };

        map.cleanF = {
            pages: [],
            styles: [],
            scripts: [],
            images: [],
            build: [],
            tmp: ['.tmpjs']
        };

        map.watchF = {
            pages: {
                files: [],
                tasks: [grunt.cli.tasks[0]],
                options: {livereload: conf.basic.server.livereload}
            },
            styles: {
                files: [],
                tasks: [grunt.cli.tasks[0]],
                options: {livereload: conf.basic.server.livereload}
            },
            scripts: {
                files: [],
                tasks: [grunt.cli.tasks[0]],
                options: {livereload: conf.basic.server.livereload}
            },
            images: {
                files: [],
                tasks: [grunt.cli.tasks[0]],
                options: {livereload: conf.basic.server.livereload}
            },
            tpl: {
                files: [],
                tasks: [grunt.cli.tasks[0]],
                options: {livereload: conf.basic.server.livereload}
            }
        }

        map.requirejsF = {};

       
        //build状态下需要打包common，lib
        if(!isDev){
            // 压缩移动端m.js，请勿颠倒次序！
            var libjs = [
                srcJs + '/lib/underscore/underscore.js', 
                srcJs + '/lib/zepto/zepto.js', 
                srcJs + '/lib/template/doT.js',
                srcJs + '/lib/backbone/backbone.js', 
                srcJs + '/lib/requirejs/require.js'
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
                
                map.uglifyF.push({
                    src: libjs,
                    dest: distJs + '/lib/m.js'
                });

                map.copyImagesF.push({
                    expand: true,
                    cwd: srcImg + '/common',
                    src: '**',
                    dest: distImg + '/common',
                    filter: 'isFile'
                });
            }

            //放到临时目录
            map.uglifyF.push({
                expand: true,
                cwd: srcJs + '/common',
                src: ['**/*.js'],
                dest: '.tmpjs/'+distJs+'/common'
            });
            map.uglifyF.push({
                expand: true,
                cwd: srcJs + '/lib',
                src: ['**/*.js'],
                dest: '.tmpjs/'+distJs+'/lib'
            });
            map.uglifyF.push({
                src: libjs,
                dest: '.tmpjs/'+distJs+'/lib/m.js'
            });

            //后续单独打包，不跟随项目
            map.filerev.push({
                expand: true,
                cwd: '.tmpjs/'+distJs+'/lib',
                src: ['**/*.js'],
                dest: distJs + '/lib',
                extDot: 'last',
                ext: '.js'
            });
            map.filerev.push({
                expand: true,
                cwd: '.tmpjs/'+distJs+'/common',
                src: ['**/*.js'],
                dest: distJs + '/common',
                extDot: 'last',
                ext: '.js'
            });

            // //清除多余公用文件
            // map.cleanF.longversion = [
            //     distJs + '/lib/**/*.*.*.**.{js,map}',
            //     distJs + '/common/**/*.*.*.**.{js,map}',
            //     '!'+distJs+'/common/HybridJSBridge/VH**.js'
            // ];
        }
        

        
    }

    function removeOne(list, val){
        var _list = list.slice();
        list.forEach(function(o, i) {
            if(o == val){
                _list.splice(i, 1);
            }
        });
        return _list;
    }

    /**
     * [获取当前项目]
     */
    function getProjects(){
        var p = _projects;
        var _tmp = [];

        //选择某个项目
        if(isSingleProject){
            var _current = task.slice(1).join(':');
            p.forEach(function(o, i) {
                if(o.indexOf(_current) === 0){
                    _tmp.push(o);
                }
            });
            if(_tmp.length > 1){
                _tmp = removeOne(_tmp, _current);
            }
            p = _tmp;
        }
        
        p.forEach(function(o, i){

            var env = o.split(':')[0];
            var project = o.split(':')[1];
            var page = o.split(':')[2];
            var cwd = conf[env].path;
            var srcImg = cwd.src.images + '/' + project;
            var distImg = cwd.build.images + '/' + project;
            var srcCss = cwd.src.styles + '/' + project;
            var distCss = cwd.build.styles + '/' + project;
            var srcJs = cwd.src.scripts + '/' + project;
            var distJs = cwd.build.scripts + '/' + project;
            var srcPage = cwd.src.pages + '/' + project;
            var distPage = cwd.build.pages + '/' + project;

            //打包某页面
            if(page){
                srcCss += '/' + page;
                distCss += '/' + page;
                srcJs += '/' + page;
                distJs += '/' + page;
            }
            
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
                src: ['**/*.css'],
                dest: distCss,
            });
            fileMap.filerev.push({
                expand: true,
                cwd: distJs,
                src: ['**/*.js'],
                dest: distJs
            });
            fileMap.filerev.push({
                expand: true,
                cwd: distImg,
                src: ['**/*.{png,jpg,gif,webp}'],
                dest: distImg
            });

            fileMap.cleanF.pages.push(distPage);
            fileMap.cleanF.styles.push(distCss);
            fileMap.cleanF.scripts.push(distJs);
            fileMap.cleanF.images.push(distImg);
            
            var htmlExt = env == 'desktop' ? '.ftl' : '.html';
            
            fileMap.htmlminF.push({
                expand: true,
                cwd: distPage,
                src: ['**/*'+htmlExt],
                dest: distPage,
                ext: htmlExt
            });
            
            fileMap.includeF[project] = {
                options: {
                    includePath: srcPage
                },
                files: [{
                    expand: true,
                    cwd: srcPage,
                    src: [page ? (page + htmlExt) : ('**/*'+htmlExt)],
                    dest: distPage,
                    ext: htmlExt
                }]
            };
            
            fileMap.useminF.pages.push(distPage + '/**'+htmlExt);
            fileMap.useminF.styles.push(distCss + '/**.css');
            var _pages = fileMap.useminF.options.patterns.pages;
            var _assetsDirs = fileMap.useminF.options.assetsDirs;
            var _project = project.replace(/\//g, '\\\/');
            
            _pages.push([new RegExp('\/('+_project+'(\/[^\/]+)*\/[a-zA-Z0-9\-_]*)\.css', 'g'), 'replace styles in pages', function(match){
                return getVersionFile(distCss, project, page, match, '.css');
            }]);
            _pages.push([new RegExp('(\/'+_project+'(\/[^\/]+)*\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in pages']);
            _pages.push([new RegExp('[\'\"][^\'\"]*(('+_project+'|lib|common)\/[^\'\"]*\)\.js[\'\"]', 'g'), 'replace scripts in pages', function(match){
                return getVersionFile(distJs, project, page, match, '.js');
            }]);
            _pages.push([new RegExp(': *[\'\"](('+_project+'|lib|common)\/.*\)[\'\"]', 'g'), 'replace require config in pages', function(match) {
                return getVersionFile(distJs, project, page, match, '.js');
            }]);
            fileMap.useminF.options.patterns.styles.push([new RegExp('(\/'+project+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in styles']);
            _assetsDirs.push(distJs.replace(project, ''));
            _assetsDirs.push(distCss.replace(project, ''));
            _assetsDirs.push(distImg.replace(project, ''));

            fileMap.watchF.pages.files.push(srcPage + (page ? ('/' + page + htmlExt) : ('/**/*'+htmlExt)));
            fileMap.watchF.styles.files.push(srcCss + '/**/*.less');
            fileMap.watchF.styles.files.push(cwd.src.styles + '/common/**/*.less');
            fileMap.watchF.scripts.files.push(srcJs + '/**/*.js');
            fileMap.watchF.scripts.files.push(cwd.src.scripts + '/common/**/*.*');
            fileMap.watchF.images.files.push(srcImg + '/**/*.*');
            fileMap.watchF.scripts.files.push(srcJs + '/**/*.tpl');
            
            //移动端使用requirejs,page存在才打包
            if(page){
                var isMainExist = fs.existsSync(srcJs + '/main.js');
                
                if(env == 'mobile' && isMainExist){
                    var requirejsEnv = task.indexOf('build') !== -1 ? 'build' : 'dev';
                    var requirejsOpts = {
                        baseUrl: srcJs.replace(project + '/' + page, ''),
                        include: [project + '/' + page + '/main.js'],       
                        out: distJs + '/main.js',
                        paths: {
                        'text': 'lib/requirejs/text'
                        },
                        stubModules: ['text']
                    };
                    if(requirejsEnv == 'build'){
                        requirejsOpts.optimize = 'uglify';
                    }else{
                        requirejsOpts.generateSourceMaps = true;
                        requirejsOpts.optimize = 'none';
                    }
                    fileMap.requirejsF[project + '-' + page + '-' + requirejsEnv] = {
                        options: requirejsOpts
                    };
                }
            }

        });
        
        return p;
    }


    function getVersionFile(distRoot, project, page, match, ext){

        var base = distRoot.replace(page ? (project + '/' + page) : project, '');
                
        var summary = {};
        
        for (var i in grunt.filerev.summary) {

            var key = i.replace(/\\/g, '/');
            
            var val = grunt.filerev.summary[i].replace(/\\/g, '/');
            
            if(key.indexOf(ext) !== -1){
                summary[key] = val;
            }
            
        }
        var result;
        var root;
        if(/^(lib|common)\/.*$/.test(match)){
            root = '.tmpjs/' + base;
        }else{
            root = base;
        }
        var mapFile = summary[
            root + match + ext
        ];
        
        if(mapFile){
            result = mapFile.replace(base, '').replace(ext, '');
        }else{
            result = match;
        }

        return result;
    }

    /**
     * [初始化grunt配置]
     */
    function init(){
        
        grunt.initConfig({
            connect: {
                options: {
                    port: conf.basic.server.port,
                    hostname: 'mlc.vip.com',
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
                            conf.basic.desktop.distRoot,
                            conf.basic.mobile.distRoot,
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
                            conf.basic.desktop.distRoot,
                            conf.basic.mobile.distRoot,
                            './'
                        ]
                    }
                }
            },

            watch: fileMap.watchF,

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
                dev: {
                    options: {
                        sourceMapRootpath: '/',
                        sourceMap: true,
                        sourceMapFileInline: true,
                        // paths: config.server.static.path,
                        compress: true
                    },
                    files: fileMap.lessBuildF
                },
                build: {
                    options: {
                        // paths: config.server.static.path,
                        compress: true
                    },
                    files: fileMap.lessBuildF
                }
            },

            uglify: {
                dev: {
                    options: {
                        mangle: false,
                        sourceMap: true
                    },
                    files: fileMap.uglifyF
                },
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

            includes: fileMap.includeF,

            requirejs: fileMap.requirejsF
        });
    }

    setFileMap(fileMap);

    getProjects();

    init();

    var devTasks = [
        // 'clean',
        'includes',
        'less:dev',
        'uglify:dev',
        'requirejs',
        'copy:images',
        // 'connect:src',
        'watch'
    ];

    var buildTasks = [
        'clean',
        'includes',
        'htmlmin',
        'less:build',

        'uglify:build',
        'requirejs',
        'copy:images',
        'filerev',
        'clean:tmp',
        'usemin',
        // 'connect:build'
    ];

    var hasRequireJS = false;
    for (var key in fileMap.requirejsF) {
        if(fileMap.requirejsF.hasOwnProperty(key)){
            hasRequireJS = true;
        }
    }

    if(!hasRequireJS){
        devTasks = removeOne(devTasks, 'requirejs');
        buildTasks = removeOne(buildTasks, 'requirejs');
    }
    
    grunt.registerTask('dev:all', devTasks);

    grunt.registerTask('build:all', buildTasks);

    var isDevProject = false;
    var isBuildProject = false;
    var _task = task.join(':');
    _projects.forEach(function(o, i){
        if(_task === 'build:' + o){
            isBuildProject = true;
        }
        if(_task === 'dev:' + o){
            isDevProject = true;
        }
    });
    if(isSingleProject){
        if(isBuildProject){
            grunt.registerTask(_task, buildTasks);    
        }
        if(isDevProject){
            grunt.registerTask(_task, devTasks);    
        }
    }
    
};
