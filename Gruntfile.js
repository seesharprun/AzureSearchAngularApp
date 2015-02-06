'use strict';
var packagejson = require('./package.json');

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    pkg: packagejson,
    jsDir: 'dev/js/',
    jsDistDir: 'public/js/',
    cssDir: 'dev/css/',
    cssDistDir: 'public/css/',
    htmlDir: 'public/',
    bwr: {
      name: 'Bower'
    },
    concat: {
      js: {
        src: ['<%=jsDir%>**/*.js'],
        dest: '<%=jsDistDir%><%= pkg.name %>.js'
      },
      css: {
        src: ['<%=cssDir%>**/*.css'],
        dest: '<%=cssDistDir%><%= pkg.name %>.css'
      }
    },
    uglify: {
     options: {
       banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
     },
     dist: {
       files: {
         '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>'],
         '<%=jsDistDir%><%= bwr.name %>.min.js': ['<%=jsDistDir%><%= bwr.name %>.js']
       }
     }
   },
   cssmin: {
     add_banner: {
       options: {
         banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
       },
       files: {
         '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.css.dest %>'],
         '<%=cssDistDir%><%= bwr.name %>.min.css': ['<%=cssDistDir%><%= bwr.name %>.css']
       }
     }
   },
   watch: {
      html: {
        files: ['<%=htmlDir%>**/*.css']
      },
      css: {
        files: ['<%=cssDir%>**/*.css'],
        tasks: ['concat', 'cssmin']
      },
      js: {
        files: ['<%=jsDir%>**/*.js'],
        tasks: ['concat', 'uglify']
      }
    },
   nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },
    bower_concat: {
      all: {
        dest: 'public/js/Bower.js',
        cssDest: 'public/css/Bower.css',
        bowerOptions: {
          relative: false
        }
      }
    },
    bower: {
    install: {
      options: {
        targetDir: './public',
        layout: function(type, component, source){
          return type;
        },
        install: true,
      }
    }
  }

  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', [
    'concat', 'bower_concat',
    'uglify', 'cssmin',
    'bower',
    'concurrent'
  ]);

};
