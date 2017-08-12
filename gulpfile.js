var del = require('del');
var gulp = require('gulp');
var argv = require('yargs').argv;
var clean = require('gulp-clean');
var gulpUtil = require('gulp-util');
var browserSync = require('browser-sync');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

/**
 * Using different folders/file names? Change these constants:
 */
var PHASER_PATH = './node_modules/phaser-ce/build/';
var BUILD_PATH = './build/';
var SCRIPTS_PATH = BUILD_PATH + 'scripts/';
var SOURCE_PATH = './src/';
var STATIC_PATH = './static/';
var ENTRY_FILE = SOURCE_PATH + 'index.ts';
var OUTPUT_FILE = 'game.js';

var keepFiles = false;

/**
 * Simple way to check for development/production mode.
 */
function isProduction() {
    return argv.production;
}

/**
 * Logs the current build mode on the console.
 */
function logBuildMode() {
    if (isProduction()) {
        gulpUtil.log(gulpUtil.colors.green('Running production build...'));
    } else {
        gulpUtil.log(gulpUtil.colors.yellow('Running development build...'));
    }
}

/**
 * Deletes all content inside the './build' folder.
 * If 'keepFiles' is true, no files will be deleted. This is a dirty workaround since we can't have
 * optional task dependencies :(
 * Note: keepFiles is set to true by gulp.watch (see serve()) and reseted here to avoid conflicts.
 */
function cleanBuild() {
    if (!keepFiles) {
        return gulp.src(BUILD_PATH, {read: false})
            .pipe(clean());
    } else {
        keepFiles = false;
    }
}


/**
 * Copies the content of the './static' folder into the '/build' folder.
 * Check out README.md for more info on the '/static' folder.
 */
function copyStatic() {
    return gulp.src(STATIC_PATH + '**/*')
        .pipe(gulp.dest(BUILD_PATH));
}

/**
 * Copies required Phaser files from the './node_modules/phaser-ce' folder into the './build/scripts' folder.
 * This way you can call 'npm update', get the lastest Phaser version and use it on your project with ease.
 */
function copyPhaser() {
    var srcList = ['phaser.min.js'];

    if (!isProduction()) {
        srcList.push('phaser.map', 'phaser.js');
    }

    srcList = srcList.map(function(file) {
        return PHASER_PATH + file;
    });

    return gulp.src(srcList)
        .pipe(gulp.dest(SCRIPTS_PATH));
}

/**
 *
 */
function compileSrc() {
    if (!isProduction()) {
        return browserify({
            basedir: '.',
            debug: true,
            entries: [ENTRY_FILE],
            cache: {},
            packageCache: {}
        })
            .plugin(tsify)
            .bundle()
            .pipe(source(OUTPUT_FILE))
            .pipe(gulp.dest(SCRIPTS_PATH));
    }
    else {
        return browserify({
            basedir: '.',
            debug: true,
            entries: [ENTRY_FILE],
            cache: {},
            packageCache: {}
        })
            .plugin(tsify)
            .bundle()
            .pipe(source(OUTPUT_FILE))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(SCRIPTS_PATH));
    }
}

/**
 * Starts the BrowserSync server.
 * Watches for file changes in the 'src' folder.
 */
function serve() {
    var options = {
        server: {
            baseDir: BUILD_PATH
        },
        open: false // Change it to true if you wish to allow Browsersync to open a browser window.
    };

    browserSync(options);

    // Watches for changes in files inside the './src' folder.
    gulp.watch(SOURCE_PATH + '**/*.ts', ['watch-ts']);

    // Watches for changes in files inside the './static' folder. Also sets 'keepFiles' to true (see cleanBuild()).
    gulp.watch(STATIC_PATH + '**/*', ['watch-static']).on('change', function() {
        keepFiles = true;
    });
}

gulp.task('cleanBuild', cleanBuild);
gulp.task('copyStatic', ['cleanBuild'], copyStatic);
gulp.task('copyPhaser', ['cleanBuild'], copyPhaser);
gulp.task('compileSrc', ['cleanBuild'], compileSrc);
gulp.task('build', ['cleanBuild','copyStatic','copyPhaser','compileSrc']);
gulp.task('fastBuild', compileSrc);
gulp.task('serve', ['build'], serve);
gulp.task('watch-ts', ['fastBuild'], browserSync.reload);
gulp.task('watch-static', ['copyStatic'], browserSync.reload);

/**
 * The tasks are executed in the following order:
 * 'cleanBuild' -> 'copyStatic' -> 'copyPhaser' -> 'build' -> 'serve'
 *
 * Read more about task dependencies in Gulp:
 * https://medium.com/@dave_lunny/task-dependencies-in-gulp-b885c1ab48f0
 */
gulp.task('default', ['serve']);
