<template>
  <div class="check-button" :class="{active:isActive}">
    <img src="~/assets/img/shopbag/tick.svg" alt="" >
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isActive: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .check-button {
    border: 1px solid #666;
    border-radius: 50%;
  }
  .active {
    background-color: red;
    border-color: red
  }
</style>
