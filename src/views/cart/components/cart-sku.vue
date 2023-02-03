<template>
  <div class="cart-sku">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{attrsText}}</span>
      <i class="iconfont icon-angledown"></i>
    </div>
    <div class="layer" v-if="isShowLayer">
      <GoodsSku v-if="goods" :goods="goods" :skuId="skuId" @change="changeSku" />
      <xtxButton v-if="goods" size="mini" type="primary" @click.native="submitSku()">确定</xtxButton>
      <div class="loading" v-if="!goods"></div>
    </div>
  </div>
</template>

<script>
import GoodsSku from "@/views/goods/components/goods-sku.vue"
import { getGoodsSpacesAndSkus } from "@/api/product"
import XtxButton from '@/components/library/xtx-button.vue'
export default {
  name: "CartSku",
  components: { GoodsSku, XtxButton },
  props: {
    attrsText: {
      type: String,
      require
    },
    skuId: {
      type: String
    }
  },
  data () {
    return {
      isShowLayer: false,
      goods: null,
      currentSku: null
    }
  },
  methods: {
    submitSku () {
      if (this.currentSku && this.currentSku.skuId && this.currentSku.skuId !== this.skuId) {
        this.$emit('change', this.currentSku)
      }
      this.close()
    },
    changeSku (sku) {
      this.currentSku = sku
    },
    open () {
      this.isShowLayer = true
      getGoodsSpacesAndSkus(this.skuId).then(res => {
        this.goods = res.result
      })
    },
    close () {
      this.isShowLayer = false
    },
    toggle () {
      this.isShowLayer ? this.close() : this.open()
    }
  }
}
</script>

<style lang="less" scoped>
.cart-sku {
  display: inline-block;
  position: relative;
  height: 28px;
  padding-left: 5px;
  margin-top: 10px;
  border: 1px solid #f5f5f5;
  cursor: default;
  .attrs {
    display: flex;
    line-height: 24px;
    span {
      max-width: 220px;
      font-size: 14px;
      color: #999;
    }
    i {
      font-size: 25px;
      color: #999;
    }
  }
  .layer {
    position: absolute;
    z-index: 10;
    left: -1px;
    top: 40px;
    width: 400px;
    padding-left: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    border-radius: 4px;
    &::before {
      position: absolute;
      left: 12px;
      top: -7px;
      content: '';
      width: 12px;
      height: 12px;
      background: #fff;
      border-top: 1px solid @xtxColor;
      border-left: 1px solid @xtxColor;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      background: url(../../../assets/images/loading.gif) no-repeat center;
      height: 224px;
    }
  }
}
</style>