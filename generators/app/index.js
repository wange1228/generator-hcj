'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var Optimist = require('optimist');
var path = require('path');
var currentPath = process.cwd();
var hockPath = path.join(currentPath, '.hock');
var hockJSON = fs.readFileSync(hockPath, 'utf-8');
hockJSON = JSON.parse(hockJSON);
var cfgPath = path.join(currentPath, 'hcj-config/basic-conf.js');
var cfg = require(cfgPath);


var generators = yeoman.generators;

var HCJGenerator = generators.Base.extend({
    initializing: function() {
	var cmd = Optimist.usage('').argv;
        if (cmd.version || cmd.v) {
      		var packageInfo = JSON.parse(fs.readFileSync(__dirname + '/../../package.json', 'utf-8'));
      		console.log(packageInfo.version);
      		process.exit();
      	}
	this._installComponentLess();
        this._installSSL();
    },
    /**
     * [安装证书]
     */
    _installSSL: function() {
        var me = this;
        var done = this.async();
        me.log(chalk.green('=== 开始安装SSL/package.json ==='));
        fs.exists('ssl', function(isExist) {
            if(!isExist){
                me.directory('_ssl', 'ssl');
            }
            done();
        });
    },
    /**
     * [公用less]
     */
    _installComponentLess: function() {
      var root = hockJSON.component;
      this._installLess(root, 'mobile');
      this._installLess(root, 'desktop');
    },
    _installLess: function(root, type) {
        var to = path.join(currentPath, cfg[type].path.src.styles);
        var less = this._getLess(root, to, type);
        to = path.join(to, 'g-component.less');
        less = this._getImportString(less);
        fs.writeFile(to, less, function(err) {
            if(!err){
                console.log(to + '创建完成!');
            }
        })
    },
    _getImportString: function(less) {
      var result = '';
      less.forEach(function(o, i) {
        result += '@import "' + o + '"' + ';\n';
        });
      return result;
    },
    _getBaseRoot: function(path) {
        return path.slice(0, 2).toLowerCase();
    },
    _getSameStartStr: function(str1, str2) {
        var tmp = [];
        var arr1 = str1.split('/');
        var arr2 = str2.split('/');
        for (var i = 0; i < arr1.length; i++) {
            if(arr1[i] == arr2[i]){
                tmp.push(arr1[i]);
            }else{
                break;
            }
        }
        return tmp.join('/') + '/';
    },
    _getLess: function(root, to, type) {
        var me = this;
        var less = fs.readFileSync(path.join(
            root,
            type + '/component-less.js'
        ), 'utf-8');
        to = to.replace(/\\/g, '/');
        less = JSON.parse(less);
        less = less.map(function(o, i) {
            o = path.join(root, o);
            o = o.replace(/\\/g, '/');
            //同一目录
            if(me._getBaseRoot(o) == me._getBaseRoot(to)){
                var sameStr = me._getSameStartStr(o, to);
                var str = to.slice(sameStr.length);
                var arr = str.split('/');
                var result = '';
                for (var i = 0; i < arr.length; i++) {
                    result += '../';
                }
                return result + o.slice(sameStr.length);
            }

            return o;
        });
        return less;
    },
    /**
     * [复制配置文件]
     */
    writing: function() {
        this.directory('../../hcj-config', 'hcj-config');
        this.copy('_Gruntfile.js', 'Gruntfile.js');
        this.copy('_package.json', 'package.json');
        // this.copy('_.hcjrc', '.hcjrc');
    },
    end: function() {
        var me = this;
        me.installDependencies({
            bower: false,
            npm: true,
            callback: function () {
                // this.spawnCommand('grunt', ['dev']);
                me.log(chalk.green('=== 安装完成 ==='));

            }.bind(this)
        });
    }
});

module.exports = HCJGenerator;
