import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import postcss from 'rollup-plugin-postcss';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { InputPluginOption, rollup } from 'rollup';
import { getInfo } from './common';

const info = getInfo('table-tool-vue');
const utilsInfo = getInfo('table-tool-utils');

export const getPlugins = (minify: boolean) => {
  if (!info) return;

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
    plugins: getPlugins(false),
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

export const runBundle = async () => {
  await Promise.all([
    buildFullBundle(true),
    buildFullBundle(false),
    buildBundle(),
  ]);
};
