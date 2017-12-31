module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: [ 'src/pick.js', 'src/dom.js', 'src/object.js', 'src/cookie.js', 'src/ajax.js' ],
        dest: 'dist/<%= pkg.name %>.js',
      },
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /@VERSION/g,
              replacement: '<%= pkg.version %>'
            },
            {
              match: /@AUTHOR/g,
              replacement: '<%= pkg.author %>'
            }
          ]
        },
        files: [
          { expand: true, flatten: true, src: [ 'dist/<%= pkg.name %>.js' ], dest: 'dist/' }
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> [v<%= pkg.version %>] <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap : true
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js'],
      options: {
        globals: {
          _: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');
  
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'replace', 'uglify']);
  
};
