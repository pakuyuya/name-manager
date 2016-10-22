"use strict";

const debug = false;

// モジュールのロード
var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var foreach = require('gulp-foreach');
var rename = require('gulp-rename');
var del = require('del');

var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var compass = require('gulp-compass');
var minifyCss = require('gulp-minify-css');

var typescript = require('gulp-tsc');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

var espower = require('gulp-espower');

var mocha = require('gulp-mocha');

// clean-全コンパイル
gulp.task('build', ['initdir', 'clean', 'copy-lib', 'copy-php', 'copy-html', 'compile-typescript', 'compile-compass']);

// ディレクトリパス取得
// Note: gulp-compass実行パスとプロジェクトのルートディレクトリを別にする場合、
//       ファイル名をフルパスに変換して渡す必要あり。
var BUILD_DIR = path.resolve('../build') + '/';
var SRC_DIR = path.resolve('../src/main') + '/';

//
// タスク定義
//

// ビルドディレクトリ初期化
gulp.task('initdir', function(){

    function securePath(path) {
        if (!fs.existsSync(path)) {
            fs.mkdir(path);
        }
    }

    for (const path of [
        BUILD_DIR,
        BUILD_DIR + 'js',
        BUILD_DIR + 'css',
        BUILD_DIR + 'html',
        BUILD_DIR + 'lib',
        BUILD_DIR + 'images',
        BUILD_DIR + 'site',
        BUILD_DIR + 'site/logs',
    ]) {
        securePath(path);
    }
});

gulp.task('clean-php', ['initdir'], function(cb) {
    del(
        [
            BUILD_DIR + 'site/app/**/*',
            BUILD_DIR + 'site/configs/**/',
            BUILD_DIR + 'site/data/**/*',
            BUILD_DIR + 'site/library/**/*',
        ], {force: true},
        cb);
});
gulp.task('clean-lib', ['initdir'], function(cb) {
    del(
        [
            BUILD_DIR + 'lib/**/*'
        ], {force: true},
        cb);
});
gulp.task('clean-webcontent', ['initdir'], function(cb){
    del(
        [
            SRC_DIR + 'css/**/*',
            SRC_DIR + 'js/**/*',
            BUILD_DIR + 'js/*',
            BUILD_DIR + 'css/*',
        ], {force : true},
        cb);
});
gulp.task('clean-html', ['initdir'], function(cb){
    del(
        [
            BUILD_DIR + 'html/**/*',
        ], {force : true},
        cb);
});

// 前回ビルド結果削除
gulp.task('clean', ['clean-php', 'clean-lib', 'clean-webcontent', 'clean-html']);

// PHPファイルコピー
gulp.task('copy-php',['clean-php'], function() {
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
        {base: SRC_DIR})
        .pipe(gulp.dest(BUILD_DIR));
});

// HTMLファイルコピー
gulp.task('copy-html', ['clean-html'], function() {
    gulp.src(
        [
            SRC_DIR + 'html/**/*',
        ],
        {base: SRC_DIR})
        .pipe(gulp.dest(BUILD_DIR));
});

// ライブラリコピー
gulp.task('copy-lib',['clean-lib'], function(){
    gulp.src([SRC_DIR + 'lib/**/*'], {base : SRC_DIR})
        .pipe(gulp.dest(BUILD_DIR));
});

// Typescriptコンパイル
gulp.task('compile-typescript', function(){
    return gulp.src([SRC_DIR + 'ts/**/*.ts'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(typescript({
            target : 'ES5',
            removeComments: false,
            noExternalResolve: true,
            module: 'commonjs',
            allowUnreachableCode: true,
        }))
        .pipe(gulp.dest(SRC_DIR + 'js'))
        .on('end', function(){
            // js/app/app以下のファイルだけbrowserifyと圧縮してbuildへコピー
            gulp.src([SRC_DIR + 'js/app/app/*.js'])
                .pipe(foreach(function(stream, f){
                    var filename = f.path.substr((SRC_DIR + 'js/app/app/').length);
                    return browserify({ entries: [f.path]})
                        .bundle()
                        .pipe(source(filename))
                        .pipe(buffer())
                        .pipe(debug ? gutil.noop() : uglify())
                        .pipe(gulp.dest(BUILD_DIR + 'js'));
                }))
        });
});

// Compassコピー
gulp.task('compile-compass', function(){
    return gulp.src([SRC_DIR + 'sass/*.scss'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(compass({
            config_file: SRC_DIR + 'sass/config.rb',
            comments: false,
            project: SRC_DIR,
            css: 'css',
            scss: SRC_DIR + 'sass',
            image: SRC_DIR + 'sass/images'
        }))
        .pipe(debug ? gulp.noop() : minifyCss())
        .pipe(gulp.dest(BUILD_DIR + 'css/'));
});

// コマンドラインで常駐させて、変更があったscssのみ再コンパイル
gulp.task('watch-compass', function(){
	gulp.watch(SRC_DIR + 'sass/**/*.scss', ['compile-compass']);
});

gulp.task('watch-typescript', function(){
    gulp.watch(SRC_DIR + 'ts/**/*.ts', ['compile-typescript']);
});

gulp.task('watch-php-app', function() {
    gulp.watch(SRC_DIR + 'site/app/**/*', function(){ runSequence('clean-php', 'copy-php') });
});

gulp.task('watch-html', function() {
    gulp.watch(SRC_DIR + 'html/**/*', ['copy-html'] );
});

gulp.task('generate-test-rest', function() {
    return gulp
        .src('../test-rest/**/*.js', {base: '../test-rest'})
        .pipe(espower())
        .pipe(gulp.dest('powered-test-rest'));
});

gulp.task("test-rest", ["generate-test-rest"], function() {
  gulp.src("powered-test-rest/**/*.js")
      .pipe(mocha());
});
