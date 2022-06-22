<template>
  <header v-bind:class="{ open: this.menu_open }">
    <section>
      <article>
        <input class="search_inp" type="search" placeholder="search..." @input="onSearchInput" />
        <select class="collection_select" @change="onCollectionChange" v-model="this.key">
          <option v-for="(item, idx) in this.key_list" :key="item.id" :data-idx="idx" :value="item.key">
            {{ item.name }}
          </option>
        </select>
        <button class="menu_btn" @click="onMenuBtnClick">메뉴</button>
      </article>
      <article class="menu_atc">
        <router-link to="/addKey" class="add_key_btn">카테고리 추가</router-link>
        <button class="logout_btn" @click="onLogoutClick">로그아웃</button>
      </article>
    </section>
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
      <input type="text" placeholder="제목 입력" v-model="this.create_webtoon_title" @keyup.enter="onCreateWebToonItem" />
      <button class="create_btn" type="button" @click="onCreateWebToonItem">추가</button>
    </div>
  </footer>
</template>
<script>
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

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
      menu_open: false,
    };
  },
  created() {
    console.log("created");
    this.$_LoginCheck.check();

    if (this.$route.params.key) this.key = this.$route.params.key;
    this.user_id = this.$cookies.get("user_id");

    this.$_LoginCheck.check();

    if (!this.user_id) {
      //alert("user_id is null");
      return;
    }

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
    onMenuBtnClick() {
      this.menu_open = !this.menu_open;
    },
    onLogoutClick() {
      if (!window.confirm("로그아웃?")) return;
      this.$cookies.remove("user_id");
      this.$router.push("/login");
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
      if (!title) return;
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
@import "PageMain.scss";
</style>
