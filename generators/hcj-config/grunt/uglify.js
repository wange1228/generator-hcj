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
                }
            }
        };
        
        this.init();
    }

    init(){
        let srcJs = util.getSrc('mobile').scripts;
        let distJs = util.getDist('mobile').scripts;
        let libjs = util.getMobileLib();
        let files = this.task.uglify.build.files;
        if(!this.isSingle){
            files = files.concat([
                {
                    expand: true,
                    cwd: srcJs + '/common',
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
                },
                {
                    src: libjs,
                    dest: distJs + '/lib/m.js'
                }
            ]);
        }

        //放到临时目录
        files = files.concat([
            {
                expand: true,
                cwd: srcJs + '/common',
                src: ['**/*.js'],
                dest: '.tmpjs/'+distJs+'/common'
            },
            {
                expand: true,
                cwd: srcJs + '/lib',
                src: ['**/*.js'],
                dest: '.tmpjs/'+distJs+'/lib'
            },
            {
                src: libjs,
                dest: '.tmpjs/'+distJs+'/lib/m.js'
            }
        ]);

        this.task.uglify.build.files = files;

    }

    setProject(path){
        let files = this.task.uglify.build.files;
        
        files.push({
            expand: true,
            cwd: path.srcJs,
            src: ['**/*.js'],
            dest: path.distJs,
            ext: '.js'
        });
        
    }

}

module.exports = Uglify;