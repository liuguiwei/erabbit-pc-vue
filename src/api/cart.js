import request from "@/utils/request";
/**
 * 获取新的商品信息
 * @param {String} skuId -商品SKUID
 * @returns promise
 */
export const getNewCartState = (skuId) => {
  return request({
    method: "GET",
    url: `/goods/stock/${skuId}`,
  });
};
/**
 * 合并购物车
 * @param {Array<object>} cartList -本地购物车数组
 * @param {String} item.skuId - 商品SKUID
 * @param {Boolean} item.selected - 是否选中
 * @param {Integer} item.count - 数量
 * @returns promise
 */
export const mergeLocalCart = (cartList) => {
  console.log(123, cartList);
  return request({
    method: "POST",
    url: "/member/cart/merge",
    data: cartList,
  });
};
/**
 * 获取登录后的购物车列表
 * @returns Promise
 */
export const getCartList = () => {
  return request({
    method: "GET",
    url: "/member/cart",
  });
};
/**
 *
 * @param {String} skuId
 * @param {Integer} count
 * @returns
 */
export const insertCartList = ({ skuId, count }) => {
  return request({
    method: "POST",
    url: "/member/cart",
    data: { skuId, count },
  });
};
/**
 *删除购物车商品
 * @param {Array} ids
 * @returns promise
 */
export const deleteCart = (ids) => {
  return request({
    method: "DELETE",
    url: "/member/cart",
    data: { ids },
  });
};
/**
 *更新购物车商品
 * @param {String} skuId
 *  @param {Boolean} selected
 *  @param {Integer} count
 * @returns promise
 */
export const updateCart = ({ skuId, selected, count }) => {
  return request({
    method: "PUT",
    url: `/member/cart/${skuId}`,
    data: { selected, count },
  });
};
/**选择所有的商品
 * @param {Boolean} selected
 * @param {Array<String>} ids
 * @returns promise
 */
export const checkedAllCart = ({ selected, ids }) => {
  return request({
    method: "PUT",
    url: `/member/cart/selected`,
    data: { selected, ids },
  });
};
