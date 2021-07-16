export function formatDate(date, fmt) {
  // 1.获取年份
  // (y+)：检测 fmt 中年份的位数出现一次或多次
  if (/(y+)/.test(fmt)) {
    // 全局 RegExp.$1 表示匹配到的第一个结果
    // substr：裁剪几位
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取年份之外的时间
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  // 补齐空位：4:4:4 -> 04:04:04
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';  // 转字符串
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 补齐空位的算法
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
