import request from "@/utils/request";
/**
 * 获取所有分类
 * @returns promise
 */
export const getAllCategory = () => {
  return request({
    method: "GET",
    url: "/home/category/head",
  });
};
/**
 * 获取一级分类子数据
 * @returns promise
 */
export const getTopCategoryById = (id) => {
  return request({
    method: "GET",
    url: "/category",
    params: { id },
  });
};
/**
 * @param {String} id
 * @returns promise
 */
export const getSubFilterList = (id) => {
  return request({
    method: "GET",
    url: "/category/sub/filter",
    params: { id },
  });
};
/**
 * 获取分类商品数据
 * @param {Object} params
 * @returns promise
 */
export const getSubGoodsList = (params) => {
  return request({
    method: "POST",
    url: "/category/goods/temporary",
    data: params,
  });
};
