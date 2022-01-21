import {defineUserConfig} from 'vuepress'
import Navbar from './navbar'
import Sidebar from './sidebar'
import registerPlugin from "./plugin/registerPlugin";
import {containerPlugin} from './plugin/demoPlugin'
import {sitemapPlugin} from './plugin/sitemapPlugin'
import type {DefaultThemeOptions} from 'vuepress'


export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: 'zh-CN',
  title: 'vue-mapvgl',
  description: '百度地图mapvgl的vue3对应封装',
  head: [
    ['link', {rel: 'stylesheet', type: 'text/css' ,href: '/css/global.css'}],
    /*['script', {}, `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?220fb8a7ec11fe29bc25f3ace66e958f";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();`
    ]*/
    // ['script', {src: 'https://cdn.jsdelivr.net/npm/@vuemap/vue-amap@1.0.1/dist/index.js'}]
  ],

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    docsDir: 'docs',
    editLink: false,
    lastUpdatedText: '最后更新时间',
    contributorsText: '贡献者',
    tip: '提示',
    warning: '警告',
    navbar: Navbar,
    sidebar: Sidebar,

  },
  plugins: [
    [containerPlugin],
    registerPlugin,
    ['@vuepress/register-components'],
    [sitemapPlugin],
    ['@vuepress/plugin-search']
  ],
  bundlerConfig: {
    viteOptions: {
      optimizeDeps: {
        // include: ['@vuemap/vue-amap']
      }
    }
  }
})
