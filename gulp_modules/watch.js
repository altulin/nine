import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";
import makeImagesSvg from "./images-svg.js";
import makeImages from "./images.js";
import createSprite from "./sprite.js";
import getStyleFile from "./styles.js";
import getScriptFile from "./scripts.js";
import createWebp from "./images-webp.js";
import transformPug from "./pug.js";
import font from "./font.js";
import clean from "./clean.js";
import createFavicons, { delFavicons } from "./favicons.js";

const { cleanTtl } = clean;

const { createTtf2woff, createTtf2woff2 } = font;

const {
  gulp: { watch, series, parallel },
} = pluginsObject;

const {
  project: {
    sassFiles,
    pugFolder,
    rasterImg,
    webpImg,
    vectorImg,
    spriteFolder,
    jsFiles,
    sourceFavicon,
  },
  dist: { jsFile, jsMinFile, fontsFolder },
} = paths;

const getWatchers = () => {
  watch([jsFiles, `!${jsFile}`, `!${jsMinFile}`], getScriptFile);
  watch(sassFiles, getStyleFile);
  watch(pugFolder, transformPug);
  watch(rasterImg, makeImages);
  watch(webpImg, createWebp);
  watch(vectorImg, makeImagesSvg);
  watch(spriteFolder, createSprite);
  watch(
    [`${fontsFolder}*.ttf`],
    series(parallel(createTtf2woff, createTtf2woff2), cleanTtl)
  );
  watch(sourceFavicon, series(createFavicons, delFavicons));
};

export default getWatchers;
