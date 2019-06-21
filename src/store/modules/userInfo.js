import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    userInfo:{},
    token: null
  },
  getters: {

  },
  mutations: {
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
      // localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    setUserInfo(context,userInfo) {
    //   if(userInfo){
    //     context.commit('setUserInfo', userInfo)
    //     return
    //   }
    // // return   console.log(axios.get)


      /*Vue.prototype.$axios.get('/api/dt/um/user/query').then(res=>{
        context.commit('setUserInfo', res.data)
      })*/
    },
    setToken({ commit }, token) {
      commit('setToken', token)
    }
  }
}
