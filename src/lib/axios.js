/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import store from '../store'
import { Toast } from 'vant';

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg) => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  const isRedirect = router.currentRoute.fullPath.includes(('/login')) && router.currentRoute.fullPath.includes(('?redirect'))
  if (isRedirect) {
    return
  }
  const isLogin = router.currentRoute.fullPath.includes(('/login'))
  let jumpParam = { path: '/login', }
  // logger.online({ location: router.currentRoute })
  if (!isLogin) {
    Object.assign(jumpParam, {
      query: {
        redirect: encodeURIComponent(router.currentRoute.fullPath)
      }
    })
  }
  router.replace(jumpParam);
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      throw other
  }
}

// 创建axios实例
var instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 60
});
// 创建axios实例
var dingInstance = axios.create({
  baseURL: process.env.VUE_APP_DING_URL,
  timeout: 1000 * 60
});

let api = {
  // 获取验证码
  getSmsCode (params) { return instance.get('/api/dt/aliDayunSms/getSmsCode.do', {params}) },
  // 验证验证码是否正确
  validateCode (data) { return instance.post('/api/dt/index/validateCode.do', data) },
  // 上传文件
  uploadImage (fd) { return instance.post('/api/dt/fileUp/uploadReturnFileName.do', fd, { headers: { 'Content-Type': 'multipart/form-data' }}) },
}

// 设置post请求头   每次请求前，如果存在token则在请求头中携带token
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(function (config) {

  let accessToken = store.state.accessToken
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  // msgLog(config.url);
  return config;
}, function (error) {
  return Promise.reject(error);
});


const bussinessErrorHandle = (data, other) => {
  // 状态码判断
  // logger.online({ data: res.data, config: res.config,detail:JSON.stringify(res.data.data),type:'bussiness Error' })
  // console.log('bussiness Error', data)
  switch (data.code) {
    // 401: 未登录状态，跳转登录页
    case 911: // 跳登陆
    case 810: // 跳登陆
      Toast('请先登录')
      toLogin()
      break;
    case 40002:
      break;
    case 40003:
      break;
    case 40007:
      break;
    default:
      Toast(data.message);
  }
}

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      const { data } = res
      if (data.code === 200) {
        return Promise.resolve(res.data)
      } else {
        bussinessErrorHandle(res.data)
      }
    } else {
      return Promise.reject(res)
    }
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
  },
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
      return Promise.reject(error)
    }
  });


instance.install = function (Vue) {
  Vue.prototype.$axios = instance
  Vue.prototype.api = api
}

export default instance
