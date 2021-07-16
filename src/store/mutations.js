import {ADD_Count, ADD_TO_BAG, CHANGE_CHECKED, SELECT_ALL, NOT_SELECT_ALL } from "@/store/mutation-types";

export default {
  [ADD_Count](state,payload) {
      payload.count += 1
    },
  [ADD_TO_BAG](state,payload) {
      payload.checked = true // 默认情况下是选中状态
      state.bagList.push(payload)
    },
  [CHANGE_CHECKED](state,payload) {
      for(let i=0; i<state.bagList.length; i++) {
        if (payload.iid === state.bagList[i].iid) {
          state.bagList[i].checked = !state.bagList[i].checked
        }
      }
    },
  [SELECT_ALL](state) {
    state.bagList.forEach(item => item.checked = true)
  },
  [NOT_SELECT_ALL](state) {
    state.bagList.forEach(item => item.checked = false)
  }
}
