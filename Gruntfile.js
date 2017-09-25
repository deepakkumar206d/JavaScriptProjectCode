module.exports = function(grunt) {

    var serveStatic = require('serve-static');

    var folders = {
        dev: 'app',
        prod: 'build'
    };

    // Project configuration.
    grunt.initConfig({
        folders: folders,
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35721
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            serveStatic(folders.dev)
                        ];
                    }
                }
            }
        },
        jsdoc: {
            dist: {
                src: ['app/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        jslint: {
            // lint the server code
            all: {
                // files to lint
                src: [
                    'app/**/*.js'
                ],
                // lint options
                directives: {
                    // allow dangling underscores
                    nomen: true,
                    // allow todo statements
                    todo: true,
                    // allow unused parameters
                    unparam: true,
                    // don't require strcit pragma
                    sloppy: true,
                    // allow whitespace discrepencies
                    white: true
                }
            }
        },
        jshint: {
            // all the js files in app and its sub-directories
            all: ['app/**/*.js'],
            options: {
                reporter: require('jshint-html-reporter'),
                reporterOutput: 'reports/jshint-report.html',
                // use curly braces for blocks
                curly: true,
                // use triple equals for comparisons
                eqeqeq: true,
                // use triple equals for null equality
                eqnull: false,
                // use esversion as specified
                esversion: 5,
                // disable overwriting the prototypes of native objects
                freeze: true,
                // forces to declare a variable before its use
                latedef: true,
                // prohibits use of new constructorfunction
                nonew: true,
                // not suppresses invalid typeof
                notypeof: false,
                // use strict
                strict: "global",
                // prohibits use of undeclared variables
                undef: true,
                // prohibits the use of unused variables
                unused: true,
                // warns about use of evil
                evil: false,
                // warns about functions inside loops
                loopfunc: false,
                // warns about use of with
                withstmt: false,
                // defines globals exposed by browser
                browser: true,
                // when code running in worker
                worker: true,
                // options here to override JSHint defaults
                globals: {
                    console: false,
                    module: true,
                    loader: true,
                    document: true,
                    window: true
                }
            }
        },
        csslint: {
            options: {
                formatters: [{
                    id: require('csslint-stylish'),
                    dest: 'reports/csslint_report.xml'
                }]
            },
            strict: {
                src: ['app/**/*.css']
            },
            lax: {
                // options: {
                //     csslintrc: '.csslintrc'
                // },
                src: ['app/**/*.css']
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/**/*.js'],
                dest: 'build/custom_script.js'
            }
        },
        autoprefixer: {
            options: {
                //List of supported browsers
                browsers: ['Opera >= 12', 'ff >= 15', 'Chrome >= 25', 'ie >= 9', 'Safari >= 6']
            },
            //target folders and files
            app: {
                src: ['app/**/*.css']
            }
        },
        concat_css: {
            options: {
                separator: ';'
            },
            all: {
                src: ['/**/*.css'],
                dest: 'build/styles.css'
            },
        },
        uglify: {
            app: {
                files: [{
                    expand: true,
                    src: 'build/custom_script.js',
                    dest: 'build'

                }]
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/**/*.*'
                ]
            },
            jshint: {
                files: ['app/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                }
            },
            jslint: {
                files: ['app/**/*.js'],
                tasks: ['jslint'],
                options: {
                    spawn: false,
                }
            },
            csslint: {
                files: ['app/**/*.js'],
                tasks: ['csslint'],
                options: {
                    spawn: false,
                }
            },
            jsdoc: {
                files: ['app/**/*.js'],
                tasks: ['jsdoc'],
                options: {
                    spawn: false,
                }
            },
            autoprefixer: {
                files: ['app/**/*.css'],
                tasks: ['autoprefixer'],
                options: {
                    spawn: false,
                }
            },
            validation: {
                files: ['app/**/*.html'],
                tasks: ['validation'],
                options: {
                    spawn: false,
                }
            }

        }
    });

    // Load the plugin that provides the tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'connect:livereload',
        'watch:jsdoc',
        'watch:autoprefixer',
        'watch:jslint',
        'watch:jshint',
        'watch:csslint',
        'watch:validation',
        'watch:livereload'
    ]);
    grunt.registerTask('built', ['concat', 'concat_css', 'uglify']);

};
