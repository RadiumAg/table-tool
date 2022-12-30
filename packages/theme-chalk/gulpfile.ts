import path from 'path';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import { dest, src } from 'gulp';
import chalk from 'chalk';
import consola from 'consola';

import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';

const distFolder = path.resolve(__dirname, 'dist');

function buildThemeChalk() {
  const sass = gulpSass(dartSass);

  return src(path.resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, details => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000,
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`,
        );
      }),
    )
    .pipe(dest(distFolder));
}

buildThemeChalk();

export default buildThemeChalk;
