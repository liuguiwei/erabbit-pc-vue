<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        :class="{active:active==='GoodsDetails'}"
        @click="active='GoodsDetails'"
      >商品详情</a>
      <a
        href="javascript:;"
        :class="{active:active==='GoodsComment'}"
        @click="active='GoodsComment'"
      >
        商品评价
        <span>(500+)</span>
      </a>
    </nav>
    <component :is="active" />
  </div>
</template>

<script>
import GoodsDetails from "./goods-details.vue"
import GoodsComment from "./goods-comment.vue"
export default {
  name: "GoodsTabs",
  components: {
    GoodsDetails, GoodsComment
  },
  data () {
    return {
      active: 'GoodsDetails'
    }
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
  width: 940px;
  min-height: 500px;
  background-color: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #f5f5f5;
    a {
      display: inline-block;
      position: relative;
      height: 69px;
      font-size: 18px;
      padding: 0 40px;
      color: #333;
      &.active {
        &::after {
          position: absolute;
          left: 40px;
          bottom: 0;
          width: 72px;
          height: 2px;
          background-color: @xtxColor;
          content: '';
        }
      }
    }
    & :first-child {
      border-right: 1px solid #f5f5f5;
    }
  }
}
</style>