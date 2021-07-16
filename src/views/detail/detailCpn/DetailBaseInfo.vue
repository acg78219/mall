<template>
  <div class="base-info">
    <div class="title">{{baseInfo.title}}</div>
    <div class="price">
      <span class="real-price">{{baseInfo.newPrice}}</span>
      <span class="old-price">{{baseInfo.oldPrice}}</span>
      <span v-if="baseInfo.discount" class="acti-price">{{baseInfo.discount}}</span>
    </div>
    <div class="columns">
      <div v-for="(item,index) in baseInfo.columns" :key="index">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    baseInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
/*  标题  */
.base-info {
  background-color: #fff;
}
.title {
  font-size: 18px;
  color: black;
  padding: 10px 5px 10px 5px;
  text-indent: 0.5em; /*  首字母间距 */
  line-height: 23px;
}

/*  价格  */
.price {
  padding: 10px 0;
}
.real-price {
  font-size: 30px;
  color: var(--color-high-text);
  letter-spacing: -3px;
}
.old-price {
  margin-left: 10px;
  text-decoration: line-through;
}
.acti-price {
  margin: 20px 0 0 5px;
  padding: 5px;
  background-color: var(--color-tine);
  border-radius: 50%;
  color: #fff;
}
/*  其他信息  */
.columns {
  display: flex;
  justify-content: space-between;
  padding:10px 5px 10px 5px;
  border-bottom: 1px solid #e6e6e6;
}
</style>
