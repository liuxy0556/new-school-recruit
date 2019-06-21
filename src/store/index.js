import Vue from 'vue'
import Vuex from 'vuex'
// 导入modules
import pageInfo from './modules/pageInfo'
import userInfo from './modules/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    corpId: localStorage.getItem('corpId') || (process.env.NODE_ENV === 'development'?'ding152b8c2686eed6e635c2f4657eb6378f':''),
    authCode: '',
    globalUserId: localStorage.getItem('globalUserId') || '',
    isTeacher: localStorage.getItem('isTeacher') || '',
    isStudent: localStorage.getItem('isStudent') || '',
    userInfo: localStorage.getItem('userInfo') || '',
    accessToken: localStorage.getItem('accessToken') || '',
    notReceive: 0
  },
  getters: {
    userInfo (state) {
      let userInfo = localStorage.getItem('userInfo')
      try {
        state.userInfo = JSON.parse(userInfo)
      } catch (error) {
        state.userInfo = { name: '' }
        console.log(error, 'request error')
        throw error
      }

      return state.userInfo
    }
  },
  mutations: {
    setCorpId: (state, corpId) => {
      localStorage.setItem('corpId', corpId)
      state.corpId = corpId
    },
    setAuthCode: (state, authCode) => {
      state.authCode = authCode
    },
    setGlobalUserId: (state, globalUserId) => {
      localStorage.setItem('globalUserId', globalUserId)
      state.globalUserId = globalUserId
    },
    setUserInfo: (state, userInfo) => {
      if (userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        state.userInfo = userInfo
      }
    },
    setAccessToken: (state, accessToken) => {
      localStorage.setItem('accessToken', accessToken)
      state.accessToken = accessToken
    },
    setIsTeacher: (state, isTeacher) => {
      localStorage.setItem('isTeacher', isTeacher)
      localStorage.setItem('isStudent', !isTeacher)
      state.isTeacher = isTeacher
      state.isStudent = !isTeacher
    },
    setNotReceive: (state, notReceive) => {
      state.notReceive = notReceive
    },
    clearLoginInfo: (state) => {
      state.userInfo = ''
      state.accessToken = ''
      localStorage.clear()
    }
  },
  modules: {
    pageInfo,
    userInfo
  }
})
