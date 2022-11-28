import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import esbuild from 'rollup-plugin-esbuild';
import { getPackageInfoSync } from 'local-pkg';
import { InputPluginOption, rollup } from 'rollup';

export const external = ['yup', '@table-tool/utils', 'vue'];

export const getPlugins = (minify: boolean) => {
  const { outDir } = getInfo();
  if (!outDir) return;

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

export const buildType = async () => {
  const { inputPath, outDir } = getInfo();
  if (!inputPath) return;

  const build = await rollup({
    input: [path.resolve(outDir, '../types/src/index.d.ts')],
    plugins: [dts()],
  });

  build.write({
    format: 'cjs',
    file: path.resolve(outDir, './table-tool-vue.d.ts'),
  });
};
