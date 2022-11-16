import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [vueJsx()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 5174,
  },
});
