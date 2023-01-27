// import fs from "fs";
import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";
import clean from "./clean.js";
import { projectNameRu } from "./variables.js";

const { cleanFavicons } = clean;

const {
  favicons,
  deleteAsync,
  gulp: { src, dest },
} = pluginsObject;

const {
  project: { sourceFavicon },
  dist: { folderFavicons, faviconsPath },
} = paths;

// 'favFiles'

const createFavicons = () => {
  cleanFavicons();

  return src(sourceFavicon)
    .pipe(
      favicons({
        appName: projectNameRu,
        appShortName: projectNameRu,
        appDescription: projectNameRu,
        lang: "ru-RU",
        path: faviconsPath,
        icons: {
          appleIcon: true,
          favicons: true,
          appleStartup: false,
          android: true,
          firefox: false,
          yandex: false,
          windows: true,
          coast: false,
        },
      })
    )
    .pipe(dest(folderFavicons));
};

export const delFavicons = () => {
  const android = `${folderFavicons}android-chrome-{36x36,48x48,72x72,96x96,144x144,256x256,384x384}.png`;
  const apple = `${folderFavicons}apple-touch-icon-{57x57,60x60,72x72,76x76,114x114,120x120,144x144,152x152,167x167,180x180,1024x1024}.png`;
  const precomposed = `${folderFavicons}apple-touch-icon-precomposed.png`;
  const favicon = `${folderFavicons}favicon-48x48.png`;
  const mstile = `${folderFavicons}mstile-{70x70,144x144,310x150,310x310}.png`;
  const delList = [android, apple, precomposed, favicon, mstile];

  return deleteAsync(delList, { force: true });
};

export default createFavicons;
