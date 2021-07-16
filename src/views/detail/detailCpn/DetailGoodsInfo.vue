<template>
<!--  判断传进来的对象有没有描述信息，有的话就展示 -->
  <div v-if="Object.keys(goodsInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{goodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{goodsInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in goodsInfo.detailImage[0].list" :key="index"
           @load="imgLoad" :src="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      count: 0, // 记录当前加载完图片的个数
      imgList: 0, //数据中图片的个数
    }
  },
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  updated() {
    this.imgList = this.goodsInfo.detailImage[0].list.length
  },
  methods: {
    imgLoad() {
      if (++this.count === this.imgList) {
        // 每次count自增1，直到等于图片个数时，发射事件给父组件让其更新scroll
        this.$emit('imgLoad')
      }
    }
  },
}
</script>

<style scoped>
.goods-info {
  background-color: #fff;
}
.info-list img {
  width: 100%;
  height: 100%;
}
</style>
