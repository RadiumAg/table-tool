import { spawn } from 'child_process';
import path from 'path';
import consola from 'consola';
import chalk from 'chalk';

export const run = async (
  command: string,
  cwd: string = path.resolve(__dirname, '../'),
) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`);
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });

    const onProcessExit = () => app.kill('SIGHUP');

    app.on('close', code => {
      process.removeListener('exit', onProcessExit);

      if (code === 0) resolve();
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`),
        );
    });
    process.on('exit', onProcessExit);
  });
