<template>
  <ul>
    <li v-for="(item, idx) in webtoon_list" :key="item.id" :data-idx="idx">
      {{ item }}
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
          arr.push(doc.data());
          //console.log(`${doc.id} => ${doc.data()}`);
        });
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
}
</script>
<style lang="scss" scoped>
</style>