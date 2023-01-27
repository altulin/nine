import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const now = new Date();
const year = now.getFullYear().toString().padStart(2, "0");
const month = (now.getMonth() + 1).toString().padStart(2, "0");
const day = now.getDate().toString().padStart(2, "0");
const hours = now.getHours().toString().padStart(2, "0");
const minutes = now.getMinutes().toString().padStart(2, "0");

const { src, dest } = pluginsObject.gulp;
const {
  dist: {
    cssFile,
    // cssMinFile,
    fontsFiles,
    jsFile,
    jsMinFile,
    images,
    htmlFiles,
    icoFiles,
    favFiles,
  },
  srcFolder,
  distFolder,
} = paths;

const getCopying = () => {
  return src(
    [
      cssFile,
      // cssMinFile, // стили мин если надо
      fontsFiles,
      jsFile,
      jsMinFile, // скрипты мин если надо
      images,
      htmlFiles,
      icoFiles,
      favFiles,
    ],
    { base: srcFolder } // Параметр "base" сохраняет структуру проекта при копировании
  ).pipe(dest(`${distFolder}_${hours}-${minutes}_${day}-${month}-${year}/`)); // Выгружаем в папку с финальной сборкой
};

export default getCopying;
