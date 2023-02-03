<template>
  <div class="goods-details" v-if="goods">
    <ul class="attrs">
      <li v-for="(item,index) in goods.details.properties" :key="index">
        <span class="dt">{{item.name}}</span>
        <span class="dd">{{item.value}}</span>
      </li>
    </ul>
    <img v-for="(item,index) in goods.details.pictures" :src="item" alt :key="index" />
  </div>
</template>

<script>
export default {
  name: "GoodsDetail",
  inject: ['product'],
  computed: {
    goods () {
      return this.product()
    }
  }
}
</script>

<style lang="less" scoped>
.goods-details {
  padding: 40px 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    li {
      line-height: 30px;
      width: 50%;
      font-size: 14px;
      .dt {
        display: inline-block;
        width: 100px;
        color: #999;
      }
      .dd {
        color: #666;
      }
    }
  }
  img {
    width: 100%;
  }
}
</style>