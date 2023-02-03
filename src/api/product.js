import request from "@/utils/request";
/**
 * 获取商品详情
 * @param {integer} id
 * @returns promise
 */
export const getProduct = (id) => {
  return request({
    method: "GET",
    url: "/goods",
    params: { id },
  });
};
/**
 * 获取评论列表头部信息
 * @param {integer} id
 * @returns promise
 */
export const getCoomentListInfo = (id) => {
  return request({
    method: "GET",
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
  });
};
/**
 *获取评论分页、筛选数据
 * @param {Object} params
 * @returns promise
 */
export const getCoomentListPage = (id, params) => {
  return request({
    method: "GET",
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    params: {
      ...params,
    },
  });
};
/**
 *
 * @param {String} skuId
 * @returns promise
 */
export const getGoodsSpacesAndSkus = (skuId) => {
  return request({
    method: "GET",
    url: `/goods/sku/${skuId}`,
  });
};
