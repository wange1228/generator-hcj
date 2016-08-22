'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Copy = function () {
    function Copy(isSingle) {
        _classCallCheck(this, Copy);

        this.name = 'copy';
        this.imgSrcCache = [];
        this.isSingle = isSingle;
        this.task = {
            copy: {
                images: {
                    files: []
                }
            }
        };
        this.init();
    }

    _createClass(Copy, [{
        key: 'init',
        value: function init() {
            var srcImg = util.getSrc('mobile').images;
            var distImg = util.getDist('mobile').images;
            var libjs = util.getMobileLib();
            var imgFiles = this.task.copy.images.files;
            if (!this.isSingle) {
                imgFiles.push({
                    expand: true,
                    cwd: srcImg + '/common',
                    src: '**',
                    dest: distImg + '/common',
                    filter: 'isFile'
                });
            }
        }
    }, {
        key: 'setProject',
        value: function setProject(path) {
            //相同图片source不需要重复拷贝
            var srcImg = path.srcImg;
            if (this.imgSrcCache.indexOf(srcImg) === -1) {
                this.imgSrcCache.push(srcImg);
                this.task.copy.images.files.push({
                    expand: true,
                    cwd: srcImg,
                    src: '**',
                    dest: path.distImg,
                    filter: 'isFile'
                });
            }
        }
    }]);

    return Copy;
}();

module.exports = Copy;