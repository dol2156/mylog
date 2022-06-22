<template>
  <ul class="webtoon_list">
    <li v-for="(item, idx) in webtoon_list" :key="item.id" :data-idx="idx">
      <button class="삭제" type="button">삭제</button>
      <div class="제목">
        <div class="text_0">{{ item.id }}</div>
        <div class="text_1">{{ item.제목 }}</div>
      </div>
      <input
        class="회차" type="number" placeholder="placeholder"
        :value="item.회차"/>
      <button class="저장" type="button"
              @click="onSaveClick(item)"
      >저장</button>
    </li>
  </ul>
</template>
<script>
import {getFirestore} from "firebase/firestore";
import {collection, getDocs} from "firebase/firestore";

export default {
  name : "PageMain",
  data() {
    return {
      message : "Hello Vue",
      webtoon_list : [],
    };
  },
  created() {
    // 인스턴스가 생성된 후 동기적으로 호출
    console.log("PageLogin created");
    
    // Initialize Firebase
    const app = this.$_Firebase;
    const db = getFirestore(app);
    getDocs(collection(db, "webtoon"))
      .then((response) => {
        // success
        // console.log(response);
        let arr = [];
        response.forEach((doc) => {
          let data = doc.data();
          data.id = doc.id;
          arr.push(data);
          //console.log(`${doc.id} => ${doc.data()}`);
        });
        console.log(arr);
        this.webtoon_list = arr;
      })
      .catch((error) => {
        // error
        console.log(error);
      })
      .then(() => {
        // complete
      })
  },
  methods : {
    onSaveClick(item) {
      console.log(item);
      item.회차 = 10;
    },
  },
}
</script>
<style lang="scss" scoped>
$FORM_EL_SIZE:50px;
.webtoon_list{
  > li{
    border:1px solid #dddddd;
    display:flex; align-items:center; flex-wrap:nowrap; gap:5px;
    background-color:white;
    height:$FORM_EL_SIZE;
    
    + li{
      margin-top:10px;
    }
    
    > *{
      height:100%;
    }
    
    > .삭제{
      width:$FORM_EL_SIZE; min-width:$FORM_EL_SIZE;
      background-color:darkred;
      color:white;
    }
    
    > .제목{
      width:100%;
      display:flex; align-items:flex-start; flex-direction:column; justify-content:center;
      
      > .text_0{
        color:#999999; font-size:12px;
      }
      
      > .text_1{
        margin-top:3px;
        color:#333333; font-size:14px;
      }
    }
    
    > .회차{
      width:$FORM_EL_SIZE; min-width:$FORM_EL_SIZE;
      text-align:center;
      border:none;
      border-left:1px solid #dddddd;
    }
    
    > .저장{
      width:$FORM_EL_SIZE; min-width:$FORM_EL_SIZE;
      background-color:dodgerblue;
      color:white;
    }
  }
}
</style>