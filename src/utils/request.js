import axios from "axios";
import store from "@/store";
import router from "@/router";
//基准地址
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
//基准配置
const instance = axios.create({
  baseURL,
  timeout: 5000,
});
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    const profile = store.state.user.profile;
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
//响应拦截器
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    //401状态码(用户token失效)
    if (err.response && err.response.status === 401) {
      //1.清空无用的用户信息
      store.commit("user/setUser", {});
      //2.跳转至登录页面并记录当前路由地址
      const fullPath = encodeURIComponent(router.currentRoute.fullPath);
      router.push("/login?redirectUrl=" + fullPath);
    }
    return Promise.reject(err);
  }
);
export default instance;
