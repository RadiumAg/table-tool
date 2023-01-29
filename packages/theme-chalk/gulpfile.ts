import path from 'path';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import { dest, parallel, src } from 'gulp';
import chalk from 'chalk';
import consola from 'consola';

import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';

const distFolder = path.resolve(__dirname, 'dist');
const distBundle = path.resolve(
  __dirname,
  '../../',
  'dist/table-tool/theme-chalk',
);

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

function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle));
}

const build = parallel(copyThemeChalkBundle, buildThemeChalk);

export default build;
