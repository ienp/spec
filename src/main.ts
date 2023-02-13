import { createApp } from 'vue'
import './styles/style.scss'
import './styles/config.scss'
import App from './App.vue'

import { router } from './router'
import AutoImportIcon from './utils/autoImportIcon'
import 'virtual:svg-icons-register'
import './utils/node-api'

const app = createApp(App)

AutoImportIcon(app)

app
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
