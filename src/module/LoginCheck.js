import VueCookies from "vue-cookies";
import router from '@/routes/index';

const check = () => {
  // 로그인 체크
  const user_id = VueCookies.get("user_id");
  if (!user_id) router.push("/login");
  console.log("user_id", user_id);
}

export default {
  check
}