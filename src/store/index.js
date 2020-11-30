import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
//modules
import global from './global/index'
import users from './users/index'
//proxies
import WazzupProxy from '@/proxy/Wazzup'
Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    global,
    users
  }
})

store.$axios = Axios.create({
  baseURL: 'https://app.dev-wazzup24.com'
})

store.$submit = function({method = 'get', data = null, query = null, url = ''}) {
  const options = {
    method,
    url
  }

  if (data) {
    options.data = data
  }

  if (query) {
    options.url += '?'
    for (let key in query) {
      options.url += `${key}=${query[key]}&`
    }
    options.url.slice(0, -1) // remove last &
  }

  return this.$axios(options)
    .then(res => res.data)
    .catch(err => {
      this.commit('global/setErrorText', 'Что-то пошло не так. Перезагрузите страницу :)')
      this.commit('global/setDevErrorText', err)
      throw new Error(err)
    })
}

store.$wazzupApi = new WazzupProxy(store)

export default store
