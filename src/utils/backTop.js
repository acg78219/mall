import BackTop from "@/components/content/backTop/BackTop";
// 混入，相当于类的继承
export const backTop = {
  data() {
    return {
      isShowBackTop: false,  // 是否显示返回顶部的按钮
    }
  },
  components: {
    BackTop
  }
}
