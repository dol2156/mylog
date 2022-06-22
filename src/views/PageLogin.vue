<template>
  <form id="myForm" @submit.prevent="onSubmit">
    <div style="margin-bottom: 20px">
      <img style="width: 200px" src="@/assets/logo.png" alt="" />
    </div>
    <input class="form_el" type="password" name="name" placeholder="PASSWORD" maxlength="6" pattern="^[0-9]+$" v-model="this.password" />
    <button class="form_el login_btn" type="submit">LOGIN</button>
  </form>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "PageLogin",
  data() {
    return {
      message: "Hello Vue",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      console.log(event);
      const auth = getAuth();
      console.log(this.password);
      signInWithEmailAndPassword(auth, "dol2156@gmail.com", this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const email = user.email;
          const accessToken = user.accessToken;
          if (email === "dol2156@gmail.com") {
            // 로그인 성공
            this.$cookies.set("user", accessToken, "7d");
            this.$router.push("/main");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log("errorCode : ", errorCode);
          alert(errorCode);

          const errorMessage = error.message;
          console.log("errorMessage : ", errorMessage);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
$FORM_EL_HEI: 55px;
#myForm {
  outline: 1px dashed red;
  box-shadow: 0px 0px 10px cornflowerblue;
  z-index: 0;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .form_el {
    position: relative;
    z-index: 5;
    display: block;
    width: 100%;
    height: $FORM_EL_HEI;
    padding: 0 10px;
    border: 1px solid #333333;
    font-size: 16px;
    text-align: center;

    + .form_el {
      margin-top: 10px;
    }
  }

  .login_btn {
    background-color: gold;
    font-weight: 700;
  }
}
</style>
