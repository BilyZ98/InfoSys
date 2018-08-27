import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //用户级数据
    userInfo: {},
    userStatus: 'guest'
  },
  mutations: {
    resetState: function(state) {
      state.userInfo = {}
      state.userStatus = 'guest'
    },
    updateUserStatus: function(state, result) {
      state.userStatus = result
    },
    updateUserInfo: function(state, _info) {
      state.userInfo = _info
    },
  },
  actions: {
    /**
     * HTTP Get请求封装，用于获取资源或向后端下发指令。使用方式：
     *  全局调用：
     *  this.$store.dispatch('GET', urlpack)
     * @param {Object} urlpack
     * @param {String} urlpack.url 请求的url，从/api后开始，例如'/user/login'
     * @param {Object} urlpack.params 请求的参数，将被自动解析为GET的参数发送出去。
     * @param {String} urlpack.params.test1 举例
     * @param {String} urlpack.params.test2 举例
     * ...
     */
    GET({ state, commit }, urlpack) {
      console.log('Requesting', urlpack.url)
      return Vue.http.get(urlpack.url, { params: urlpack.params })
    },
    POST({ state, commit }, urlpack) {
      console.log('Requesting', urlpack.url, 'with POST')
      return Vue.http.post(urlpack.url, urlpack.body, { params: urlpack.params })
    },
    updateUserInfo({ state, commit }, info) {
      commit('updateUserInfo', info)
      //commit('updateUserStatus',info.userType)
    }
  },
  getters: {
    getUserAccount: function(state) {
      //console.log(state.userInfo)
      return state.userInfo.account
    }
  }
})