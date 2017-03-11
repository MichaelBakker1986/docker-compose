module.exports = function (grunt) {
    grunt.file.defaultEncoding = 'utf8';
    grunt
        .initConfig({
            connect: {
                keepalive: true,
                options: {
                    keepalive: true,
                    port: 9000,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: '0.0.0.0'
                }
            },
            pkg: grunt.file.readJSON('package.json'),
            watch: {
                options: {livereload: true},
                jsons: {
                    files: 'src/archive/json/*.json',
                    tasks: ['browserify']
                },
                robot: {
                    files: [
                        'src/archive/**/*.js',
                        'src/archive/ace_editor/**.js',
                        'src/archive/solutions/**.js',
                        'src/archive/presentation/**.js',
                        'src/archive/clientscorecard/**.js',
                        'src/editor/dependencyview/**.js',
                        'src/solution/**.js',
                        'src/ffl/**.js',
                        'src/fin/**.js',
                        'src/fesjs/**.js',
                        'src/jsonvalues/**.js',
                        'src/form/**.js',
                        'src/screendefinition/**.js'
                    ],
                    tasks: ['browserify']
                }
            },
            json: {
                main: {
                    options: {
                        namespace: 'json',
                        processName: function (filename) {
                            return filename.toLowerCase();
                        }
                    },
                    src: ['json/*.json'],
                    dest: 'json.js'
                }
            },
            concat: {
                options: {
                    separator: ';',
                },
                dist: {
                    src: [
                        'WebContent/js/3rdparty/jquery.js'
                    ],
                    dest: 'WebContent/dist/3dbuild.js'
                }
            },
            browserify: {
                dist: {
                    files: {
                        'dist/editor.js': [
                            'src/archive/clientscorecard/*.js',
                            'src/archive/editor/*.js',
                            'src/archive/ffl/*.js',
                            'src/archive/pom/*.js',
                            'src/archive/ace_editor/*.js',
                            'src/archive/abn/*.js',
                            'src/archive/exchange/*.js',
                            'src/archive/finanXML/*.js',
                            'src/archive/rptXml/*.js',
                            'src/archive/jsonvalues/*.js',
                            'src/archive/fin/*.js',
                            'src/archive/editor/dependencyview/*.js',
                            'src/archive/variables/*.js',
                            'src/archive/solution/*.js',
                            'src/archive/formbuilder/*.js',
                            'src/archive/exchange/*.js',
                            'src/form/*.js',
                            'src/archive/screendefinition/*.js'
                        ],
                        //export for
                        'example/fesjs.js': [
                            'src/archive/clientscorecard/uimodel.js',
                            'src/archive/presentation/presentation.js',
                            'src/archive/jsonvalues/jsonvalues.js',
                            'src/archive/ffl/*.js',
                            'src/test/jsonXML.js',
                            'src/archive/fesjs/*.js',
                            'src/archive/fesjs/JSWorkBook.js',
                            'src/archive/screendefinition/*.js',
                            'src/archive/fin/*.js',
                            'src/archive/finanXML/*.js'
                        ]
                    }
                },
                options: {
                    external: ['d3', 'jsdom']
                }
            },
            bower: {
                dev: {
                    dest: 'dest',
                    js_dest: 'dest/js',
                    options: {
                        keepExpandedHierarchy: false
                    }
                }
            },
            bowerBundle: {
                target: {

                    // Point to the files that should be updated when
                    // you run `grunt bowerBundle`
                    src: [
                        'src/**/*.html'   // .html support...
                    ],

                    // Optional:
                    // ---------
                    installDir: '/dist',
                    bowerDir: '/'  // the directory of your bower.json
                }
            },
            livereload: {
                options: {
                    base: 'dist',
                },
                files: ['dist/**/*']
            },
            // make a zipfile
            compress: {
                main: {
                    options: {
                        mode: 'gzip'
                    },
                    files: [
                        // Each of the files in the src/ folder will be output to
                        // the dist/ folder each with the extension .gz.js
                        {expand: true, src: ['output/*.js'], dest: 'dist/', ext: '.gz.js'}
                    ]
                }
            },
            uglify: {
                bower: {
                    options: {
                        compress: true
                    },
                    files: {
                        'dist/bower.min.js': 'dist/bower.js'
                    }
                }
            },
            bower_concat: {
                options: {
                    expand: true,
                    compress: true
                },
                all: {
                    dest: 'dist/bower.js'
                }
            }
        });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['watch']);
};
