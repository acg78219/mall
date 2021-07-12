<template>
  <div class="goods-item">  <!--  商品卡片  -->
    <img :src="goodsItem.show.img" alt="" @load="imgLoad">
    <div class="goods-info">  <!--  商品卡片中的信息  -->
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
import bus from "@/utils";
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      // 当图片加载完成后，发射事件"imgLoad"到事件总线去
      // Vue3中bus就是事件总线，需要安装和引用
      bus.emit('imgLoad',)
    }
  }
}
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 4px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 30px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {  /*  收藏前面的图标 */
    content: '';
    position: absolute;
    left: -15px;
    top: -0.1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
