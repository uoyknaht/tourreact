module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var appConfig = {
    rootPath: './',
    appPath: 'public/app',
    distPath: 'public/dist'
  };

  grunt.initConfig({
      appConfig: appConfig,
    less: {
        all: {
            files: {
                '<%= appConfig.appPath %>/styles/app.css': '<%= appConfig.appPath %>/styles/app.less',
            },
            options: {
                compress: false
            }
        }
    },
    watch: {
        less: {
            files: ['<%= appConfig.appPath %>/styles/**/*.less'],
            tasks: ['less']
        }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            appConfig.distPath + '/{,*/}*',
            '!' + appConfig.distPath + '/.git{,*/}*'
          ]
        }]
      },
    },    
    // wiredep: {
    //   target: {
    //     directory: appConfig.rootPath + '/public',
    //     bowerJson: appConfig.rootPath + '/public',
    //     // src: [appConfig.rootPath +  '/views/index.ejs']
    //     src: ['../views/index.ejs']
    //     // ignorePath:  /\.\.\//
    //   }
    // },    
    copy: {       
      views: {
        expand: true,
        cwd: appConfig.appPath + '/views',
        src: '**',
        dest: appConfig.distPath + '/views/'
      }     
    }, 
    useminPrepare: {
      html: appConfig.appPath + '/views/index.ejs',
      options: {
        root: appConfig.rootPath + '/public',
        dest: appConfig.distPath
      }      
    },
    usemin: {
      html: [appConfig.distPath + '/views/index.ejs']
    },
    filerev: {
      dist: {
        src: [
          appConfig.distPath + '/scripts/{,*/}*.js',
          appConfig.distPath + '/styles/{,*/}*.css'
        ]
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'copy:views',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);

};