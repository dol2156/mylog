<template>
  <div class="create_webtoon_item_box">
    <input type="text" placeholder="웹툰 제목 입력" v-model="this.create_webtoon_title" @keyup.enter="onCreateWebToonItem" />
    <button class="create_btn" type="button" @click="onCreateWebToonItem">추가</button>
  </div>
  <ul class="webtoon_list">
    <li :ref="setitemRef" v-for="(item, idx) in webtoon_list" :key="item.id" :data-idx="idx">
      <button class="삭제" type="button" @click="onRemoveWebToonItem(item)">삭제</button>
      <div class="제목">
        <div class="text_0">{{ item.id }}</div>
        <div class="text_1">{{ item.제목 }}</div>
      </div>
      <input class="회차" type="number" placeholder="placeholder" v-model="item.회차" onclick="this.select();" />
      <button class="저장" type="button" @click="onSaveClick(item)">저장</button>
    </li>
  </ul>
</template>
<script>
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

let app, db;
let collectionName = "webtoon";

export default {
  name: "PageMain",
  data() {
    return {
      message: "Hello Vue",
      webtoon_list: [],
      create_webtoon_title: "",
      itemRefs: [],
    };
  },
  created() {
    console.log("created");

    // 로그인 체크
    const user = this.$cookies.get("user");
    if (!user) this.$router.push("/login");

    // Initialize Firebase
    app = this.$_Firebase;
    db = getFirestore(app);
    this.readWebToonItem();
  },
  methods: {
    setitemRef(el) {
      this.itemRefs.push(el);
    },

    makeWebToonObj(제목, 회차) {
      const obj = {
        제목,
        회차,
      };
      return obj;
    },

    readWebToonItem() {
      getDocs(collection(db, collectionName))
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

          arr.sort(function (a, b) {
            return a.제목 < b.제목 ? -1 : a.제목 > b.제목 ? 1 : 0; // 한글 오름 차순
            // return a.제목 > b.제목 ? -1 : a.제목 < b.제목 ? 1 : 0;// 한글 내림 차순
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

    createWebToonItem(제목) {
      addDoc(collection(db, collectionName), this.makeWebToonObj(제목, 0))
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
      const 회차 = item.회차;
      const ref = doc(db, collectionName, id);
      updateDoc(ref, {
        회차,
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
    onCreateWebToonItem() {
      const title = this.create_webtoon_title.trim();
      this.createWebToonItem(title);
    },
    onRemoveWebToonItem(item) {
      if (!window.confirm("삭제?")) return;

      const id = item.id;
      // eslint-disable-next-line no-unreachable
      const ref = doc(db, collectionName, id);
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
      const ref = doc(db, collectionName, id);
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
.create_webtoon_item_box {
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
.webtoon_list {
  margin-top: 20px;

  > li {
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: 5px;
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
</style>
