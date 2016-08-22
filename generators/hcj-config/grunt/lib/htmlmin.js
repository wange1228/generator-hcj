'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Htmlmin = function () {
    function Htmlmin(isSingle) {
        _classCallCheck(this, Htmlmin);

        this.name = 'htmlmin';
        this.isSingle = isSingle;
        this.pathCache = [];
        this.task = {
            htmlmin: {
                build: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: []
                }
            }
        };
        this.init();
    }

    _createClass(Htmlmin, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'setProject',
        value: function setProject(path) {
            var htmlExt = path.env == 'desktop' ? '.ftl' : '.html';
            //相同目录不需要重复拷贝
            var distPage = path.distPage;
            if (this.pathCache.indexOf(distPage) === -1) {
                this.pathCache.push(distPage);
                this.task.htmlmin.build.files.push({
                    expand: true,
                    cwd: distPage,
                    src: ['**/*' + htmlExt],
                    dest: distPage,
                    ext: htmlExt
                });
            }
        }
    }]);

    return Htmlmin;
}();

module.exports = Htmlmin;