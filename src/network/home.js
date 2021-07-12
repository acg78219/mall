import {request} from "@/network/request";  // 导入 requests 网络请求函数

// 组件的数据请求的是这里导出的函数，而这里函数使用的数据是导入的 requests
// 所以相当于 home.js 做中间层，便于维护
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
