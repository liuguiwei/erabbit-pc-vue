<template>
  <div class="goods-sku">
    <dl v-for="(item,index) in specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="subItem in item.values">
          <img
            v-if="subItem.picture"
            @click="changeSku(item,subItem,index)"
            :class="[{active:subItem.selected},{disabled:subItem.disabled}]"
            :src="subItem.picture"
            :title="subItem.name"
            :key="subItem.name"
            alt
          />
          <span
            @click="changeSku(item,subItem,index)"
            v-else
            :key="subItem.name"
            :class="[{active:subItem.selected},{disabled:subItem.disabled}]"
          >{{subItem.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
import getPowerSet from "@/vender/poweSet"
export default {
  name: "GoodsSku",
  props: {
    goods: {
      type: Object,
    },
    skuId: {
      type: String
    }
  },
  created () {
    this.getnewSpecs()
    this.getMapPath()
    this.initDisabled(this.specs, this.pathMap)
    this.initSelected(this.skuId)
  },
  data () {
    return {
      specs: [],
      pathMap: {}
    }
  },
  methods: {
    initSelected (skuId) {
      if (!skuId) return
      const sku = this.goods.skus.find(item => {
        return item.id === skuId
      })
      this.specs.forEach(item => {
        item.values.forEach(item => {
          sku.specs.forEach(i => {
            if (i.valueName === item.name) {
              item.selected = true
            }
          })
        })
      })
    },
    //获取规格数据 
    getnewSpecs () {
      const newSpecs = this.goods.specs.map(item => {
        //给每个value添加属性disabled为false
        item.values.forEach(value => {
          value.disabled = false
          value.selected = false
          // return { ...value, disabled: false, selected: false }
        })
        return item
        // item.active = null ？
        // return item ？
        //添加是否激活的状态
      })
      this.specs = newSpecs
    },
    //用户选取规格事件
    changeSku (item, subItem) {
      if (subItem.disabled) return
      if (subItem.selected) {
        subItem.selected = false
      }
      else {
        item.values.forEach(value => {
          value.selected = false
        })
        subItem.selected = true
      }
      this.$forceUpdate()
      //const selectedArr = this.getSlectedArry(this.specs)
      this.updateDisabled(this.specs, this.pathMap)
      const selectedArr = this.getSlectedArry(this.specs).filter(item => { return item !== 'undefined' })
      //将规格数据传递给父组件
      if (selectedArr.length === this.specs.length) {
        const skuId = this.pathMap[selectedArr.join('*')][0]
        const sku = this.goods.skus.filter(item => { return item.id === skuId })[0]
        let spaceText = sku.specs.reduce((p, c) => {
          return p + c.name + ":" + c.valueName + " "
        }, '')
        this.$emit('change',
          {
            skuId: sku.id,
            oldPrice: sku.oldPrice,
            price: sku.price,
            inventory: sku.inventory,
            spaceText
          }
        )
      } else {
        this.$emit('change', {})
      }
    },
    //获取选中(selected为true)的value.name集合
    getSlectedArry (specs) {
      const selectedArr = []
      specs.forEach(item => {
        const selectedValue = item.values.find(value => {
          return value.selected
        })
        let selectedValueName = selectedValue ? selectedValue.name : "undefined"
        selectedArr.push(selectedValueName)
      })
      return selectedArr
    },
    //初始化disable按钮
    initDisabled (specs, pathMap) {
      specs.forEach(item => {
        item.values.forEach(value => {
          value.disabled = pathMap[value.name] ? false : true
        })
      })

    },
    //获取按钮是否可以点击
    updateDisabled (specs, pathMap) {
      specs.forEach((item, index) => {
        const selectedArr = this.getSlectedArry(this.specs)
        item.values.forEach(value => {
          if (value.selected) {
            return
          } else {
            selectedArr[index] = value.name
            const key = selectedArr.filter(item => {
              return item !== "undefined"
            }).join("*")
            value.disabled = !pathMap[key]
          }

        })
      })

    },
    // 获取路径集合
    getMapPath () {
      const skus = this.goods.skus
      const spliter = '*'
      const pathMap = {}
      skus.forEach(sku => {
        if (sku.inventory > 0) {
          const arrValue = sku.specs.map(item => {
            return item.valueName
          })
          const poweSet = getPowerSet(arrValue)
          poweSet.forEach(item => {
            if (item.length) {
              const key = item.join(spliter)
              if (pathMap[key]) {
                pathMap[key].push(sku.id)
              }
              else {
                pathMap[key] = [sku.id]
              }
            }
          })
        }
      })
      this.pathMap = pathMap
    }
  }
}
</script>

<style lang="less" scoped>
.goods-sku {
  .active {
    border: 1px solid @xtxColor;
  }
  .disabled {
    cursor: not-allowed;
    opacity: 0.6;
    border-style: dashed;
  }
  dl {
    display: flex;
    align-items: center;
    margin: 10px 0;
    dt {
      padding-right: 15px;
    }
    dd {
      flex: 1;
      img {
        width: 50px;
        height: 50px;
        margin-left: 10px;
        cursor: pointer;
      }
      span {
        display: inline-block;
        margin-right: 15px;
        margin-bottom: 10px;
        padding: 5px;
        line-height: 30px;
        color: #666;
        border: 1px solid #e4e4e4;
        text-align: center;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>