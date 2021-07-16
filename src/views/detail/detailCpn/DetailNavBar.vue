<template>
  <div class="nav-bar">
    <nav-bar>
      <template #left>
        <div class="nav-left" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>   <!--navBar的左边部分-->
      <template #center>
        <div class="nav-center">
          <div v-for="(item,index) in titles" :key="index"
               class="center-text" :class="{active: index === currentIndex}"
               @click="itemClick(index)">
            {{item}}
          </div>
        </div>
      </template> <!--navBar的中间部分-->
    </nav-bar>
  </div>
</template>

<script>
import navBar from "@/components/common/navBar/navBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  components: {
    navBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("titleClick", index)
    },
    backClick() {
      this.$router.back() // router堆栈中返回
    }
  }
}
</script>

<style scoped>
.nav-left img {
  margin-top: 10px;
}
.nav-center {
  width: 100%;
  height: 100%;
  display: flex;
}
.center-text {
  flex: 1;
}
.active {
  color: var(--color-high-text)
}

</style>
