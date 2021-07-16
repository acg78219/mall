<template>
  <div class="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="nav-bar" />
    <scroll class="scroll-content" :probe-type="3" :pull-up-load="false"
            @scrollPos="scrollPos" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :base-info="baseInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :goods-info="detailInfo" @imgLoad="imgLoad" />
      <detail-params-info ref="paramsInfo" :param-info="paramInfo" />
      <detail-comment-info ref="commentInfo" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToBag="addToBag"/>
    <back-top @click="backTopClick" v-show="isShowBackTop"/>
    <toast :is-show="isShow" :message="message"/>
  </div>
</template>

<script>
// 引入子组件
import DetailNavBar from "@/views/detail/detailCpn/DetailNavBar";
import DetailSwiper from "@/views/detail/detailCpn/DetailSwiper";
import DetailBaseInfo from "@/views/detail/detailCpn/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/detailCpn/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/detailCpn/DetailGoodsInfo";
import DetailParamsInfo from "@/views/detail/detailCpn/DetailParamsInfo";
import DetailCommentInfo from "@/views/detail/detailCpn/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/detailCpn/DetailBottomBar";
import Toast from "@/components/common/toast/Toast";
// 引入公用组件
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import {backTop} from "@/utils/backTop";
import bus from "@/utils/bus";
import {debounce} from "@/utils/debounce";
// 引入数据处理
import {getDetailInfo, getRecommend, goodsBaseInfo, shop, goodsParam} from "@/network/detail";
export default {
  name: "Detail",
  mixins: [backTop],
  data() {
    return {
      refresh: null,
      iid: null,
      topImages: [],
      baseInfo: {},
      shop: {},
      detailInfo: {}, // 详情页面的数据
      paramInfo: {},  // 商品参数、尺寸等
      commentInfo: {}, // 评论信息
      recommends: [], //推荐
      contentToTop: [], // 各部分内容距离顶部的 offsetTop
      posY: null, // y 值
      currentIndex: null,
      message: '',
      isShow: false
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast,
  },
  created() {
    this.iid = this.$route.params.iid // 获取路由变量中的iid
    getDetailInfo(this.iid).then(res => {
      const data = res.result
      // 获取轮播图片列表
      this.topImages = data.itemInfo.topImages
      // 抽离出 baseInfo数据，整个成一个类
      this.baseInfo = new goodsBaseInfo(data.itemInfo, data.columns, data.services)  // 获取基本信息（价格、收藏...）
      // 获取店铺信息
      this.shop = new shop(data.shopInfo)
      // 获取详情信息的
      this.detailInfo = data.detailInfo
      // 获取商品寸尺、参数等信息
      this.paramInfo = new goodsParam(data.itemParams.info, data.itemParams.rule)
      // 当评论中的cRate不为零时，说明有评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]  // 数据中只爬取到一条
      }

    })
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
    bus.on('detailImgLoad', () => {
      this.refresh()
    })
  },
  methods: {
    imgLoad() {
      this.refresh()
      this.contentToTop = []
      this.contentToTop.push(0)
      this.contentToTop.push(this.$refs.paramsInfo.$el.offsetTop-44)
      this.contentToTop.push(this.$refs.commentInfo.$el.offsetTop-44)
      this.contentToTop.push(this.$refs.recommends.$el.offsetTop-44)
      this.contentToTop.push(Number.MAX_VALUE)  // 为了scrollPos的区间判断，插入一个最大值
    },
    titleClick(index) {
    this.$refs.scroll.scrollTo(0,-this.contentToTop[index],100)
  },
    scrollPos(position) {
      this.isShowBackTop = (-position.y) >1000  // 返回顶部的判断

      this.posY = -(position.y-44)  // 获取当前位置的 y 值
      let length = this.contentToTop.length
      //基本算法
          // 每次移动的时候都遍历一次，查看当前位置是在哪一个板块
          // for (let i =0; i<length; i++) {
          // 流程:
          // 1. 判断index是否等于i （减少执行if中的代码块）
          // 2. 判断当前位置在哪一个区间：
          //  2.1. 在前三个区间中的一个，判断下标和区间边界就可以
          //  2.3. 在最后一个区间，因为此时i+1会越界，所以判断i==length-1，同时只需要位置大于该区间的左边界即可
          // if ((this.currentIndex !== i) && ((i<length-1 && this.posY > this.contentToTop[i] && this.posY <= this.contentToTop[i+1])
          //   || (i===length-1 && this.posY >this.contentToTop[i]))) {
          //   // 找到对应的区间，赋值
          //   this.currentIndex = i
          //   // 改变nav-bar子组件中的currentIndex，同步顶部栏
          //   this.$refs["nav-bar"].currentIndex = this.currentIndex
          // }
          // }

    //  优化算法
      for (let i=0; i< length-1; i++) {
        if ((this.currentIndex !== i) && (this.posY > this.contentToTop[i] && this.posY <= this.contentToTop[i+1])) {
          this.currentIndex = i
          this.$refs["nav-bar"].currentIndex = this.currentIndex
        }
      }

    },

    backTopClick() {
      this.$refs.scroll.scrollTo(0,0,100)
    },

    addToBag() {  // 点击添加到购物车后的事件
      // 购物车中要展示的信息的对象
      const product = {}
      //图片、标题、描述、价格
      product.image = this.topImages[0]
      product.title = this.baseInfo.title
      product.desc = this.baseInfo.desc
      product.price = this.baseInfo.realPrice
      product.iid = this.iid // 客户添加商品的唯一标识
      // 在actions中写Promise，返回res
      this.$store.dispatch('addToBag',product).then(res => {
        this.message = res
        this.isShow = true

        setTimeout(() => {
          this.isShow = false
        }, 2000)
      })
    }
  },


}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 44px;
}
.scroll-content {
  height: calc(100% - 44px - 49px);
}
</style>
