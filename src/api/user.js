import request from "@/utils/request";
/**
 * 用户账户密码登录
 * @param {String} account
 * @param {String} password
 * @returns promise
 */
export const getUserInfo = (account, password) => {
  return request({
    method: "POST",
    url: "/login",
    data: {
      account,
      password,
    },
  });
};
/**
 *使用qq登录
 * @param {String} unionId
 * @param {Integer} source
 * @returns promise
 */
export const useQqLogin = (unionId, source = 6) => {
  return request({
    method: "POST",
    url: "/login/social",
    data: {
      unionId,
      source,
    },
  });
};
/**
 * 获取QQ绑定的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const getQQBindCode = (mobile) => {
  return request({
    method: "GET",
    url: "/login/social/code",
    params: {
      mobile,
    },
  });
};
/**
 * 获取QQ注册的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const getQQDispatchCode = (mobile) => {
  return request({
    method: "GET",
    url: "/register/code",
    params: {
      mobile,
    },
  });
};
/**
 * QQ登录-绑定帐号
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns
 */
export const userQQBindLogin = (unionId, mobile, code) => {
  return request({
    method: "POST",
    url: "/login/social/bind",
    data: {
      unionId,
      mobile,
      code,
    },
  });
};

export const userQQPatchLogin = (unionId, patchFormParams) => {
  return request({
    method: "POST",
    url: `/login/social/{${unionId}}/complement`,
    data: {
      ...patchFormParams,
    },
  });
};
/**
 * 校验帐号是否存在
 * @param {String} account - 帐号
 * @returns Promise
 */
export const userCheckAccount = (account) => {
  return request({
    method: "GET",
    url: "/register/check",
    params: { account },
  });
};
