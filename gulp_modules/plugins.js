import gulp from "gulp";
import newer from "gulp-newer";
import imagemin, { svgo, optipng, mozjpeg } from "gulp-imagemin";
import { deleteAsync } from "del";
import svgmin from "gulp-svgmin";
import cheerio from "gulp-cheerio";
import replace from "gulp-replace";
import rename from "gulp-rename";
import svgstore from "gulp-svgstore";
import sourcemaps from "gulp-sourcemaps";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import concat from "gulp-concat";
import browsersync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import cleancss from "gulp-clean-css";
import gcmq from "gulp-group-css-media-queries";
import uglify from "gulp-uglify-es";
import minimist from "minimist";
import gulpif from "gulp-if";
import webpackStream from "webpack-stream";
import webp from "gulp-webp";
import pug from "gulp-pug";
import prettify from "gulp-html-prettify";
import babel from "gulp-babel";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import zip from "gulp-zip";
import stream from "merge-stream";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import favicons from "gulp-favicons";

const sass = gulpSass(dartSass);

const pluginsObject = {
  gulp,
  newer,
  imagemin,
  svgo,
  optipng,
  mozjpeg,
  deleteAsync,
  svgmin,
  cheerio,
  replace,
  rename,
  svgstore,
  sourcemaps,
  sass,
  concat,
  browsersync,
  autoprefixer,
  cleancss,
  gcmq,
  uglify,
  minimist,
  gulpif,
  webpackStream,
  webp,
  pug,
  prettify,
  babel,
  plumber,
  notify,
  zip,
  stream,
  ttf2woff,
  ttf2woff2,
  favicons,
};

export default pluginsObject;
