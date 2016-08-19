'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Uglify = function () {
    function Uglify(isSingle) {
        _classCallCheck(this, Uglify);

        this.name = 'uglify';

        this.isSingle = isSingle;
        this.task = {
            uglify: {
                build: {
                    options: {
                        mangle: true
                    },
                    files: []
                }
            }
        };

        this.init();
    }

    _createClass(Uglify, [{
        key: 'init',
        value: function init() {
            var srcJs = util.getSrc('mobile').scripts;
            var distJs = util.getDist('mobile').scripts;
            var libjs = util.getMobileLib();
            var files = this.task.uglify.build.files;
            if (!this.isSingle) {
                files = files.concat([{
                    expand: true,
                    cwd: srcJs + '/common',
                    src: ['**/*.js'],
                    dest: distJs + '/common',
                    extDot: 'last',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: srcJs + '/lib',
                    src: ['**/*.js'],
                    dest: distJs + '/lib',
                    extDot: 'last',
                    ext: '.js'
                }, {
                    src: libjs,
                    dest: distJs + '/lib/m.js'
                }]);
            }

            //放到临时目录
            files = files.concat([{
                expand: true,
                cwd: srcJs + '/common',
                src: ['**/*.js'],
                dest: '.tmpjs/' + distJs + '/common'
            }, {
                expand: true,
                cwd: srcJs + '/lib',
                src: ['**/*.js'],
                dest: '.tmpjs/' + distJs + '/lib'
            }, {
                src: libjs,
                dest: '.tmpjs/' + distJs + '/lib/m.js'
            }]);

            this.task.uglify.build.files = files;
        }
    }, {
        key: 'setProject',
        value: function setProject(path) {
            var files = this.task.uglify.build.files;

            files.push({
                expand: true,
                cwd: path.srcJs,
                src: ['**/*.js'],
                dest: path.distJs,
                ext: '.js'
            });
        }
    }]);

    return Uglify;
}();

module.exports = Uglify;