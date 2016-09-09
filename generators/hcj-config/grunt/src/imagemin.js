'use strict'

let util = require('./util.js');

class Imagemin{
    constructor(isSingle){
        this.imgSrcCache = [];
        this.isSingle = isSingle;
        this.task = {
            imagemin: {
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
        let imgFiles = this.task.imagemin.images.files;
        if(!this.isSingle){
            imgFiles.push({
                expand: true,
                cwd: srcImg + '/common',
                src: '**',
                dest: distImg + '/common'
            });
        }
    }

    setProject(path){
        //相同图片source不需要重复拷贝
        let srcImg = path.srcImg;
        if(this.imgSrcCache.indexOf(srcImg) === -1){
            this.imgSrcCache.push(srcImg);
            this.task.imagemin.images.files.push({
                expand: true,
                cwd: srcImg,
                src: '**',
                dest: path.distImg
            });
        }
    }

}

module.exports = Imagemin;