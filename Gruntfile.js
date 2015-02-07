var packagejson = require('./package.json');

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    pkg: packagejson,
    distDir: 'web/',
    devDir: 'dev/',
    tempDir: 'tmp/',
    jsDir: 'js/',
    cssDir: 'css/',
    htmlDir: 'html/',
    fontsDir: 'fonts/',
    bwr: {
      name: 'Bower'
    },
    concat: {
      js: {
        src: ['<%= devDir %><%= jsDir %>**/*.js'],
        dest: '<%= tempDir %><%= jsDir %><%= pkg.name %>.js'
      },
      css: {
        src: ['<%= devDir %><%= cssDir %>**/*.css'],
        dest: '<%= tempDir %><%= cssDir %><%= pkg.name %>.css'
      }
    },
    bower_concat: {
      all: {
        dest: '<%= tempDir %><%= jsDir %><%= bwr.name %>.js',
        cssDest: '<%= tempDir %><%= cssDir %><%= bwr.name %>.css'
      }
    },
    uglify: {
     options: {
       banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
       mangle: false
     },
     dist: {
       files: {
         '<%= distDir %><%= jsDir %><%= pkg.name %>.min.js': ['<%= concat.js.dest %>'],
         '<%= distDir %><%= jsDir %><%= bwr.name %>.min.js': ['<%= bower_concat.all.dest %>']
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
         '<%= distDir %><%= cssDir %><%= bwr.name %>.min.css': ['<%= bower_concat.all.cssDest %>']
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
     dev: {
       dest: '<%= tempDir %>',
       fonts_dest: '<%= distDir %><%= fontsDir %>',
       options: {
         keepExpandedHierarchy: false
       }
     }
   },
   clean: {
     build: ['<%= tempDir %>']
   },
   watch: {
      html: {
        files: ['<%= devDir %><%= htmlDir %>**/*.html'],
        tasks: ['copy']
      },
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
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-bower-concat');

  grunt.registerTask('default', [
    'concat', 'bower_concat',   // Concat JS and CSS and copy to Temp folder
    'uglify', 'cssmin',         // Minify JS and CSS and copy to Web folder
    'copy',                     // Copy HTML to Web folder
    'bower',                    // Copy Bower components to Web folder
    'clean',                    // Clean up Temp folder
    'concurrent'                // Run Watch and Node concurrently
  ]);

};
