var config = {
	root: './client/dist',

	server: {
		port: 8000,

		main: {
			src: './server/dist/index.js'
		},

		code: {
			distName: 'server.js',
			src: ['./server/index.ts', './server/**/*.ts', './server/**/*.tsx', '!./server/dist'],
			dest: './server/dist'
		},

		scss: {
			main: './server/public/scss/main.scss',
			dest: './server/dist/public/assets/css/',
			watch: './server/public/scss/**/*.scss'
		},

		lint: {
			src: ['./server/**/*.ts', '!./server/public/assets/js/**', '!./server/dist']
		}
	},

	client: {
		port: 3000,

		main: {
			src: './client/dist/index.html'
		},

		code: {
			main: './client/app/index.app.jsx',

			watch: [
				'./client/app/**/*.jsx',
				'./client/app/**/*.js',
				'!./client/app/**/*.spec.js'
			],

			extensions: [
				'.jsx',
				'.js'
			],

			presets: [
				"es2015",
				"react"
			],

			plugins: [
				'syntax-object-rest-spread',
				'transform-object-rest-spread'
			],

			outputName: 'app.js',

			dest: './client/dist/src/js',

			deps: [
				'react',
				'react-dom',
				'ui-router-react',
				'classnames',
				'react-redux',
				'redux-thunk',
				'redux-logger',
				'redux',
				'axios',
				'prop-types'
			],

			lint: {
				src: ['./client/app/**/*',
					'!client/app/constants.app.js',
					'!node_modules/**'
				]
			},
		},

		scss: {
			main: './client/scss/main.scss',
			outputStyle: 'compressed',
			dest: './client/dist/src/css',
			watch: './client/scss/**/*.scss',

			lint: {
				src: [
					'client/scss/**/*.scss',
					'!client/scss/partials/_reset.scss',
					'!client/scss/modules/_icons.scss',
					'!client/scss/modules/_bulma-variables.scss'
				],

				options: {
			    	rules: {
			    		indentation: {
			    			character: 'tab',
			    			width: '4'
			    		}
			    	}
			    }
			}
		},

		svgFont: {
			src: 'client/assets/icons/*.svg',
			dest: 'client/assets/fonts/',
			fontName: 'icons',
			path: './_icon-template.scss',
			targetPath: '../../scss/modules/_icons.scss',
			fontPath: './../fonts/'
		},

		copy: {
			index: {
				src: './client/index.html',
				dest: './client/dist'
			},

			js: {
				src: './client/assets/javascripts/**.js',
				dest: './client/dist/src/js'
			},

			css: {
				src: './client/assets/stylesheets/**.css',
				dest: './client/dist/src/css'
			},

			img: {
				src: './client/assets/images/**',
				dest: './client/dist/src/img'
			},

			fonts: {
				src: './client/assets/fonts/**',
				dest: './client/dist/src/fonts'
			}
		}
	},

	getUri: function(side) {
		return 'http://localhost:' + this[side].port;
	}
};

module.exports = config;
