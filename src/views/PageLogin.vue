<template>
  <form id="myForm" @submit.prevent="onSubmit">
    <div style="margin-bottom: 20px">
      <img style="width: 200px" src="@/assets/logo.png" alt="" />
    </div>
    <input class="form_el id_input" type="email" placeholder="ID" v-model="this.email" />
    <input class="form_el pw_input" type="password" inputmode="numeric" placeholder="PASSWORD" maxlength="6" pattern="^[0-9]+$" v-model="this.password" @input="maxLengthCheck" />
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
      email: "",
      password: "",
    };
  },
  methods: {
    maxLengthCheck() {
      const object = event.target;
      if (object.value.length > object.maxLength) {
        object.value = object.value.slice(0, object.maxLength);
      }
    },

    onSubmit() {
      console.log(event);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const email = user.email;
          //const accessToken = user.accessToken;

          // 로그인 성공
          this.$cookies.set("user_id", email, "7d");
          this.$router.push("/main");
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

  .id_input,
  .pw_input {
    width: 300px;
    margin: 0 auto;
  }

  .login_btn {
    width: 300px;
    margin: 0 auto;
    background-color: gold;
    font-weight: 700;
  }
}
</style>
