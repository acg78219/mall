<template>
<!--  每个小组件就是插槽，而小组件中的内容也写成插槽 -->
  <div class="tab-bar-item" @click="barClick">
<!--  插槽类型不一样，所以使用具名插槽  -->
<!--  因为最后实例模板的标签会直接覆盖掉slot，slot中的class等属性都会没有，所以最后用div包起来-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon2"></slot></div>
<!--  根据用户传进来的颜色，动态绑定style -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabBarItem",
  //动态传入路径
  props: {
    path:String,
    activeColor: {
      type: String,
      default: 'deepPink'
    }
  },
  computed: {
    //利用活跃路由来使当前页面高亮
    isActive(){
      //当前活跃路由包含传入的路由时，为1，要传布尔，所以和-1比较
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      //利用上面的isActive高亮来添加style样式
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    barClick(){
      //当点击小组件时，向$router推入path
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size:15px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle; /* 中心对其，消除底部的像素 */
  margin-bottom: 1px;
  margin-top: 3px;
}
</style>
