var gulp = require('gulp');
var fs = require('fs');

var path = require('path');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');


var BUILD_DIR = path.resolve('../build') + '/';
var SRC_DIR = path.resolve('../src/main') + '/';


gulp.task('initdir', function(){
	if(!fs.existsSync(BUILD_DIR + 'js')){
		fs.mkdir(BUILD_DIR + 'js');
	}
	if(!fs.existsSync(BUILD_DIR + 'css')){
		fs.mkdir(BUILD_DIR + 'css');
	}
	if(!fs.existsSync(BUILD_DIR + 'lib')){
		fs.mkdir(BUILD_DIR + 'lib');
	}
	if(!fs.existsSync(BUILD_DIR + 'images')){
		fs.mkdir(BUILD_DIR + 'images');
	}
	if(!fs.existsSync(BUILD_DIR + 'site')){
		fs.mkdir(BUILD_DIR + 'site');
	}
});

gulp.task('clean', function(cb){
	del(
		[
			BUILD_DIR + 'js/*.js',
			BUILD_DIR + 'css/*.css',
			BUILD_DIR + 'site/app/**/*',
			BUILD_DIR + 'site/config/**/*',
			BUILD_DIR + 'site/data/**/*',
			BUILD_DIR + 'site/library/**/*',
			BUILD_DIR + 'lib/**/*'
		], {force : true});
});

gulp.task('copy-php', function(){
	// cleanと並列実行していると失敗するみたいだ
	setTimeout(function(){
		gulp.src(
				[
					SRC_DIR + 'index.php',
					SRC_DIR + '.htaccess',
					SRC_DIR + 'site/app/**/*',
					SRC_DIR + 'curry/**/*',
					SRC_DIR + 'site/config/**/*',
					SRC_DIR + 'site/data/**/*',
					SRC_DIR + 'site/library/**/*'
				],
				 {base : SRC_DIR})
			.pipe(gulp.dest(BUILD_DIR));
	}, 100);
});
gulp.task('copy-lib',function(){
	// cleanと並列実行していると失敗するみたいだ
	setTimeout(function(){
		gulp.src([SRC_DIR + 'lib/**/*'], {base : SRC_DIR})
			.pipe(gulp.dest(BUILD_DIR));
	}, 100);
});

gulp.task('typescript-compile', function(){
	return gulp.src([SRC_DIR + 'ts/**/*'])
		.pipe(typescript({ target : 'ES5', removeComments: true, noExternalResolve: true}))
		.js
		.pipe(uglify())
		.pipe(gulp.dest(BUILD_DIR + 'js/'));
});
gulp.task('compass-compile', function(){
	return gulp.src([SRC_DIR + 'sass/*.scss'])
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(compass({
			comments: false,
			project: SRC_DIR,
			css: 'css',
			scss: SRC_DIR + 'sass',
			image: SRC_DIR + 'sass/images'
		}))
		.pipe(minifyCss())
		.pipe(gulp.dest(BUILD_DIR + 'css/'));
});


gulp.task('compile-all', ['initdir', 'clean', 'copy-lib', 'copy-php', 'typescript-compile', 'compass-compile']);

gulp.task('watch-typescript', function(){
	gulp.watch(SRC_DIR + 'ts/**/*.ts', ['typescript-compile']);
});

gulp.task('watch-compass', function(){
	gulp.watch(SRC_DIR + 'sass/**/*.scss', ['compass-compile']);
});