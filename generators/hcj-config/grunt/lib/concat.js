'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util.js');

var Concat = function () {
    function Concat(isSingle) {
        _classCallCheck(this, Concat);

        this.name = 'concat';
        this.isSingle = isSingle;
        this.task = {
            concat: {}
        };
        this.init();
    }

    _createClass(Concat, [{
        key: 'init',
        value: function init() {
            var libjs = util.getMobileLib();
            var srcJs = util.getSrc('mobile').scripts;
            this.task.concat.mobileLib = {
                src: libjs,
                dest: srcJs + '/lib/m.js',
                options: {
                    footer: '\nrequirejs.config({paths:{"text": "lib/requirejs/text"}})'
                }
            };
        }
    }, {
        key: 'setProject',
        value: function setProject(path) {}
    }]);

    return Concat;
}();

module.exports = Concat;