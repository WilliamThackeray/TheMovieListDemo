import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createAuth0 } from '@auth0/auth0-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(
  createAuth0({
    domain: 'dev-bstn5pi0f5twfr3y.us.auth0.com',
    clientId: 'ubKRwTLiCw3CnVDB3Bdp22LYVdlocBfC',
    authorizationParams: {
      redirect_uri: `http://localhost:5173/`
    }
  })
)

app.mount('#app')
