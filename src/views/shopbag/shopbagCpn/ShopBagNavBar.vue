<template>
  <nav-bar class="nav-bar">
    <template #center>
      <div class="center-content">购物带({{length}})</div>
    </template>
  </nav-bar>
</template>

<script>
// 引入公用组件
import navBar from "@/components/common/navBar/navBar";
import {mapGetters} from 'vuex'
export default {
  name: "ShopBagNavBar",
  components: {
    navBar
  },
  computed: {
    // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
    // 解构mapGetters，用键值对的方式还可以起别名
    ...mapGetters({
      length: 'getListLength',
      list: 'getList'
    })
  }
}
</script>

<style scoped>

</style>
