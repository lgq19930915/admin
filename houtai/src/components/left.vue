<!--  -->
<template>
  <div class="left">
    <router-link to="/index/manage" active-class="select" v-if="isAdmin==='0'">管理员管理</router-link>
    <router-link to="/index/user" active-class="select" v-if="isAdmin!=='2'">用户管理</router-link>
    <router-link to="/index/news" active-class="select">通知管理</router-link>
    <router-link to="/index/device" active-class="select">设备管理</router-link>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      isAdmin: localStorage.getItem("isAdmin")
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='css' scoped>
.left {
  width: 150px;
  background: #cccccc;
}
a {
  display: block;
  text-align: center;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
  margin: 20px 0;
  line-height: 30px;
}
a:hover {
  background: orchid;
  color: bisque;
}
.select {
  background: blue;
  caret-color: #fff;
}
</style>