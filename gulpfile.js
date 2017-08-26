var gulp = require('gulp'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer'),
	open = require('gulp-open'),
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	resolve = require('resolve'),
	iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	runSequence = require('run-sequence'),
	envify = require('gulp-envify'),
	eslint = require('gulp-eslint'),
	tslint = require('gulp-tslint'),
	sassLint = require('gulp-sass-lint'),
	ts = require('gulp-typescript'),
	nodemon = require('gulp-nodemon'),
	del = require('del'),
	argv = require('yargs').argv,
	gulpif = require('gulp-if'),
	lazypipe = require('lazypipe'),
	fs = require('fs'),
	gulpNSP = require('gulp-nsp'),
	config = require('./gulp.config'),
	configServer = config.server,
	configClient = config.client,
	isProd = !!argv.prod,
	currentEnv = argv.prod ? 'production' : argv.test ? 'test' : 'develop';

process.env.NODE_ENV = currentEnv;

// Client tasks
gulp.task('client-server', clientServerTask);
gulp.task('build-css', scssTask(configClient.scss.main, configClient.scss.dest));
gulp.task('build-app', appTask(configClient.code.main, configClient.code.dest));
gulp.task('build-vendor', vendorTask);
gulp.task('svg-font', svgFont());
gulp.task('copy', copyFiles);
gulp.task('reload', reload);
gulp.task('watch', watchClient);
gulp.task('build-constants', buildEnvVar);

// Server Tasks
gulp.task('build-server', buildServerTask());
gulp.task('build-server-css', scssTask(configServer.scss.main, configServer.scss.dest));
gulp.task('watch-server', watchServer);
gulp.task('run-server', runServer);

// Dev tasks
gulp.task('default', defaultTask);
gulp.task('client', clientTask);
gulp.task('server', serverTask);

// Lint tasks
gulp.task('eslint', eslintTask);
gulp.task('scsslint', scsslint);
gulp.task('tslint', tslintTask);

// NSP (check for vulnerabilities in npm modules)
gulp.task('nsp', nsp);

function defaultTask() {
	del(['server/dist', 'client/dist']).then(function() {
		runSequence(
			'build-constants',
			'build-server-css',
			'build-server',
			'build-vendor',
			'build-app',
			'svg-font',
			'copy',
			'build-css',
			'watch',
			'client-server',
			'run-server'
		);
	});
}

function clientTask() {
	del('client/dist').then(function() {
		runSequence(
			'build-constants',
			'build-vendor',
			'build-app',
			'svg-font',
			'copy',
			'build-css',
			'watch',
			'client-server'
		);
	});
}

function serverTask() {
	del('server/dist').then(function() {
		runSequence(
			'build-server-css',
			'build-server',
			'run-server',
			'watch-server'
		);
	});
}

function appTask(mainEntries, dest) {
	var packageJson = require('./package.json'),
		dependencies = Object.keys(packageJson && packageJson.dependencies || {});

	return lazypipe()
		.pipe(function() {
			return browserify({
			    entries: mainEntries,
				extensions: configClient.code.extensions,
				debug: !isProd
			})
			.external(dependencies)
			.transform(babelify, {presets: configClient.code.presets, plugins: configClient.code.plugins})
			.bundle()
			.on('error', console.error.bind(console));
		})
		.pipe(function() {
			return source(configClient.code.outputName);
		})
		.pipe(buffer)
		.pipe(function() {
			return sourcemaps.init({loadMaps: true});
		})
		.pipe(uglify)
		.pipe(function() {
			return sourcemaps.write('./');
		})
		.pipe(gulp.dest, dest)
		.pipe(connect.reload);
}

function scssTask(mainFile, dest) {
	return lazypipe()
		.pipe(gulp.src, mainFile)
		.pipe(function() {
			return gulpif(!isProd, sourcemaps.init());
		})
		.pipe(function() {
			return sass({outputStyle: configClient.scss.outputStyle}).on('error', sass.logError);
		})
		.pipe(autoprefixer)
		.pipe(function() {
			return gulpif(!isProd, sourcemaps.write('./'));
		})
		.pipe(gulp.dest, dest)
	    .pipe(connect.reload);
}

function clientServerTask() {
	connect.server({
		root: config.root,
		livereload: true,
		port: configClient.port
	});

	gulp.src(configClient.main.src).pipe(open({ uri: config.getUri('client') }));
}

function buildServerTask() {
	var tsProject = ts.createProject('tsconfig.json');

	return lazypipe()
		.pipe(gulp.src, configServer.code.src)
		.pipe(function() {
			return tsProject();
		})
		.pipe(function() {
			return gulpif(isProd, uglify());
		})
		.pipe(gulp.dest, configServer.code.dest);
}

function vendorTask() {
	var b = browserify({
		extensions: configClient.code.extensions,
	});

	var dependencies = configClient.code.deps;

	dependencies.forEach(function (id) {
		b.require(resolve.sync(id), { expose: id });
	});

	var stream = b
		.transform(envify({
			_: 'purge',
			NODE_ENV: isProd ? 'production' : 'develop'
		}))
		.bundle()
		.on('error', function(err){
			console.log(err.message);
			this.emit('end');
		})
		.pipe(source('vendor.js'))
		.pipe(buffer())
		.pipe(gulpif(isProd, uglify()));

	stream.pipe(gulp.dest(configClient.code.dest));

	return stream;
}

function runServer() {
	return nodemon({
		script: configServer.main.src,
		ext:    'ts tsx',
		ignore: ['./server/dist'],
		watch: ['./server'],
		tasks: ['build-server']
	});
}

function svgFont() {
	return lazypipe()
		.pipe(gulp.src, configClient.svgFont.src)
		.pipe(function() {
			return iconfontCss(configClient.svgFont);
		})
		.pipe(function() {
			return iconfont({
				fontName: configClient.svgFont.fontName,
				prependUnicode: true
			});
		})
		.pipe(gulp.dest, configClient.svgFont.dest);
}

function copyFiles() {
	var copy = configClient.copy;

	gulp.src(copy.index.src)
		.pipe(gulp.dest(copy.index.dest));

	gulp.src(copy.js.src)
		.pipe(gulp.dest(copy.js.dest));

	gulp.src(copy.css.src)
		.pipe(gulp.dest(copy.css.dest));

	gulp.src(copy.img.src)
		.pipe(imagemin())
		.pipe(gulp.dest(copy.img.dest));

	return gulp.src(copy.fonts.src)
		.pipe(gulp.dest(copy.fonts.dest));
}

function reload(){
	return gulp.src(configClient.main.src)
		.pipe(connect.reload());
}

function watchClient() {
	gulp.watch(configClient.scss.watch, { cwd:'./' }, ['build-css']);
	gulp.watch(configClient.code.watch, { cwd:'./' }, ['build-app']);
	gulp.watch(configClient.main.src, { cwd:'./' }, ['reload']);
}

function watchServer() {
	gulp.watch(configServer.scss.watch, { cwd:'./' }, ['build-server-css']);
}

function buildEnvVar() {
	var configEnv = config.env;

	var writeFile = function(config) {
		var env = require(config.fileRoot)[currentEnv],
			envStr = JSON.stringify(env),
			fileContent = 'const envVariables = ' + envStr + '; export default envVariables;',
			folder = __dirname + config.dest;
		
		fs.writeFile(folder, fileContent, function(err) {
			if (err) {
				return console.log(err);
			}
		});
	}

	// Write client env variables
	writeFile(configEnv['client']);

	// Write server env variables
	writeFile(configEnv['server']);
}

function scsslint() {
	return gulp.src(configClient.scss.lint.src)
	    .pipe(sassLint(configClient.scss.lint.options))
	    .pipe(sassLint.format())
	    .pipe(sassLint.failOnError());
}

function eslintTask() {
	return gulp.src(configClient.code.lint.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function tslintTask() {
    return gulp.src(configServer.lint.src)
        .pipe(tslint())
        .pipe(tslint.report());
}

function nsp(cb) {
	gulpNSP({package: __dirname + '/package.json'}, cb);
}