'use strict'

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    let util = require('./hcj-config/grunt/util.js');
    let Uglify = require('./hcj-config/grunt/uglify.js');
    let Copy = require('./hcj-config/grunt/copy.js');
    let Less = require('./hcj-config/grunt/less.js');
    let Clean = require('./hcj-config/grunt/clean.js');
    let Concat = require('./hcj-config/grunt/concat.js');
    let Includes = require('./hcj-config/grunt/includes.js');
    let Htmlmin = require('./hcj-config/grunt/htmlmin.js');
    let Requirejs = require('./hcj-config/grunt/requirejs.js');
    let Filerev = require('./hcj-config/grunt/filerev.js');
    let Usemin = require('./hcj-config/grunt/usemin.js');

    let task = '';
    //是否单独构建项目
    let isSingle = false;
    try{
        task = grunt.cli.tasks[0];

        task = task.split(':');
        //设置项目
        isSingle = task.length > 2 ? true : false; 

    }catch(e){
        throw e;
    }

    util.setConfig(isSingle, task);

    let taskGroup = [];

    let uglify = taskGroup.push({name: 'uglify', o: new Uglify(isSingle)});
    let copy = taskGroup.push({name: 'copy', o: new Copy(isSingle)});
    let less = taskGroup.push({name: 'less', o: new Less(isSingle)});
    let clean = taskGroup.push({name: 'clean', o: new Clean(isSingle)});
    let concat = taskGroup.push({name: 'concat', o: new Concat(isSingle)});
    let includes = taskGroup.push({name: 'includes', o: new Includes(isSingle)});
    let htmlmin = taskGroup.push({name: 'htmlmin', o: new Htmlmin(isSingle)});
    let requirejs = taskGroup.push({name: 'requirejs', o: new Requirejs(isSingle)});
    let filerev = taskGroup.push({name: 'filerev', o: new Filerev(isSingle)});
    let usemin = taskGroup.push({name: 'usemin', o: new Usemin(isSingle)});

    let projects = util.getProjects();

    projects.forEach(function(o, i){
        let obj = o.split(':');
        let env = obj[0];
        let project = obj[1];
        let page = obj[2];
        let path = util.getPath(env, project, page);

        //项目/页面注入任务
        taskGroup.forEach(function(o, i){
            o.o.setProject(path, grunt);
        });

    });

    /**
     * [初始化grunt配置]
     */
    function init(){
        let config = {};
        taskGroup.forEach(function(o, i){
            config[o.name] = o.o.task[o.name];
        });
        grunt.initConfig(config);
    }

    init();

    var buildTasks = [
        'clean',
        'includes',
        'htmlmin',
        'less:build',
        'concat',
        'uglify:build',
        'requirejs',
        'copy:images',
        'filerev',
        'clean:tmp',
        'usemin'
    ];

    let hasRequireJS = false;
    taskGroup.forEach(function(o, i){
        if(o.name == 'requirejs'){
            hasRequireJS = o.o.hasRequirejs();
        }
    });

    if(!hasRequireJS){
        buildTasks = util.removeOne(buildTasks, 'requirejs');
    }
    
    grunt.registerTask('build:all', buildTasks);

    let isBuildProject = false;
    let _task = task.join(':');
    util.projects.forEach(function(o, i){
        if(_task === 'build:' + o){
            isBuildProject = true;
        }
    });
    if(isSingle && isBuildProject){
        grunt.registerTask(_task, buildTasks);    
    }
    

    /**
     * [获取当前项目]
     */
    // function getProjects(){

        // p.forEach(function(o, i){

        //     var env = o.split(':')[0];
        //     var project = o.split(':')[1];
        //     var page = o.split(':')[2];
        //     var cwd = conf[env].path;
        //     var srcImg = cwd.src.images + '/' + project;
        //     var distImg = cwd.build.images + '/' + project;
        //     var srcCss = cwd.src.styles + '/' + project;
        //     var distCss = cwd.build.styles + '/' + project;
        //     var srcJs = cwd.src.scripts + '/' + project;
        //     var distJs = cwd.build.scripts + '/' + project;
        //     var srcPage = cwd.src.pages + '/' + project;
        //     var distPage = cwd.build.pages + '/' + project;

        //     //打包某页面
        //     if(page){
        //         srcCss += '/' + page;
        //         distCss += '/' + page;
        //         srcJs += '/' + page;
        //         distJs += '/' + page;
        //     }
            
        //     fileMap.uglifyF.push({
        //         expand: true,
        //         cwd: srcJs,
        //         src: ['**/*.js'],
        //         dest: distJs,
        //         ext: '.js'
        //     });

        // });
        
        // return p;
    // }


    // return;


    // var fs = require('fs');
    // //配置文件
    
    // var conf = require('./hcj-config/basic-conf.js');
    // var projects = grunt.file.readJSON('./hcj-config/projects-conf.js');

    // conf = JSON.stringify(conf);
    // conf = conf.replace(/\\\\/g, '/');
    // conf = JSON.parse(conf);

    // //指定项目相关配置
    // var _projects = projects.slice();
    // var fileMap = {};
    // var task = '';
    // var isSingleProject = false;
    // try{
    //     task = grunt.cli.tasks[0];

    //     task = task.split(':');
    //     //设置项目
    //     isSingleProject = task.length > 2 ? true : false; 

    // }catch(e){
    //     throw e;
    // }

    // function setFileMap(map){
    //     var srcJs = conf.mobile.path.src.scripts;
    //     var distJs = conf.mobile.path.build.scripts;
    //     var srcImg = conf.mobile.path.src.images;
    //     var distImg = conf.mobile.path.build.images;
    //     var srcCss = conf.mobile.path.src.styles;
    //     var distCss = conf.mobile.path.build.styles;

    //     map.copyImagesF = [];
    //     map.lessBuildF = [];
    //     map.concatF = [];
    //     map.uglifyF = [];
    //     map.filerev = [];
    //     map.htmlminF = [];
    //     map.includeF = {};
    //     map.useminF = {
    //         options: {
    //             assetsDirs: [],
    //             patterns: {
    //                 pages: [],
    //                 styles: []
    //             }
    //         },
    //         pages: [],
    //         styles: []
    //     };

    //     map.cleanF = {
    //         pages: [],
    //         styles: [],
    //         scripts: [],
    //         images: [],
    //         build: [],
    //         tmp: ['.tmpjs']
    //     };

    //     map.requirejsF = {};

       
    //     // 压缩移动端m.js，请勿颠倒次序！
    //     var libjs = [
    //         srcJs + '/lib/underscore/underscore.js', 
    //         srcJs + '/lib/zepto/zepto.js', 
    //         srcJs + '/lib/template/doT.js',
    //         srcJs + '/lib/backbone/backbone.js', 
    //         srcJs + '/lib/requirejs/require.js'
    //     ];

    //     if(!isSingleProject){
    //         map.concatF['mobilelib'] = {
    //             src: libjs,
    //             dest: srcJs + '/lib/m.js'
    //         };
    //         map.uglifyF.push({
    //             expand: true,
    //             cwd: srcJs + '/common',
    //             src: ['**/*.js'],
    //             dest: distJs + '/common',
    //             extDot: 'last',
    //             ext: '.js'
    //         });
    //         map.uglifyF.push({
    //             expand: true,
    //             cwd: srcJs + '/lib',
    //             src: ['**/*.js'],
    //             dest: distJs + '/lib',
    //             extDot: 'last',
    //             ext: '.js'
    //         });
            
    //         map.uglifyF.push({
    //             src: libjs,
    //             dest: distJs + '/lib/m.js'
    //         });

    //         map.copyImagesF.push({
    //             expand: true,
    //             cwd: srcImg + '/common',
    //             src: '**',
    //             dest: distImg + '/common',
    //             filter: 'isFile'
    //         });
    //     }

    //     //放到临时目录
    //     map.uglifyF.push({
    //         expand: true,
    //         cwd: srcJs + '/common',
    //         src: ['**/*.js'],
    //         dest: '.tmpjs/'+distJs+'/common'
    //     });
    //     map.uglifyF.push({
    //         expand: true,
    //         cwd: srcJs + '/lib',
    //         src: ['**/*.js'],
    //         dest: '.tmpjs/'+distJs+'/lib'
    //     });
    //     map.uglifyF.push({
    //         src: libjs,
    //         dest: '.tmpjs/'+distJs+'/lib/m.js'
    //     });

    //     //后续单独打包，不跟随项目
    //     map.filerev.push({
    //         expand: true,
    //         cwd: '.tmpjs/'+distJs+'/lib',
    //         src: ['**/*.js'],
    //         dest: distJs + '/lib',
    //         extDot: 'last',
    //         ext: '.js'
    //     });
    //     map.filerev.push({
    //         expand: true,
    //         cwd: '.tmpjs/'+distJs+'/common',
    //         src: ['**/*.js'],
    //         dest: distJs + '/common',
    //         extDot: 'last',
    //         ext: '.js'
    //     });

        
    // }

    // function removeOne(list, val){
    //     var _list = list.slice();
    //     list.forEach(function(o, i) {
    //         if(o == val){
    //             _list.splice(i, 1);
    //         }
    //     });
    //     return _list;
    // }

    // /**
    //  * [获取当前项目]
    //  */
    // function getProjects(){
    //     var p = _projects;
    //     var _tmp = [];

    //     //选择某个项目
    //     if(isSingleProject){
    //         var _current = task.slice(1).join(':');
    //         p.forEach(function(o, i) {

    //             if(o.indexOf(_current) === 0){
    //                 _tmp.push(o);
    //             }
    //         });

    //         var seperatorArray = _current.match(/:/g);
    //         if(_tmp.length > 1 && seperatorArray instanceof Array){
    //             //mobile:balance:recharge mobile:balance:rechargeSuccess
    //             if(seperatorArray.length > 1){
    //                 _tmp = [_current];
    //             }else if(seperatorArray.length == 1){
    //                 //mobile:balance
    //                 _tmp = removeOne(_tmp, _current);
    //             }
                
    //         }
            
    //         p = _tmp;
    //     }
        
    //     p.forEach(function(o, i){

    //         var env = o.split(':')[0];
    //         var project = o.split(':')[1];
    //         var page = o.split(':')[2];
    //         var cwd = conf[env].path;
    //         var srcImg = cwd.src.images + '/' + project;
    //         var distImg = cwd.build.images + '/' + project;
    //         var srcCss = cwd.src.styles + '/' + project;
    //         var distCss = cwd.build.styles + '/' + project;
    //         var srcJs = cwd.src.scripts + '/' + project;
    //         var distJs = cwd.build.scripts + '/' + project;
    //         var srcPage = cwd.src.pages + '/' + project;
    //         var distPage = cwd.build.pages + '/' + project;

    //         //打包某页面
    //         if(page){
    //             srcCss += '/' + page;
    //             distCss += '/' + page;
    //             srcJs += '/' + page;
    //             distJs += '/' + page;
    //         }
            
    //         fileMap.copyImagesF.push({
    //             expand: true,
    //             cwd: srcImg,
    //             src: '**',
    //             dest: distImg,
    //             filter: 'isFile'
    //         });
    //         fileMap.lessBuildF.push({
    //             expand: true,
    //             cwd: srcCss,
    //             src: ['**/*.less'],
    //             dest: distCss,
    //             ext: '.css'
    //         });
    //         fileMap.uglifyF.push({
    //             expand: true,
    //             cwd: srcJs,
    //             src: ['**/*.js'],
    //             dest: distJs,
    //             ext: '.js'
    //         });
    //         fileMap.filerev.push({
    //             expand: true,
    //             cwd: distCss,
    //             src: ['**/*.css'],
    //             dest: distCss,
    //         });
    //         fileMap.filerev.push({
    //             expand: true,
    //             cwd: distJs,
    //             src: ['**/*.js'],
    //             dest: distJs
    //         });
    //         fileMap.filerev.push({
    //             expand: true,
    //             cwd: distImg,
    //             src: ['**/*.{png,jpg,gif,webp}'],
    //             dest: distImg
    //         });

    //         fileMap.cleanF.pages.push(page ? distPage + '/' + page : distPage);
    //         fileMap.cleanF.styles.push(distCss);
    //         fileMap.cleanF.scripts.push(distJs);
    //         fileMap.cleanF.images.push(distImg);
            
    //         var htmlExt = env == 'desktop' ? '.ftl' : '.html';
            
    //         fileMap.htmlminF.push({
    //             expand: true,
    //             cwd: distPage,
    //             src: ['**/*'+htmlExt],
    //             dest: distPage,
    //             ext: htmlExt
    //         });
            
    //         var includeFProp = page ? project + '/' + page : project;
    //         var includeFSrc = page ? (page + htmlExt) : ('**/*'+htmlExt);
    //         fileMap.includeF[includeFProp] = {
    //             options: {
    //                 includePath: srcPage
    //             },
    //             files: [{
    //                 expand: true,
    //                 cwd: srcPage,
    //                 src: [includeFSrc],
    //                 dest: distPage,
    //                 ext: htmlExt
    //             }]
    //         };

            
    //         fileMap.useminF.pages.push(distPage + '/**'+htmlExt);
    //         fileMap.useminF.styles.push(distCss + '/**.css');
    //         var _pages = fileMap.useminF.options.patterns.pages;
    //         var _assetsDirs = fileMap.useminF.options.assetsDirs;
    //         var _project = project.replace(/\//g, '\\\/');
            
    //         _pages.push([new RegExp('\/('+_project+'(\/[^\/]+)*\/[a-zA-Z0-9\-_]*)\.css', 'g'), 'replace styles in pages', function(match){
    //             return getVersionFile(distCss, project, page, match, '.css');
    //         }]);
    //         _pages.push([new RegExp('(\/'+_project+'(\/[^\/]+)*\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in pages']);
    //         _pages.push([new RegExp('[\'\"][^\'\"]*(('+_project+'|lib|common)\/[^\'\"]*\)\.js[\'\"]', 'g'), 'replace scripts in pages', function(match){
    //             return getVersionFile(distJs, project, page, match, '.js');
    //         }]);
    //         _pages.push([new RegExp(': *[\'\"](('+_project+'|lib|common)\/.*\)[\'\"]', 'g'), 'replace require config in pages', function(match) {
    //             return getVersionFile(distJs, project, page, match, '.js');
    //         }]);
    //         fileMap.useminF.options.patterns.styles.push([new RegExp('(\/'+project+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in styles']);
    //         _assetsDirs.push(distJs.replace(project, ''));
    //         _assetsDirs.push(distCss.replace(project, ''));
    //         _assetsDirs.push(distImg.replace(project, ''));
            
    //         //移动端使用requirejs,page存在才打包
    //         if(page){
    //             var isMainExist = fs.existsSync(srcJs + '/main.js');
                
    //             if(env == 'mobile' && isMainExist){
    //                 var requirejsOpts = {
    //                     baseUrl: srcJs.replace(project + '/' + page, ''),
    //                     include: [project + '/' + page + '/main.js'],       
    //                     out: distJs + '/main.js',
    //                     optimize: 'uglify',
    //                     paths: {
    //                         'text': 'lib/requirejs/text'
    //                     },
    //                     stubModules: ['text']
    //                 };
                    
    //                 fileMap.requirejsF[project + '-' + page + '-build'] = {
    //                     options: requirejsOpts
    //                 };
    //             }
    //         }

    //     });
        
    //     return p;
    // }


    // function getVersionFile(distRoot, project, page, match, ext){

    //     var base = distRoot.replace(page ? (project + '/' + page) : project, '');
                
    //     var summary = {};
        
    //     for (var i in grunt.filerev.summary) {

    //         var key = i.replace(/\\/g, '/');
            
    //         var val = grunt.filerev.summary[i].replace(/\\/g, '/');
            
    //         if(key.indexOf(ext) !== -1){
    //             summary[key] = val;
    //         }
            
    //     }
    //     var result;
    //     var root;
    //     if(/^(lib|common)\/.*$/.test(match)){
    //         root = '.tmpjs/' + base;
    //     }else{
    //         root = base;
    //     }
    //     var mapFile = summary[
    //         root + match + ext
    //     ];
        
    //     if(mapFile){
    //         result = mapFile.replace(base, '').replace(ext, '');
    //     }else{
    //         result = match;
    //     }

    //     return result;
    // }

    // /**
    //  * [初始化grunt配置]
    //  */
    // function init(){
        
    //     grunt.initConfig({
    //         copy: {
    //             images: {
    //                 files: fileMap.copyImagesF
    //             }
    //         },

    //         htmlmin: {
    //             build: {
    //                 options: {
    //                     removeComments: true,
    //                     collapseWhitespace: true
    //                 },
    //                 files: fileMap.htmlminF
    //             }
    //         },

    //         less: {
    //             build: {
    //                 options: {
    //                     // paths: config.server.static.path,
    //                     compress: true
    //                 },
    //                 files: fileMap.lessBuildF
    //             }
    //         },

    //         concat: fileMap.concatF,

    //         uglify: {
    //             build: {
    //                 options: {
    //                     mangle: true
    //                 },
    //                 files: fileMap.uglifyF
    //             }
    //         },

    //         filerev: {
    //             options: {
    //                 algorithm: 'md5',
    //                 length: 7
    //             },
    //             build: {
    //                 files: fileMap.filerev
    //             }
    //         },

    //         usemin: fileMap.useminF,
    //         clean: fileMap.cleanF,

    //         includes: fileMap.includeF,

    //         requirejs: fileMap.requirejsF
    //     });
    // }

    // setFileMap(fileMap);

    // getProjects();

    // init();

    // var buildTasks = [
    //     'clean',
    //     'includes',
    //     'htmlmin',
    //     'less:build',
    //     'concat',
    //     'uglify:build',
    //     'requirejs',
    //     'copy:images',
    //     'filerev',
    //     'clean:tmp',
    //     'usemin'
    // ];

    // var hasRequireJS = false;
    // for (var key in fileMap.requirejsF) {
    //     if(fileMap.requirejsF.hasOwnProperty(key)){
    //         hasRequireJS = true;
    //     }
    // }

    // if(!hasRequireJS){
    //     buildTasks = removeOne(buildTasks, 'requirejs');
    // }
    
    // grunt.registerTask('build:all', buildTasks);

    // var isBuildProject = false;
    // var _task = task.join(':');
    // _projects.forEach(function(o, i){
    //     if(_task === 'build:' + o){
    //         isBuildProject = true;
    //     }
    // });
    // if(isSingleProject && isBuildProject){
    //     grunt.registerTask(_task, buildTasks);    
    // }
    
};
