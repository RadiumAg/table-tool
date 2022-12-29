import path from 'path';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import { src } from 'gulp';

function buildThemeChalk() {
  const sass = gulpSass(dartSass);

  return src(path.resolve(__dirname, 'src/*.scss')).pipe(sass.sync).pipe();
}
