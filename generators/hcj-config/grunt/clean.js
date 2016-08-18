'use strict'

let util = require('./util.js');

class Clean{
    constructor(isSingle){
        this.name = 'clean';
        this.isSingle = isSingle;
        this.task = {
            clean: {
                pages: [],
                styles: [],
                scripts: [],
                images: [],
                build: [],
                tmp: ['.tmpjs']
            }
        };
        this.init();
    }

    init(){
        
    }

    setProject(path){
        let files = this.task.clean;
        files.pages.push(path.page ? path.distPage + '/' + path.page : path.distPage);
        files.styles.push(path.distCss);
        files.scripts.push(path.distJs);
        files.images.push(path.distImg);
    }

}

module.exports = Clean;