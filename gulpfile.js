const { src, dest, watch, parallel, series } = require('gulp');

const scss          = require('gulp-sass')(require('sass'));
const htmlChunk     = require('gulp-file-include');
const concat        = require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const del           = require('del');
const browserSync   = require('browser-sync').create();


function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  });
}

function htmlInclude() {
  return src('app/html/*.html')
    .pipe(htmlChunk())
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js',
    'app/images/**/*.*'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/html/**/*.html'], htmlInclude);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
}


exports.htmlInclude   = htmlInclude;
exports.styles        = styles;
exports.scripts       = scripts;
exports.browsersync   = browsersync;
exports.watching      = watching;
exports.cleanDist     = cleanDist;

exports.build = series(cleanDist, build);

exports.default = parallel(htmlInclude, styles, scripts, browsersync, watching);