import { defineUserConfig } from 'vuepress';
import { head, sidebar, navbar } from './configs/index';
import { defaultTheme } from '@vuepress/theme-default';
import { path } from '@vuepress/utils';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import vue from '@vitejs/plugin-vue';
import { containerPlugin } from '@vuepress/plugin-container';
import mdimsize from 'markdown-it-imsize';
import namedCodeBlocks from 'markdown-it-named-code-blocks';

export default defineUserConfig({
  lang: 'fr-FR',
  title: 'NSI Rocks !',
  description: 'Well, NSI rocks !',
  locales: {
    '/': {
      lang: 'fr-FR',
      title: 'SNT/NSI',
      description: 'Enseignement de la SNT et de la NSI',
    },
  },
  theme: defaultTheme({
    docsDir: 'docs',
    locales: {
      '/': {
        navbar: navbar,
        sidebar: sidebar,
        sidebarDepth: 4,
      },
    },
  }),
  plugins: [
    [
      registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components'),
      }),
      vue(),
      containerPlugin({
        type: 'consigne',
        locales: {
          '/': {
            defaultInfo: 'Consigne',
          },
        },
        before: (info: string): string =>
          `<div class="custom-container tip" style="border-color: #4675d0;">${
            info ? `<p class="custom-container-title">${info}</p>` : ''
          }\n`,
        after: (): string => '</div>\n',
      }),
    ],
  ],
  extendsMarkdown: (md) => {
    md.use(mdimsize);
    //md.use(namedCodeBlocks);
  },
});
