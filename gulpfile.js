var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    //browserify = require('gulp-browserify'),
    reload = browserSync.reload,
    ASSETS_DIR = './assets',
    SRC_DIR = './src';

/**
 * Compiles sass, browser prefixes relevant css and writes to css directory.
 * Reloads the browser sync if in use.
 *
 * @method stylesTask
 * @return {Object} The gulp stream of task
 */
function stylesTask() {
    return gulp.src(SRC_DIR + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(ASSETS_DIR + '/css'))
        .pipe(reload({
            stream: true
        }));
}

/**
 * Compiles sass, browser prefixes relevant css and writes to css directory.
 * Reloads the browser sync if in use.
 *
 * @method stylesTask
 * @return {Object} The gulp stream of task
 */
function scriptsTask() {
    return gulp.src(SRC_DIR + '/js/**/*.js')
        //.pipe(browserify())
        .pipe(gulp.dest(ASSETS_DIR + '/js'))
        .pipe(reload({
            stream: true
        }));
}

/**
 * Starts a basic http server and serves the files.
 * On file changes reloads open browser pages
 *
 * @method serveExamplesTask
 */
function serveExamplesTask() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['./']
        }
    });

    // Reload when example files change
    gulp.watch([
        SRC_DIR + '/**/*.{js,html,css}'
    ]).on('change', reload);

    // Watch src files and stream changes to dist dir and reload browser
    gulp.watch(SRC_DIR + '/scss/*.scss', ['styles']);
}

// Set gulp tasks
gulp.task('scripts', scriptsTask);
gulp.task('styles', stylesTask);
gulp.task('serve', ['scripts', 'styles'], serveExamplesTask);
gulp.task('default', ['serve']);
