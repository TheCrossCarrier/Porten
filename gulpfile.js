import gulp from 'gulp'; const { src, dest, watch, series, parallel } = gulp
import del from 'del'
import include from 'gulp-file-include'
import htmlmin from 'gulp-htmlmin'
import autoPrefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat'
import pxtorem from 'gulp-pxtorem'
import replace from 'gulp-replace'
import csso from 'gulp-csso'
import uglify from 'gulp-uglify'
import imagemin from 'gulp-imagemin'
import { stream, init, reload, create } from 'browser-sync'

const html = () => src('src/**/*.html')
  .pipe(include())
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(dest('dist'))
  .pipe(stream())

const css = () => src([
  'src/css/preset.css',
  // 'src/css/variables.css',
  'src/css/fonts.css',
  'src/css/style.css',
  'src/css/media.css',
  'src/css/**/*.css'
])
  .pipe(concat('style.css'))
  .pipe(autoPrefixer())
  .pipe(pxtorem({
    rootValue: 16,
    unitPrecision: 4,
    propList: ['*']
  }))
  .pipe(replace(/Px|PX|pX/g, 'px'))
  .pipe(csso())
  .pipe(dest('dist/css'))
  .pipe(stream())

const js = () => src('src/js/**/*.js')
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(dest('dist/js'))
  .pipe(stream())

const img = () => src('src/img/**/*')
  .pipe(imagemin())
  .pipe(dest('dist/img'))
  .pipe(stream())

const fonts = () => src('src/fonts/**/*')
  .pipe(dest('dist/fonts'))
  .pipe(stream())

const serve = () => {
  create()
  init({
    server: {
      baseDir: 'dist'
    }
  })

  watch('src/**/*.html', html).on('change', reload)
  watch('src/css/**/*.css', css)
  watch('src/js/**/*.js', js)
  watch('src/img/**/*', img)
  watch('src/fonts/**/*', fonts)
}

export const clean = () => del('dist')

export const dev = series(
  clean,
  parallel(css, js, img, fonts, html),
  serve
)

export default dev

export const build = series(
  clean,
  parallel(css, js, img, fonts, html)
)