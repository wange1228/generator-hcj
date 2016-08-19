'use strict'

let util = require('./util.js');

class Htmlmin{
    constructor(isSingle){
        this.name = 'htmlmin';
        this.isSingle = isSingle;
        this.pathCache = [];
        this.task = {
            htmlmin: {
                build: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: []
                }
            }
        };
        this.init();
    }

    init(){
        
    }

    setProject(path){
        let htmlExt = path.env == 'desktop' ? '.ftl' : '.html';
        //相同目录不需要重复拷贝
        let distPage = path.distPage;
        if(this.pathCache.indexOf(distPage) === -1){
            this.pathCache.push(distPage);
            this.task.htmlmin.build.files.push({
                expand: true,
                cwd: distPage,
                src: ['**/*'+htmlExt],
                dest: distPage,
                ext: htmlExt
            });
        }

    }

}

module.exports = Htmlmin;