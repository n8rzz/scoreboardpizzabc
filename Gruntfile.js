'use strict';

module.exports = function(grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var config = {
		dev: 'dev',
		dist: 'dist'
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		config: config,

		express: {
			all: {
				options: {
					port: 9000,
					hostname: "0.0.0.0",
					bases: ['dev'],
					livereload: true,
				}
			}
		},
		clean: {
			bower: {
				src: [
					'dev/styles/vendor/**',
					'dev/js/vendor/**',
					'dev/fonts/**'
				]
			},
			sass: {
				src: [
					'.sass-cache',
					'dev/.sass-cache'
				]
			},
			build: {
				src: 'dist/**/*'
			}
		},
		copy: {
			bower: {
				files: [{
					expand: true,
					cwd: 'bower_components/bootstrap-sass-official/assets/stylesheets/',
					src: '**',
					dest: 'dev/styles/vendor/'
				},
				{
					expand: true,
					cwd: 'bower_components/bootstrap-sass-official/assets/fonts/',
					src: '**',
					dest: 'dev/fonts/'
				},
				{
					expand: true,
					cwd: 'bower_components/bootstrap-sass-official/assets/javascripts/',
					src: '**',
					dest: 'dev/js/vendor/bootstrap/',
					flatten: true		
				},
				{
					expand: true,
					cwd: 'bower_components/jquery.scrollTo/',
					src: '**',
					dest: 'dev/js/vendor/jquery.scrollTo/',
					flatten: true
				}]
			},
			build: {
				files: [{
					expand: true,
					cwd: '<%= config.dev %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{html,css}'
					]
				}]
			}	
		}, 
		sass: {
			dist: {
				files: {
					'dev/style.css' : 'dev/styles/style.scss'
				}
			}
		},
		watch: { 			 
			css: {
				files: ['dev/**/*.scss'], 
				tasks: ['sass:dist'], //'clean:sass',
				options: {
					livereload: true
				}
			},
			html: {
				files: 'dev/**/*.html',
				options: {
					livereload: true
				}
			}
		},
		open: {
			all: {
				path: 'http://localhost:<%= express.all.options.port%>/index.html'
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'dist/styles/',
				src: ['*.css', '!*.min.css'],
				dest: 'dist/styles/',
				ext: '.min.css'
			}
		},
		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					cwd: 'dev/images/original-size',
					src: ['**/*.png'],
					dest: 'dev/images/',
					ext: '.png'
				}]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [{
					expand: true,
					cwd: 'dev/images/original-size',
					src: ['**/*.jpg'],
					dest: 'dev/images/',
					ext: '.jpg'
				}]
			}
		}

	});

	grunt.registerTask('default', [ 'watch' ]);
	
	grunt.registerTask('bower-build', [ 
		'clean:bower',
		'copy:bower',
		'sass'
	]);

	grunt.registerTask('server', [
		'express',
		'open',
		'watch'
	])
	
	grunt.registerTask('build', [
		'clean:build',
		'copy:build',
//		'useminPrepare',
//		'usemin',
//		'htmlmin',
		'cssmin'

	]);
}