<template>
  <div class="goods-num">
    <div class="lable" v-if="this.lable">{{this.lable}}</div>
    <div class="num-box">
      <a href @click.prevent="changeNum(-1)">-</a>
      <input type="text" readonly v-model="count" />
      <a href @click.prevent="changeNum(1)">+</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsNum",
  props: {
    count: {
      type: Number,
      default: 1
    },
    maxNum: {
      type: Number,
      default: 10
    },
    minNum: {
      type: Number,
      default: 1
    },
    lable: {
      type: String,
      default: ''
    }
  },
  methods: {
    changeNum (step) {
      this.count += step
      if (this.count > this.maxNum) {
        this.count = this.maxNum
      } else if (this.count < this.minNum) {
        this.count = this.minNum
      }
      this.$emit('changNum', this.count)
    }
  }
}
</script>

<style lang="less" scoped>
.goods-num {
  display: flex;
  align-items: center;
  .lable {
    margin-right: 15px;
  }
  .num-box {
    a {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      color: #666;
      text-align: center;
      background-color: #f8f8f8;
      border: 1px solid #e4e4e4;
    }
    input {
      width: 60px;
      height: 31px;
      text-align: center;
      border: 1px solid #e4e4e4;
    }
  }
}
</style>