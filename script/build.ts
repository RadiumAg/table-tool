import { runBundle as vueRunBundle } from './vue';
import { runBundle as utilsRunBundle } from './utils';
import { getArgv } from './common';

(async () => {
  const argObj = getArgv();

  if (argObj && argObj.type) {
    const type = argObj.type;

    if (type === 'vue') {
      vueRunBundle();
    } else if (type === 'utils') {
      utilsRunBundle();
    }
  }
})();
