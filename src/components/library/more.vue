<template>
  <div class="more">
    <router-link :to="path">
      <span>查看全部</span>
      <i class="iconfont icon-xiayiyeqianjinchakangengduo"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "More",
  props: {
    path: {
      type: String,
      default: "/"
    }
  }
}
</script>

<style lang="less" scoped>
.more {
  a {
    span {
      margin-right: 4px;
      font-size: 16px;
      color: #999;
    }
    i {
      position: relative;
      top: 2px;
      font-size: 18px;
      color: #ccc;
    }
    &:hover {
      span,
      i {
        color: @xtxColor;
      }
    }
  }
}
</style>