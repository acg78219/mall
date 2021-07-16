<template>
  <div class="bag-list">
    <scroll class="bag-list-scroll" ref="scroll">
<!--  每一个商品也是一个子组件  -->
      <shop-bag-list-item v-for="(item, index) in list" :key="index"
      :item-info="item" />
    </scroll>
  </div>
</template>

<script>
// 引入公用组件
import Scroll from "@/components/common/scroll/Scroll";
import {mapGetters} from 'vuex'
// 引入子组件
import ShopBagListItem from "@/views/shopbag/shopbagCpn/ShopBagListItem";
export default {
  name: "ShopBagList",
  components: {
    Scroll,
    ShopBagListItem,
  },
  activated() {
    // 有可能跳转到其他页面再返回购物袋页面，但Scroll只计算之前留在此页面的高度
    // 有可能添加商品后无法滚动，所以当点击回来时，我们要执行一次refresh重新计算高度
    this.$refs.scroll.refresh()
  },
  computed: {
    ...mapGetters({
      length: 'getListLength',
      list: 'getList'
    })
  }
}
</script>

<style scoped>
.bag-list {
  height: calc(100% - 44px - 48px - 40px);
}

.bag-list-scroll {
  height: 100%;
  overflow: hidden;
}
</style>
