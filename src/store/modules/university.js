export default {
    namespaced: true,
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo'))
    },
    getters: {
        getUserInfo: (state) => {
            return state.userInfo
        }
    },
    mutations: {
        setUserInfo: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },
    actions: {
        increment(context) {
            context.commit('setUserInfo')
        }
    }
}