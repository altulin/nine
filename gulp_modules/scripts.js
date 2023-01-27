import pluginsObject from "./plugins.js";
import {
  paths,
  plugunsJsUsed,
  plugunsJs,
  mode,
  assemblyWebpack,
  assemblyBabel,
} from "./variables.js";
import { getPlugunsList, makePlumber } from "./util.js";
import getConfig from "./webpack.config.js";

const uglify = pluginsObject.uglify.default;

const {
  project: { entryJs, jsFile, jsMinFile },
  made: { jsFolder },
} = paths;

const {
  browsersync,
  webpackStream,
  rename,
  gulpif,
  concat,
  sourcemaps,
  babel,
  gulp: { src, dest },
} = pluginsObject;

const notMin = false;
// const min = !notMin;

const getOptions = (val) => {
  return {
    // compress: false,
    // mangle: false, // замена имен
    output: {
      beautify: val,
      indent_level: 2,
      braces: true,
    },
  };
};

// webpack
const makeWebpack = () => {
  return src(entryJs)
    .pipe(makePlumber("script"))
    .pipe(webpackStream(getConfig(notMin)))
    .pipe(uglify(getOptions(true)))
    .pipe(rename(jsFile)) // переименуем в script.js
    .pipe(dest(jsFolder))
    .pipe(gulpif(mode === `production`, webpackStream(getConfig(notMin))))
    .pipe(gulpif(mode === `production`, uglify(getOptions(false))))
    .pipe(gulpif(mode === `production`, rename(jsMinFile)))
    .pipe(gulpif(mode === `production`, dest(jsFolder)))
    .pipe(gulpif(mode === `development`, browsersync.stream()));
};

// без webpack
const makeVanillaJs = () => {
  return src(getPlugunsList(plugunsJs, plugunsJsUsed))
    .pipe(makePlumber("script"))
    .pipe(gulpif(mode === `development`, sourcemaps.init()))
    .pipe(concat(jsFile))
    .pipe(
      gulpif(
        assemblyBabel,
        babel({
          presets: ["@babel/preset-env"],
        })
      )
    )
    .pipe(gulpif(mode === `development`, sourcemaps.write(".")))
    .pipe(dest(jsFolder))
    .pipe(gulpif(mode === `production`, rename(jsMinFile)))
    .pipe(gulpif(mode === `production`, uglify()))
    .pipe(gulpif(mode === `production`, dest(jsFolder)))
    .pipe(gulpif(mode === `development`, browsersync.stream()));
};

const getScriptFile = () => {
  return assemblyWebpack ? makeWebpack() : makeVanillaJs();
};

export default getScriptFile;
