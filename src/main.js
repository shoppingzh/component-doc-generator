import { createApp } from 'vue'
import App from './App.vue'

import ElementUI from '@/plugins/element-ui'
import '@/plugins/markdown-css'
import components from '@/plugins/components'


createApp(App).use(ElementUI).use(components).mount('#app')
