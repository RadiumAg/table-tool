import path from 'path';
import { getPackageInfoSync } from 'local-pkg';

export const getInfo = (pkgName: string) => {
  const info = getPackageInfoSync(pkgName);

  if (!info) return;

  return {
    inputfile: path.resolve(info.rootPath, './src/index.ts'),
    outDir: path.resolve(info.rootPath, './dist'),
    name: info.name.replaceAll('@', '').replace('/', '-'),
  };
};
