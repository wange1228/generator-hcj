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
      this.task.copy.js.files = [
          {
              expand: true,
              cwd: srcJs,
              src: ['**'],
              dest: '.tmpjs/'+distJs
          }
      ];
    }

    setProject(path){
      //pdf
      let srcImg = path.srcImg;
      let distImg = path.distImg;
      this.task.copy.js.files.push({
          expand: true,
          cwd: srcImg,
          src: '**/*.pdf',
          dest: distImg
      });
    }

}

module.exports = Copy;
