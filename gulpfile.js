const gulp = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const clean = require('gulp-clean')
const eslint = require('gulp-eslint')
const prettier = require('gulp-prettier')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const umd = require('gulp-umd')
const uglify = require('gulp-uglify')
const watch = require('gulp-watch')

const SOURCE_PATH = ['./src/**/*.js']

/* ==================== 清理相关 gulp 任务 ==================== */
const cleanDist = () => {
  return gulp.src('./dist/**/*.*').pipe(clean())
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

/* ==================== 编译 JavaScript 代码的 gulp 任务 ==================== */
const transpile = () => {
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

/* ==================== 检测源代码变更相关的 gulp 任务 ==================== */
const watchSource = () => {
  return watch(
    'src/**/*.js',
    {
      ignoreInitial: false
    },
    gulp.series(lint, transpile)
  )
}

const build = gulp.series(lint, check, cleanDist, transpile)
const test = gulp.series(lint, check)

module.exports.build = build
module.exports.lint = lint
module.exports.check = check
module.exports.test = test
module.exports.watch = watchSource
