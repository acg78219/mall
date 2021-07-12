<template>
  <div id="home">
    <navBar class="home_nav">
<!--  vue3 开始 slot 实例要在 template 或组件中使用 v-slot，语法糖为 # -->
      <template #center>购物街</template>
    </navBar>
    <scroll class="content" ref="scroll" :probe-type="3" @scrollPos="scrollPos"
    :pull-up-load="true" @loadMore="loadMore">
      <home-swiper :banners="banner" />
      <home-recommend :recommends="recommend" />
      <home-feature />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 公共组件
import navBar from "@/components/common/navBar/navBar";
import TabControl from "@/components/content/tabControl/TabControl";
import Scroll from "@/components/common/scroll/Scroll";
// 自己的组件
import homeSwiper from "@/views/home/homeCpn/homeSwiper";
import homeRecommend from "@/views/home/homeCpn/homeRecommend";
import homeFeature from "@/views/home/homeCpn/homeFeature";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";
//  数据请求
import {getHomeMultidata, getHomeGoods} from "@/network/home";    // 页面的数据请求可以创建一个单独的请求文件，这样逻辑更清晰
// 通信
import bus from "@/utils";
export default {
  name: "Home",
  data() {
    return {
      banner: null,
      dKeyword: null,
      keywords: null,
      recommend: null,
      goods: {
// 商品卡片，数据统一存放到一个对象中。而对象中每一类又单独是一个对象：
// page记录当前的数据的页数，因为有些数据很多，不能全部展示，所以进行分页操作，下拉增加页数
// list 存放数据个数， page 增加的时候 list 的容量也会增加
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop', // 这个数据记录当前展示的商品类型，使用在上面的 goods 中
      isShowBackTop: false
    }
  },
  components: {
    navBar,
    TabControl,
    Scroll,
    homeSwiper,
    homeRecommend,
    homeFeature,
    GoodsList,
    BackTop
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods('pop'); // 这样在 created 中只需要制定获取数据的类型即可
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
    bus.on('imgLoad',() => {  // 从 bus 事件总线那里收到 imgLoad 事件，调用 refresh()
      // 图片多的时候BS计算的高度会有问题，所以需要监听图片加载：
      // 当图片加载完成的时候刷新一次，重新计算
      this.$refs.scroll.scroll.refresh()  // 给scroll标签添加一个ref就可以访问子组件的数据了
    })
  },
  methods: {
    // 请求数据相关方法
    getHomeMultidata() {
      // requests 返回的是 promise
    getHomeMultidata().then(res => {
      this.banner = res.data.banner.list;
      this.dKeyword = res.data.dKeyword.list;
      this.keywords = res.data.keywords.list;
      this.recommend = res.data.recommend.list;
    })
    },
    getHomeGoods(type) {  // type 是请求数据的类型，流行\新款\精选
      const page = this.goods[type].page + 1; // 请求的 page 是对应类型的 page+1
      getHomeGoods(type, page).then(res => {
          //往对应对象的 list 中插入请求到的数据，...将数组进行解构，然后插入数据中
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1; // 更新 page
      })
    },
    //数据处理相关代码
    tabClick(index) {
      // 根据传进来的 index 判断要展示哪一类的商品
      switch (index) {
        case 0:
          this.currentType = 'pop'
              break
        case 1:
          this.currentType = 'new'
              break
        case 2:
          this.currentType = 'sell'
      }
    },
    // better-scroll 方法
    backTopClick() {
      this.$refs.scroll.scrollTo(0,0, 1000) // 调用子组件的方法
    },
    scrollPos(position) { // 监听滚动的位置
      this.isShowBackTop = (-position.y) >1000  // 向下滚y是负值，所以当-y>1000的时候，显示返回顶部的按钮
    },
    loadMore() {
      this.getHomeGoods(this.currentType) // 请求数据，只需要传入数据类型
      this.$refs.scroll.finishPullUp()  // 上拉完成
    }
  },
  computed: {
    showGoods() {
      // 向子组件传递对应类型的数据列表
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
/*  每个页面的顶部栏都有些许不同，所以不同的地方写在实例的组件中  */
#home {
  height: 100vh; /*  vh: viewport height 视口高度，这里设置视口高度的100% */
  position: relative;
}
.home_nav {
  background-color: var(--color-tine);
}
.content { /*  设置滚动内容的高度，因为具体页面的滚动高度不同，所以在页面中自定义设置 */
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
