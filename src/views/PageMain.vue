<template>
  <header>
    <select class="collection_select" @change="onCollectionChange" v-model="this.key">
      <option v-for="(item, idx) in this.key_list" :key="item.id" :data-idx="idx" :value="item.key">
        {{ item.name }}
      </option>
    </select>
    <router-link to="/addKey" class="add_key_btn">+</router-link>
    <input class="search_inp" type="search" placeholder="search..." @input="onSearchInput" />
  </header>
  <ul class="webtoon_list">
    <li v-bind:class="{ hidden: item.visible === false }" :ref="setitemRef" v-for="(item, idx) in webtoon_list" :key="item.id" :data-idx="idx">
      <button class="삭제" type="button" @click="onRemoveWebToonItem(item)">삭제</button>
      <div class="제목">
        <div class="text_0">{{ item.id }}</div>
        <div class="text_1">{{ item.title }}</div>
      </div>
      <input class="회차" type="number" v-model="item.ep_num" onclick="this.select();" />
      <button class="저장" type="button" @click="onSaveClick(item)">저장</button>
    </li>
  </ul>
  <footer>
    <div class="create_webtoon_item_box">
      <input type="text" placeholder="웹툰 제목 입력" v-model="this.create_webtoon_title" @keyup.enter="onCreateWebToonItem" />
      <button class="create_btn" type="button" @click="onCreateWebToonItem">추가</button>
    </div>
  </footer>
</template>
<script>
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

setDoc;

let app, db;

export default {
  name: "PageMain",
  data() {
    return {
      message: "Hello Vue",
      webtoon_list: [],
      create_webtoon_title: "",
      itemRefs: [],
      user_id: "",
      key_list: [],
      key: "webtoon",
    };
  },
  created() {
    console.log("created");
    if (this.$route.params.key) this.key = this.$route.params.key;
    this.user_id = this.$cookies.get("user_id");

    // Initialize Firebase
    app = this.$_Firebase;
    db = getFirestore(app);

    this.loadCollectionList();
  },

  computed: {
    getListPath() {
      return this.user_id + "/" + this.key + "/list";
    },
  },

  methods: {
    setitemRef(el) {
      this.itemRefs.push(el);
    },

    loadCollectionList() {
      getDocs(collection(db, this.user_id))
        .then((response) => {
          // success
          // console.log(response);
          let arr = [];
          response.forEach((doc) => {
            arr.push({
              key: doc.id,
              name: doc.data().name,
            });
            // console.log(`${doc.id} => ${doc.data()}`);
            // console.log(doc.data());
          });
          this.key_list = arr;

          this.readWebToonItem();
        })
        .catch((error) => {
          // error
          console.log(error);
        })
        .then(() => {
          // complete
        });
    },

    makeWebToonObj(title, ep_num) {
      const obj = {
        title,
        ep_num,
      };
      return obj;
    },

    readWebToonItem() {
      //console.log(this.getListPath);

      getDocs(collection(db, this.getListPath))
        .then((response) => {
          // success
          // console.log(response);
          let arr = [];
          response.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            data.visible = true;
            arr.push(data);
            // console.log(`${doc.id} => ${doc.data()}`);
            //console.log(doc.data());
          });

          arr.sort(function (a, b) {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0; // 한글 오름 차순
            // return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;// 한글 내림 차순
          });

          this.webtoon_list = arr;
        })
        .catch((error) => {
          // error
          console.log(error);
        })
        .then(() => {
          // complete
        });
    },

    createWebToonItem(title) {
      addDoc(collection(db, this.getListPath), this.makeWebToonObj(title, 0))
        .then((response) => {
          // success
          console.log(response);
          this.readWebToonItem();
          this.create_webtoon_title = "";
        })
        .catch((error) => {
          // error
          console.log(error);
        })
        .then(() => {
          // complete
        });
    },
    updateWebToonItem(item, callback) {
      const id = item.id;
      const ep_num = item.ep_num;
      const ref = doc(db, this.getListPath, id);
      updateDoc(ref, {
        ep_num,
      })
        .then(() => {
          this.readWebToonItem();
          callback();
        })
        .catch((error) => {
          // error
          console.log(error);
        })
        .then(() => {
          // complete
        });
    },
    onCollectionChange() {
      console.log(this.getListPath);
      this.$router.push({
        name: "메인:key",
        params: { key: this.key },
      });
      this.readWebToonItem();
    },

    onSearchInput() {
      const searchQueryString = event.target.value;

      this.webtoon_list.filter((el) => {
        if (el.title.toLowerCase().indexOf(searchQueryString) > -1) {
          el.visible = true;
        } else {
          el.visible = false;
        }
      });
    },

    onCreateWebToonItem() {
      const title = this.create_webtoon_title.trim();
      this.createWebToonItem(title);
    },
    onRemoveWebToonItem(item) {
      if (!window.confirm("삭제?")) return;

      const id = item.id;
      // eslint-disable-next-line no-unreachable
      const ref = doc(db, this.getListPath, id);
      deleteDoc(ref)
        .then(() => {
          // success
          this.readWebToonItem();
        })
        .catch((error) => {
          // error
          console.log(error);
        })
        .then(() => {
          // complete
        });
    },
    onSaveClick(item) {
      console.log(item);

      const btn = event.target;
      btn.classList.add("disabled");

      this.updateWebToonItem(item, () => {
        btn.classList.remove("disabled");
      });

      /*
      const ref = doc(db, this.getListPath, id);
      setDoc(ref, this.makeWebToonObj("title", "number"))
        .then(() => {
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

header {
  position: relative;

  margin-bottom: 10px;
  .collection_select {
    width: calc(100% - 60px);
    height: $FORM_EL_SIZE;
    flex-grow: 1;
    padding: 0 10px;
    border: 1px solid #ddd;
  }

  .search_inp {
    margin-top: 10px;
    width: 100%;
    height: $FORM_EL_SIZE;
    padding: 0 10px;
  }

  .add_key_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $FORM_EL_SIZE;
    height: $FORM_EL_SIZE;
    background-color: orangered;
    color: white;
    font-size: 36px;
    font-weight: 900;
    position: absolute;
    top: 0;
    right: 0;
  }
}

.webtoon_list {
  > li {
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    background-color: white;
    height: $FORM_EL_SIZE;

    + li {
      margin-top: 10px;
    }

    > * {
      height: 100%;
    }

    > .삭제 {
      width: $FORM_EL_SIZE;
      min-width: $FORM_EL_SIZE;
      background-color: darkred;
      color: white;
    }

    > .제목 {
      padding: 0 5px;
      width: calc(100% - 50px * 3);
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;

      > .text_0 {
        color: #999999;
        font-size: 12px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      > .text_1 {
        margin-top: 3px;
        color: #333333;
        font-size: 14px;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    > .회차 {
      width: $FORM_EL_SIZE;
      min-width: $FORM_EL_SIZE;
      text-align: center;
      border: none;
      border-left: 1px solid #dddddd;
      -webkit-appearance: none;
      -moz-appearance: textfield;
    }

    > .저장 {
      width: $FORM_EL_SIZE;
      min-width: $FORM_EL_SIZE;
      background-color: dodgerblue;
      color: white;

      &.disabled {
        pointer-events: none;
        background-color: black;
        opacity: 0.2;
      }
    }
  }
}

footer {
  height: 100px;
  .create_webtoon_item_box {
    padding: 10px;
    background-color: #333;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    > input {
      display: block;
      font-size: 16px;
      width: 100%;
      height: $FORM_EL_SIZE;
      padding: 0 10px;
    }

    > .create_btn {
      min-width: $FORM_EL_SIZE;
      width: $FORM_EL_SIZE;
      height: $FORM_EL_SIZE;
      background-color: green;
      color: white;
    }
  }
}
</style>
