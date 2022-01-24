import { defineClientAppEnhance } from '@vuepress/client'
import 'vue-bmap-gl/dist/style.css'
import VueAMap, {initBMapApiLoader} from 'vue-bmap-gl'
import VueMapgl from 'vue-mapvgl'

export default defineClientAppEnhance(({ app }) => {
  app.use(VueAMap);
  app.use(VueMapgl);
  if (!__VUEPRESS_SSR__) {
    initBMapApiLoader({
      ak: 'KKG8EDD3V4vuyPGcjsLCt16PHacQIx3P'
    })
  }
})
