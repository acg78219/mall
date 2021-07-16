<template>
 <div>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Detail">
      <component :is="Component" />
    </keep-alive>
  </router-view>
<!--  一个tabBar，多个tabBarItem -->
    <tab-bar>
        <tab-bar-item path="/home" active-color="red">
                            <!--  src里面用别名好像要用~ -->
        <template v-slot:item-icon>
          <img src="~assets/img/home/home.svg" alt="">
        </template>
        <template v-slot:item-icon2>
          <img src="~assets/img/home/home_active.svg" alt="">
        </template>
          <template v-slot:item-text>
            <div>首页</div>
          </template>

      </tab-bar-item>
      <tab-bar-item path="/category" active-color="blue">
        <template v-slot:item-icon>
          <img src="~assets/img/category/category.svg" alt="">
        </template>
        <template  v-slot:item-icon2>
          <img src="~assets/img/category/category_active.svg" alt="">
        </template>
        <template  v-slot:item-text>
          <div>分类</div>
        </template>

      </tab-bar-item>
      <tab-bar-item path="/shopbag">
        <template v-slot:item-icon>
          <img src="~assets/img/shopbag/shopbag.svg" alt="">
        </template>
        <template v-slot:item-icon2>
          <img src="~assets/img/shopbag/shopbag_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>购物带</div>
        </template>

      </tab-bar-item>
      <tab-bar-item path="/profile" active-color="red">
        <template v-slot:item-icon>
          <img src="~assets/img/profile/profile.svg" alt="">
        </template>
        <template v-slot:item-icon2>
          <img src="~assets/img/profile/profile_active.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>个人</div>
        </template>

      </tab-bar-item>
    </tab-bar>
 </div>
</template>

<script>
import tabBar from "@/components/common/tabBar/tabBar";
import tabBarItem from "@/components/common/tabBar/tabBarItem";

export default {
  name: "maintabBar",
  components: {
    tabBar,
    tabBarItem
  }
}
</script>

<style scoped>
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle; /* 中心对其，消除底部的像素 */
  margin-bottom: 1px;
  margin-top: 3px;
}
</style>
