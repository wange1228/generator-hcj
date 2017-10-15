'use strict'

let util = require('./util.js');

class Usemin{
    constructor(isSingle){
        this.isSingle = isSingle;
        this.name = 'usemin';
        this.task = {
            usemin: {
                options: {
                    assetsDirs: [],
                    patterns: {
                        pages: [],
                        styles: [],
                        images: []
                    }
                },
                pages: [],
                styles: [],
                images: []
            }
        };
        this.init();
    }

    init(){

    }

    setProject(path, grunt){
        let me = this;
        let useminF = this.task.usemin;
        let distPage = path.distPage;
        let distCss = path.distCss;
        let distJs = path.distJs;
        let distImg = path.distImg;
        let project = path.project;
        let page = path.page;
        let htmlExt = path.env == 'desktop' ? '.ftl' : '.html';
        useminF.pages.push(distPage + '/**'+htmlExt);
        useminF.styles.push(distCss + '/**.css');
        useminF.images.push(distCss + '/**.css');
        var _pages = useminF.options.patterns.pages;
        var _assetsDirs = useminF.options.assetsDirs;
        var _project = project.replace(/\//g, '\\\/');

        this.grunt = grunt;

        _pages.push([new RegExp('\/('+_project+'(\/[^\/]+)*\/[a-zA-Z0-9\-_]*)\.css', 'g'), 'replace styles in pages', function(match){
            return me.getVersionFile(distCss, project, page, match, '.css');
        }]);
        _pages.push([new RegExp('(\/'+_project+'(\/[^\/]+)*\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in pages']);
        _pages.push([new RegExp('[\'\"][^\'\"]*(('+_project+'|lib|common)\/[^\'\"]*\)\.js[\'\"]', 'g'), 'replace scripts in pages', function(match){
            return me.getVersionFile(distJs, project, page, match, '.js');
        }]);
        if(page){
            let _page = page.replace(/\//g, '\\\/');
            _pages.push([new RegExp('[\'\"][^\'\"]*('+_project+'\/' + _page + '\/[^\'\"]*\)\.js[\'\"]', 'g'), 'replace project scripts in pages', function(match){
                return me.getVersionFile(distJs, project, page, match, '.js');
            }]);
        }
        _pages.push([new RegExp(': *[\'\"](('+_project+'|lib|common)\/.*\)[\'\"]', 'g'), 'replace require config in pages', function(match) {
            return me.getVersionFile(distJs, project, page, match, '.js');
        }]);
        useminF.options.patterns.styles.push([new RegExp('(\/'+project+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in styles']);
        //样式中的图片先加版本号
        useminF.options.patterns.images.push([new RegExp('(\/'+project+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in styles']);
        _assetsDirs.push(distJs.replace(project, ''));
        _assetsDirs.push(distCss.replace(project, ''));
        _assetsDirs.push(distImg.replace(project, ''));

    }

    getVersionFile(distRoot, project, page, match, ext){
        let grunt = this.grunt;
        let base = distRoot.replace(page ? (project + '/' + page) : project, '');

        let summary = {};

        for (let i in grunt.filerev.summary) {

            let key = i.replace(/\\/g, '/');

            let val = grunt.filerev.summary[i].replace(/\\/g, '/');

            if(key.indexOf(ext) !== -1){
                summary[key] = val;
            }

        }
        let result;
        let root;
        if(/^(lib|common)\/.*$/.test(match)){
            root = '.tmpjs/' + base;
        }else{
            root = base;
        }
        let mapFile = summary[
            root + match + ext
        ];

        if(mapFile){
            result = mapFile.replace(base, '').replace(ext, '');
        }else{
            result = match;
        }

        return result;
    }

}

module.exports = Usemin;
