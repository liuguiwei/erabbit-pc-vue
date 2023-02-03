<template>
  <div class="app-header-cart">
    <div class="cart">
      <router-link to="/cart" class="curr">
        <i class="iconfont icon-shopping-cart"></i>
        <em>{{$store.state.cart.list.length}}</em>
      </router-link>
    </div>
    <div class="layer" v-if="$store.getters['cart/validList'].length>0&&$route.path!=='/cart'">
      <div class="list">
        <div class="item" v-for="item in $store.getters['cart/validList']" :key="item.shuId">
          <router-link :to="`/product/${item.id}`">
            <img :src="item.picture" alt />
            <div class="center">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="attr">{{item.attrsText}}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{item.nowPrice}}</p>
              <p class="count">x{{item.count}}</p>
            </div>
          </router-link>
          <i class="iconfont icon-guanbi" @click="$store.dispatch('cart/delGoods',item.skuId)"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{$store.getters['cart/validTotal']}} 件商品</p>
          <p>&yen;{{$store.getters['cart/validMount']}}</p>
        </div>
        <XtxButton @click.native="$router.push('/cart')" type="plain">去购物车结算</XtxButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-header-cart",
  created () {
    this.$store.dispatch("cart/updateCart")
  }
}
</script>

<style lang="less" scoped>
.app-header-cart {
  position: relative;
  z-index: 100;
  &:hover .layer {
    transform: none;
    opacity: 1;
  }
  .cart {
    width: 50px;
    .curr {
      display: block;
      position: relative;
      height: 32px;
      text-align: center;
      .icon-shopping-cart {
        font-size: 26px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: @helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
  .layer {
    position: absolute;
    opacity: 0;
    transition: all 0.3s;
    transform: translateY(-200px) scale(1, 0);
    top: 50px;
    right: 0;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    .list {
      height: 310px;
      padding: 0 10px;
      background-color: #fff;
      overflow: auto;
      .item {
        position: relative;
        border-bottom: 1px solid #f5f5f5;
        a {
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
          }
          .center {
            width: 200px;
            padding: 10px;
            .name {
              font-size: 16px;
            }
            .attr {
              padding-top: 5px;
              color: #999;
            }
          }
          .right {
            width: 100px;
            padding-right: 20px;
            text-align: center;
            .price {
              font-size: 16px;
              color: @priceColor;
            }
            .count {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
          }
        }
        i {
          position: absolute;
          bottom: 38px;
          right: 0;
          opacity: 0;
          color: #666;
          transition: all 0.5s;
        }
        &:hover {
          i {
            opacity: 1;
            cursor: pointer;
          }
        }
      }
    }
    .foot {
      position: absolute;
      left: 0;
      bottom: 50px;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;
      .total {
        padding-left: 10px;
        color: #999;
        p {
          &:last-child {
            font-size: 18px;
            color: @priceColor;
          }
        }
      }
    }
    &::before {
      display: block;
      position: absolute;
      top: -10px;
      right: 14px;
      content: '';
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>