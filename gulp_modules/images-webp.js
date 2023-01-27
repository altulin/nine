import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const {
  newer,
  webp,
  imagemin,
  optipng,
  mozjpeg,
  gulp: { src, dest },
} = pluginsObject;

const {
  project: { webpImg },
  made: { webpFolder, imgFolder },
} = paths;

const makeImages = () => {
  return src(webpImg)
    .pipe(newer(imgFolder))
    .pipe(
      imagemin([
        optipng({ optimizationLevel: 3 }),
        mozjpeg({ quality: 75, progressive: true }),
      ])
    )
    .pipe(dest(imgFolder));
};

const createWebp = () => {
  makeImages();
  return src(webpImg)
    .pipe(newer({ dest: webpFolder, ext: ".webp" }))
    .pipe(
      webp({
        quality: 100,
      })
    )
    .pipe(dest(webpFolder));
};

export default createWebp;
