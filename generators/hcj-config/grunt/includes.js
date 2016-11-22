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
        let includeFSrc = page ? (page + htmlExt) : ('**/*'+htmlExt);

        let srcPage = path.srcPage;
        //支持多级目录创建的文件包含其它html
        if(page){
          let folderSeperatorIndex = page.lastIndexOf('/');
          if(folderSeperatorIndex !== -1){
            srcPage = srcPage + '/' + page.slice(0, folderSeperatorIndex);
            includeFSrc = page.slice(folderSeperatorIndex + 1) + htmlExt;
          }
        }
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

module.exports = Includes;
