'use strict'

let util = require('./util.js');

class Includes{
    constructor(isSingle){
        this.name = 'includes';
        this.isSingle = isSingle;
        this.task = {
            includes: {

            }
        };
        this.init();
    }

    init(){

    }

    setProject(path){
        let page = path.page;
        let project = path.project;
        let includeFProp = page ? project + '/' + page : project;
        let htmlExt = path.env == 'desktop' ? '.ftl' : '.html';
        let includeFSrc = page ? (page + htmlExt) : ('**/*'+htmlExt); //如shanghaibank, activity都只放了目录

        let srcPage = path.srcPage;
        let needIncludes = true;
        //支持多级目录创建的文件包含其它html
        if(page){
          let folderSeperatorIndex = page.lastIndexOf('/');
          if(folderSeperatorIndex !== -1){
            srcPage = srcPage + '/' + page.slice(0, folderSeperatorIndex);
            includeFSrc = page.slice(folderSeperatorIndex + 1) + htmlExt;
          }
        }else{
          //如页面名为a/b时整个目录不进行匹配操作
          util.projects.forEach(function(o, i) {
            if(o.indexOf(':'+project+':') !== -1 && o.indexOf('/') !== -1){
              needIncludes = false;
            }
          });
        }
        if(needIncludes){
          this.task.includes[includeFProp] = {
              options: {
                  includePath: srcPage
              },
              files: [{
                  expand: true,
                  cwd: srcPage,
                  src: [includeFSrc],
                  dest: path.distPage,
                  ext: htmlExt
              }]
          };
        }


    }

}

module.exports = Includes;
