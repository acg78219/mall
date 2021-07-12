<template>
  <div class="wrapper" ref="wrapper">   <!--  给div一个ref，方便 bs 绑定  -->
    <div class="content">   <!--  bs只会作用于第一个子元素，所以用div将slot包起来  -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: { // 是否触发上拉事件
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BSscroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,   // 父组件调用时候自己决定，因为默认3的话会影响性能
      pullUpLoad: this.pullUpLoad
    })
    this.scroll.on('pullingUp', () => {
      this.$emit("loadMore")
    })
    this.scroll.on('scroll', (position) => {
      this.$emit('scrollPos', position) //将 position 发射给调用的组件
    })
  },
  methods: {
    // 将插件的方法封装到自己的方法里，这样父组件调用时结构更加清晰
    scrollTo(x, y, time=500) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()  // 上拉事件完成，以便执行下一次下拉操作
    }
  }
}
</script>

<style scoped>

</style>
