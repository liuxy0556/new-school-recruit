export default {
    namespaced: true,
    state: {
        userInfo: {}
    },
    getters: {
        getUserInfo: (state) =>  {
            return state.userInfo
        }
    },
    mutations:{
        setUserInfo:(state,userinfo) =>{
            state.userInfo = userinfo
        }
    }
}