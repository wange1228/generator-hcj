'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Includes = function () {
    function Includes(isSingle) {
        _classCallCheck(this, Includes);

        this.name = 'includes';
        this.isSingle = isSingle;
        this.task = {
            includes: {}
        };
        this.init();
    }

    _createClass(Includes, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'setProject',
        value: function setProject(path) {
            var page = path.page;
            var project = path.project;
            var includeFProp = page ? project + '/' + page : project;
            var htmlExt = path.env == 'desktop' ? '.ftl' : '.html';
            var includeFSrc = page ? page + htmlExt : '**/*' + htmlExt;
            this.task.includes[includeFProp] = {
                options: {
                    includePath: path.srcPage
                },
                files: [{
                    expand: true,
                    cwd: path.srcPage,
                    src: [includeFSrc],
                    dest: path.distPage,
                    ext: htmlExt
                }]
            };
        }
    }]);

    return Includes;
}();

module.exports = Includes;