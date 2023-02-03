<template>
  <div class="product" v-if="product">
    <div class="container">
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem :to="`/category/${product.categories[1].id}`">{{product.categories[1].name}}</BreadItem>
        <BreadItem :to="`/category/sub/${product.categories[0].id}`">{{product.categories[0].name}}</BreadItem>
      </Bread>
      <div class="product-info">
        <div class="media">
          <GoodsImage :images="product.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="product" :num="num" />
          <GoodsSku :goods="product" @change="changeSku" />
          <GoodsNum
            @changNum="changeNum"
            :maxNum="product.inventory>10?10:product.inventory"
            :minNum="1"
            lable="数量"
          />
          <XtxButton type="primary" style="margin-top:20px" @click.native="insertCart">加入购物车</XtxButton>
        </div>
      </div>
      <div class="product-footer">
        <div class="container">
          <GoodsTabs />
          <GoodsWarn />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProduct } from "@/api/product"
import Bread from "@/components/library/bread.vue"
import GoodsImage from "./components/goods-image.vue"
import GoodsSales from "./components/goods-sales.vue"
import GoodsName from "./components/goods-name.vue"
import GoodsSku from "./components/goods-sku.vue"
import GoodsNum from "./components/goods-num.vue"
import GoodsTabs from './components/goods-tabs.vue'
import GoodsWarn from './components/goods-warn.vue'
import { Message } from 'element-ui'
export default {
  components: { Bread, GoodsImage, GoodsSales, GoodsName, GoodsSku, GoodsNum, GoodsTabs, GoodsWarn },
  name: "GoodsIndex",
  provide () {
    return {
      product: () => {
        return this.product
      }
    }
  },
  data () {
    return {
      product: null,
      //购物车数量
      num: 1,
      //当前选择的规格
      currentSku: {}
    }
  },

  methods: {
    async getProduct (id) {
      const { result } = await getProduct(id)
      this.product = result
      console.log(this.product)
    },
    changeSku (sku) {
      if (sku.skuId) {
        this.product.price = sku.price
        this.product.oldPrice = sku.oldPrice
        this.product.inventory = sku.inventory
      }
      this.currentSku = sku
    },
    changeNum (num) {
      this.num = num
    },
    insertCart () {
      if (!this.currentSku.skuId) return Message.warning('请选择完整规格')
      this.$store.dispatch('cart/insertCart', {
        skuId: this.currentSku.skuId,
        picture: this.product.mainPictures[0],
        price: this.currentSku.price,
        nowPrice: this.currentSku.price,
        count: this.num,
        attrsText: this.currentSku.spaceText,
        selected: true,
        stock: this.currentSku.inventory,
        isEffective: true,
        id: this.product.id,
        name: this.product.name
      }
      )
      Message.success('添加购物车成功 ')
    }
  },
  watch: {
    '$route.params.id': {
      handler (newId) {
        this.getProduct(newId)
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.product-info {
  display: flex;
  background-color: #fff;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    padding: 30px 50px;
  }
}
.product-footer {
  margin-top: 20px;
}
</style>