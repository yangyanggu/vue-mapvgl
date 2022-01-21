import {createApp} from 'vue'
import Element from 'element-plus'
import VueBMap,{initBMapApiLoader} from 'vue-bmap-gl'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'vue-bmap-gl/dist/style.css'
import router from './router/index'

initBMapApiLoader({
  ak: 'KKG8EDD3V4vuyPGcjsLCt16PHacQIx3P',
})

createApp(App)
.use(Element)
.use(router)
.use(VueBMap)
.mount('#app')
