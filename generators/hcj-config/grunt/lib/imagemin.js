'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Imagemin = function () {
    function Imagemin(isSingle) {
        _classCallCheck(this, Imagemin);

        this.imgSrcCache = [];
        this.isSingle = isSingle;
        this.task = {
            imagemin: {
                images: {
                    files: []
                }
            }
        };
        this.init();
    }

    _createClass(Imagemin, [{
        key: 'init',
        value: function init() {
            var srcImg = util.getSrc('mobile').images;
            var distImg = util.getDist('mobile').images;
            var libjs = util.getMobileLib();
            var imgFiles = this.task.imagemin.images.files;
            if (!this.isSingle) {
                imgFiles.push({
                    expand: true,
                    cwd: srcImg + '/common',
                    src: '**',
                    dest: distImg + '/common'
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
                this.task.imagemin.images.files.push({
                    expand: true,
                    cwd: srcImg,
                    src: '**',
                    dest: path.distImg
                });
            }
        }
    }]);

    return Imagemin;
}();

module.exports = Imagemin;