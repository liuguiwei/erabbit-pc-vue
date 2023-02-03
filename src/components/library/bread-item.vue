<template>
  <div class="bread-item">
    <template v-if="to">
      <router-link :to="to">
        <slot></slot>
      </router-link>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: "BreadItem",
  props: {
    to: {
      type: [String, Array],
    }
  }
}
</script>

<style lang="less" scoped>
.bread-item {
  display: flex;
  a {
    &:hover {
      color: @xtxColor;
    }
  }
}
</style>