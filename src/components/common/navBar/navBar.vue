<template>
<!--  顶部导航栏，左中右都用 slot 具名插槽 -->
<!--  slot 用 div 包起来，防止编译时 slot 实例覆盖了 class -->
  <div class="navBar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "navBar"
}
</script>

<style scoped>
  .navBar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .left, .right {
    width: 60px;
  }
  .center {
    flex: 1;
  }
</style>
