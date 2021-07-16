<template>
  <div class="toast" v-show="isShow">
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    message: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /*  移动到正中央  */
  padding: 10px 14px;
  font-size: 20px;
  background-color: rgba(0,0,0,0.6);
  color: #fff;
  z-index: 999;
}
</style>
