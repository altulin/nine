import pluginsObject from "./plugins.js";
import { paths } from "./variables.js";

const {
  imagemin,
  svgmin,
  cheerio,
  replace,
  svgstore,
  rename,
  deleteAsync,
  svgo,
  gulp: { src, dest },
} = pluginsObject;

const {
  project: { spriteFiles, spriteFile },
  made: { imgFolder, spriteFolder },
} = paths;

const createSprite = () => {
  deleteAsync(spriteFolder, { force: true });
  return src(spriteFiles)
    .pipe(imagemin([svgo()]))

    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )

    .pipe(
      cheerio({
        run($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: { xmlMode: true },
      })
    )

    .pipe(replace("&gt;", ">"))

    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )

    .pipe(rename(spriteFile))
    .pipe(dest(imgFolder));
};

export default createSprite;
