/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            lib: {
                src: ["src/<%= pkg.name %>.js"]
            },
            test: {
                options: {
                    jshintrc: "test/.jshintrc"
                },
                src: ["test/test.js", "test/test-amd.js"]
            }
        },
        csslint: {
            base: {
                src: "<%= pkg.name %>.css",
                rules: {
                    "known-properties": false,
                    "box-sizing": false
                }
            }
        },
        clean: {
            build: {
                src: ['path/to/dir/one', 'path/to/dir/two']
            }
        },
//        uglify: {
//            options: {
//                mangle: true
//            }, // <-------
//            build: {
//                src: "js/*.js",
//                dest: "js/min/script.js"
//            }
//        }
    });
    grunt.registerTask("default", ["jshint"]);
};
