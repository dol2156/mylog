<template>
  <router-view></router-view>
</template>
<script>

export default {
  name : "App",
  data() {
    return {
      message : "Hello Vue",
    };
  },
}
</script>
<style lang="scss">
*{ box-sizing:border-box; }
body{ background-color:#ffffd4; }
#app{ padding:20px; }
button{ cursor:pointer; }
</style>