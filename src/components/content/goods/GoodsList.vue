<template>
  <div class="good-list" >  <!--  这是商品展示的父组件  -->
  <!--  内容也是一个个子组件，所以父组件只写逻辑和传递数据。父组件从 home 里拿到对应的数据（列表，对象的集合），
  然后有多少条就创造多少个子组件，接着向每一个子组件传递对应商品的数据（对象，里面有每个商品的链接、价格等）-->
    <good-list-item v-for="(item, index) in goods" :key="index" :goods-item="item" ></good-list-item>
  </div>
</template>

<script>
import GoodListItem from "@/components/content/goods/GoodListItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style scoped>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
