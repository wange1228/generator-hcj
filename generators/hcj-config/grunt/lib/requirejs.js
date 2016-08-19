'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');
var Fs = require('fs');

var Requirejs = function () {
    function Requirejs(isSingle) {
        _classCallCheck(this, Requirejs);

        this.name = 'requirejs';
        this.isSingle = isSingle;
        this.task = {
            requirejs: {}
        };
        this.init();
    }

    _createClass(Requirejs, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'setProject',
        value: function setProject(path) {
            //移动端使用requirejs,page存在才打包
            var page = path.page;
            var srcJs = path.srcJs;
            var distJs = path.distJs;
            var env = path.env;
            var project = path.project;
            if (page) {
                var isMainExist = Fs.existsSync(srcJs + '/main.js');

                if (env == 'mobile' && isMainExist) {
                    var requirejsOpts = {
                        baseUrl: srcJs.replace(project + '/' + page, ''),
                        include: [project + '/' + page + '/main.js'],
                        out: distJs + '/main.js',
                        optimize: 'uglify',
                        paths: {
                            'text': 'lib/requirejs/text'
                        },
                        stubModules: ['text']
                    };

                    this.task.requirejs[project + '-' + page + '-build'] = {
                        options: requirejsOpts
                    };
                }
            }
        }
    }, {
        key: 'hasRequirejs',
        value: function hasRequirejs() {
            var hasRequireJS = false;
            var o = this.task.requirejs;
            for (var key in o) {
                if (o.hasOwnProperty(key)) {
                    hasRequireJS = true;
                }
            }
            return hasRequireJS;
        }
    }]);

    return Requirejs;
}();

module.exports = Requirejs;