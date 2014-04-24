
var csspaths = ["dev/sass/**"];
var jspaths = [
  'dev/js/main.js',
  'dev/js/models/*.js',
  'dev/js/collections/*.js',
  'dev/js/views/*.js',
  'dev/js/routers/*.js',
  'dev/js/services/*.js',
  'dev/js/utils/*.js'
];
var indexpath = ["index.html"];
var templatepaths = ["dev/templates/*.html"];
var compiledtemplatepath = ["../public/js/templates.js"];
var concatpaths = compiledtemplatepath.concat(jspaths)
var vendorpaths = ["dev/vendor/**.js"];
var htmlpaths = ["index.html"];



module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts:{
        files: jspaths,
        tasks: ['concat', 'clean']
      },
      css:{
        files: csspaths,
        tasks:['compass:development']
      },
      vendor:{
        files: vendorpaths,
        tasks: ['copy','uglify', 'concat']
      },
      html:{
        files: indexpath,
        tasks: ['concat', 'clean']
      },
      templates: {
        files: templatepaths,
        tasks: ['copy']
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: templatepaths, dest: '../watm/www/public/templates'},
        
          {expand: true, flatten: true, src: vendorpaths, dest: '../watm/www/public/js/vendor'}

        ]
      }
    },

    concat: {
      options: {
         banner: "",
        footer: "",
        separator: '\n\n'
      },
      dist: {
        src: concatpaths,
        dest: '../watm/www/public/js/main.js'
      },
      vendor: {
        src: vendorpaths,
        dest: '../watm/www/public/js/vendor.js'
      }
    },

    uglify: {
      default: {
        options: {
          wrap: true
        },
        files: {
          '../WeAppToMove/www/public/js/main.js': concatpaths,
          '../WeAppToMove/www/public/js/vendor.js': '../watm/www/public/js/vendor.js'

        }
      }
    },

    jshint:{
      default:{
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          eqnull: true,
          browser: true,
          noempty: true,
          trailing: true,
          globals:{
              $: true,
              console:true,
              Handlebars:true,
              _:true,
              tpl:true,
              Backbone:true
          },
        },
        files:{
          src: jspaths
        }
      }
    },

    compass: {
      development: { 
        options: {
          sassDir: 'dev/sass',
          cssDir: '../watm/www/public/css',
          environment: 'development'
        }
      },
      production: { 
        options: {
          sassDir: 'dev/sass',
          cssDir: '../watm/www/public/css',
          environment: 'production',
          outputStyle: 'compressed',
          force: true
        }
      }
    },

      clean: compiledtemplatepath,

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('default', [,'concat','compass:development', 'clean', 'uglify', 'copy']);
  grunt.registerTask('production', ['compass:production', 'clean', 'uglify', 'clean']);

};