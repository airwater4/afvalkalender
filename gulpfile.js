const { src, dest, series } = require('gulp')
const terser = require('gulp-terser')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const inlinesource = require('gulp-inline-source')

const SRC_FOLDER = 'frontend'
const SRC_ICO_FOLDER = `${SRC_FOLDER}/ico`
const SRC_JS_FOLDER = `${SRC_FOLDER}/js`
const SRC_CSS_FOLDER = `${SRC_FOLDER}/css`

const DEST_FOLDER = 'views'
const DEST_ICO_FOLDER = `${DEST_FOLDER}/ico`
const DEST_JS_FOLDER = `${DEST_FOLDER}/js`
const DEST_CSS_FOLDER = `${DEST_FOLDER}/css`

function copyHtml() {
  return src(`${SRC_FOLDER}/*.html`)
    .pipe(
      inlinesource({
        compress: true
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(DEST_FOLDER))
}

function copyIcons() {
  return src(`${SRC_ICO_FOLDER}/*.png`).pipe(dest(DEST_ICO_FOLDER))
}

function minifyJS() {
  return src(`${SRC_JS_FOLDER}/*.js`)
    .pipe(terser())
    .pipe(dest(DEST_JS_FOLDER))
}

function minifySW() {
  return src(`${SRC_FOLDER}/sw.js`)
    .pipe(terser())
    .pipe(dest(DEST_FOLDER))
}

function minifyCSS() {
  return src(`${SRC_CSS_FOLDER}/*.css`)
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(dest(DEST_CSS_FOLDER))
}

const build = series(copyIcons, minifyJS, minifySW, minifyCSS, copyHtml)

module.exports = {
  default: build,
  copyHtml
}
