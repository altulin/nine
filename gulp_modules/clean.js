import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const { deleteAsync } = pluginsObject;
const {
  distFolder,
  distFolderZip,
  made: { imgFiles, cssFolder },
  dist: { htmlFiles, fontsFolder, favFiles },
} = paths;

const options = {
  force: true,
};

const delDistFolder = () => {
  return deleteAsync(`${distFolder}_*`, options); // Удаляем всю папку продакшн
};

const cleanZip = () => {
  return deleteAsync(distFolderZip, options); // Удаляем всю папку продакшн zip
};

const cleanImg = () => {
  return deleteAsync(imgFiles, options); // Удаляем всё содержимое папки "img/" в каталоге /_src/
};

const cleanHtml = () => {
  return deleteAsync(htmlFiles, options); // Удаляем html в каталоге /_src/
};

const cleanCss = () => {
  return deleteAsync(`${cssFolder}*.{css,map}`, options); // Удаляем .css .map в папке /_src/css
};

const cleanTtl = () => {
  return deleteAsync(`${fontsFolder}*.{ttf,eot}`, options);
};

const cleanFavicons = (list) => {
  const files = list || favFiles;

  return deleteAsync(files, options);
};

const cleanTools = {
  delDistFolder,
  cleanImg,
  cleanZip,
  cleanHtml,
  cleanCss,
  cleanTtl,
  cleanFavicons,
};

export default cleanTools;
