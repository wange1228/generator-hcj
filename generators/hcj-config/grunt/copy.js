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
