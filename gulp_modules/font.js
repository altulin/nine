import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const {
  ttf2woff,
  ttf2woff2,
  gulp: { src, dest },
} = pluginsObject;

const {
  dist: { fontsFolder },
} = paths;

const createTtf2woff = () => {
  return src(`${fontsFolder}*.ttf`).pipe(ttf2woff()).pipe(dest(fontsFolder));
};

const createTtf2woff2 = () => {
  return src(`${fontsFolder}*.ttf`).pipe(ttf2woff2()).pipe(dest(fontsFolder));
};

export default { createTtf2woff, createTtf2woff2 };
