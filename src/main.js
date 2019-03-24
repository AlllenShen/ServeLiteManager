import Vue from "vue";
import App from "./App.vue";
import routers from "./router";
import "./registerServiceWorker";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(iView)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
