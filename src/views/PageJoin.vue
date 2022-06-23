<template>
  <main>
    <form @submit.prevent="onSubmit">
      <label>이메일</label>
      <input class="form_el id_input" type="email" placeholder="email@example.com" required v-model="this.id" />
      <label>PIN</label>
      <input class="form_el pw_input" type="number" inputmode="numeric" placeholder="숫자 6자리"
             required minlength="6" maxlength="6" pattern="^[0-9]+$"
             v-model="this.pw"
             @input="maxLengthCheck" />
      <button class="form_el submit_btn" type="submit">SIGN UP</button>
    </form>
  </main>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "PageJoin",
  data() {
    return {
      id: "",
      pw: "",
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
      const auth = getAuth();
      const email = this.id;
      const password = this.pw;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          alert(user.email + " / 가입 성공");
          this.$router.push("/login?email=" + user.email);
        })
        .catch((error) => {
          // const errorCode = error.code;
          //alert(errorCode);

          const errorMessage = error.message;
          alert(errorMessage);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$FORM_EL_HEI: 50px;
.form_el {
  display: block;
  width: 100%;
  height: $FORM_EL_HEI;
  padding: 0 10px;
  border: 1px solid #ddd;
  + .form_el, + label {
    margin-top: 10px;
  }
}
label{ margin-bottom:5px; font-weight:900; }

.submit_btn {
  display: block;
  width: 100%;
  height: $FORM_EL_HEI;
  background-color: gold;
  font-weight: 900;
}
</style>
