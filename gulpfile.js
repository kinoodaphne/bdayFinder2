const {
    src,
    dest,
    watch,
    parallel
} = require('gulp');
const sass = require('gulp-sass');

const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

function sass2css(){
    return src("./public/stylesheets/scss/style.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest("./public/dist/css/"))
        .pipe(browserSync.stream());
}

function useNodemon() {
    nodemon({
        script: './bin/www',
        ext: "pug js",
        env: { 'NODE_ENV': 'default' }
    });
}

function doBrowserSync() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        port: 3000
    });
}

watch("./public/stylesheets/scss/*.scss", parallel(sass2css));

module.exports.default = parallel(sass2css, doBrowserSync);