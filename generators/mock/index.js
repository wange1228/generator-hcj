'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var generators = yeoman.generators;

var K = generators.Base.extend({
    initializing: function() {
        console.log(111)
    }
});

module.exports = K;
