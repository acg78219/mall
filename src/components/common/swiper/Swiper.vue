<template>
  <div id="mall-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">   <!--  这三个touch事件共同组成拖拽事件  -->
      <slot></slot> <!--  这个 slot 放图片-->
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">   <!--  图片下面的小圆点  -->
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: { // 每张图片停留的时间，设置 3 秒
      type: Number,
      default: 3000
    },
    animDuration: { // 设置动画过渡时间
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25 //  手动拖拽超过 1/4 的时候，吸附到下一张
    },
    showIndicator: {
      type: Boolean,  // 是否展示小圆点
      default: true
    }
  },
  data: function() {
    return {
      slideCount: 0,  //元素个数
      totalWidth: 0,  //swiper的宽度，是展示图片的宽度，不是所有图片加起来的宽度
      swiperStyle: {},  //swiper样式
      currentIndex: 1,  //当前的index，从1开始
      scrolling: false  //是否滚动
    }
  },
  mounted: function() {
  //  1.当挂载的时候执行 handleDom，操作 DOM，在前后添加 Slide
    setTimeout(() => {
      this.handleDom();

    //  2.开启定时器
      this.startTimer();
    }, 3000)
  },
  methods: {
  //  定时器操作
    startTimer() {
      // setInterval 会不断周期性地调用函数，这里是不断轮播图片，时间是 this.interval
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval)
    },
    stopTimer() {
      window.clearInterval(this.playTimer);   // 停止轮播事件
    },
    //  滚动图片
    scrollContent(currentPosition) {
    //  0.设置允许滚动
      this.scrolling = true;
    //  1.开始滚动动画
      this.swiperStyle.transition = 'transform' + this.animDuration + 'ms';
      this.setTransform(currentPosition); //setTransform 是移动到具体位置，包含在滚动中
    //  2.判断滚动到的位置
      this.checkPosition();
    //  3.滚动完成，停止滚动
      this.scrolling = false;
    },

  //  校验正确的位置
    checkPosition() {
      window.setTimeout(() => {
      //  1.校验正确的位置
        this.swiperStyle.transition = '0ms';  // 因为最后一张的时候需要返回第一张，所以设置动画时间为0秒
        // 如果轮播完一次图片就返回到第一张图
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

      //  2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex-1);
      }, this.animDuration)
    },

  //  设置要滚动到的位置
    setTransform(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;  // 水平移动
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },

  //  操作 DOM，在 DOM 前后添加 Slide
    handleDom() {
    //  1.获取要操作的元素
      let swiperEl = document.querySelector('.swiper'); // 获取轮播图组件元素
      let slidesEls = swiperEl.getElementsByClassName('slide'); // 一个图片就是一个 slide 的 div，所以这里返回列表

    //  2.保存个数
      this.slideCount = slidesEls.length; // 获取图片的个数

    //  3.如果大于 1 个，那么在前后分别添加一个 slide。如果不加slide的话，移动到末尾会反方向的移动回到第一张
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);  // cloneNode 是克隆列表项
        let cloneLast = slidesEls[this.slideCount-1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slidesEls[0]); // 在第一个元素之前插入 cloneLast
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth; // offsetWidth 返回整个盒子的宽度，包括border,padding,width
        this.swiperStyle = swiperEl.style;
      }
    //  4.让 swiper 元素显示第一个（目前是显示前面添加的最后一个元素）
      this.setTransform(-this.totalWidth);
    },

  //  拖动事件的处理
    touchStart(e) {
    //  1.如果正在滚动，不可以拖动
      if(this.scrolling) return;

    //  2.停止定时器
      this.stopTimer();

    //  3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove(e) {
    //  1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

    //  2.设置当前的位置
      this.setTransform(moveDistance);
    },

    touchEnd(e) {
    //  1.获取移动的位置
      let currentMove = Math.abs(this.distance);
    //  2.判断最终的距离
      if (this.distance === 0) {
        return
      }
      else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { //右边移动超过0.5
        this.currentIndex--
      }
      else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        this.currentIndex++
      }
    //  3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
    //  4.移动完成后重新开启定时器
      this.startTimer();
    },

  //  控制上一个，下一个
    previous() {
      this.changeItem(-1);
    },

    next() {
      this.changeItem(1);
    },
    changeItem(num) {
    //  1.移除定时器
      this.stopTimer();
    //  2.修改 index 和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

    //  3.添加定时器
      this.startTimer();
    }
  }
}
</script>

<style scoped>
#mall-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212,62,46,1.0);
}
</style>
