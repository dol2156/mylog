import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {

  // state : 여러 컴포넌트에 공유되는 데이터 ( data )
  state: () => ({
    num: '',
    selected_item: null,
  }),

  // getters : 연산된 state 값을 접근하는 속성 ( computed )
  getters: {
    getDoubleCount(state) {
      return state.num * 2;
    }
  },

  // actions : state 값을 변경하는 이벤트 로직, 메서드 ( methods )
  actions: {
    takeTodoList() {
      console.log("doTotoList");

    },
  },

});