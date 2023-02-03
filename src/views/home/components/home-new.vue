<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉,品质靠谱">
      <template #right>
        <More />
      </template>
      <ul class="good-list">
        <li v-for="item in goodsList" :key="item.id">
          <router-link :to="`/product/${item.id}`">
            <img :src="item.picture" alt />
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">
              <i>￥</i>
              {{item.price}}
            </p>
          </router-link>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue'
import More from "@/components/library/more.vue"
import { getNew } from "@/api/home"
export default {
  name: "HomeNew",
  components: {
    HomePanel,
    More
  },
  created () {
    this.loadNew()
  },
  data () {
    return {
      goodsList: []
    }
  },
  methods: {
    async loadNew () {
      const { result } = await getNew()
      this.goodsList = result
    }
  }
}
</script>

<style lang="less" scoped>
.good-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
    &:hover {
      .hoverShadow();
    }
  }
}
</style>