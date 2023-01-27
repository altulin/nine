import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const {
  imagemin,
  svgo,
  newer,
  gulp: { src, dest },
} = pluginsObject;

const {
  project: { vectorImg },
  made: { svgFolder },
} = paths;

const makeImagesSvg = () => {
  return src(vectorImg)
    .pipe(newer(svgFolder))
    .pipe(
      imagemin([
        svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(svgFolder));
};

export default makeImagesSvg;
