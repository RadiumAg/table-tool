import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import postcss from 'rollup-plugin-postcss';
import esbuild from 'rollup-plugin-esbuild';
import { InputPluginOption, rollup } from 'rollup';
import { getInfo } from './common';

const info = getInfo('table-tool-vue');

export const getPlugins = (minify: boolean) => {
  if (!info) return;

  return [
    vue({ isProduction: true }),
    vueJsx(),
    esbuild({
      sourceMap: minify,
      target: 'esnext',
      loaders: {
        '.vue': 'ts',
      },
      minify,
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
    external: ['vue', 'yup', 'table-tool-utils'],
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
        yup: 'yup',
        vue: 'vue',
        'table-tool-utils': 'table-tool-utils',
      },
    }),
  ]);
};

const buildBundle = async () => {
  if (!info) return;

  const build = await rollup({
    plugins: getPlugins(false),
    input: [info.inputfile],
    external: ['vue', 'yup', 'table-tool-utils'],
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

export const runBundle = async () => {
  await Promise.all([
    buildFullBundle(true),
    buildFullBundle(false),
    buildBundle(),
  ]);
};
