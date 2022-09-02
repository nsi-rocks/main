import type { SidebarConfig } from '@vuepress/theme-default';

//cf github : https://github.com/vuepress/vuepress-next/blob/main/docs/.vuepress/configs/sidebar/en.ts

export const sidebar: SidebarConfig = {
  '/': [
    {
      text: 'SNT',
      children: ['/snt/README.md'],
    },
  ],
  '/snt/': [
    {
      text: 'FICHES MEMO',
      children: ['/snt/rsociaux.md'],
    },
    {
      text: 'ACTIVITÉS',
      children: ['/snt/rsociaux-acti.md'],
    },
  ],
  '/nsi-1ere': [
    {
      text: 'COURS',
      children: ['/nsi-1ere/python1.md'],
    },
    {
      text: 'ACTIVITÉS',
      children: ['/nsi-1ere/python-acti1.md', '/nsi-1ere/python-acti2.md'],
    },
  ],
};
