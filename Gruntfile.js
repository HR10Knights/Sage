module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      gruntfile: 'Gruntfile.js',
      doozy: 'doozy/**/*.js',
      // client: 'doozy/client/**/*.js',
      // models: 'doozy/models/**/*.js',
      test: 'test/**/*.js',
      options: {
        globals: {
          eqeqeq: true
        }
      }
    },
    mochaTest: {
        test: {
          options: {
              reporter: 'nyan',
              growl: true,
              clearRequireCache: true
          },
          src: ['test/unit/*.js', 'test/integration/*.js']
        }
    },
    nodemon: {
        dev: {
            script: 'doozy/index.js'
        }
    },
    express: {
      dev: {
        options: {
          script: 'doozy/index.js'
        }
      }

    },
    watch: {
      server: {
        files: [ 'doozy/**' ],
        tasks: [ 'test', 'express:dev' ],
        options: {
          spawn: false
        }
      },
      test: {
        files: [ 'test/**/*.js' ],
        tasks: [ 'test' ]
      }
    }
  });

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'nodemon'
  ]);
};
