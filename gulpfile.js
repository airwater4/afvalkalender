const { src, dest, series, watch } = require('gulp')
const terser = require('gulp-terser')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const inlinesource = require('gulp-inline-source')
const appendFileContentHash = require('gulp-rev')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const clean = require('del')

const SRC_FOLDER = 'frontend'
const SRC_ICO_FOLDER = `${SRC_FOLDER}/ico`
const SRC_JS_FOLDER = `${SRC_FOLDER}/js`
const SRC_CSS_FOLDER = `${SRC_FOLDER}/css`

const DEST_FOLDER = 'views'
const DEST_ICO_FOLDER = `${DEST_FOLDER}/ico`
const DEST_JS_FOLDER = `${DEST_FOLDER}/js`
const DEST_CSS_FOLDER = `${DEST_FOLDER}/css`

function cleanBuildFolder() {
  return clean(`${DEST_FOLDER}/**/*`)
}

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

function minifyCSS() {
  return src(`${SRC_CSS_FOLDER}/*.css`)
    .pipe(cleanCSS())
    .pipe(autoprefixer())
    .pipe(dest(DEST_CSS_FOLDER))
}

function processServiceWorker() {
  const minifiedServiceWorkerContent = src(`${SRC_FOLDER}/sw.js`).pipe(terser())
  return bumpServiceWorkerCacheVersion(minifiedServiceWorkerContent).pipe(
    dest(DEST_FOLDER)
  )
}

function bumpServiceWorkerCacheVersion(stream) {
  return stream
    .pipe(appendFileContentHash())
    .pipe(
      rename(function(path) {
        const [basename, contentHash] = path.basename.split('-')
        if (contentHash) {
          path.basename = contentHash
        }
      })
    )
    .pipe(
      replace(/afvalkalender-cache-hash/, function() {
        const contentHash = this.file.stem
        const cacheVersion = `afvalkalender-cache-${contentHash}`

        console.info('### cacheVersion: ', cacheVersion)

        return cacheVersion
      })
    )
    .pipe(rename('sw.js'))
}

const build = series(
  cleanBuildFolder,
  minifyJS,
  minifyCSS,
  processServiceWorker,
  copyIcons,
  copyHtml
)

module.exports = {
  default: build,
  watch: function() {
    watch(`${SRC_JS_FOLDER}/*.js`, minifyJS)
    watch(`${SRC_CSS_FOLDER}/*.css`, minifyCSS)
    watch(`${SRC_FOLDER}/sw.js`, processServiceWorker)
    watch(`${SRC_ICO_FOLDER}/*.png`, copyIcons)
    watch(`${SRC_FOLDER}/*.html`, copyHtml)
  }
}
