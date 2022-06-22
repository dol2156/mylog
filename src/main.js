import '@/assets/reset.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routes/index';
import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey : "AIzaSyARebWmpXUwkBpidtlVaYpWRPCv-fUzOYw",
  authDomain : "mylog-c26f1.firebaseapp.com",
  projectId : "mylog-c26f1",
  storageBucket : "mylog-c26f1.appspot.com",
  messagingSenderId : "673156150443",
  appId : "1:673156150443:web:3bb00fd05d921c6d3ef3ee"
};

const app = createApp(App);
app.use(router);
// Initialize Firebase
app.config.globalProperties.$_Firebase = initializeApp(firebaseConfig); // 전역 설정
app.mount('#app');
