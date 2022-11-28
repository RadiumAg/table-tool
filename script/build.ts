import { runBundle as vueRunBundle } from './vue';
import { runBundle as utilsRunBundle } from './utils';

(async () => {
  console.log(process.argv.slice(2));
  Promise.all([vueRunBundle(), utilsRunBundle()]);
})();
