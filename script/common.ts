import path from 'path';
import { getPackageInfoSync } from 'local-pkg';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';

export type Info = ReturnType<typeof getInfo>;

export const getInfo = (pkgName: string) => {
  const info = getPackageInfoSync(pkgName);

  if (!info) return;

  return {
    inputfile: path.resolve(info.rootPath, './src/index.ts'),
    outDir: path.resolve(info.rootPath, '../../dist/table-tool'),
    name: info.name.replaceAll('@', '').replace('/', '-'),
  };
};

export const buildType = async (info: Info) => {
  if (!info) return;

  const build = await rollup({
    input: [path.resolve('./', './types/index.d.ts')],
    plugins: [dts()],
  });

  build.write({
    format: 'cjs',
    file: path.resolve(info.outDir, `./${info.name}.d.ts`),
  });
};

export const getArgv = () => {
  const argv = process.argv.slice(2);
  const result: Record<string, any> = {};
  if (!argv || argv.length === 0) return;

  for (const arg of argv) {
    const groups = arg.match(/--(?<name>[a-z]+)=/)?.groups;
    if (groups?.name) {
      result[groups.name] = arg.split('=')[1];
    }
  }

  return result;
};
