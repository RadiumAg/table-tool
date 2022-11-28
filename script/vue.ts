import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import ts from 'rollup-plugin-ts';
import { getPackageInfoSync } from 'local-pkg';
import { InputPluginOption, rollup } from 'rollup';

export const external = ['yup', '@table-tool/utils', 'vue'];

export const getPlugins = (minify: boolean) => {
  const { outDir } = getInfo();
  if (!outDir) return;

  return [
    vueJsx(),
    postcss({
      minimize: minify,
      modules: true,
    }),
  ] as InputPluginOption[];
};

export const getInfo = () => {
  const info = getPackageInfoSync('@table-tool/vue');

  if (!info)
    return { inputPath: undefined, outDir: undefined, name: undefined };

  return {
    inputPath: path.resolve(info.rootPath, './src/index.ts'),
    outDir: path.resolve(info.rootPath, './dist'),
    name: info.name.replaceAll('@', '').replace('/', '-'),
  };
};

export const bundle = async (minify: boolean) => {
  const { inputPath, outDir, name } = getInfo();
  if (!inputPath || !outDir) return;

  const build = await rollup({
    plugins: getPlugins(minify),
    input: [inputPath],
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
      file: path.resolve(outDir, `${name}.esm${minify ? '.prod' : ''}.mjs`),
      format: 'esm',
    }),
    build.write({
      file: path.resolve(outDir, `${name}.cjs${minify ? '.prod' : ''}.js`),
      format: 'cjs',
    }),
    build.write({
      file: path.resolve(outDir, `${name}.global${minify ? '.prod' : ''}.js`),
      format: 'iife',
      name: 'ToolBoxVue',
      globals: {
        vue: 'vue',
        yup: 'yup',
      },
    }),
  ]);
};
