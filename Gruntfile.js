module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
        test: {
          options: {
              reporter: 'nyan',
              growl: true
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
        tasks: [ 'express:dev' ],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.registerTask('test', [
      'mochaTest'
  ]);

  grunt.registerTask('default', [
    'nodemon'
  ]);
}