import request from "@/utils/request";
/**
 *获取品牌数据
 * @param {Integer} limit
 * @returns promise
 */
export const getBrandList = (limit) => {
  return request({
    method: "GET",
    url: "/home/brand",
    params: { limit },
  });
};
/**
 * 获取轮播图
 * @returns promise
 */
export const getBanner = () => {
  return request({
    method: "GET",
    url: "home/banner",
  });
};
/**
 * 新鲜好物
 * @returns promise
 */
export const getNew = () => {
  return request({
    method: "GET",
    url: "home/new",
  });
};
/**
 * 人气推荐
 * @returns promise
 */
export const getHot = () => {
  return request({
    method: "GET",
    url: "home/hot",
  });
};
