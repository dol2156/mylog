<template>
  <router-view></router-view>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      message: "Hello Vue",
    };
  },
  created() {
    // 로그인 체크
    const user_id = this.$cookies.get("user_id");
    if (!user_id) this.$router.push("/login");
    console.log("user_id", user_id);
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  background-color: #ffffd4;
}
#app {
  padding: 10px;
}
button {
  cursor: pointer;
}
</style>
