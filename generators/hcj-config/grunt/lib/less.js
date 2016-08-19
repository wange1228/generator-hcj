'use strict'

let util = require('./util.js');

class Less{
    constructor(isSingle){
        this.name = 'less';
        this.isSingle = isSingle;
        this.task = {
            less: {
                build: {
                    options: {
                        compress: true
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
        this.task.less.build.files.push({
            expand: true,
            cwd: path.srcCss,
            src: ['**/*.less'],
            dest: path.distCss,
            ext: '.css'
        });
    }

}

module.exports = Less;