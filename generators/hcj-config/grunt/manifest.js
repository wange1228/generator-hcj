'use strict'

let util = require('./util.js');

class Manifest{
    constructor(isSingle){
        this.task = {
            manifest: {}
        };
        
        this.init();
    }

    init(){
        
    }

    setProject(path, grunt){
        let page = path.page;
        let project = path.project;
        let distJs = path.distJs;
        let domain = util.conf.basic.mobile.host.statics;
        let distRoot = util.conf.basic.mobile.distRoot;
        distRoot = distRoot.split('/')[0];

        
        this.task.manifest[project+'-'+page] = {
            options: {
                cache: [],
                process: function(srcFile) {
                    let srcRoot = distJs.replace(new RegExp(distRoot + '(.*)', 'i'), domain + '$1');
                    let fileName = srcFile.replace(new RegExp(distJs + '(.*)', 'g'), '$1');
                    if(!fileName) return '';
                    return '//' + srcRoot + fileName;
                },
                timestamp: true
            },
            src: [
                distJs + '/**'
            ],
            dest: distJs + '/manifest.appcache'
        }
        
    }

}

module.exports = Manifest;