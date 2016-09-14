'use strict'

let util = require('./util.js');
let Fs = require('fs');

class Requirejs{
    constructor(isSingle){
        this.name = 'requirejs';
        this.isSingle = isSingle;
        this.task = {
            requirejs: {}
        };
        this.init();
    }

    init(){

    }

    setProject(path){
        //移动端使用requirejs,page存在才打包
        let page = path.page;
        let srcJs = path.srcJs;
        let distJs = path.distJs;
        let env = path.env;
        let project = path.project;
        if(page){
            var isMainExist = Fs.existsSync(srcJs + '/main.js');

            if(env == 'mobile' && isMainExist){
                var requirejsOpts = {
                    baseUrl: ('.tmpjs/' + path.distJs).replace(project + '/' + page, ''),
                    include: [project + '/' + page + '/main.js'],
                    out: distJs + '/main.js',
                    optimize: 'uglify',
                    paths: {
                        'text': 'lib/requirejs/text'
                    },
                    stubModules: ['text']
                };

                this.task.requirejs[project + '-' + page + '-build'] = {
                    options: requirejsOpts
                };
            }
        }
    }

    hasRequirejs(){
        let hasRequireJS = false;
        let o = this.task.requirejs;
        for (var key in o) {
            if(o.hasOwnProperty(key)){
                hasRequireJS = true;
            }
        }
        return hasRequireJS;
    }

}

module.exports = Requirejs;
