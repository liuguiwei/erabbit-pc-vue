<template>
  <div class="member-home">
    <HomeOverView />
    <HomePanal title="我的收藏">
      <GoodsItem v-for="item in collectList" :key="item.id" :goods="item" />
    </HomePanal>
    <HomePanal title="我的足迹"></HomePanal>
  </div>
</template>
<script>
import HomeOverView from "./components/home-overview.vue"
import HomePanal from "./components/home-panel.vue"
import GoodsItem from "@/views/category/components/goods-item.vue"
import { getCollect } from "@/api/member"
export default {
  name: 'MemberHome',
  components: {
    HomeOverView,
    HomePanal,
    GoodsItem
  },
  created () {
    this.getCollect()
  },
  data () {
    return {
      queryInfo: {
        page: 1,
        pageSize: 4,
        collectType: 1
      },
      collectList: []
    }
  },
  methods: {
    getCollect () {
      getCollect(this.queryInfo).then(res => {
        this.collectList = res.result.items
        console.log(res)
      })
    }
  }
}
</script>
<style scoped lang="less">
// .member-home {

// }
</style>