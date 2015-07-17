// モジュールのロード
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

// ディレクトリパス取得
// Note: gulp-compass実行パスとプロジェクトのルートディレクトリを別にすると、
//       ファイル名をフルパスにしないとうまく動かない。
var BUILD_DIR = path.resolve('../build') + '/';
var SRC_DIR = path.resolve('../src/main') + '/';



//
// タスク定義
//

// ビルドディレクトリ初期化
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
	if(!fs.existsSync(BUILD_DIR + 'site/logs')){
		fs.mkdir(BUILD_DIR + 'site/logs');
	}
});

gulp.task('clean-php', ['initdir'], function(cb){
	del(
		[
			BUILD_DIR + 'site/app/**/*',
			BUILD_DIR + 'site/configs/**/',
			BUILD_DIR + 'site/data/**/*',
			BUILD_DIR + 'site/library/**/*',
		], {force : true},
		cb);
});
gulp.task('clean-lib', ['initdir'], function(cb){
	del(
		[
			BUILD_DIR + 'lib/**/*'
		], {force : true},
		cb);
});
gulp.task('clean-webcontent', ['initdir'], function(cb){
	del(
		[
			SRC_DIR + 'css/**/*',
			SRC_DIR + 'js/**/*',
			BUILD_DIR + 'js/*.js',
			BUILD_DIR + 'css/*.css',
		], {force : true},
		cb);
});

// 前回ビルド結果削除
gulp.task('clean', ['clean-php', 'clean-lib', 'clean-webcontent']);

// PHPファイルコピー
gulp.task('copy-php',['clean-php'], function(){
		gulp.src(
				[
					SRC_DIR + 'index.php',
					SRC_DIR + '.htaccess',
					SRC_DIR + 'curry/**/*',
					SRC_DIR + 'curry/.htaccess', // 何故無視されるんだ。。
					SRC_DIR + 'site/app/**/*',
					SRC_DIR + 'site/.htaccess',
					SRC_DIR + 'site/configs/**/*',
					SRC_DIR + 'site/data/**/*',
					SRC_DIR + 'site/library/**/*',
				],
				 {base : SRC_DIR})
			.pipe(gulp.dest(BUILD_DIR))
});

// ライブラリコピー
gulp.task('copy-lib',['clean-lib'], function(){
	gulp.src([SRC_DIR + 'lib/**/*'], {base : SRC_DIR})
		.pipe(gulp.dest(BUILD_DIR));
});

// Typescriptコンパイル
gulp.task('typescript-compile', function(){
	return gulp.src([SRC_DIR + 'ts/**/*.ts'])
		.pipe(typescript({ target : 'ES5', removeComments: true, noExternalResolve: true, module: 'amd'}))
		.js
		.pipe(gulp.dest(SRC_DIR + 'js/'))
		.on('end', function(){
			// main/js/impl以下のファイルだけ圧縮してbuildへコピー
			gulp.src([SRC_DIR + 'js/impl/**/*.js'])
				.pipe(uglify())
				.pipe(gulp.dest(BUILD_DIR + 'js/'));
		});
});

// Compassコピー
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

// 全コンパイル
gulp.task('compile-all', ['initdir', 'clean', 'copy-lib', 'copy-php', 'typescript-compile', 'compass-compile']);

// コマンドラインで常駐させて、変更があったscssのみ再コンパイル
gulp.task('watch-compass', function(){
	gulp.watch(SRC_DIR + 'sass/*.scss', ['compass-compile']);
});

//・typescriptの<reference>参照は、gulp.srcにて指定したもののみが含まれるらしい（ドはまり）
//・watchのパスは、差分があったファイルのみだけgulp.srcに入力される。
//gulp.task('watch-typescript', function(){
//	gulp.watch(SRC_DIR + 'ts/**/*.ts', ['typescript-compile']);
//});