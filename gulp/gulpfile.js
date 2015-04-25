var gulp = require('gulp');
var fs = require('fs');

var concat = require('gulp-concat');
var compass = require('gulp-compass');
var typescript = require('gulp-typescript');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var plumber = require('gulp-plumber');


var BUILD_DIR = '../build/';
var SRC_DIR = '../src/main/';


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
	del([BUILD_DIR + 'js/*.js'], {force : true});
	del([BUILD_DIR + 'css/*.css'], {force : true});
	del([BUILD_DIR + 'site/**/*'], {force : true});
	del([BUILD_DIR + 'lib/**/*'], {force : true});
});

gulp.task('copy-php', function(){
	// cleanと並列実行していると失敗するみたいだ
	setTimeout(function(){
		gulp.src([SRC_DIR + 'index.php', SRC_DIR + '.htaccess', SRC_DIR + 'site/**/*'], {base : SRC_DIR})
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
	return gulp.src(['../src/main/ts/**/*'])
		.pipe(typescript({ target : 'ES5', removeComments: true, noExternalResolve: true}))
		.js
		.pipe(uglify())
		.pipe(gulp.dest(BUILD_DIR + 'js/'));
});
gulp.task('compass-compile', function(){
	return gulp.src([SRC_DIR + 'sass/**/*'])
		.pipe(plumber({errorHandler: function(e){console.log(e.toString());}}))
		.pipe(compass({
			comments: false,
			css: BUILD_DIR +'css/',
			sass: SRC_DIR +'scss/',
			image: BUILD_DIR +'images/'
		}))
		.pipe(minifyCss())
		.pipe(gulp.dest(BUILD_DIR + 'css/'));
});


gulp.task('compile-all', ['initdir', 'clean', 'copy-lib', 'copy-php', 'typescript-compile', 'compass-compile']);
