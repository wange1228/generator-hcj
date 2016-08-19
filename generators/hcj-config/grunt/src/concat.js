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
        this.task.concat.mobileLib = {
            src: libjs,
            dest: srcJs + '/lib/m.js'
        };
        
    }

    setProject(path){
        
    }

}

module.exports = Concat;