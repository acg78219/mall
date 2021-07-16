<template>
  <div class="bottom-bar">
    <div class="bar-left">
      <check-button class="check-button" @click="checkedClick" :is-active="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="sum-up">
      合计：{{sumUp}}
    </div>
    <div class="calculate">
      去计算：{{amount}}
    </div>
  </div>
</template>

<script>
import CheckButton from "@/views/shopbag/shopbagCpn/CheckButton";
import {mapGetters} from "vuex";
export default {
  name: "ShopBagBotBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters({
      length: 'getListLength',
      list: 'getList'
    }),
    // 计算价格总和
    sumUp() {
      return "￥" + this.list.filter(item => {
        return item.checked  // filter过滤找到 checked 为 true 的元素
      }).reduce((preValue, item) => { // 合计一遍
        return preValue + item.price * item.count
      }, 0).toFixed(2)  // 保留两位小数
    },
    // 选中商品个数
    amount() {
      return this.list.filter(item => item.checked).length
    },
    isSelectAll() {
      // 首先当购物袋中没东西时是非全选状态
      if (this.list.length === 0) return false
      // 遍历购物袋看有没有找到checked为false的，找到取反就是false
      return !this.list.find(item => !item.checked)
    }
  },
  methods: {
    checkedClick() {
      // 当点击前为全选中的情况下：点击则为全不选中
      if(this.isSelectAll)  this.$store.commit('not_select_all')
      //  当点击前为不全部选中的情况下：点击则全选
      else                  this.$store.commit('select_all')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #e6e6e6;
  height: 40px;
  font-size: 18px;
}

.bar-left {
  display: flex;
  align-items: center;
  width: 100px;
  height: 100%;
  margin-left: 10px;
}

.check-button {
  width: 20px;
  margin-right: 5px;
}

.sum-up {
  flex: 1
}

.calculate {
  width: 100px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  background-color: orangered;
  color: #fff;
}
</style>
