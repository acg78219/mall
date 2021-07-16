import {ADD_Count, ADD_TO_BAG, CHANGE_CHECKED} from "@/store/mutation-types";

export default {
    addToBag(content, payload) {
       // 执行此actions时，说明添加了商品，所以添加商品的逻辑写在这里面，并且返回Promise
       return new Promise ((resolve, reject) => {
         // 将商品对象加入 state 中的 bagList
      // 因为有些商品会购买多次，所以只需要为商品添加一个count并记录就可以了
      // 首先现在bagList中查找看有没有唯一标识iid相同的：相同说明是同一件商品
      // 数组的find需要返回一个函数
      const oldProduct = content.state.bagList.find(item => item.iid === payload.iid)

      // 如果商品已经在里面了，count自增
      if (oldProduct) {
        content.commit(ADD_Count, oldProduct)
        resolve('商品数量+1')
      }
      // 如果是第一次添加的商品，增加一个count属性，并执行addPro方法添加到state列表中
      else {
        payload.count = 1
        content.commit(ADD_TO_BAG, payload)
        resolve('添加商品成功')
      }
       })
    }
  }
