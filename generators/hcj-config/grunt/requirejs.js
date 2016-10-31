'use strict'

let util = require('./util.js');
let Fs = require('fs');
let path = require('path');
let currentPath = process.cwd();
let hockPath = path.join(currentPath, '.hock');
let hockJSON = Fs.readFileSync(hockPath, 'utf-8');
hockJSON = JSON.parse(hockJSON);

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
                var buildOpts = this.getOptions(project, page, '.tmpjs/' + distJs, srcJs, 'none');

                this.task.requirejs[project + '-' + page + '-build'] = {
                    options: buildOpts
                };
            }
        }
    }

    getOptions(project, page, distJs, baseUrl, optimize){
      return {
          baseUrl: baseUrl.replace(project + '/' + page, ''),
          include: [project + '/' + page + '/main.js'],
          out: distJs + '/main.js',
          optimize: optimize,
          paths: {
              'text': 'lib/requirejs/text',
              'component': path.join(hockJSON.component, 'mobile/scripts/common/modules'),
              'globaljs': path.join(hockJSON.component, 'mobile/scripts')
          },
          stubModules: ['text']
      };
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
