var packagejson = require('./package.json');

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    pkg: packagejson,
    distDir: 'web/',
    devDir: 'dev/',
    jsDir: 'js/',
    cssDir: 'css/',
    htmlDir: 'html/',
    bwr: {
      name: 'bower'
    },
    concat: {
      js: {
        src: ['<%= devDir %><%= jsDir %>**/*.js'],
        dest: '<%= distDir %><%= jsDir %><%= pkg.name %>.js'
      },
      css: {
        src: ['<%= distDir %><%= cssDir %>**/*.css'],
        dest: '<%= distDir %><%= cssDir %><%= pkg.name %>.css'
      }
    },
    bower_concat: {
      all: {
        dest: '<%= distDir %><%= jsDir %><%= bwr.name %>.js',
        cssDest: '<%= distDir %><%= cssDir %><%= bwr.name %>.css',
        bowerOptions: {
          relative: false
        }
      }
    },
    uglify: {
     options: {
       banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
     },
     dist: {
       files: {
         '<%= distDir %><%= jsDir %><%= pkg.name %>.min.js': ['<%= concat.js.dest %>'],
         '<%= distDir %><%= jsDir %><%= bwr.name %>.min.js': ['<%= bower_concat.all.dest %>.js']
       }
     }
   },
   cssmin: {
     add_banner: {
       options: {
         banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
       },
       files: {
         '<%= distDir %><%= cssDir %><%= pkg.name %>.min.css': ['<%= concat.css.dest %>'],
         '<%= distDir %><%= cssDir %><%= bwr.name %>.min.css': ['<%= bower_concat.all.cssDest %>.css']
       }
     }
   },
   copy: {
     main: {
       expand: true,
       cwd: '<%= devDir %><%= htmlDir %>',
       src: '**',
       dest: '<%= distDir %>',
       flatten: true,
       filter: 'isFile'
     }
   },
   bower: {
   install: {
     options: {
       targetDir: './web/lib/',
       layout: function(type, component, source){
         return type;
       },
       install: true,
     }
   },
   watch: {
      css: {
        files: ['<%= devDir %><%= cssDir %>**/*.css'],
        tasks: ['concat', 'cssmin']
      },
      js: {
        files: ['<%= devDir %><%= jsDir %>**/*.js'],
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
    }
  }

  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', [
    'concat', 'bower_concat',   // Concat JS and CSS in Web
    'uglify', 'cssmin',         // Minify JS and CSS
    'copy',                     // Copy HTML to Web
    'bower'                      // Copy Bower Files
  ]);

};
