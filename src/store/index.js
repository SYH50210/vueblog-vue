import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  // 相当于set方法
  mutations: {
    // 设置token值
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      //同时可以存入会话的sessionStorage里面 sessionStorage中只能存字符串 不能存入对象所以我们存入序列化 jons串
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    // 删除token及userInfo
    REMOVE_INFO: (state) => {
      state.token = ""
      state.userInfo = {}
      localStorage.setItem('token','')
      sessionStorage.setItem('userInfo',JSON.stringify(''))
    }
  },
  // 相当于get方法
  getters: {
    getUserInfo: state => {
      return state.userInfo
    },
    getToken: state => {
      return state.token
    }

  },
  actions: {},
  modules: {}
})