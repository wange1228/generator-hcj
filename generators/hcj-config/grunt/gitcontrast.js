'use strict'

let util = require('./util.js');
let fs = require('fs');
let path = require('path');
let currentPath = process.cwd();
let hockPath = path.join(currentPath, '.hock');
let hockJSON = fs.readFileSync(hockPath, 'utf-8');
hockJSON = JSON.parse(hockJSON);

class GitContrast{
    constructor(isSingle){
        this.isSingle = isSingle;
        this.task = {
            gitcontrast: {
                options: {
                    current: __dirname,
                    hock: hockJSON.component
                },
                branch: {}
            }
        };
        
        this.init();
    }

    init(){

    }

    setProject(path, grunt){
    }

}

module.exports = GitContrast;
