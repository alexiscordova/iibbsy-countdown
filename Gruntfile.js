module.exports = function(grunt) {
    // Load all Grunt plugin tasks
    require('load-grunt-tasks')(grunt);

    // Register Grunt tasks
    grunt.registerTask('default', ['clean:build', 'sass:dev', 'autoprefixer:dev', /* 'modernizr', */ 'copy', 'svgstore', 'requirejs:dev']);
    grunt.registerTask('deploy', ['clean:build', 'sass:deploy', 'autoprefixer:deploy', /* 'modernizr', */ 'copy', 'svgstore', 'requirejs:deploy', 'aws_s3:build']);
    grunt.registerTask('perf', []);

    // Grunt configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // grunt-contrib-clean
        clean: {
            build: ['build']
        },

        // grunt-contrib-copy
        copy: {
            dist: {
                files: [
                    // sass files for sourcemap
                    {
                        expand: true,
                        cwd: 'assets/scss',
                        src: ['**'],
                        dest: 'build/assets/scss/'
                    },
                    // js files
                    {
                        expand: true,
                        cwd: 'assets/js',
                        src: ['**'],
                        dest: 'build/assets/js'
                    },
                    // bower components
                    {
                        expand: true,
                        cwd: 'assets/vendor',
                        src: ['**'],
                        dest: 'build/assets/vendor/'
                    },
                    // html files with subdirectories
                    {
                        expand: true,
                        cwd: 'assets/html',
                        src: ['**'],
                        dest: 'build/'
                    },
                    // images (not svg)
                    {
                        expand: true,
                        cwd: 'assets/img',
                        src: ['*.{jpg, png}'],
                        dest: 'build/assets/img'
                    }
                ]
            }
        },

        // grunt-contrib-sass
        sass: {
            options: {
                style: 'compressed',
                precision: 10
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/assets/css/style-unprefixed.css': 'assets/scss/main.scss'
                },
            },
            deploy: {
                options: {
                    sourcemap: 'none'
                },
                files: {
                    'build/assets/css/style-unprefixed.css': 'assets/scss/main.scss'
                },
            }
        },

        // grunt-autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie >= 7'],
                cascade: false
            },
            dev: {
                options: {
                    map: true
                },
                src: 'build/assets/css/style-unprefixed.css',
                dest: 'build/assets/css/style.css'
            },
            deploy: {
                src: 'build/assets/css/style-unprefixed.css',
                dest: 'build/assets/css/style.css'
            }
        },

        // grunt-contrib-watch
        watch: {
            options: {
                livereload: true,
                dateFormat: function(time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            site: {
                files: ['**/*.md', '**/*.html'],
                tasks: ['newer:copy']
            },
            sass: {
                files: ['assets/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer:dev']
            },
            js: {
                files: ['assets/**/*.js'],
                tasks: ['jshint', 'modernizr', 'requirejs:dev', 'newer:copy']
            },
            img: {
                files: ['assets/**/*.{jpg,png}'],
                tasks: ['newer:copy']
            },
            svg: {
                files: ['assets/**/*.svg'],
                tasks: ['svgstore']
            }
        },

        // grunt-modernizr
        modernizr: {
            dist: {
                'devFile': 'assets/vendor/modernizr/modernizr.js',
                'outputFile': 'assets/js/modernizr-custom.js',
                'extra': {
                    'shiv': true,
                    'printshiv': false,
                    'load': false,
                    'mq': false,
                    'cssclasses': true
                },
                'extensibility': {
                    'addtest' : false,
                    'prefixed' : false,
                    'teststyles' : false,
                    'testprops' : false,
                    'testallprops' : false,
                    'hasevents' : false,
                    'prefixes' : false,
                    'domprefixes' : false
                },
                'uglify': true,
                'tests': [],
                'parseFiles': true,
                'files': {
                    'src': [
                        'assets/js/components/*.js',
                        'assets/js/*.js',
                        'assets/scss/**/*.scss'
                    ]
                }
            }
        },

        // grunt-contrib-jshint
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                quotmark: true,
                undef: true,
                unused: true,
                globals: {
                    console: true,
                    define: true, // requirejs
                    jQuery: true,
                    module: true, // requirejs
                    require: true, // requirejs
                    document: true,
                    requestAnimationFrame: true,
                    cancelAnimationFrame: true
                }
            },
            files: [
                'assets/js/**/*.js',
                'Gruntfile.js',
                '!assets/vendor/**/*.js',
                '!assets/js/**/*.min.js',
                '!assets/js/modernizr-custom.js'
            ]
        },

        // grunt-contrib-requirejs
        requirejs: {
            dev: {
                options: {
                    baseUrl: '',
                    mainConfigFile: 'assets/js/main.js',
                    name: 'assets/js/main',
                    out: 'build/assets/js/main.min.js',
                    preserveLicenseComments: false,
                    optimize: 'none'
                }
            },
            deploy: {
                options: {
                    baseUrl: '',
                    mainConfigFile: 'assets/js/main.js',
                    name: 'assets/js/main',
                    out: 'build/assets/js/main.min.js',
                    perserveLicenseComments: true,
                    optimze: 'uglify2'
                }
            }
        },

        // grunt-svgstore
        svgstore: {
            options: {
                prefix : 'shape-',
                cleanup: false,
                svg: {
                    style: 'display: none;'
                }
            },
            default: {
                files: {
                    'build/assets/svg/svg-defs.svg': ['assets/svg/*.svg']
                }
            }
        },

        // grunt-aws-s3
                // grunt-aws-s3
        aws: grunt.file.readJSON('_dev-credentials.json'),
        aws_s3: {
            options: {
                accessKeyId: '<%= aws.accessKeyId %>',
                secretAccessKey: '<%= aws.secretAccessKey %>',
                region: 'us-west-1'
            },
            dev: {
                options: {
                    bucket: 'dev.isitbaseballseasonyet.com',
                    differential: true
                },
                files: [
                    { expand: true, cwd: '_site/', src: ['**'], dest: '' }
                ]
            },
            build: {
                options: {
                    bucket: 'isitbaseballseasonyet.com',
                    differential: true
                },
                files: [
                    { expand: true, cwd: 'build', src: ['**'], dest: '' }
                ]
            }
        }
    });
};