import path from 'path';
import { copyFile } from 'fs/promises';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import postcss from 'rollup-plugin-postcss';
import esbuild from 'rollup-plugin-esbuild';
import ts from 'rollup-plugin-ts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { InputPluginOption, rollup } from 'rollup';
import { getInfo } from './common';
import { run } from './process';

const info = getInfo('table-tool-vue');
const utilsInfo = getInfo('table-tool-utils');

const getPlugins = (minify: boolean) => {
  if (!info) return [];

  return [
    vue({ isProduction: false }),
    vueJsx(),
    esbuild({
      sourceMap: minify,
      target: 'esnext',
      loaders: {
        '.vue': 'ts',
      },
      minify,
    }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    postcss({
      minimize: minify,
      modules: true,
      sourceMap: true,
    }),
  ] as InputPluginOption[];
};

const buildFullBundle = async (minify: boolean) => {
  if (!info) return;

  const build = await rollup({
    plugins: getPlugins(minify),
    input: [info.inputfile],
    external: ['vue', 'yup'],
  });

  await Promise.all([
    build.write({
      file: path.resolve(
        info.outDir,
        './dist',
        `index.full.${minify ? 'min' : ''}.js`,
      ),
      format: 'umd',
      name: 'TableTool',
      sourcemap: minify,
      globals: {
        vue: 'vue',
        yup: 'yup',
      },
    }),
  ]);
};

const buildBundle = async () => {
  if (!info || !utilsInfo) return;

  const build = await rollup({
    plugins: [
      ts({ tsconfig: path.resolve(__dirname, '../tsconfig.json') }),
      ...getPlugins(false),
    ],
    input: [info.inputfile, utilsInfo.inputfile],
    external: ['vue', 'yup'],
  });

  await Promise.all([
    build.write({
      sourcemap: true,
      format: 'esm',
      dir: path.resolve(info.outDir, './esm'),
      preserveModules: true,
      preserveModulesRoot: path.resolve(__dirname, '../packages'),
    }),
    build.write({
      sourcemap: true,
      format: 'cjs',
      dir: path.resolve(info.outDir, './lib'),
      preserveModules: true,
      preserveModulesRoot: path.resolve(__dirname, '../packages'),
    }),
  ]);
};

const copyFullStyle = async () => {
  await copyFile(
    path.resolve(__dirname, '../dist/table-tool', 'theme-chalk/index.css'),
    path.resolve(__dirname, '../dist/table-tool', 'dist/index.css'),
  );
};

const copyPackageFile = async () => {
  await copyFile(
    path.resolve(__dirname, '../packages', 'table-tool', 'package.json'),
    path.resolve(__dirname, '../dist/table-tool', 'package.json'),
  );
};

export const runBundle = async () => {
  await buildBundle();
  await buildFullBundle(true);
  await buildFullBundle(false);
  await run('pnpm run -C ./packages/theme-chalk build:theme-chalk');
  await copyFullStyle();
  await copyPackageFile();
};
