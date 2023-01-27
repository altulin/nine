import pluginsObject from "./plugins.js";
import {
  paths,
  plugunsCssUsed,
  plugunsCss,
  mode,
  cssFileList,
} from "./variables.js";
import { getPlugunsList, makePlumber } from "./util.js";
import cleanTools from "./clean.js";

const { cleanCss } = cleanTools;

const {
  sourcemaps,
  concat,
  browsersync,
  sass,
  autoprefixer,
  rename,
  cleancss,
  gcmq,
  gulpif,
  stream,
  gulp: { src, dest },
} = pluginsObject;

const {
  project: { cssFile },
  made: { cssFolder },
} = paths;

const getStyleFile = () => {
  cleanCss();
  const merged = stream();
  // eslint-disable-next-line no-restricted-syntax
  for (const [index, val] of cssFileList.entries()) {
    merged.add(
      src(getPlugunsList(plugunsCss, plugunsCssUsed[index]))
        .pipe(makePlumber("style"))
        .pipe(gulpif(mode === `development`, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat(`${cssFile}${val}.css`))
        .pipe(gcmq())
        .pipe(
          autoprefixer({
            overrideBrowserslist: ["last 3 versions"],
            grid: true,
          })
        )
        .pipe(gulpif(mode === `development`, sourcemaps.write(".")))
        .pipe(dest(cssFolder))
        .pipe(
          gulpif(
            mode === `production`,
            cleancss({
              level: { 1: { specialComments: 0 } },
            })
          )
        )
        .pipe(gulpif(mode === `production`, rename(`${cssFile}${val}.min.css`)))
        .pipe(gulpif(mode === `production`, dest(cssFolder)))
        .pipe(gulpif(mode === `development`, browsersync.stream()))
    );
  }
  return merged;
};

// const getStyleFile = () => {
//   cleanCss();
//   return src(getPlugunsList(plugunsCss, plugunsCssUsed))
//     .pipe(makePlumber("style"))
//     .pipe(gulpif(mode === `development`, sourcemaps.init()))
//     .pipe(sass())
//     .pipe(concat(cssFile))
//     .pipe(gcmq())
//     .pipe(
//       autoprefixer({ overrideBrowserslist: ["last 3 versions"], grid: true })
//     )
//     .pipe(gulpif(mode === `development`, sourcemaps.write(".")))
//     .pipe(dest(cssFolder))
//     .pipe(
//       gulpif(
//         mode === `production`,
//         cleancss({
//           level: { 1: { specialComments: 0 } },
//         })
//       )
//     )
//     .pipe(gulpif(mode === `production`, rename(cssMinFile)))
//     .pipe(gulpif(mode === `production`, dest(cssFolder)))
//     .pipe(gulpif(mode === `development`, browsersync.stream()));
// };

export default getStyleFile;
