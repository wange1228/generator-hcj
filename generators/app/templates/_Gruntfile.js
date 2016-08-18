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
    
};
