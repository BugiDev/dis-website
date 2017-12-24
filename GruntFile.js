module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: [
                'dist',
                '.tmp'
            ]
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['fonts/**/*', 'images/**/*', 'index.html'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/slick-carousel/slick',
                        src: ['fonts/**/*', 'ajax-loader.gif'],
                        dest: 'dist/css'
                    }
                ]

            }
        },

        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'dist'
            }
        },

        usemin: {
            html: ['dist/index.html']
        },

        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },

        express: {
            dev: {
                options: {
                    port: 3000,
                    hostname: '0.0.0.0',
                    bases: ['./src'],
                    livereload: true
                }
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:3000',
                app: 'Google Chrome'
            }
        },

        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },

        imagemin: {
            build: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'dist/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
            }
        }
    });

    grunt.registerTask('dist', [
        'clean:build', 'copy:build', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'htmlmin:build', 'imagemin:build'
    ]);

    grunt.registerTask('dev', ['express:dev', 'open:dev']);
};
