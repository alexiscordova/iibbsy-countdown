module.exports = function(grunt) {
    // Load all Grunt plugin tasks
    require('load-grunt-tasks')(grunt);

    // Register Grunt tasks
    grunt.registerTask('default', ['sass:dev', 'autoprefixer:dev', 'modernizr', 'copy', 'requirejs', 'exec:serverup']);
    grunt.registerTask('build', ['clean:build', 'sass:build', 'autoprefixer:build', 'modernizr', 'copy', 'requirejs', 'exec:serverup']);

    grunt.initConfig({

        // grunt-exec
        exec: {
            serverup: {
                command: '/Applications/MAMP/bin/start.sh'
            }
        },

        // grunt-contrib-clean
        clean: {
            build: '_build'
        },

        // grunt-contrib-copy
        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        src: ['assets/**/*', '!assets/sass/'],
                        dest: '_build/'
                    }
                ]
            },
            html: {
                src: 'index.html',
                dest: '_build/'
            }
        },

        // grunt-contrib-sass
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    update: true
                },
                files: {
                    'assets/css/style-unprefixed.css': 'assets/sass/style.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed',
                    update: false
                },
                files: {
                    'assets/css/style-unprefixed.css': 'assets/sass/style.scss'
                }
            }
        },

        // grunt-autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie >= 9'],
                cascade: false
            },
            dev: {
                options: {
                    map: true
                },
                src: 'assets/css/style-unprefixed.css',
                dest: 'assets/css/style.css'
            },
            build: {
                options: {
                    map: false
                },
                src: 'assets/css/style-unprefixed.css',
                dest: 'assets/css/style.css'
            }
        },

        //grunt-contrib-watch
        watch: {
            options: {
                livereload: true,
                dateFormat: function(time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            site: {
                files: ['index.html'],
                tasks: ['copy']
            },
            sass: {
                files: ['assets/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer:dev', 'copy']
            },
            js: {
                files: ['assets/**/*.js'],
                tasks: ['modernizr', 'copy', 'requirejs']
            },
            img: {
                files: ['assets/**/*.{jpg,png}'],
                tasks: ['copy']
            },
            svg: {
                files: ['assets/**/*.svg'],
                tasks: []
            }
        },

        // grunt-modernizr
        modernizr: {
            deploy: {
                'devFile': 'assets/js/lib/modernizr/modernizr.js',
                'outputFile': 'assets/js/lib/modernizr/modernizr-custom.js',
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
                        'assets/css/*.css'
                    ]
                }
            }
        },

        // grunt-contrib-requirejs
        requirejs: {
            production: {
                options: {
                    baseUrl: '_build/assets/js',
                    mainConfigFile: '_build/assets/js/main.js',
                    name: 'main',
                    exclude: ['modernizr'],
                    out: '_build/assets/js/main.js',
                    preserveLicenseComments: true,
                    optimize: "uglify2"
                }
            }
        }
    });

    var exec = require('child_process').exec;
    process.on('SIGINT', function() {
        exec('/Applications/MAMP/bin/stop.sh', function() {
            process.exit();
        });
    });
};