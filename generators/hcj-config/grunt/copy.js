'use strict'

let util = require('./util.js');

class Copy{
    constructor(isSingle){
        this.name = 'copy';
        this.isSingle = isSingle;
        this.task = {
            copy: {
                js: {
                    files: []
                }
            }
        };
        this.init();
    }

    init(){
      let srcJs = util.getSrc('mobile').scripts;
      let distJs = util.getDist('mobile').scripts;

      //放到临时目录
      this.task.copy.js.files = this.task.copy.js.files.concat([
          {
              expand: true,
              cwd: srcJs + '/common',
              src: ['**'],
              dest: '.tmpjs/'+distJs+'/common'
          },
          {
              expand: true,
              cwd: srcJs + '/lib',
              src: ['**'],
              dest: '.tmpjs/'+distJs+'/lib'
          }
      ]);
    }

    setProject(path){
      let srcJs = path.srcJs;
      let distJs = path.distJs;
      this.task.copy.js.files.push({
          expand: true,
          cwd: srcJs,
          src: '**',
          dest: '.tmpjs/'+distJs
      });
    }

}

module.exports = Copy;
