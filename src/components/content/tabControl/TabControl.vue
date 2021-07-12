<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index"
    class="tab-control-item"
    :class="{active: index === currentIndex }"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      data() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      //子传父事件，点击时将事件发射给父组件。这里将点击时的 index 传到 “tabClick” 事件中并发射给父组件
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 44px;
    line-height: 44px;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding-bottom: 5px;
  }
  .active { /*  点击活跃状态的 css */
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
