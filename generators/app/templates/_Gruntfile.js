var Optimist = require('optimist');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var cmd = Optimist.usage('').argv;
    var isComponent = false; //是否打包组件
    if (cmd.component) {
      isComponent = true;
    };
    var util = require('./hcj-config/grunt/util.js');
    var Uglify = require('./hcj-config/grunt/uglify.js');
    var Copy = require('./hcj-config/grunt/copy.js');
    var Less = require('./hcj-config/grunt/less.js');
    var Clean = require('./hcj-config/grunt/clean.js');
    var Concat = require('./hcj-config/grunt/concat.js');
    var Includes = require('./hcj-config/grunt/includes.js');
    var Htmlmin = require('./hcj-config/grunt/htmlmin.js');
    var Requirejs = require('./hcj-config/grunt/requirejs.js');
    var Filerev = require('./hcj-config/grunt/filerev.js');
    var Usemin = require('./hcj-config/grunt/usemin.js');
    var Imagemin = require('./hcj-config/grunt/imagemin.js');
    var Babel = require('./hcj-config/grunt/babel.js');
    var GitContrast = require('./hcj-config/grunt/gitcontrast.js');
    // var Manifest = require('./hcj-config/grunt/manifest.js');

    var task = '';
    //是否单独构建项目
    var isSingle = false;
    try{
        task = grunt.cli.tasks[0];

        task = task.split(':');
        //设置项目
        isSingle = task.length > 2 ? true : false;

    }catch(e){
        throw e;
    }

    util.setConfig(isSingle, task);

    var taskGroup = [];

    taskGroup.push({name: 'uglify', o: new Uglify(isSingle)});
    taskGroup.push({name: 'copy', o: new Copy(isSingle)});
    taskGroup.push({name: 'less', o: new Less(isSingle)});
    taskGroup.push({name: 'clean', o: new Clean(isSingle)});
    taskGroup.push({name: 'concat', o: new Concat(isSingle)});
    taskGroup.push({name: 'includes', o: new Includes(isSingle)});
    taskGroup.push({name: 'htmlmin', o: new Htmlmin(isSingle)});
    taskGroup.push({name: 'requirejs', o: new Requirejs(isSingle)});
    taskGroup.push({name: 'filerev', o: new Filerev(isSingle)});
    taskGroup.push({name: 'usemin', o: new Usemin(isSingle)});
    taskGroup.push({name: 'imagemin', o: new Imagemin(isSingle)});
    taskGroup.push({name: 'babel', o: new Babel(isSingle)});
    taskGroup.push({name: 'gitcontrast', o: new GitContrast(isSingle)});
    // var manifest = taskGroup.push({name: 'manifest', o: new Manifest(isSingle)});

    var projects = util.getProjects();

    projects.forEach(function(o, i){
        var obj = o.split(':');
        var env = obj[0];
        var project = obj[1];
        var page = obj[2];
        var path = util.getPath(env, project, page);

        //项目/页面注入任务
        taskGroup.forEach(function(o, i){
            o.o.setProject(path, grunt);
        });

    });

    /**
     * [初始化grunt配置]
     */
    function init(){
        var config = {};
        taskGroup.forEach(function(o, i){
            config[o.name] = o.o.task[o.name];
        });
        grunt.initConfig(config);
    }

    init();

    var buildTasks = [
        'clean', //清除hcj build的目录
        'includes', //html includes
        'htmlmin',  //html 压缩
        'less:build', //样式编译
        'concat', //合并公用js
        'copy:js', //复制js到临时目录
        'requirejs',  //主文件通过r.js编译
        'babel',  //加上'use strict'的js文件进行babel
        'uglify:build', //压缩项目js
        'uglify:common', //压缩公用js
        'imagemin', //图片压缩
        'filerev', //生成文件版本
        'clean:tmp',  //清除临时目录
        'usemin', //html,css内静态地址加上版本号
        // 'manifest'
    ];
    if(isComponent){
        buildTasks.unshift('gitcontrast') //当前git分支与component分支比对，分支名需要一致
    }
    var hasRequireJS = false;
    taskGroup.forEach(function(o, i){
        if(o.name == 'requirejs'){
            hasRequireJS = o.o.hasRequirejs();
        }
    });

    if(!hasRequireJS){
        buildTasks = util.removeOne(buildTasks, 'requirejs');
    }

    grunt.registerTask('build:all', buildTasks);

    var isBuildProject = false;
    var _task = task.join(':');
    util.projects.forEach(function(o, i){
        if(_task === 'build:' + o){
            isBuildProject = true;
        }
    });
    if(isSingle && isBuildProject){
        grunt.registerTask(_task, buildTasks);
    }

};
