<template>
  <div class="goods-item">
    <router-link :to="`/product/${goods.id}`">
      <img :src="goods.picture" />
      <p class="name ellipsis">{{goods.name}}</p>
      <p class="desc ellipsis">{{goods.desc}}</p>
      <p class="price">￥{{goods.price}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goods: {
      type: Object
    }

  }
}
</script>

<style lang="less" scoped>
.goods-item {
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  a {
    width: 100%;
    height: 300px;
    img {
      width: 160px;
      height: 160px;
    }
    p {
      padding-top: 10px;
    }
    .name {
      font-size: 16px;
    }
    .desc {
      color: #999;
      height: 29px;
    }
    .price {
      color: @priceColor;
      font-size: 20px;
    }
  }
  &:hover {
    .hoverShadow();
  }
}
</style>