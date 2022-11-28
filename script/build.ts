import { bundle as utilsBundle } from './utils';
import { bundle as vueBundle } from './vue';

(async () => {
  Promise.all([vueBundle(true), vueBundle(false)]);
})();
