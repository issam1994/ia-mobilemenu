const { parallel, series, watch, src, dest } = require("gulp");
const babel = require("gulp-babel");
const postcss = require("gulp-postcss");
const minifyJs = require("gulp-uglify");
const minifyCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const del = require("del");
const browserSync = require("browser-sync").create();

function launchServer(done) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 5000,
  });
  return done();
}
function reloadBrowser(done) {
  browserSync.reload();
  return done();
}
function handleCss() {
  return (
    src(`./src/css/*.css`)
      .pipe(
        postcss([
          require("postcss-import")({ root: "./src/css *" }),
          require("tailwindcss/nesting")(require("postcss-nesting")),
          require("tailwindcss"),
          require("autoprefixer"),
        ])
      )
      .pipe(minifyCss({ compatibility: "ie8" }))
      .pipe(dest("./dist/css"))
  );
}
function handleJs() {
  return (
    src("./src/js/*.js")
      .pipe(
        babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(minifyJs())
      .pipe(rename({extname: ".min.js"}))
      .pipe(dest("./dist/js"))
  );
}
function clean() {
  return del("./dist");
}
function watchFiles(done) {
  watch("./src/css/**/*.css", series(handleCss, reloadBrowser));
  watch("./src/js/**/*.js", series(handleJs, reloadBrowser));
  watch("./*.html", series(handleCss, reloadBrowser));
  done();
}

exports.default = series(
  clean,
  parallel(handleCss, handleJs),
  launchServer,
  watchFiles
);
