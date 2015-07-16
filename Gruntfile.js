module.exports = function(grunt) {
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
			* Sass task
			*/
		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
				},
				files: {
					'app/css/styles.css': 'app/sass/styles.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
				},
				files: {
					'app/css/styles-min.css': 'app/sass/styles.scss'
				}
			}
		},

		/**
			* Autoprefixer
			*/
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			// prefix all files
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'compiled/*.css',
				dest: ''
			}
		},

		connect:  {
			server: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: 'app/',
					livereload: true
				}
			}
		},


		/**
			* Watch task
			*/
		watch: {
			// css: {
			// 	files: '**/*.scss',
			// 	tasks: ['sass', 'autoprefixer']
			// },
			script: {
				files: ['app/**/*.html', 'app/js/*.js', 'app/sass/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},
			options: {
				spawn: false,
				livereload: true
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default', ['connect', 'watch']);
}