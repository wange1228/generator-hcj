'use strict'

let util = require('./util.js');
let fs = require('fs');

class Babel{
    constructor(isSingle){
        this.isSingle = isSingle;
        this.task = {
            babel: {
              options: {
                presets: ['babel-preset-es2015', 'babel-polyfill']
              }
            }
        };

        this.init();
    }

    init(){
      // let me = this;
      // let distJs = util.getDist('mobile').scripts+'/common';
      // let srcJs = util.getSrc('mobile').scripts+'/common';
      // let srcRoot = this.scanFolder(srcJs).files;
      // this.task.babel['common'] = {
      //   files: {}
      // };
      //
      // srcRoot.map(function(o, i) {
      //   let filename = o.replace(new RegExp(srcJs + '\/(.*)', 'g'), '$1');
      //   if(/\.js$/.test(filename) && filename.indexOf('fastclick.js') === -1){
      //     let name = '.tmpjs/' + distJs + '/' + filename;
      //     let file = fs.readFileSync(srcJs + '/' + filename, 'utf-8');
      //
      //     if(/['"]use\sstrict['"]/g.test(file)){
      //       me.task.babel['common'].files[name] = name;
      //     }
      //
      //   }
      // });
    }

    setProject(path){
      let me = this;
      let srcJs = path.srcJs;
      let distJs = path.distJs;
      let srcRoot = this.scanFolder(srcJs).files;
      let page = path.page;
      let project = path.project;
      this.task.babel[project + '-' + page] = {
        files: {}
      };

      srcRoot.map(function(o, i) {
        let filename = o.replace(new RegExp(srcJs + '\/(.*)', 'g'), '$1');
        if(/\.js$/.test(filename)){
          let name = '.tmpjs/' + distJs + '/' + filename;
          let file = fs.readFileSync(srcJs + '/' + filename, 'utf-8');
          if(/['"]use\sstrict['"]/g.test(file)){
            me.task.babel[project + '-' + page].files[name] = name;
          }
        }
      })
    }

    /**
  	 * [深层扫描文件]
  	 * @param  {[String]} path [扫描的目录]
  	 */
  	scanFolder(path){
  	    var fileList = [];
  	    var folderList = [];
  	    var result;
  	    var walk = function(path, fileList, folderList){

  			var files = fs.readdirSync(path);
  	        files.forEach(function(item) {
  	            var tmpPath = path + '/' + item;
  	            var stats = fs.statSync(tmpPath);
  	            var canAdd = true;
  	            if(!canAdd){
  	            	return;
  	            }
  	            if (stats.isDirectory()) {
  	                walk(tmpPath, fileList, folderList);
  	                folderList.push(tmpPath);

  	            } else {
    	        		fileList.push(tmpPath);
    	        		var fileName = tmpPath.replace(/.*\/(.*)$/g, '$1');
  	            }
  	        });


  	    };

  	    walk(path, fileList, folderList);

  	    result = {
  	        'files': fileList,
  	        'folders': folderList
  	    };

  	    return result;
  	}

}


module.exports = Babel;
