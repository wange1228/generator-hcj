'use strict'

let util = require('./util.js');

class Uglify{
    constructor(isSingle){
        this.name = 'uglify';

        this.isSingle = isSingle;
        this.task = {
            uglify: {
                build: {
                    options: {
                        mangle: true
                    },
                    files: []
                },
                common: {
                  options: {
                    mangle: true
                  },
                  files: []
                }
            }
        };

        this.init();
    }

    init(){
        let srcJs = util.getSrc('mobile').scripts;
        let distJs = util.getDist('mobile').scripts;
        let libjs = util.getMobileLib();
        let libes6js = util.getMobileES6Lib();
        let files = this.task.uglify.build.files;
        let commonFiles = this.task.uglify.common.files;
        if(!this.isSingle){
            files = files.concat([
                {
                    expand: true,
                    cwd: '.tmpjs/'+distJs+'/common', //common下需要先进行babel
                    src: ['**/*.js'],
                    dest: distJs + '/common',
                    extDot: 'last',
                    ext: '.js'
                },
                {
                    expand: true,
                    cwd: srcJs + '/lib',
                    src: ['**/*.js'],
                    dest: distJs + '/lib',
                    extDot: 'last',
                    ext: '.js'
                }
            ]);
        }

        //放到临时目录,压缩公用文件
        files = files.concat([
            {
                src: libjs,
                dest: '.tmpjs/'+distJs+'/lib/m.js'
            },
            {
                src: libes6js,
                dest: '.tmpjs/'+distJs+'/lib/m-es6.js'
            },
            {
                src: libjs,
                dest: distJs + '/lib/m.js'
            },
            {
                src: libes6js,
                dest: distJs + '/lib/m-es6.js'
            }
        ]);

        //压缩后的.tmpjs 用来加版本号
        commonFiles = commonFiles.concat([
            {
                expand: true,
                cwd: '.tmpjs/'+distJs+'/common', //common下需要先进行babel
                src: ['**/*.js'],
                dest: '.tmpjs/'+distJs+'/common'
            },
            {
                expand: true,
                cwd: srcJs + '/lib',
                src: ['**/*.js'],
                dest: '.tmpjs/'+distJs+'/lib'
            }
        ]);

        this.task.uglify.build.files = files;
        this.task.uglify.common.files = commonFiles;

    }

    setProject(path){
        let files = this.task.uglify.build.files;

        files.push({
            expand: true,
            cwd: '.tmpjs/' + path.distJs,
            src: ['**/*.js'],
            dest: path.distJs,
            ext: '.js'
        });

    }

}

module.exports = Uglify;
