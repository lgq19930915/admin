// @ts-nocheck
import axios from "axios"
import qs from "qs"
import Vue from "vue"
import router from '../router'
var vm = new Vue()
axios.interceptors.response.use(res => {
  console.log("请求地址：" + res.config.url);
  console.log(res);
  // 请求失败
  if (!res.data.isok) {
    vm.$message({
      message: res.data.info,
      type: "warning"
    });
  };
  // 未登录
  // 后端code返回-1就是没有登录
  if (res.data.code == -1) {
    router.push("/login")
  };
  return res
})
// 基础路径
const baseUrl = "/api"
// const baseUrl = ""
// 登录
export const requestLogin = (data) => {
  return axios({
    url: baseUrl + "/login",
    method: "post",
    data: qs.stringify(data)

  })
}
//查询管理员
export const findManage = (data) => {
  return axios({
    url: baseUrl + "/findManage",
    method: "get",
    params: data
  })
}
// 添加管理员
export const requestAddManage = (data) => {
  return axios({
    url: baseUrl + "/addManage",
    method: "get",
    params: data
  })
}
// 更新管理员
export const requestUpdateManage = (data) => {
  return axios({
    url: baseUrl + "/updateManage",
    method: "get",
    params: data
  })
}
//删除管理员
export const requestDelManage = (data) => {
  return axios({
    url: baseUrl + "/delManage",
    method: "get",
    params: data
  })
}
//查询用户
export const findUser = (data) => {
  return axios({
    url: baseUrl + "/findUser",
    method: "get",
    params: data
  })
}
// 添加用户
export const requestAddUser = (data) => {
  return axios({
    url: baseUrl + "/addUser",
    method: "get",
    params: data
  })
}
// 更新用户
export const requestUpdateUser = (data) => {
  return axios({
    url: baseUrl + "/updateUser",
    method: "get",
    params: data
  })
}
//删除用户
export const requestDelUser = (data) => {
  return axios({
    url: baseUrl + "/delUser",
    method: "get",
    params: data
  })
}
//查询通知
export const findNews = (data) => {
  return axios({
    url: baseUrl + "/findNews",
    method: "get",
    params: data
  })
}
// 添加通知
export const requestAddNews = (data) => {
  return axios({
    url: baseUrl + "/addNews",
    method: "get",
    params: data
  })
}
// 更新通知
export const requestUpdateNews = (data) => {
  return axios({
    url: baseUrl + "/updateNews",
    method: "get",
    params: data
  })
}
//删除通知
export const requestDelNews = (data) => {
  return axios({
    url: baseUrl + "/delNews",
    method: "get",
    params: data
  })
}
//查询设备
export const findDevice = (data) => {
  return axios({
    url: baseUrl + "/findDevice",
    method: "get",
    params: data
  })
}
// 添加设备
export const requestAddDevice = (data) => {
  return axios({
    url: baseUrl + "/addDevice",
    method: "get",
    params: data
  })
}
// 更新设备
export const requestUpdateDevice = (data) => {
  return axios({
    url: baseUrl + "/updateDevice",
    method: "get",
    params: data
  })
}
//删除设备
export const requestDelDevice = (data) => {
  return axios({
    url: baseUrl + "/delDevice",
    method: "get",
    params: data
  })
}
// 退出登录
export const exit = () => {
  return axios({
    url: baseUrl + "/exit",
    method: "get",
  })
}
