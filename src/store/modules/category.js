//分类模块
import { getAllCategory } from "@/api/category";
import { localCategory } from "@/api/constant";
export default {
  namespaced: true,
  state: {
    //分类信息集合
    categoryList: localCategory.map((item) => {
      return { name: item };
    }),
  },
  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    showLayer(state, id) {
      const newList = state.categoryList.map((item) => {
        if (item.id === id) {
          return { ...item, open: true };
        } else {
          return item;
        }
      });
      state.categoryList = newList;
    },
    hideLayer(state, id) {
      const newList = state.categoryList.map((item) => {
        if (item.id === id) {
          return { ...item, open: false };
        } else {
          return item;
        }
      });
      state.categoryList = newList;
    },
  },
  actions: {
    async loadeCategoryList({ commit }) {
      const { result } = await getAllCategory();
      result.forEach((item) => {
        item.open = false;
      });
      commit("setCategoryList", result);
    },
  },
};
