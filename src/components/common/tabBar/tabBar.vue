<template>
<!--  tabBar是整个底部栏的组件，里面还能划分为首页等小组件 -->
  <div id="tab-bar">
<!--  小组件的内容不能写死，所以将其设置为插槽  -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabBar"
}
</script>

<style scoped>
  #tab-bar {
  display: flex;
  position: fixed;  /* fixed相对于body */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 3px rgba(100,100,100,0.05); /* x偏移  y偏移  模糊距离  颜色 */
}
</style>
