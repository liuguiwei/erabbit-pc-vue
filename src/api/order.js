import request from "@/utils/request";
/**
 * 获取用户订单
 * @returns
 */
export const createOrder = () => {
  return request({
    method: "GET",
    url: "/member/order/pre",
  });
};
/**
 * 获取订单详情
 * @param {String} id - 订单ID
 */
export const getUserOrder = (id) => {
  return request({
    method: "GET",
    url: "/member/order/" + id,
  });
};
