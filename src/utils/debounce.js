// 默认的refresh函数每次加载完一张图片的时候就会执行一次，对性能和流量有影响
// 所以我们自己设计一个防抖函数：若在 delay 时间内事件完成的话，取消事件原本的行为
// 在这里就是当在 delay 内请求到图片的话，取消调用 refresh 函数
// 当超出delay时间且没有事件更新的话，就执行func（所以网络好的情况所有请求都在delay时间内，只执行一次refresh）
export function debounce(func, delay) {
  let timer = null; // func：超出delay时要执行的函数  delay：设定防抖时间
  return function(...args) {
    if (timer) clearTimeout(timer)  // 如果timer不为空（超出了delay时间），清除timer，以便重新计算超时
    timer = setTimeout(() => {
      func.apply(this, args)  // 每隔delay时间执行一次这个函数
    }, delay)
  }
}
