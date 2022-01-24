import { defineClientAppEnhance } from '@vuepress/client'
import 'vue-bmap-gl/dist/style.css'

export default defineClientAppEnhance(async ({ app }) => {
  if (!__VUEPRESS_SSR__) {
    let VueMapvgl = await import('vue-mapvgl/dist/index.es');
    app.use(VueMapvgl);
    import('vue-bmap-gl').then(bmapgl => {
      app.use(bmapgl);
      bmapgl.initBMapApiLoader({
        ak: 'KKG8EDD3V4vuyPGcjsLCt16PHacQIx3P'
      })
    })

  }
})
