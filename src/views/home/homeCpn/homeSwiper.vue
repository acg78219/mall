<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
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
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>
