<script>
import BreadItem from "./bread-item.vue"
export default {
  render (h) {
    const items = this.$slots.default
    const arrItems = []
    items.forEach((item, index) => {
      arrItems.push(item)
      if (items.length - 1 > index) {
        arrItems.push(h("i", { class: "iconfont icon-xiayiyeqianjinchakangengduo" }))
      }
    })
    return h("div", { class: "bread" }, arrItems)
  },
  name: "Bread",
  components: {
    BreadItem
  }
}
</script>

<style lang="less" scoped>
.bread {
  display: flex;
  line-height: 70px;
  padding-left: 10px;
  i {
    padding: 0 5px;
  }
}
</style>