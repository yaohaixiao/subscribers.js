const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const clean = require('gulp-clean')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const prettier = require('gulp-prettier')
const os = require('os')
const open = require('gulp-open')
const pug = require('gulp-pug')
const less = require('gulp-less')
const LessAutoPrefix = require('less-plugin-autoprefix')
const autoprefixer = new LessAutoPrefix({ browsers: ['last 2 versions'] })
const cssmin = require('gulp-cssmin')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const umd = require('gulp-umd')
const uglify = require('gulp-uglify')
const watch = require('gulp-watch')

const SOURCE_PATH = ['./src/**/*.js', './esm/**/*.js']

/* ==================== 清理相关 gulp 任务 ==================== */
const cleanDist = () => {
  return gulp.src('./dist/**/*.*').pipe(clean())
}

const cleanDocsHtml = () => {
  return gulp.src('./docs/**/index.html').pipe(clean())
}

const cleanDocsStyle = () => {
  return gulp.src('./docs/css/*.css').pipe(clean())
}

const cleanDocsScript = () => {
  return gulp.src('./docs/lib/*.js').pipe(clean())
}

const cleanDocs = gulp.parallel(cleanDocsHtml, cleanDocsStyle, cleanDocsScript)

/* ==================== 文档查看相关的 gulp 任务 ==================== */
const openDocs = () => {
  let browser
  if (os.platform() === 'darwin') {
    browser = os.platform() === 'linux' ? 'google-chrome' : 'google chrome'
  } else {
    if (os.platform() === 'win32') {
      browser = os.platform() === 'linux' ? 'google-chrome' : 'chrome'
    } else {
      browser = os.platform() === 'linux' ? 'google-chrome' : 'firefox'
    }
  }
  return gulp.src('docs/index.html').pipe(
    open({
      app: browser,
      uri: 'http://localhost:8290'
    })
  )
}

const connectDocs = () => {
  return connect.server({
    root: 'docs',
    port: 8290,
    livereload: true
  })
}

const reload = () => {
  return connect.reload()
}

/* ==================== 代码规范校验相关的 gulp 任务 ==================== */
const lint = () => {
  return gulp
    .src(SOURCE_PATH)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
}

const check = () => {
  return gulp.src(SOURCE_PATH).pipe(prettier.check({ editorconfig: true }))
}

/* ==================== 编译代码的 gulp 任务 ==================== */
const buildSourceScript = () => {
  return gulp
    .src('./src/subscribers.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(
      umd({
        exports: function () {
          return 'Subscribers'
        },
        namespace: function () {
          return 'Subscribers'
        }
      })
    )
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(
      sourcemaps.init({
        loadMaps: true
      })
    )
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
}

const buildDocsScript = () => {
  return gulp
    .src(['./dist/subscribers.min.js', './api/js/scroll.js'])
    .pipe(concat('docs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/js'))
}

const buildPug = () => {
  return gulp
    .src('api/pug/index.pug')
    .pipe(
      pug({
        verbose: true
      })
    )
    .pipe(gulp.dest('docs'))
}

const buildStyle = () => {
  return gulp
    .src('./api/less/docs.less')
    .pipe(sourcemaps.init())
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
        plugins: [autoprefixer]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs/css'))
}

const minifyStyle = () => {
  return gulp
    .src('./docs/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./docs'))
}

const buildDocs = gulp.series(
  buildStyle,
  minifyStyle,
  buildSourceScript,
  buildDocsScript,
  buildPug
)

/* ==================== 检测源代码变更相关的 gulp 任务 ==================== */
const watchSource = () => {
  return watch(
    'src/**/*.js',
    {
      ignoreInitial: false
    },
    gulp.series(test, buildSourceScript)
  )
}

const watchDocs = () => {
  return watch('./docs/**/*.*').pipe(reload())
}

const watchAll = gulp.parallel(watchSource, watchDocs)
const test = gulp.series(lint, check)
const build = gulp.series(test, cleanDist, buildSourceScript)
const docs = gulp.series(cleanDocs, buildDocs)
const start = gulp.series(test, docs, connectDocs, openDocs)

module.exports.start = start
module.exports.docs = docs
module.exports.build = build
module.exports.lint = lint
module.exports.check = check
module.exports.test = test
module.exports.watch = watchAll
