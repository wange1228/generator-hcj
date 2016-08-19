'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Usemin = function () {
    function Usemin(isSingle) {
        _classCallCheck(this, Usemin);

        this.isSingle = isSingle;
        this.name = 'usemin';
        this.task = {
            usemin: {
                options: {
                    assetsDirs: [],
                    patterns: {
                        pages: [],
                        styles: []
                    }
                },
                pages: [],
                styles: []
            }
        };
        this.init();
    }

    _createClass(Usemin, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'setProject',
        value: function setProject(path, grunt) {
            var me = this;
            var useminF = this.task.usemin;
            var distPage = path.distPage;
            var distCss = path.distCss;
            var distJs = path.distJs;
            var distImg = path.distImg;
            var project = path.project;
            var page = path.page;
            var htmlExt = path.env == 'desktop' ? '.ftl' : '.html';
            useminF.pages.push(distPage + '/**' + htmlExt);
            useminF.styles.push(distCss + '/**.css');
            var _pages = useminF.options.patterns.pages;
            var _assetsDirs = useminF.options.assetsDirs;
            var _project = project.replace(/\//g, '\\\/');
            this.grunt = grunt;

            _pages.push([new RegExp('\/(' + _project + '(\/[^\/]+)*\/[a-zA-Z0-9\-_]*)\.css', 'g'), 'replace styles in pages', function (match) {
                return me.getVersionFile(distCss, project, page, match, '.css');
            }]);
            _pages.push([new RegExp('(\/' + _project + '(\/[^\/]+)*\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in pages']);
            _pages.push([new RegExp('[\'\"][^\'\"]*((' + _project + '|lib|common)\/[^\'\"]*\)\.js[\'\"]', 'g'), 'replace scripts in pages', function (match) {
                return me.getVersionFile(distJs, project, page, match, '.js');
            }]);
            _pages.push([new RegExp(': *[\'\"]((' + _project + '|lib|common)\/.*\)[\'\"]', 'g'), 'replace require config in pages', function (match) {
                return me.getVersionFile(distJs, project, page, match, '.js');
            }]);
            useminF.options.patterns.styles.push([new RegExp('(\/' + project + '\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in styles']);
            _assetsDirs.push(distJs.replace(project, ''));
            _assetsDirs.push(distCss.replace(project, ''));
            _assetsDirs.push(distImg.replace(project, ''));
        }
    }, {
        key: 'getVersionFile',
        value: function getVersionFile(distRoot, project, page, match, ext) {
            var grunt = this.grunt;
            var base = distRoot.replace(page ? project + '/' + page : project, '');

            var summary = {};

            for (var i in grunt.filerev.summary) {

                var key = i.replace(/\\/g, '/');

                var val = grunt.filerev.summary[i].replace(/\\/g, '/');

                if (key.indexOf(ext) !== -1) {
                    summary[key] = val;
                }
            }
            var result = void 0;
            var root = void 0;
            if (/^(lib|common)\/.*$/.test(match)) {
                root = '.tmpjs/' + base;
            } else {
                root = base;
            }
            var mapFile = summary[root + match + ext];

            if (mapFile) {
                result = mapFile.replace(base, '').replace(ext, '');
            } else {
                result = match;
            }

            return result;
        }
    }]);

    return Usemin;
}();

module.exports = Usemin;