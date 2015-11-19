module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      // 'doozy/client/lib/**/*.js'],
      all: [
        'Gruntfile.js',
        'doozy/**/*.js',
        '!doozy/client/lib/**',
        'test/**/*.js',
      ],
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
    },
    mocha_istabul: {
      coverage: {
        src: 'test',
        options: {
          
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
};
