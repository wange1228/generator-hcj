'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Filerev = function () {
    function Filerev(isSingle) {
        _classCallCheck(this, Filerev);

        this.name = 'filerev';
        this.isSingle = isSingle;
        this.cache = [];
        this.task = {
            filerev: {
                options: {
                    algorithm: 'md5',
                    length: 7
                },
                build: {
                    files: []
                }
            }
        };
        this.init();
    }

    _createClass(Filerev, [{
        key: 'init',
        value: function init() {
            //后续单独打包，不跟随项目
            var distJs = util.getDist('mobile').scripts;
            var files = this.task.filerev.build.files;
            files = files.concat([{
                expand: true,
                cwd: '.tmpjs/' + distJs + '/lib',
                src: ['**/*.js'],
                dest: distJs + '/lib',
                extDot: 'last',
                ext: '.js'
            }, {
                expand: true,
                cwd: '.tmpjs/' + distJs + '/common',
                src: ['**/*.js'],
                dest: distJs + '/common',
                extDot: 'last',
                ext: '.js'
            }]);
            this.task.filerev.build.files = files;
        }
    }, {
        key: 'setProject',
        value: function setProject(path) {
            var distCss = path.distCss;
            var distJs = path.distJs;
            var distImg = path.distImg;
            var files = this.task.filerev.build.files;
            files = files.concat([{
                expand: true,
                cwd: distCss,
                src: ['**/*.css'],
                dest: distCss
            }, {
                expand: true,
                cwd: distJs,
                src: ['**/*.js'],
                dest: distJs
            }]);

            //防止图片多次加版本
            if (this.cache.indexOf(distImg) === -1) {
                this.cache.push(distImg);
                files.push({
                    expand: true,
                    cwd: distImg,
                    src: ['**/*.{png,jpg,gif,webp}'],
                    dest: distImg
                });
            }
            this.task.filerev.build.files = files;
        }
    }]);

    return Filerev;
}();

module.exports = Filerev;