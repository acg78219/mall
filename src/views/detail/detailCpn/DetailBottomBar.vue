<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToBag">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToBag() {
      this.$emit("addToBag")
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background-color: #fff;
  position: relative;
  display: flex;
  text-align: center;
}

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
  }

  .service {
    background: url("~assets/img/detail/客服.svg") 0 0/110%;
  }

  .shop {
    background: url("~assets/img/detail/店铺.svg") 0 0/102%;
  }

  .select {
    background: url("~assets/img/detail/自定义.svg") 0 0/105%;
  }

  .bar-left .service {
    background-position: 0 -49px;
  }

  .bar-left .shop {
    background-position: 0 -88px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 49px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }



</style>
