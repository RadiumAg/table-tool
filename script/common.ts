import path from 'path';
import { getPackageInfoSync } from 'local-pkg';

export type Info = ReturnType<typeof getInfo>;

export const getInfo = (pkgName: string) => {
  const info = getPackageInfoSync(pkgName);

  if (!info) return;

  return {
    inputfile: path.resolve(info.rootPath, './index.ts'),
    outDir: path.resolve(info.rootPath, '../../dist/table-tool'),
    name: info.name.replaceAll('@', '').replace('/', '-'),
  };
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
