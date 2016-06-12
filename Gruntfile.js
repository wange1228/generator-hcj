module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
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
                        '<%= conf.server.pages %>',
                        '<%= conf.server.static %>',
                        './'
                    ]
                }
            },
            build: {
                options: {
                    keepalive: true,
                    livereload: false,
                    base: [
                        '<%= conf.server.pages %>',
                        '<%= conf.server.static %>',
                        './'
                    ]
                }
            }
        },

        watch: {
            pages: {
                files: ['<%= conf.path.src.pages %>/**.html'],
                tasks: ['clean:pages', 'includes'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            styles: {
                files: ['<%= conf.path.src.styles %>/**.less'],
                tasks: ['clean:styles', 'less:dev'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            scripts: {
                files: ['<%= conf.path.src.scripts %>/**.js'],
                tasks: ['clean:scripts', 'uglify:dev'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            images: {
                files: ['<%= conf.path.src.images %>/**.*'],
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
                    cwd: '<%= conf.path.src.images %>',
                    src: '**',
                    dest: '<%= conf.path.build.images %>',
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
                    cwd: '<%= conf.path.build.pages %>',
                    src: ['**.html'],
                    dest: '<%= conf.path.build.pages %>',
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
                    paths: '<%= conf.server.static %>',
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.path.src.styles %>',
                    src: ['**.less'],
                    dest: '<%= conf.path.build.styles %>',
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    paths: '<%= conf.server.static %>',
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.path.src.styles %>',
                    src: ['**/*.less'],
                    dest: '<%= conf.path.build.styles %>',
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
                    cwd: '<%= conf.path.src.scripts %>',
                    src: ['**.js'],
                    dest: '<%= conf.path.build.scripts %>',
                    ext: '.js'
                }]
            },
            build: {
                options: {
                    mangle: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.path.src.scripts %>',
                    src: ['**.js'],
                    dest: '<%= conf.path.build.scripts %>',
                    ext: '.js'
                }]
            }
        },

        filerev: {
            options: {
                algorithm: 'md5',
                length: 7
            },
            static: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.path.build.styles %>',
                    src: ['*.css'],
                    dest: '<%= conf.path.build.styles %>'
                },{
                    expand: true,
                    cwd: '<%= conf.path.build.scripts %>',
                    src: ['*.js'],
                    dest: '<%= conf.path.build.scripts %>'
                },{
                    expand: true,
                    cwd: '<%= conf.path.build.images %>',
                    src: ['*.{png,jpg,gif}'],
                    dest: '<%= conf.path.build.images %>'
                }]
            }
        },

        usemin: {
            options: {
                assetsDirs: '<%= conf.path.build.styles %>'
            },
            html: '<%= conf.path.build.pages %>/*.html',
            css: '<%= conf.path.build.styles %>/*.*.css',
        },

        clean: {
            pages: '<%= conf.path.build.pages %>',
            styles: '<%= conf.path.build.styles %>',
            scripts: '<%= conf.path.build.scripts %>',
            images: '<%= conf.path.build.images %>',
            build: [
                '<%= conf.path.build.styles %>/*.{css,map}',
                '<%= conf.path.build.scripts %>/*.{js,map}',
                '<%= conf.path.build.images %>/*.{png,jpg,gif}',
                '!<%= conf.path.build.styles %>/*.*.css',
                '!<%= conf.path.build.scripts %>/*.*.js',
                '!<%= conf.path.build.images %>/*.*.{png,jpg,gif}',
            ]
        },

        includes: {
            default: {
                options: {
                    includePath: '<%= conf.path.src.pages %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.path.src.pages %>',
                    src: ['**.html'],
                    dest: '<%= conf.path.build.pages %>',
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
