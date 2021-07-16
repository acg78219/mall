<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper/index.js'
export default {
  name: "homeSwiper",
  props: {
    banners: {
      type: Array,
      data() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      if(!this.isLoad) {  // 如果图片还没有发射过一次，发射事件
        this.$emit('bigImgLoad')
        this.isLoad = true  // 设置为true，这样事件只会发射一次
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>
