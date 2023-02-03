<template>
  <div class="home-brand">
    <HomePanel title="热门品牌" subTitle="国际金典 品质保证">
      <template #right>123</template>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from "./home-panel.vue"
export default {
  name: "HomeBanner",
  components: {
    HomePanel
  }
}
</script>

<style lang="scss" scoped>
</style>