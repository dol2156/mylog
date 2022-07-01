<template>
  <div class="CompNumPad">
    <!-- <div v-if="$_Store.selected_item">{{ $_Store.selected_item.ep_num }}</div> -->
    <div class="bg" @click="closeCompNumPad"></div>
    <article class="num_list">
      <div class="num_board">{{ number }}</div>
      <div class="button_wrap">
        <button v-for="(item, index) in num_list" :key="index" :data-num="item" @click="onNumClick">
          {{ item }}
        </button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "CompNumPad",
  data() {
    return {
      message: "Hello",
      number: "",
      num_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, "RESET", 0, "DEL"],
    };
  },
  methods: {
    closeCompNumPad() {
      this.$emit("closeCompNumPad");
    },

    onNumClick() {
      const num = event.target.dataset.num;
      if (!this.$_Store.selected_item) return;

      if (num === "RESET") {
        this.number = "";
      } else if (num === "DEL") {
        this.number = this.number.slice(0, this.number.length - 1);
      } else {
        this.number = (this.number + num).slice(0, this.maxLength);
      }
      this.$_Store.selected_item.ep_num = this.number;
    },
  },
};
</script>

<style lang="scss" scoped>
.CompNumPad {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  > .bg {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .num_list {
    width: calc(100% - 20px);
    position: relative;
    z-index: 10;
    
    > .num_board{
      background-color:white;
      text-align:center;
      line-height:30px; height:30px;
      font-weight:600;
    }
    
    > .button_wrap{
      background-color: skyblue;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5px;
      box-sizing: border-box;
      padding: 10px;
      
      
      
      > button {
        background-color: rgba(0, 0, 0, 0.05);
        color: black;
        height: 58px;
        font-weight: 900;
        color: white;
      }
      > button:active {
        background-color: white;
        color: skyblue;
      }
    }
    
  }
}
</style>
