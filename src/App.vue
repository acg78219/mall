<template>
  <div id="App">
    <maintabBar></maintabBar>
  </div>
</template>

<script>
import maintabBar from "@/components/content/maintabBar/maintabBar";
export default {
  name: 'App',
  components: {
    maintabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
