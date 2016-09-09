module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var util = require('./hcj-config/grunt/lib/util.js');
    var Uglify = require('./hcj-config/grunt/lib/uglify.js');
    // var Copy = require('./hcj-config/grunt/lib/copy.js');
    var Less = require('./hcj-config/grunt/lib/less.js');
    var Clean = require('./hcj-config/grunt/lib/clean.js');
    var Concat = require('./hcj-config/grunt/lib/concat.js');
    var Includes = require('./hcj-config/grunt/lib/includes.js');
    var Htmlmin = require('./hcj-config/grunt/lib/htmlmin.js');
    var Requirejs = require('./hcj-config/grunt/lib/requirejs.js');
    var Filerev = require('./hcj-config/grunt/lib/filerev.js');
    var Usemin = require('./hcj-config/grunt/lib/usemin.js');
    var Imagemin = require('./hcj-config/grunt/lib/imagemin.js');

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

    var uglify = taskGroup.push({name: 'uglify', o: new Uglify(isSingle)});
    // var copy = taskGroup.push({name: 'copy', o: new Copy(isSingle)});
    var less = taskGroup.push({name: 'less', o: new Less(isSingle)});
    var clean = taskGroup.push({name: 'clean', o: new Clean(isSingle)});
    var concat = taskGroup.push({name: 'concat', o: new Concat(isSingle)});
    var includes = taskGroup.push({name: 'includes', o: new Includes(isSingle)});
    var htmlmin = taskGroup.push({name: 'htmlmin', o: new Htmlmin(isSingle)});
    var requirejs = taskGroup.push({name: 'requirejs', o: new Requirejs(isSingle)});
    var filerev = taskGroup.push({name: 'filerev', o: new Filerev(isSingle)});
    var usemin = taskGroup.push({name: 'usemin', o: new Usemin(isSingle)});
    var imagemin = taskGroup.push({name: 'imagemin', o: new Imagemin(isSingle)});

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
        'clean',
        'includes',
        'htmlmin',
        'less:build',
        'concat',
        'uglify:build',
        'requirejs',
        'imagemin',
        'filerev',
        'clean:tmp',
        'usemin'
    ];

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
