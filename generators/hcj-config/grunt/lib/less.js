'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Less = function () {
    function Less(isSingle) {
        _classCallCheck(this, Less);

        this.name = 'less';
        this.isSingle = isSingle;
        this.task = {
            less: {
                build: {
                    options: {
                        compress: true
                    },
                    files: []
                }
            }
        };
        this.init();
    }

    _createClass(Less, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'setProject',
        value: function setProject(path) {
            this.task.less.build.files.push({
                expand: true,
                cwd: path.srcCss,
                src: ['**/*.less'],
                dest: path.distCss,
                ext: '.css'
            });
        }
    }]);

    return Less;
}();

module.exports = Less;