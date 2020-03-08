module.exports = function (grunt) {
  grunt.initConfig({
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      target: {
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/style.min.css': 'src/css/*.css'
        }
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 3
      },
      files: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'dist/'
      }
    },
    copy: {
      html: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('release', ['copy', 'useminPrepare', 'usemin', 'cssmin', 'htmlmin', 'imagemin']);
};
