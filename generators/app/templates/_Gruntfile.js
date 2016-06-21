module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var config = grunt.file.readJSON('.hcjrc');

    grunt.initConfig({
        connect: {
            options: {
                port: config.server.port,
                hostname: '127.0.0.1',
                livereload: config.server.livereload
            },
            src: {
                options: {
                    base: [
                        config.server.pages.path,
                        config.server.static.path,
                        './'
                    ]
                }
            },
            build: {
                options: {
                    keepalive: true,
                    livereload: false,
                    base: [
                        config.server.pages.path,
                        config.server.static.path,
                        './'
                    ]
                }
            }
        },

        watch: {
            pages: {
                files: [config.path.src.pages + '/**.html'],
                tasks: ['clean:pages', 'includes'],
                options: {
                    livereload: config.server.livereload
                }
            },
            styles: {
                files: [config.path.src.styles + '/**.less'],
                tasks: ['clean:styles', 'less:dev'],
                options: {
                    livereload: config.server.livereload
                }
            },
            scripts: {
                files: [config.path.src.scripts + '/**.js'],
                tasks: ['clean:scripts', 'uglify:dev'],
                options: {
                    livereload: config.server.livereload
                }
            },
            images: {
                files: [config.path.src.images + '/**.*'],
                tasks: ['clean:images', 'copy:images'],
                options: {
                    livereload: config.server.livereload
                }
            }
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: config.path.src.images,
                    src: '**',
                    dest: config.path.build.images,
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
                    cwd: config.path.build.pages,
                    src: ['**/*.html'],
                    dest: config.path.build.pages,
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
                    paths: config.server.static.path,
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: config.path.src.styles,
                    src: ['**/*.less'],
                    dest: config.path.build.styles,
                    ext: '.css'
                }]
            },
            build: {
                options: {
                    paths: config.server.static.path,
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: config.path.src.styles,
                    src: ['**/*.less'],
                    dest: config.path.build.styles,
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
                    cwd: config.path.src.scripts,
                    src: ['**/*.js'],
                    dest: config.path.build.scripts,
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: config.path.src.scripts.replace(config.project.name, '') + 'lib',
                    src: ['**/*.js'],
                    dest: config.path.build.scripts.replace(config.project.name, '') + 'lib',
                    extDot: 'last',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: config.path.src.scripts.replace(config.project.name, '') + 'common',
                    src: ['**/*.js'],
                    dest: config.path.build.scripts.replace(config.project.name, '') + 'common',
                    extDot: 'last',
                    ext: '.js'
                }]
            },
            build: {
                options: {
                    mangle: true
                },
                files: [{
                    expand: true,
                    cwd: config.path.src.scripts,
                    src: ['**/*.js'],
                    dest: config.path.build.scripts,
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: config.path.src.scripts.replace(config.project.name, '') + 'lib',
                    src: ['**/*.js'],
                    dest: config.path.build.scripts.replace(config.project.name, '') + 'lib',
                    extDot: 'last',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: config.path.src.scripts.replace(config.project.name, '') + 'common',
                    src: ['**/*.js'],
                    dest: config.path.build.scripts.replace(config.project.name, '') + 'common',
                    extDot: 'last',
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
                    cwd: config.path.build.styles,
                    src: ['*.css'],
                    dest: config.path.build.styles
                },{
                    expand: true,
                    cwd: config.path.build.scripts,
                    src: ['*.js'],
                    dest: config.path.build.scripts
                },{
                    expand: true,
                    cwd: config.path.build.images,
                    src: ['*.{png,jpg,gif,webp}'],
                    dest: config.path.build.images
                }, {
                    expand: true,
                    cwd: config.path.build.scripts.replace(config.project.name, '') + 'lib',
                    src: ['**/*.js'],
                    dest: config.path.build.scripts.replace(config.project.name, '') + 'lib',
                    extDot: 'last',
                    ext: '.js'
                }, {
                    expand: true,
                    cwd: config.path.build.scripts.replace(config.project.name, '') + 'common',
                    src: ['**/*.js'],
                    dest: config.path.build.scripts.replace(config.project.name, '') + 'common',
                    extDot: 'last',
                    ext: '.js'
                }]
            }
        },

        usemin: {
            options: {
                assetsDirs: [
                    config.path.build.styles.replace(config.project.name, ''),
                    config.path.build.scripts.replace(config.project.name, ''),
                    config.path.build.images.replace(config.project.name, '')
                ],
                patterns: {
                    pages: [
                        [new RegExp('(\/'+config.project.name+'\/[a-zA-Z0-9\-_]*\.css)', 'g'), 'replace styles in pages'],
                        [new RegExp('(\/'+config.project.name+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in pages'],
                        [new RegExp('(\/(lib|common)\/.*\/[a-zA-Z0-9\-_]*\.js)', 'g'), 'replace scripts in pages'],
                        [new RegExp(': *[\'\"](('+config.project.name+'|lib|common)\/.*\)[\'\"]', 'g'), 'replace require config in pages', function(match) {
                            /**
                            var base = config.path.build.scripts.replace(config.project.name, '');
                            return grunt.filerev.summary[
                                base + match + '.js'
                            ].replace(base, '').replace('.js', '');
                            **/
                            var base = config.path.build.scripts.replace(config.project.name, '');
                            var summary = {};

                            for (var i in grunt.filerev.summary) {
                                var key = i.replace(/\\/g, '/'),
                                    val = grunt.filerev.summary[i].replace(/\\/g, '/');
                                summary[key] = val;
                            }

                            return summary[
                                base + match + '.js'
                            ].replace(base, '').replace('.js', '');
                        }]
                    ],
                    styles: [
                        [new RegExp('(\/'+config.project.name+'\/[a-zA-Z0-9\-_]*\.(jpg|png|gif|webp))', 'g'), 'replace images in styles']
                    ]
                }
            },
            pages: config.path.build.pages + '/**.html',
            styles: config.path.build.styles + '/**.css'
        },

        clean: {
            pages: config.path.build.pages,
            styles: config.path.build.styles,
            scripts: [
                config.path.build.scripts,
                config.path.build.scripts.replace(config.project.name, '') + 'lib',
                config.path.build.scripts.replace(config.project.name, '') + 'common'
            ],
            images: config.path.build.images,
            build: [
                config.path.build.styles + '/*.{css,map}',
                config.path.build.scripts + '/*.{js,map}',
                config.path.build.images + '/*.{png,jpg,gif,webp}',
                '!'+config.path.build.styles+'/*.*.css',
                '!'+config.path.build.scripts+'/*.*.js',
                '!'+config.path.build.images+'/*.*.{png,jpg,gif,webp}'
            ]
        },

        includes: {
            default: {
                options: {
                    includePath: config.path.src.pages
                },
                files: [{
                    expand: true,
                    cwd: config.path.src.pages,
                    src: ['**/*.html'],
                    dest: config.path.build.pages,
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
