module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // require('time-grunt')(grunt);

    grunt.initConfig({
        // pkg: grunt.file.readJSON('package.json'),
        proj: grunt.file.readJSON('project.json'),
        connect: {
            options: {
                port: 8000,
                hostname: '127.0.0.1',
                keepalive: true,
                livereload: 35729
            },
            mobile: {
                options: {
                    base: [
                        '<%= proj.build.pages %>',
                        '<%= proj.build.static %>/mobile',
                        './'
                    ]
                }
            }
        },

        watch: {
            pages: {
                files: ['<%= proj.src.pages %>/pages/<%= proj.build.path %>/**.html'],
                tasks: ['clean:pages', 'htmlmin'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            styles: {
                files: ['<%= proj.src.static %>/styles/<%= proj.build.path %>/**.less'],
                tasks: ['clean:styles', 'less:dev'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            scripts: {
                files: ['<%= proj.src.static %>/scripts/<%= proj.build.path %>/**.js'],
                tasks: ['clean:scripts', 'uglify:dev'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            images: {
                files: ['<%= proj.src.static %>/images/<%= proj.build.path %>/**.*'],
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
                    cwd: '<%= proj.src.static %>/images/<%= proj.build.path %>',
                    src: '**',
                    dest: '<%= proj.build.static %>/mobile/images/<%= proj.build.path %>',
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
                    cwd: '<%= proj.src.pages %>/pages/<%= proj.build.path %>',
                    src: ['**.html'],
                    dest: '<%= proj.build.pages %>/pages/<%= proj.build.path %>',
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
                    paths: '<%= proj.src.static %>',
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= proj.src.static %>/styles/<%= proj.build.path %>',
                    src: ['**.less'],
                    dest: '<%= proj.build.static %>/mobile/styles/<%= proj.build.path %>',
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    paths: '<%= proj.src.static %>',
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= proj.src.static %>/styles/<%= proj.build.path %>',
                    src: ['**/*.less'],
                    dest: '<%= proj.build.static %>/mobile/styles/<%= proj.build.path %>',
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
                    cwd: '<%= proj.src.static %>/scripts/<%= proj.build.path %>',
                    src: ['**.js'],
                    dest: '<%= proj.build.static %>/mobile/scripts/<%= proj.build.path %>',
                    ext: '.js'
                }]
            },
            build: {
                options: {
                    mangle: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= proj.src.static %>/scripts/<%= proj.build.path %>',
                    src: ['**.js'],
                    dest: '<%= proj.build.static %>/mobile/scripts/<%= proj.build.path %>',
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
                    cwd: '<%= proj.build.static %>/mobile/',
                    src: ['{styles,scripts,images}/<%= proj.build.path %>/*.{css,js,png,jpg,gif}'],
                    dest: '<%= proj.build.static %>/mobile/',
                }]
            }
        },

        usemin: {
            options: {
                assetsDirs: '<%= proj.build.static %>/mobile/'
            },
            html: '<%= proj.build.pages %>/pages/<%= proj.build.path %>/*.html',
            css: '<%= proj.build.static %>/mobile/styles/<%= proj.build.path %>/*.*.css',
        },

        clean: {
            pages: '<%= proj.build.pages %>/pages/<%= proj.build.path %>',
            styles: '<%= proj.build.static %>/mobile/styles/<%= proj.build.path %>',
            scripts: '<%= proj.build.static %>/mobile/scripts/<%= proj.build.path %>',
            images: '<%= proj.build.static %>/mobile/images/<%= proj.build.path %>',
            build: [
                '<%= proj.build.static %>/mobile/{styles,scripts,images}/<%= proj.build.path %>/*.{css,js,png,jpg,gif}',
                '!<%= proj.build.static %>/mobile/{styles,scripts,images}/<%= proj.build.path %>/*.*.{css,js,png,jpg,gif}',
                '<%= proj.build.static %>/mobile/{styles,scripts,images}/<%= proj.build.path %>/**.map'
            ]
        }
    });

    grunt.registerTask('dev', [
        'clean',
        'htmlmin',
        'less:dev',
        'uglify:dev',
        'copy:images',
        'connect:mobile',
        'watch'
    ]);


    grunt.registerTask('build', [
        'clean',
        'htmlmin',
        'less:build',
        'uglify:build',
        'copy:images',
        'filerev',
        'usemin',
        "clean:build",
        'connect:mobile'
    ]);
};
