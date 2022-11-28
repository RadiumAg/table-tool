import path from 'path';
import baseConfig from '@vue/theme/config';
import { defineConfigWithTheme } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { Config as ThemeConfig } from '@vue/theme';

const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: '介绍',
      items: [
        {
          text: '开始',
          link: '/guide/introduce',
        },
      ],
    },
    {
      text: '基础使用',
      items: [
        {
          text: '表格编辑',
          link: '/guide/edit-cell',
        },
        { text: '表格验证', link: '/guide/validate' },
      ],
    },
  ],
};

const nav: ThemeConfig['nav'] = [
  {
    text: '教程',
    link: '/guide/edit-cell',
  },
];

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  base: process.env.NODE_ENV === 'production' ? '/table-tool/' : '/',
  lang: 'zh-cn',
  title: 'Table Tool',
  srcDir: 'src',
  scrollOffset: 'header',
  description: '强化表格,让表格更容易使用',

  themeConfig: {
    nav,
    sidebar,
  },

  vite: {
    server: {
      port: 5174,
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..'],
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@demo': path.resolve(__dirname, '../src/demo'),
        '@theme': path.resolve(__dirname, './theme'),
        '@table-tool/vue': path.resolve(
          __dirname,
          '../../packages/vue/src/index.ts',
        ),
        '@table-tool/utils': path.resolve(
          __dirname,
          '../../packages/utils/src/index.ts',
        ),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  },
});
