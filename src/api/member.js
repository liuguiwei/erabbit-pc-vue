import request from "@/utils/request";
/**
 *
 * @param {Object} addressForm
 * @returns promise
 */
export const addAddress = (addressForm) => {
  return request({
    method: "POST",
    url: "/member/address",
    data: addressForm,
  });
};
/**
 * 修改地址
 * @param {*} addressForm
 * @returns
 */
export const addressModify = (addressForm) => {
  return request({
    method: "PUT",
    url: `/member/address/${addressForm.id}`,
    data: addressForm,
  });
};
/**
 * 提交定单
 * @param {*}
 * @returns
 */
export const submitOrder = (orderDate) => {
  return request({
    method: "POST",
    url: "/member/order",
    data: orderDate,
  });
};

export const getCollect = (queryInfo) => {
  return request({
    method: "get",
    url: "/member/collect",
    params: queryInfo,
  });
};
