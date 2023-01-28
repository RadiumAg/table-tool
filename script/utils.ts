import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import { InputPluginOption, rollup } from 'rollup';
import { buildType, getInfo } from './common';

const info = getInfo('table-tool-utils');
export const external = ['yup', 'vue'];

export const getPlugins = (minify: boolean) => {
  if (!info) return;

  return [
    esbuild({
      minify,
      target: 'esnext',
      sourceMap: true,
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
      sourcemap: true,
      dir: path.resolve(info.outDir, './esm'),
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: path.resolve(__dirname, '../packages'),
    }),
    build.write({
      sourcemap: true,
      dir: path.resolve(info.outDir, './lib'),
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: path.resolve(__dirname, '../packages'),
    }),
  ]);
};

export const runBundle = async () => {
  await Promise.all([bundle(true), bundle(false), buildType(info)]);
};
