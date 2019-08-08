const {
    src,
    dest,
    watch,
    parallel
} = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
var reload = browserSync.reload;
const nodemon = require('gulp-nodemon');

function sass2css(){
    return src("./public/stylesheets/scss/style.scss")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(dest("./public/dist/css/"))
        .pipe(reload({stream:true}));
}

function serve() {
  return nodemon({
    script: './bin/www',
  })
  .on('restart', function(){
    console.log('restarted');
  })
}

function useNodemon() {
    return nodemon({
        script: './bin/www',
        ext: "pug js",
        env: { 'NODE_ENV': 'development' }
    });
}

function doBrowserSync() {
    return browserSync.init(null, {
        proxy: 'http://localhost:3000',
        port: 3000
    });
}

watch("./public/stylesheets/scss/*.scss", parallel(sass2css));

module.exports.default = parallel(sass2css);