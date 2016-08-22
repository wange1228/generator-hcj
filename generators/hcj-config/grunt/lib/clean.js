'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Clean = function () {
    function Clean(isSingle) {
        _classCallCheck(this, Clean);

        this.name = 'clean';
        this.isSingle = isSingle;
        this.task = {
            clean: {
                pages: [],
                styles: [],
                scripts: [],
                images: [],
                build: [],
                tmp: ['.tmpjs']
            }
        };
        this.init();
    }

    _createClass(Clean, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'setProject',
        value: function setProject(path) {
            var files = this.task.clean;
            files.pages.push(path.page ? path.distPage + '/' + path.page : path.distPage);
            files.styles.push(path.distCss);
            files.scripts.push(path.distJs);
            files.images.push(path.distImg);
        }
    }]);

    return Clean;
}();

module.exports = Clean;