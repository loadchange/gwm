import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'gwm.js',
  description: 'Generate Watermark for Web Applications',
  base: '/gwm/',
  appearance: false, // 禁用暗色模式，默认明亮皮肤
  head: [
    ['link', { rel: 'icon', href: '/gwm/logo.png' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'API', link: '/api/' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Examples', link: '/examples/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/loadchange/gwm' }
    ]
  }
})