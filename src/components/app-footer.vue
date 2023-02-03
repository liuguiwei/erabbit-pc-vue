<template>
  <div class="app-footer">
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客服服务</dt>
          <dd>
            <i class="iconfont icon-zaixiankefux"></i>在线客服
          </dd>
          <dd>
            <i class="iconfont icon-wentifankui"></i>问题反馈
          </dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd>
            <i class="iconfont icon-gongzhonghao"></i>公众号
          </dd>
          <dd>
            <i class="iconfont icon-weibo"></i>微博
          </dd>
        </dl>
        <dl>
          <dt>下载App</dt>
          <dd class="qrcode">
            <img src="../assets/images/qrcode.jpg" alt />
          </dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立即下载App</span>
            <a href>下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">
            400-0000-000
            <small>周一至周日 8:00-18:00</small>
          </dd>
        </dl>
      </div>
    </div>
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href>
            <i class="iconfont icon-shouye1"></i>
            <span>价格亲民</span>
          </a>
          <a href>
            <i class="iconfont icon-zan"></i>
            <span>物流快捷</span>
          </a>
          <a href>
            <i class="iconfont icon-wuliuguanli"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <div class="copyright">
          <ul>
            <li>
              <a href></a>关于我们
            </li>
            <li>
              <a href></a>帮助中心
            </li>
            <li>
              <a href></a>售后服务
            </li>
            <li>
              <a href></a>配送与验收
            </li>
            <li>
              <a href></a>商务合作
            </li>
            <li>
              <a href></a>搜索推荐
            </li>
            <li>
              <a href></a>友情链接
            </li>
          </ul>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="less" scoped>
.app-footer {
  .contact {
    height: 290px;
    background-color: #fff;
    .container {
      display: flex;
      padding: 60px 10px;
      dl {
        height: 190px;
        flex: 1;
        padding: 0 40px;
        text-align: center;
        color: #999;
        border-right: 1px solid #f2f2f2;
        &:last-child {
          border-right: none;
        }
        dt {
          font-size: 18px;
        }
        dd {
          float: left;
          width: 92px;
          height: 92px;
          margin: 36px 12px 0 0;
          border: 1px solid #ededed;
          .iconfont {
            display: block;
            font-size: 36px;
            color: #666;
          }
        }
      }
      .qrcode {
        padding: 7px;
      }
      .download {
        padding-top: 5px;
        font-size: 14px;
        width: auto;
        height: auto;
        border: none;
        span {
          display: block;
        }
        a {
          display: block;
          line-height: 1;
          padding: 10px 25px;
          margin-top: 5px;
          color: #fff;
          border-radius: 2px;
          background-color: @xtxColor;
        }
      }
      .hotline {
        padding-top: 20px;
        font-size: 22px;
        color: #666;
        width: auto;
        height: auto;
        border: none;
        text-indent: 40px;
        small {
          display: block;
          font-size: 15px;
          color: #999;
        }
      }
    }
  }
  .extra {
    background-color: #333;
    .slogan {
      display: flex;
      justify-content: space-between;
      height: 178px;
      width: 100%;
      border-bottom: 1px solid #434343;
      padding: 60px 100px;
      line-height: 58px;
      a {
        height: 58px;
        line-height: 58px;
        color: #fff;
        font-size: 28px;
        i {
          font-size: 50px;
          vertical-align: middle;
          margin-right: 10px;
          font-weight: 100;
        }
        span {
          vertical-align: middle;
          text-shadow: 0 0 1px #333;
        }
      }
    }
    .copyright {
      height: 170px;
      color: #999;
      padding-top: 40px;
      text-align: center;
      ul {
        display: flex;
        justify-content: center;
        li {
          padding: 0 10px;
          font-size: 15px;
          ~ li {
            border-left: 1px solid #999;
          }
        }
      }
      p {
        padding: 20px 0;
      }
    }
  }
}
</style>