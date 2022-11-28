import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import esbuild from 'rollup-plugin-esbuild';
import { InputPluginOption, rollup } from 'rollup';
import { buildType, getInfo } from './common';

const info = getInfo('@table-tool/vue');
export const external = ['yup', '@table-tool/utils', 'vue'];

export const getPlugins = (minify: boolean) => {
  if (!info) return;

  return [
    vueJsx(),
    esbuild({
      target: 'esnext',
      minify,
    }),
    postcss({
      minimize: minify,
      modules: true,
    }),
  ] as InputPluginOption[];
};

const bundle = async (minify: boolean) => {
  if (!info) return;

  const build = await rollup({
    plugins: getPlugins(minify),
    input: [info.inputfile],
    external,
    output: {
      globals: {
        vue: 'vue',
        yup: 'yup',
      },
    },
  });

  Promise.all([
    build.write({
      file: path.resolve(
        info.outDir,
        `${info.name}.esm${minify ? '.prod' : ''}.mjs`,
      ),
      format: 'esm',
    }),
    build.write({
      file: path.resolve(
        info.outDir,
        `${info.name}.cjs${minify ? '.prod' : ''}.js`,
      ),
      format: 'cjs',
    }),
    build.write({
      file: path.resolve(
        info.outDir,
        `${info.name}.global${minify ? '.prod' : ''}.js`,
      ),
      format: 'iife',
      name: 'ToolBoxVue',
      globals: {
        vue: 'vue',
        yup: 'yup',
      },
    }),
  ]);
};

export const runBundle = async () => {
  await Promise.all([bundle(true), bundle(false), buildType(info)]);
};
