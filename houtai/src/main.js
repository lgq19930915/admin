// @ts-nocheck
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// @ts-ignore
import App from './App'
import router from './router'
// 引入重置css
import "./assets/css/reset.css"
// 引入公共组件
import Component from "./common/index"
for (var i in Component) {
  Vue.component(i, Component[i])
}
// 过滤器
import Filter from "./filters/index"
for (var i in Filter) {
  Vue.filter(i, Filter[i])
}
// store
import store from "./store/index"
// element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 登录拦截
router.beforeEach((to, from, next) => {
  // 如果前往的是登录，不拦截
  if (to.path == "/login") {
    next()
    return;
  }
  // 如果不是登录
  var isLogin = localStorage.getItem("isLogin");
  if (!isLogin) { //存在，不拦截
    next("/login")
    return;
  }
  // 如果
  next()
})
Vue.config.productionTip = false

/* eslint-disable no-new */
// @ts-ignore
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
