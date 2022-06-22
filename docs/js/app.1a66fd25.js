(function(){"use strict";var e={44:function(e,t,o){var n=o(9242),r=o(3396);function a(e,t,o,n,a,i){const c=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(c)}var i={name:"App",data(){return{message:"Hello Vue"}}},c=o(89);const l=(0,c.Z)(i,[["render",a]]);var s=l,u=o(678);const d=e=>((0,r.dD)("data-v-db089334"),e=e(),(0,r.Cn)(),e),m=d((()=>(0,r._)("button",{class:"form_el",type:"submit"},"LOGIN",-1)));function f(e,t,o,a,i,c){return(0,r.wg)(),(0,r.iD)("form",{id:"myForm",onSubmit:t[1]||(t[1]=(0,n.iM)(((...e)=>c.onSubmit&&c.onSubmit(...e)),["prevent"]))},[(0,r.wy)((0,r._)("input",{class:"form_el",type:"text",name:"name",placeholder:"PASSWORD",maxlength:"6",pattern:"^[0-9]+$",style:{"-webkit-text-security":"disc"},"onUpdate:modelValue":t[0]||(t[0]=e=>this.password=e)},null,512),[[n.nr,this.password]]),m],32)}var p=o(8176),b={name:"PageLogin",data(){return{message:"Hello Vue",password:""}},methods:{onSubmit(){console.log(event);const e=(0,p.v0)();console.log(this.password),(0,p.e5)(e,"dol2156@gmail.com",this.password).then((e=>{const t=e.user,o=t.email;"dol2156@gmail.com"===o&&this.$router.push("/main")})).catch((e=>{const t=e.code;console.log("errorCode : ",t),alert(t);const o=e.message;console.log("errorMessage : ",o)}))}}};const h=(0,c.Z)(b,[["render",f],["__scopeId","data-v-db089334"]]);var g=h,v=o(7139);const w={class:"create_webtoon_item_box"},y={class:"webtoon_list"},_=["data-idx"],k=["onClick"],T={class:"제목"},I={class:"text_0"},C={class:"text_1"},W=["onUpdate:modelValue"],O=["onClick"];function j(e,t,o,a,i,c){return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",w,[(0,r.wy)((0,r._)("input",{type:"text",placeholder:"웹툰 제목 입력","onUpdate:modelValue":t[0]||(t[0]=e=>this.create_webtoon_title=e),onKeyup:t[1]||(t[1]=(0,n.D2)(((...e)=>c.onCreateWebToonItem&&c.onCreateWebToonItem(...e)),["enter"]))},null,544),[[n.nr,this.create_webtoon_title]]),(0,r._)("button",{class:"create_btn",type:"button",onClick:t[2]||(t[2]=(...e)=>c.onCreateWebToonItem&&c.onCreateWebToonItem(...e))},"추가 ")]),(0,r._)("ul",y,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(i.webtoon_list,((e,t)=>((0,r.wg)(),(0,r.iD)("li",{key:e.id,"data-idx":t},[(0,r._)("button",{class:"삭제",type:"button",onClick:t=>c.onRemoveWebToonItem(e)},"삭제 ",8,k),(0,r._)("div",T,[(0,r._)("div",I,(0,v.zw)(e.id),1),(0,r._)("div",C,(0,v.zw)(e.제목),1)]),(0,r.wy)((0,r._)("input",{class:"회차",type:"number",placeholder:"placeholder","onUpdate:modelValue":t=>e.회차=t,onclick:"this.select();"},null,8,W),[[n.nr,e.회차]]),(0,r._)("button",{class:"저장",type:"button",onClick:t=>c.onSaveClick(e)},"저장 ",8,O)],8,_)))),128))])],64)}var P=o(6035);let S,x,A="webtoon";var D={name:"PageMain",data(){return{message:"Hello Vue",webtoon_list:[],create_webtoon_title:""}},created(){console.log("PageLogin created"),S=this.$_Firebase,x=(0,P.ad)(S),this.readWebToonItem()},methods:{makeWebToonObj(e,t){const o={"제목":e,"회차":t};return o},readWebToonItem(){(0,P.PL)((0,P.hJ)(x,A)).then((e=>{let t=[];e.forEach((e=>{let o=e.data();o.id=e.id,t.push(o)})),t.sort((function(e,t){return e.제목<t.제목?-1:e.제목>t.제목?1:0})),this.webtoon_list=t})).catch((e=>{console.log(e)})).then((()=>{}))},createWebToonItem(e){(0,P.ET)((0,P.hJ)(x,A),this.makeWebToonObj(e,0)).then((e=>{console.log(e),this.readWebToonItem(),this.create_webtoon_title=""})).catch((e=>{console.log(e)})).then((()=>{}))},updateWebToonItem(e){const t=e.id,o=e.회차,n=(0,P.JU)(x,A,t);(0,P.r7)(n,{"회차":o}).then((()=>{this.readWebToonItem()})).catch((e=>{console.log(e)})).then((()=>{}))},onCreateWebToonItem(){const e=this.create_webtoon_title.trim();this.createWebToonItem(e)},onRemoveWebToonItem(e){if(!window.confirm("삭제?"))return;const t=e.id,o=(0,P.JU)(x,A,t);(0,P.oe)(o).then((()=>{this.readWebToonItem()})).catch((e=>{console.log(e)})).then((()=>{}))},onSaveClick(e){this.updateWebToonItem(e)}}};const E=(0,c.Z)(D,[["render",j],["__scopeId","data-v-733da37a"]]);var U=E;const V=[{path:"/",redirect:"/login"},{path:"/main",name:"메인",component:U},{path:"/login",name:"로그인",component:g},{path:"/404",name:"PageNotFound",component:()=>o.e(845).then(o.bind(o,4845))},{path:"/:catchAll(.*)",redirect:"/404"}],F=(0,u.p7)({history:(0,u.PO)(),routes:V});var L=F,M=o(4275);const H={apiKey:"AIzaSyARebWmpXUwkBpidtlVaYpWRPCv-fUzOYw",authDomain:"mylog-c26f1.firebaseapp.com",projectId:"mylog-c26f1",storageBucket:"mylog-c26f1.appspot.com",messagingSenderId:"673156150443",appId:"1:673156150443:web:3bb00fd05d921c6d3ef3ee"},N=(0,n.ri)(s);N.use(L),N.config.globalProperties.$_Firebase=(0,M.ZF)(H),N.mount("#app")}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,n,r,a){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],a=e[u][2];for(var c=!0,l=0;l<n.length;l++)(!1&a||i>=a)&&Object.keys(o.O).every((function(e){return o.O[e](n[l])}))?n.splice(l--,1):(c=!1,a<i&&(i=a));if(c){e.splice(u--,1);var s=r();void 0!==s&&(t=s)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,r,a]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,n){return o.f[n](e,t),t}),[]))}}(),function(){o.u=function(e){return"js/"+e+".d87abc24.js"}}(),function(){o.miniCssF=function(e){}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="mylog:";o.l=function(n,r,a,i){if(e[n])e[n].push(r);else{var c,l;if(void 0!==a)for(var s=document.getElementsByTagName("script"),u=0;u<s.length;u++){var d=s[u];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+a){c=d;break}}c||(l=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.setAttribute("data-webpack",t+a),c.src=n),e[n]=[r];var m=function(t,o){c.onerror=c.onload=null,clearTimeout(f);var r=e[n];if(delete e[n],c.parentNode&&c.parentNode.removeChild(c),r&&r.forEach((function(e){return e(o)})),t)return t(o)},f=setTimeout(m.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=m.bind(null,c.onerror),c.onload=m.bind(null,c.onload),l&&document.head.appendChild(c)}}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/mylog/"}(),function(){var e={143:0};o.f.j=function(t,n){var r=o.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var a=new Promise((function(o,n){r=e[t]=[o,n]}));n.push(r[2]=a);var i=o.p+o.u(t),c=new Error,l=function(n){if(o.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",c.name="ChunkLoadError",c.type=a,c.request=i,r[1](c)}};o.l(i,l,"chunk-"+t,t)}},o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,a,i=n[0],c=n[1],l=n[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(r in c)o.o(c,r)&&(o.m[r]=c[r]);if(l)var u=l(o)}for(t&&t(n);s<i.length;s++)a=i[s],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(u)},n=self["webpackChunkmylog"]=self["webpackChunkmylog"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(44)}));n=o.O(n)})();
//# sourceMappingURL=app.1a66fd25.js.map