import { getNewCartState } from "@/api/cart";
import { mergeLocalCart } from "@/api/cart";
import { getCartList } from "@/api/cart";
import { insertCartList } from "@/api/cart";
import { deleteCart } from "@/api/cart";
import { updateCart } from "@/api/cart";
import { checkedAllCart } from "@/api/cart";
//购物车模块
export default {
  namespaced: true,
  state: {
    //购物车信息结合
    list: [],
  },
  getters: {
    validList(state) {
      return state.list.filter((item) => {
        return item.isEffective && item.stock > 0;
      });
    },
    inValidList(state) {
      return state.list.filter((item) => {
        return !item.isEffective || item.stock === 0;
      });
    },
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => {
        return p + c.count;
      }, 0);
    },
    validMount(state, getters) {
      return getters.validList.reduce((p, c) => {
        return p + (parseInt(c.nowPrice * 100) * c.count) / 100;
      }, 0);
    },
    selectedGoods(state, getters) {
      return getters.validList.filter((item) => {
        return item.selected;
      });
    },
    selectedGoodsMount(state, getters) {
      return getters.selectedGoods.reduce((p, c) => {
        return p + Math.round((c.nowPrice * 100 * c.count) / 100);
      }, 0);
    },
    isCheckAll(state, getters) {
      return (
        getters.validList.length !== 0 &&
        getters.validList.length === getters.selectedGoods.length
      );
    },
  },
  mutations: {
    setCartList(state, list) {
      state.list = list;
    },
    deleteSelectedCart(state) {
      state.list = state.list.filter((item) => {
        return !item.selected;
      });
    },
    deleteCart(state, skuId) {
      const index = state.list.findIndex((item) => {
        return item.skuId === skuId;
      });
      state.list.splice(index, 1);
    },
    insertCart(state, payload) {
      if (payload.index > -1) {
        state.list.splice(payload.index, 0, payload.newSku);
      } else {
        const sameIndex = state.list.findIndex((item) => {
          return item.skuId === payload.skuId;
        });
        //合并相同规格(skuId)的商品,更改数量
        if (sameIndex > -1) {
          payload.count += state.list[sameIndex].count;
          state.list.splice(sameIndex, 1);
        }
        //加入商品加入list
        state.list.unshift(payload);
      }
      //查找是否添加相同规格(skuId)的商品
    },
    //更新购物车
    updateCart(state, payload) {
      const goods = state.list.find((item) => {
        return item.skuId === payload.skuId;
      });
      for (const key in payload) {
        if (
          payload[key] !== undefined &&
          payload[key] !== null &&
          payload[key] !== ""
        ) {
          goods[key] = payload[key];
        }
      }
    },
    delGoods(state, payload) {
      const index = state.list.findIndex((item) => {
        return (item.skuId = payload);
      });
      state.list.splice(index, 1);
    },
    checkedOne(state, payload) {
      const item = state.list.find((item) => item.skuId === payload.skuId);
      item.selected = !item.selected;
    },
  },
  actions: {
    async mergeLocalCart(context) {
      const cartList = context.getters["validList"].map((item) => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count,
        };
      });
      await mergeLocalCart(cartList);
      context.commit("setCartList", []);
    },
    changeSkuCart(context, payload) {
      return new Promise((resolve, reject) => {
        const oldSku = context.state.list.find((item) => {
          return item.skuId === payload.oldSkuId;
        });
        if (context.rootState.user.profile.token) {
          //已登录
          deleteCart([payload.oldSkuId])
            .then(() => {
              return insertCartList({
                skuId: payload.newSku.skuId,
                count: oldSku.count,
              });
            })
            .then(() => {
              return getCartList();
            })
            .then((res) => {
              context.commit("setCartList", res.result);
              resolve;
            });
        } else {
          const index = context.getters["validList"].findIndex((item) => {
            return item.skuId === oldSku.skuId;
          });
          context.commit("deleteCart", payload.oldSkuId);
          const {
            skuId,
            spaceText: attrsText,
            price: nowPrice,
            inventory: stock,
          } = payload.newSku;
          const newSku = {
            ...oldSku,
            skuId,
            attrsText,
            nowPrice,
            stock,
          };
          context.commit("insertCart", { newSku, index });
          resolve();
        }
      });
    },
    updateCountCart(context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          //已登录;
          updateCart({ skuId: payload.skuId, count: payload.count })
            .then(() => {
              return getCartList();
            })
            .then((res) => {
              context.commit("setCartList", res.result);
              resolve();
            });
        } else {
          context.commit("updateCart", payload);
          resolve();
        }
      });
    },
    deleteSelectedCart(context) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录TODO
          const ids = context.getters.selectedGoods.map((item) => {
            return item.skuId;
          });
          deleteCart(ids)
            .then(() => {
              return getCartList();
            })
            .then((res) => {
              context.commit("setCartList", res.result);
            });
        } else {
          context.commit("deleteSelectedCart");
        }
      });
    },
    deleteCart(context, skuId) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录;
          deleteCart([skuId]).then(() => {
            getCartList().then((res) => {
              context.commit("setCartList", res.result);
            });
          });
        } else {
          //未登录
          context.commit("deleteCart", skuId);
          resolve();
        }
      });
    },
    insertCart(context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          //已经登录,发请求
          insertCartList({ skuId: payload.skuId, count: payload.count }).then(
            () => {
              getCartList().then((res) => {
                context.commit("setCartList", res.result);
              });
            }
          );
        } else {
          context.commit("insertCart", payload);
          resolve();
        }
      });
    },
    updateCart(context) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 登录 TODO
          getCartList().then((res) => {
            context.commit("setCartList", res.result);
          });
        } else {
          const promiseArr = context.state.list.map((item) => {
            // 返回接口函数的调用
            return getNewCartState(item.skuId);
          });
          Promise.all(promiseArr)
            .then((dataArr) => {
              dataArr.forEach((data, i) => {
                context.commit("updateCart", {
                  skuId: context.state.list[i].skuId,
                  ...data.result,
                });
              });
              resolve();
            })
            .catch((e) => {
              reject(e);
            });
        }
      });
    },
    delGoods(context, payload) {
      return new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          //已经登录 TODO
        } else {
          //未登录
          context.commit("delGoods", payload);
          resolve();
        }
      });
    },
    checkedOne(context, payload) {
      new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          //已经登录
          updateCart({
            skuId: payload.skuId,
            selected: !payload.selected,
          }).then(() => {
            getCartList().then((res) => {
              context.commit("setCartList", res.result);
            });
          });
        } else {
          //未登录
          context.commit("checkedOne", payload);
          resolve();
        }
      });
    },
    checkedAll(context, selected) {
      new Promise((resolve, reject) => {
        if (context.rootState.user.profile.token) {
          // 已登录
          const ids = context.getters.validList.map((item) => {
            return item.skuId;
          });
          checkedAllCart({ selected, ids })
            .then(() => {
              return getCartList();
            })
            .then((res) => {
              context.commit("setCartList", res.result);
              resolve();
            });
        } else {
          context.getters.validList.forEach((item) => {
            context.commit("updateCart", {
              skuId: item.skuId,
              selected,
            });
          });
        }
      });
    },
  },
};
