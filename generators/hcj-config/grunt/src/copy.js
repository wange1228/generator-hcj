'use strict'

let util = require('./util.js');

class Copy{
    constructor(isSingle){
        this.name = 'copy';
        this.imgSrcCache = [];
        this.isSingle = isSingle;
        this.task = {
            copy: {
                images: {
                    files: []
                }
            }
        };
        this.init();
    }

    init(){
        let srcImg = util.getSrc('mobile').images;
        let distImg = util.getDist('mobile').images;
        let libjs = util.getMobileLib();
        let imgFiles = this.task.copy.images.files;
        if(!this.isSingle){
            imgFiles.push({
                expand: true,
                cwd: srcImg + '/common',
                src: '**',
                dest: distImg + '/common',
                filter: 'isFile'
            });
        }
    }

    setProject(path){
        //相同图片source不需要重复拷贝
        let srcImg = path.srcImg;
        if(this.imgSrcCache.indexOf(srcImg) === -1){
            this.imgSrcCache.push(srcImg);
            this.task.copy.images.files.push({
                expand: true,
                cwd: srcImg,
                src: '**',
                dest: path.distImg,
                filter: 'isFile'
            });
        }
    }

}

module.exports = Copy;