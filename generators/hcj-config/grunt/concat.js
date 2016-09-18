'use strict'

let util = require('./util.js');

class Concat{
    constructor(isSingle){
        this.name = 'concat';
        this.isSingle = isSingle;
        this.task = {
            concat: {

            }
        };
        this.init();
    }

    init(){
        let libjs = util.getMobileLib();
        let srcJs = util.getSrc('mobile').scripts;
        let libes6js = util.getMobileES6Lib();
        let footer = '\nrequirejs.config({paths:{"text": "lib/requirejs/text"}})';
        this.task.concat.mobileLib = {
            src: libjs,
            dest: srcJs + '/lib/m.js',
            options: {
                footer: footer
            }
        };

        this.task.concat.mobileES6Lib = {
            src: libes6js,
            dest: srcJs + '/lib/m-es6.js',
            options: {
                footer: footer
            }
        };

    }

    setProject(path){

    }

}

module.exports = Concat;
