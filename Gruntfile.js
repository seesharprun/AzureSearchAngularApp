var packagejson = require('./package.json');

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    pkg: packagejson,
    dataDir: 'data/',
    distDir: 'web/',
    devDir: 'dev/',
    tempDir: 'tmp/',
    templateDir: 'templates/',
    jsDir: 'js/',
    cssDir: 'css/',
    htmlDir: 'html/',
    fontsDir: 'fonts/',
    configName: 'config',
    indexName: 'index',
    docsName: 'documents',
    bwr: {
      name: 'Bower'
    },
    preprocess: {
      options: {
        context: {
          SETTINGS: grunt.file.readJSON('config.json'),
        }
      },
      config: {
        src: '<%= templateDir %><%= configName %>.template.js',
        dest: '<%= tempDir %><%= configName %>.js'
      },
      data: {
        src: '<%= templateDir %><%= indexName %>.template.js',
        dest: '<%= dataDir %><%= indexName %>.json'
      }
    },
    concat: {
      concat_js: {
        src: ['<%= devDir %><%= jsDir %>**/*.js', '<%= tempDir %><%= configName %>.js'],
        dest: '<%= tempDir %><%= jsDir %><%= pkg.name %>.js'
      },
      concat_css: {
        src: ['<%= devDir %><%= cssDir %>**/*.css'],
        dest: '<%= tempDir %><%= cssDir %><%= pkg.name %>.css'
      }
    },
    bower_concat: {
      concat_bower: {
        dest: '<%= tempDir %><%= jsDir %><%= bwr.name %>.js',
        cssDest: '<%= tempDir %><%= cssDir %><%= bwr.name %>.css'
      }
    },
    uglify: {
     options: {
       banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
       mangle: false
     },
     min_js: {
       files: {
         '<%= distDir %><%= jsDir %><%= pkg.name %>.min.js': ['<%= concat.concat_js.dest %>'],
         '<%= distDir %><%= jsDir %><%= bwr.name %>.min.js': ['<%= bower_concat.concat_bower.dest %>']
       }
     }
   },
   cssmin: {
     options: {
       banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
     },
     min_css: {
       files: {
         '<%= distDir %><%= cssDir %><%= pkg.name %>.min.css': ['<%= concat.concat_css.dest %>'],
         '<%= distDir %><%= cssDir %><%= bwr.name %>.min.css': ['<%= bower_concat.concat_bower.cssDest %>']
       }
     }
   },
   copy: {
     copy_html: {
       expand: true,
       cwd: '<%= devDir %><%= htmlDir %>',
       src: '**',
       dest: '<%= distDir %>',
       flatten: true,
       filter: 'isFile'
     }
   },
   bower: {
     copy_fonts: {
       dest: '<%= tempDir %>',
       fonts_dest: '<%= distDir %><%= fontsDir %>',
       options: {
         keepExpandedHierarchy: false
       }
     }
   },
   clean: {
     clean: ['<%= tempDir %>']
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
        files: ['<%= devDir %><%= jsDir %>**/*.js', '<%= devDir %><%= configName %>.template.js'],
        tasks: ['preprocess', 'concat', 'uglify']
      }
    },
    nodemon: {
      node: {
        script: 'server.js'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },
    http: {
      options: {
        SETTINGS: grunt.file.readJSON('config.json')
      },
      create_index: {
        options: {
          url: 'https://<%= http.options.SETTINGS.SearchServiceName %>.search.windows.net/indexes/<%= http.options.SETTINGS.SearchServiceIndexName %>?api-version=<%= http.options.SETTINGS.ApiVersion %>',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'api-key': '<%= http.options.SETTINGS.SearchAdminKey %>'
          },
          body: grunt.file.read('data/index.json')
        }
      },
      upload_docs: {
        options: {
          url: 'https://<%= http.options.SETTINGS.SearchServiceName %>.search.windows.net/indexes/<%= http.options.SETTINGS.SearchServiceIndexName %>/docs/index?api-version=<%= http.options.SETTINGS.ApiVersion %>',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': '<%= http.options.SETTINGS.SearchAdminKey %>'
          },
          body: grunt.file.read('data/documents.json')
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-http');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-bower-concat');

  // Generate Azure Search Data
  grunt.registerTask('generate', [
    'preprocess:data',          // Process index.template.js and copy to Temp folder
    'http:create_index',        // Create Search Index
    'http:upload_docs',         // Upload Search Docs
    'clean'                     // Clean up Temp folder
  ]);

  // Build Only
  grunt.registerTask('build', [
    'preprocess:config',        // Process config.template.js and copy to Temp folder
    'concat', 'bower_concat',   // Concat JS and CSS and copy to Temp folder
    'uglify', 'cssmin',         // Minify JS and CSS and copy to Web folder
    'copy',                     // Copy HTML to Web folder
    'bower',                    // Copy Bower components to Web folder
    'clean',                    // Clean up Temp folder
  ]);

  // Build and Launch Node
  grunt.registerTask('default', [
    'preprocess:config',        // Process config.template.js and copy to Temp folder
    'concat', 'bower_concat',   // Concat JS and CSS and copy to Temp folder
    'uglify', 'cssmin',         // Minify JS and CSS and copy to Web folder
    'copy',                     // Copy HTML to Web folder
    'bower',                    // Copy Bower components to Web folder
    'clean',                    // Clean up Temp folder
    'concurrent'                // Run Watch and Node concurrently
  ]);

};
