module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        conf: grunt.file.readJSON('config.json'),
        connect: {
            options: {
                port: 80,
                hostname: '127.0.0.1',
                livereload: 35729
            },
            src: {
                options: {
                    base: [
                        '<%= conf.project.build.pages %>',
                        '<%= conf.project.build.static %>/mobile',
                        './'
                    ]
                }
            },
            build: {
                options: {
                    keepalive: true,
                    livereload: false,
                    base: [
                        '<%= conf.project.build.pages %>',
                        '<%= conf.project.build.static %>/mobile',
                        './'
                    ]
                }
            }
        },

        watch: {
            pages: {
                files: ['<%= conf.project.src.pages %>/pages/<%= conf.project.src.path %>/**.html'],
                tasks: ['clean:pages', 'includes'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            styles: {
                files: ['<%= conf.project.src.static %>/styles/<%= conf.project.src.path %>/**.less'],
                tasks: ['clean:styles', 'less:dev'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            scripts: {
                files: ['<%= conf.project.src.static %>/scripts/<%= conf.project.src.path %>/**.js'],
                tasks: ['clean:scripts', 'uglify:dev'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            images: {
                files: ['<%= conf.project.src.static %>/images/<%= conf.project.src.path %>/**.*'],
                tasks: ['clean:images', 'copy:images'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.project.src.static %>/images/<%= conf.project.src.path %>',
                    src: '**',
                    dest: '<%= conf.project.build.static %>/mobile/images/<%= conf.project.build.path %>',
                    filter: 'isFile'
                }]
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.project.build.pages %>/pages/<%= conf.project.build.path %>',
                    src: ['**.html'],
                    dest: '<%= conf.project.build.pages %>/pages/<%= conf.project.build.path %>',
                    ext: '.html'
                }]
            }
        },

        less: {
            dev: {
                options: {
                    sourceMapRootpath: '/',
                    sourceMap: true,
                    sourceMapFileInline: true,
                    paths: '<%= conf.project.src.static %>',
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.project.src.static %>/styles/<%= conf.project.src.path %>',
                    src: ['**.less'],
                    dest: '<%= conf.project.build.static %>/mobile/styles/<%= conf.project.build.path %>',
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    paths: '<%= conf.project.src.static %>',
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.project.src.static %>/styles/<%= conf.project.src.path %>',
                    src: ['**/*.less'],
                    dest: '<%= conf.project.build.static %>/mobile/styles/<%= conf.project.build.path %>',
                    ext: '.css'
                }]
            }
        },

        uglify: {
            dev: {
                options: {
                    mangle: true,
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.project.src.static %>/scripts/<%= conf.project.src.path %>',
                    src: ['**.js'],
                    dest: '<%= conf.project.build.static %>/mobile/scripts/<%= conf.project.build.path %>',
                    ext: '.js'
                }]
            },
            build: {
                options: {
                    mangle: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.project.src.static %>/scripts/<%= conf.project.src.path %>',
                    src: ['**.js'],
                    dest: '<%= conf.project.build.static %>/mobile/scripts/<%= conf.project.build.path %>',
                    ext: '.js'
                }]
            }
        },

        filerev: {
            options: {
                /**
                process: function(basename, name, extension) {
                    return basename+'_'+name+'.'+extension;
                },
                **/
                algorithm: 'md5',
                length: 7
            },
            static: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.project.build.static %>/mobile/',
                    src: ['{styles,scripts,images}/<%= conf.project.build.path %>/*.{css,js,png,jpg,gif}'],
                    dest: '<%= conf.project.build.static %>/mobile/',
                }]
            }
        },

        usemin: {
            options: {
                assetsDirs: '<%= conf.project.build.static %>/mobile/'
            },
            html: '<%= conf.project.build.pages %>/pages/<%= conf.project.build.path %>/*.html',
            css: '<%= conf.project.build.static %>/mobile/styles/<%= conf.project.build.path %>/*.*.css',
        },

        clean: {
            pages: '<%= conf.project.build.pages %>/pages/<%= conf.project.build.path %>',
            styles: '<%= conf.project.build.static %>/mobile/styles/<%= conf.project.build.path %>',
            scripts: '<%= conf.project.build.static %>/mobile/scripts/<%= conf.project.build.path %>',
            images: '<%= conf.project.build.static %>/mobile/images/<%= conf.project.build.path %>',
            build: [
                '<%= conf.project.build.static %>/mobile/{styles,scripts,images}/<%= conf.project.build.path %>/*.{css,js,png,jpg,gif}',
                '!<%= conf.project.build.static %>/mobile/{styles,scripts,images}/<%= conf.project.build.path %>/*.*.{css,js,png,jpg,gif}',
                '<%= conf.project.build.static %>/mobile/{styles,scripts,images}/<%= conf.project.build.path %>/**.map'
            ]
        },

        includes: {
            default: {
                options: {
                    includePath: '<%= conf.project.src.pages %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.project.src.pages %>/pages/<%= conf.project.src.path %>',
                    src: ['**.html'],
                    dest: '<%= conf.project.build.pages %>/pages/<%= conf.project.build.path %>',
                    ext: '.html'
                }]
            }
        }
    });

    grunt.registerTask('dev', [
        'clean',
        'includes',
        'less:dev',
        'uglify:dev',
        'copy:images',
        'connect:src',
        'watch'
    ]);


    grunt.registerTask('build', [
        'clean',
        'includes',
        'htmlmin',
        'less:build',
        'uglify:build',
        'copy:images',
        'filerev',
        'usemin',
        'clean:build',
        'connect:build'
    ]);
};
