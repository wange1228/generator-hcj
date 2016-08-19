'use strict'

let util = require('./util.js');

class Filerev{
    constructor(isSingle){
        this.name = 'filerev';
        this.isSingle = isSingle;
        this.cache = [];
        this.task = {
            filerev: {
                options: {
                    algorithm: 'md5',
                    length: 7
                },
                build: {
                    files: []
                }
            }
        };
        this.init();
    }

    init(){
        //后续单独打包，不跟随项目
        let distJs = util.getDist('mobile').scripts;
        let files = this.task.filerev.build.files;
        files = files.concat([
            {
                expand: true,
                cwd: '.tmpjs/'+distJs+'/lib',
                src: ['**/*.js'],
                dest: distJs + '/lib',
                extDot: 'last',
                ext: '.js'
            },
            {
                expand: true,
                cwd: '.tmpjs/'+distJs+'/common',
                src: ['**/*.js'],
                dest: distJs + '/common',
                extDot: 'last',
                ext: '.js'
            }
        ]);
        this.task.filerev.build.files = files;
    }

    setProject(path){
        let distCss = path.distCss;
        let distJs = path.distJs;
        let distImg = path.distImg;
        let files = this.task.filerev.build.files;
        files = files.concat([
            {
                expand: true,
                cwd: distCss,
                src: ['**/*.css'],
                dest: distCss,
            },
            {
                expand: true,
                cwd: distJs,
                src: ['**/*.js'],
                dest: distJs
            }
            
        ]);

        //防止图片多次加版本
        if(this.cache.indexOf(distImg) === -1){
            this.cache.push(distImg);
            files.push({
                expand: true,
                cwd: distImg,
                src: ['**/*.{png,jpg,gif,webp}'],
                dest: distImg
            });
        }
        this.task.filerev.build.files = files;
    }

}

module.exports = Filerev;