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
      var less = this._getLess(root, type);
      var to = path.join(currentPath, cfg[type].path.src.styles);
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
        result += '@import "' + o.replace(/\\/g, '/') + '"' + ';\n';
        });
      return result;
    },
    _getLess: function(root, type) {
      var less = fs.readFileSync(path.join(
        root,
        type + '/component-less.js'
      ), 'utf-8');
      less = JSON.parse(less);
      less = less.map(function(o, i) {
        o = path.join(root, o);
        return o;
      });
      console.log(less);
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
