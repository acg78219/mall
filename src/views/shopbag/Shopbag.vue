<template>
  <div class="shop-bag">
    <shop-bag-nav-bar class="nav-bar" />
    <shop-bag-list />
    <shop-bag-bot-bar />
  </div>
</template>

<script>
import ShopBagNavBar from "@/views/shopbag/shopbagCpn/ShopBagNavBar";
import ShopBagList from "@/views/shopbag/shopbagCpn/ShopBagList";
import ShopBagBotBar from "@/views/shopbag/shopbagCpn/ShopBagBotBar";
export default {
  name: "Shopbag",
  components: {
    ShopBagNavBar,
    ShopBagList,
    ShopBagBotBar,
  }
}
</script>

<style scoped>
.shop-bag {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tine);
  font-size: 18px;
  color: #fff;
}
</style>
