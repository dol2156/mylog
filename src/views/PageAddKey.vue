<template>
  <main>
    <label>카테고리 영문명</label>
    <input class="form_el" type="text" placeholder="webtoon" v-model="this.key" />
    <label>카테고리 한글명</label>
    <input class="form_el" type="text" placeholder="웹툰" v-model="this.key_name" />
    <button class="form_el add_btn" @click="onAddKey">추가</button>
  </main>
</template>

<script>
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

let app, db;

export default {
  name: "PageAddKey",
  data() {
    return {
      user_id: "",
      key: "",
      key_name: "",
    };
  },
  created() {
    console.log("created");
    
    if (this.$route.params.key) this.key = this.$route.params.key;
    this.user_id = this.$cookies.get("user_id");
  

    // Initialize Firebase
    app = this.$_Firebase;
    db = getFirestore(app);
  },

  computed: {
    getListPath() {
      return this.user_id + "/" + this.key + "/list";
    },
  },

  methods: {
    onAddKey() {
      if (this.key) this.createWebToonItem();
      else alert("key 값이 비었네?");
    },

    createWebToonItem() {
      const ref = doc(db, this.user_id, this.key.trim());
      setDoc(ref, { name: this.key_name.trim() })
        .then(() => {
          console.log("success");
          this.$router.push({
            name: "메인:key",
            params: { key: this.key },
          });
        })
        .catch((error) => {
          // error
          console.log(error);
        })
        .then(() => {
          // complete
        });

      /*
      addDoc(collection(db, this.getListPath), { title: "", ep_num: 0 })
        .then((response) => {
          // success
          console.log(response);

          this.$router.push({
            name: "메인:key",
            params: { key: this.key },
          });
        })
        .catch((error) => {
          // error
          console.log(error);
        })
        .then(() => {
          // complete
        });
         */
    },
  },
};
</script>

<style lang="scss" scoped>
$FORM_EL_SIZE: 50px;

.form_el {
  text-align: center;
  width: 100%;
  display: block;
  height: $FORM_EL_SIZE;
  padding: 0 10px;
  
  + label{
    margin-top:10px;
  }
}
.add_btn {
  margin-top: 10px;
  background-color: orangered;
  color: white;
  font-size: 20px;
  font-weight: 900;
}

label{
  font-weight:900;
  margin-bottom:5px;
}
</style>
