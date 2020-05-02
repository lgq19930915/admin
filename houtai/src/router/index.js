import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
// @ts-ignore
const login = () => import("../pages/login")
// @ts-ignore
const index = () => import("../pages/index")
// @ts-ignore
const manage = () => import("../pages/manage")
// @ts-ignore
const user = () => import("../pages/user")
// @ts-ignore
const news = () => import("../pages/news")
// @ts-ignore
const device = () => import("../pages/device")
// @ts-ignore
const welcome = () => import("../pages/welcome")
export default new Router({
  routes: [{
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index,
      children: [{
          path: "manage",
          component: manage,
          beforeEnter(to, from, next) {
            var isAdmin = localStorage.getItem("isAdmin");
            if (isAdmin == '0') {
              next();
            } else {
              // 解决白屏
              next("/index/welcome")
            }
          }
        }, {
          path: "user",
          component: user,

        },
        {
          path: "news",
          component: news
        },
        {
          path: "device",
          component: device
        },
        {
          path: "welcome",
          component: welcome
        }, {
          path: "",
          redirect: "welcome"
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
})
