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
        this.task.includes[includeFProp] = {
            options: {
                includePath: path.srcPage
            },
            files: [{
                expand: true,
                cwd: path.srcPage,
                src: [includeFSrc],
                dest: path.distPage,
                ext: htmlExt
            }]
        };
        
    }

}

module.exports = Includes;