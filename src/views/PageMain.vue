<template>
  <header v-bind:class="{ open: this.menu_open }" :style="{ height: this.header_height + 'px' }">
    <section ref="section">
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
        <div class="create_webtoon_item_box">
          <input type="text" placeholder="TITLE" v-model="this.domain_num" @keyup.enter="onUpdateDNum" />
          <button class="domain_num_save_btn" type="button" @click="onUpdateDNum">저장</button>
        </div>
      </article>
      <article class="menu_atc">
        <div class="create_webtoon_item_box">
          <input type="text" placeholder="TITLE" v-model="this.create_webtoon_title" @keyup.enter="onCreateWebToonItem" />
          <input type="text" placeholder="KEY" v-model="this.create_webtoon_key" @keyup.enter="onCreateWebToonItem" />
          <button class="create_btn" type="button" @click="onCreateWebToonItem">추가</button>
        </div>
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
      <button class="저장" type="button" @click="updateItemKey(item)">KEY</button>
      <a class="제목" @click.prevent="onItemClick(item)">
        <div class="text_0">{{ item.key }}</div>
        <div class="text_1">{{ item.title }}</div>
      </a>
      <input class="회차" type="text" readonly v-model="item.ep_num" @click.prevent="onEpClick(item)" />
    </li>
  </ul>
  <CompNumPad v-if="modal_CompNumPad" @closeCompNumPad="closeCompNumPad"></CompNumPad>
</template>
<script>
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import CompNumPad from "@/components/CompNumPad.vue";

let app, db;
//https://blacktoon180.com/webtoon/4117.html
export default {
  name: "PageMain",
  data() {
    return {
      message: "Hello Vue",
      webtoon_list: [],
      create_webtoon_title: "",
      create_webtoon_key: "",
      itemRefs: [],
      user_id: "",
      key_list: [],
      key: "webtoon",
      menu_open: false,
      modal_CompNumPad: false,
      domain_num: "",
      header_height: 0,
    };
  },
  components: {
    CompNumPad,
  },
  created() {
    //console.log("created");
    this.$_LoginCheck.check();

    if (this.$route.params.key) this.key = this.$route.params.key;
    this.user_id = this.$cookies.get("user_id");

    if (!this.user_id) {
      //alert("user_id is null");
      return;
    }

    // Initialize Firebase
    app = this.$_Firebase;
    db = getFirestore(app);
    this.loadCollectionList();
  },

  mounted() {
    this.updateHeaderHei();
  },
  updated() {
    this.updateHeaderHei();
  },
  computed: {
    getListPath() {
      return this.user_id + "/" + this.key + "/list";
    },
  },
  methods: {
    updateHeaderHei() {
      this.header_height = this.$refs.section.clientHeight - 20;
    },

    setitemRef(el) {
      this.itemRefs.push(el);
    },
    getItemUrl(key) {
      if (key) {
        const url = `https://blacktoon${this.domain_num}.com/webtoon/${key}.html`;
        return url;
      } else {
        return false;
      }
    },

    loadCollectionList() {
      getDocs(collection(db, this.user_id))
        .then((response) => {
          // success
          // console.log(response);
          let arr = [];
          response.forEach((doc) => {
            if (doc.data().name) {
              arr.push({
                key: doc.id,
                name: doc.data().name,
              });
            }
            // console.log(`${doc.id} => ${doc.data()}`);
            if (doc.id === "domain") {
              this.domain_num = doc.data().num;
            }
          });

          // 키없으면 키추가 페이지로 이동
          if (arr.length == 0) this.$router.push("/addKey");

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
    makeWebToonObj(title, ep_num, key = "") {
      const obj = {
        title,
        ep_num,
        key,
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
    createWebToonItem(title, key) {
      addDoc(collection(db, this.getListPath), this.makeWebToonObj(title, 0, key))
        .then((response) => {
          // success
          console.log(response);
          this.readWebToonItem();
          this.create_webtoon_title = "";
          this.create_webtoon_key = "";
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
    onUpdateDNum() {
      const ref = doc(db, this.user_id, "domain");
      updateDoc(ref, {
        num: this.domain_num,
      })
        .then(() => {
          //console.log("success");
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
      const key = this.create_webtoon_key.trim();
      this.createWebToonItem(title, key);
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

    onEpClick(item) {
      this.modal_CompNumPad = true;
      this.$_Store.selected_item = item;
      console.log(this.$_Store.selected_item.ep_num);
    },

    updateItemKey(item) {
      const id = item.id;
      const key = window.prompt("KEY?");
      if (key) {
        const ref = doc(db, this.getListPath, id);

        updateDoc(ref, {
          key,
        })
          .then(() => {
            console.log("success");
            this.readWebToonItem();
          })
          .catch((error) => {
            // error
            console.log(error);
          })
          .then(() => {
            // complete
          });
      }
    },

    onItemClick(item) {
      const url = this.getItemUrl(item.key);
      if (url) {
        window.open(url);
      } else {
        this.updateItemKey(item);
      }
    },

    closeCompNumPad() {
      this.modal_CompNumPad = false;
      this.onSaveClick(this.$_Store.selected_item);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "PageMain.scss";
</style>
