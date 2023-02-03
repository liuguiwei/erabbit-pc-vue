<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{title}}
          <small>{{subTitle}}</small>
        </h3>
        <slot name="right" />
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePanel",
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="less" scoped>
.home-panel {
  background-color: #fff;
  .head {
    display: flex;
    align-items: center;
    width: 100%;
    height: 115px;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>