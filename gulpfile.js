const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');
// clean
const del = require('del');
// less
const less = require('gulp-less');
// browserSync
const browserSync = require('browser-sync').create();

/**
 * clean
 */
const clean = () => {
    return del('build');
}
exports.clean = clean;

/**
 * copy
 */
const copy = () => {
    return src([
            'src/favicon.ico'
        ], {
            base: 'src'
        })
        .pipe(dest('build'));
}
exports.copy = copy;

const copy_css = () => {
    return src('src/css/*.css')
        .pipe(dest('build/css'));
}
exports.copy_css = copy_css;

/**
 * less
 */
const lessToCss = () => {
    return src('src/less/style.less')
        .pipe(less())
        .pipe(dest('build/css'))
        .pipe(browserSync.stream());
}
exports.lessToCss = lessToCss;

/**
 * html
 */
const htmlTo = () => {
    return src('src/*.html')
        .pipe(dest('build'))
        .pipe(browserSync.stream());
}
exports.htmlTo = htmlTo;

/**
 * browserSync
 */
const server = () => {
    browserSync.init({
        server: {
            baseDir: './build/'
        }
    });

    watch('src/less/**/*.less', lessToCss);
    watch('src/*.html', htmlTo);
    watch('src/css/*.css', copy_css);
}
exports.server = server;

/**
 * default
 */
exports.default = series(clean, parallel(copy, copy_css, lessToCss, htmlTo), server);
