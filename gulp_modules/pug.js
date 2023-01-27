import pluginsObject from "./plugins.js";
import { paths, mode } from "./variables.js";
import { makePlumber } from "./util.js";

const {
  pug,
  prettify,
  browsersync,
  gulpif,
  gulp: { src, dest },
} = pluginsObject;

const {
  srcFolder,
  project: { pugFiles },
} = paths;

const transformPug = () => {
  return src(pugFiles)
    .pipe(makePlumber("pug"))
    .pipe(pug({ pretty: true }))
    .pipe(prettify({ indent_char: "", indent_size: 2 }))
    .pipe(dest(srcFolder))
    .pipe(gulpif(mode === `development`, browsersync.stream()));
};

export default transformPug;
