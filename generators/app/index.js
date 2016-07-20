'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');

var generators = yeoman.generators;

var HCJGenerator = generators.Base.extend({
    initializing: function() {
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
