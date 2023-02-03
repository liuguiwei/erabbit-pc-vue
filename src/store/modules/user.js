export default {
  namespaced: true,
  state: {
    //用户信息
    profile: {
      id: "",
      avatar: "",
      nickname: "",
      account: "",
      mobile: "",
      token: "",
    },
    redirectUrl: "/",
  },
  mutations: {
    setUser(state, payload) {
      state.profile = payload;
    },
    setRedirectUrl(state, url) {
      state.redirectUrl = url;
    },
  },
};
