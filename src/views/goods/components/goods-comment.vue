<template>
  <div class="goods-comment">
    <div class="head">
      <div class="data">
        <p>
          <span>{{commentListInfo.salesCount}}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{commentListInfo.praisePercent}}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说:</div>
        <div class="dd">
          <a
            href="javascript:;"
            v-for="(tag,index) in commentListInfo.tags"
            :key="index"
            @click="changeTag(tag,index)"
            :class="{active:currentIndex===index}"
          >{{tag.title}}({{tag.tagCount}})</a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序:</span>
      <a href="JavaScript:;" :class="{active:params.sortField===null}" @click="changeSort(null)">默认</a>
      <a
        href="JavaScript:;"
        :class="{active:params.sortField==='createTime'}"
        @click="changeSort('createTime')"
      >最新</a>
      <a
        href="JavaScript:;"
        :class="{active:params.sortField==='praiseCount'}"
        @click="changeSort('praiseCount') "
      >最热</a>
    </div>
    <div class="list">
      <div class="item" v-for="item in commentListPage.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt />
          <span>{{item.member.nickname}}</span>
        </div>
        <div class="body">
          <div class="score">
            ⭐⭐⭐⭐⭐
            <span class="attr">{{getGoodsAttr(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <div class="img-box" v-if="item.pictures.length">
            <ul>
              <li
                v-for="(img,index) in item.pictures"
                :key="index"
                @click="imgUrl=img"
                :class="{active:img===imgUrl}"
              >
                <img :src="img" />
              </li>
            </ul>
            <div class="big-img" v-if="imgUrl">
              <img :src="imgUrl" alt />
              <i class="iconfont icon-guanbi" @click="imgUrl=null"></i>
            </div>
          </div>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan">
              <i class="iconfont icon-dianzan"></i>
              {{item.praiseCount}}
            </span>
          </div>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="commentListPage.counts"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script> 
import { getCoomentListInfo, getCoomentListPage } from "@/api/product"
import { Pagination } from "element-ui"
export default {
  name: "GoodsComment",
  components: {
    elPagination: Pagination
  },
  created () {
    this.getCoomentList()
  },
  data () {
    return {
      commentListInfo: {},
      commentListPage: {},
      currentIndex: 0,
      imgUrl: null,
      params: {
        page: 1,
        pageSize: 10,
        hasPicture: null,
        tag: null,
        sortField: null
      },
    }
  },
  watch: {
    params: {
      handler () {
        getCoomentListPage(this.$route.params.id, this.params).then(res => {
          console.log(res.result)
          this.commentListPage = res.result
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async getCoomentList () {
      const { result } = await getCoomentListInfo(this.$route.params.id)
      result.tags.unshift({ title: '有图', tagCount: result.hasPictureCount, type: 'picture' })
      result.tags.unshift({ title: '全部评价', tagCount: result.evaluateCount, type: 'all' })
      this.commentListInfo = result
    },
    changeSort (sortField) {
      this.params.sortField = sortField
      this.params.page = 1
    },
    changeTag (type, index) {
      this.currentIndex = index
      this.params.page = 1
      if (type.type && type.type === 'all') {
        this.params.hasPicture = false
        this.params.tag = null
      }
      else if (type.type && type.type === 'picture') {
        this.params.hasPicture = true
        this.params.tag = null
      }
      else {
        this.params.tag = type.title
        this.params.hasPicture = false
      }
    },
    getGoodsAttr (arr) {
      let attrString = ''
      arr.forEach((item, index) => {
        attrString += item.name + ':' + item.nameValue
      })
      return attrString
    },
    handleCurrentChange (val) {
      this.params.page = val
    }
  }
}
</script>

<style lang="less" scoped>
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      display: flex;
      width: 340px;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:nth-child(2) {
            color: #999;
            font-size: 14px;
          }
        }
      }
    }
    .tags {
      display: flex;
      width: 600px;
      border-left: 1px solid #f5f5f5;
      .dt {
        width: 100px;
        height: 124px;
        line-height: 42px;
        text-align: right;
        font-size: 14px;
        color: #333;
        font-weight: 700;
      }
      .dd {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        height: 124px;
        a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    width: 900px;
    height: 60px;
    padding: 20px;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    span {
      padding-right: 20px;
      color: #666;
    }
    a {
      padding: 0 15px;
      color: #333;
      &.active {
        color: @xtxColor;
      }
    }
  }
  .list {
    width: 940px;
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      .user {
        width: 160px;
        height: 115px;
        span {
          padding-left: 10px;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .img-box {
      width: 720px;
      line-height: 130px;
      ul {
        display: flex;
        padding: 10px;
        li {
          width: 120px;
          height: 120px;
          line-height: 118px;
          margin-right: 5px;
          text-align: center;
          border: 1px solid #f5f5f5;
          &.active {
            border: 1px solid @xtxColor;
          }
          img {
            height: 130px;
          }
        }
      }
      .big-img {
        position: relative;
        width: 480px;
        height: 480px;
        border: 1px solid #f5f5f5;
        text-align: center;
        img {
          width: 100%;
        }
        i {
          position: absolute;
          right: 0;
          top: 0;
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.2);
          color: #fff;
          font-size: 10px;
          line-height: 10px;
        }
      }
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
    ::v-deep .el-pagination {
      height: 50px;
      width: 410px;
      margin: 0 auto;
    }
  }
}
</style>