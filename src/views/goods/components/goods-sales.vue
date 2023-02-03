<template>
  <ul class="goods-sales">
    <li>
      <p>销售人气</p>
      <p>200+</p>
      <p>
        <i></i> 销售人气
      </p>
    </li>
    <li>
      <p>商品评价</p>
      <p>400+</p>
      <p>
        <i></i>查看评价
      </p>
    </li>
    <li>
      <p>收藏人气</p>
      <p>600+</p>
      <p>
        <i></i>收藏商品
      </p>
    </li>
    <li>
      <p>品牌信息</p>
      <p>苏宁电器</p>
      <p>
        <i></i>品牌主页
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "GoodsSales",
}
</script>

<style lang="less" scoped>
.goods-sales {
  display: flex;
  width: 400px;
  height: 140px;
  align-items: center;
  li {
    width: 100px;
    height: 80px;
    text-align: center;
    position: relative;
    &::after {
      position: absolute;
      top: 10px;
      left: 0;
      height: 60px;
      border-left: 1px solid #e4e4e4;
      content: '';
    }
    p {
      &:first-child {
        color: #999;
      }
      &:nth-child(2) {
        color: @priceColor;
        margin-top: 10px;
      }
      &:last-child {
        color: #666;
        margin-top: 10px;
        i {
          color: @xtxColor;
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>