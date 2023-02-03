<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleOption" :class="{active:show}">
      <span class="placeholder" v-if="!cityResult.cityFullName">{{title}}</span>
      <span
        class="value"
        v-if="cityResult.cityFullName&&showCityFullName"
      >{{cityResult.cityFullName}}</span>
      <i class="iconfont icon-jiangxu"></i>
    </div>
    <div class="option" v-if="show">
      <span
        class="ellipsis"
        v-for="item in cityArea"
        :key="item.code"
        @click="selectCity(item)"
      >{{item.name}}</span>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'City',
  props: {
    title: {
      type: String,
      default: "请选择地址"
    },
    showCityFullName: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      cityData: [],
      show: false,
      cityArea: [],
      cityResult: {
        provinceName: '',
        provinceCode: '',
        cityName: '',
        cityCode: '',
        countyName: '',
        countyCode: '',
        cityFullName: ""
      }
    }
  },
  methods: {
    open () {
      this.cityResult.cityFullName = ""
      this.getcityData()
      this.show = true
    },
    close () {
      this.show = false
      this.cityArea = this.cityData
    },
    toggleOption () {
      this.show ? this.close() : this.open()
    },
    getcityData () {
      if (window.cityData) {
        this.cityData = window.cityData
      }
      else {
        const url = "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
        axios.get(url).then(res => {
          window.cityData = res.data
          this.cityData = window.cityData
          this.cityArea = this.cityData
        })
      }
    },
    selectCity (item) {
      if (item.level === 0) {
        this.cityResult.provinceName = item.name
        this.cityResult.provinceCode = item.code
        this.cityArea = item.areaList
      }
      else if (item.level === 1) {
        this.cityResult.cityName = item.name
        this.cityResult.cityCode = item.code
        this.cityArea = item.areaList
      }
      else {
        this.cityResult.countyName = item.name
        this.cityResult.countyCode = item.code
        this.cityResult.cityFullName = this.cityResult.provinceName + this.cityResult.cityName + this.cityResult.countyName
        this.$emit("getCity", this.cityResult)
        this.close()
      }

    }
  }
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>