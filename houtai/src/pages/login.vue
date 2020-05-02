<!--  -->
<template>
  <div class>
    <div class="login">
      <div class="con">
        <h3>登录</h3>
        <el-row>
          <el-col :span="3">角色:</el-col>
          <el-col :span="21">
            <el-select v-model="user.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">账号：</el-col>
          <el-col :span="21">
            <el-input v-model="user.name" placeholder="请输入内容" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">密码：</el-col>
          <el-col :span="21">
            <el-input v-model="user.pass" placeholder="请输入内容" show-password clearable></el-input>
          </el-col>
        </el-row>
        <div class="footer">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { requestLogin } from "../Util/request";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      user: {
        type: "",
        name: "",
        pass: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        },
        {
          value: "2",
          label: "用户"
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    login() {
      // 验空
      console.log(1);

      console.log(this.user);
      if (this.user.name === "" || this.user.pass === "") {
        this.$message({
          message: "账号密码均不能为空",
          type: "warning"
        });
        return;
      }

      requestLogin(this.user).then(res => {
        if (res.data.isok) {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          // 登录成功
          // 用来标记登录没登录
          localStorage.setItem("isLogin", true);
          // 用来标记什么角色登录 0-超管 1-普管 2-用户
          localStorage.setItem("isAdmin", res.data.isAdmin);
          this.$router.push("/index");
        }
      });
      // this.$router.push("/index");
    }
  },
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
<style  scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
}
.con {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-select {
  width: 100%;
}
.el-row {
  margin-bottom: 20px;
}
.footer,
h3 {
  text-align: center;
}
h3 {
  font-size: 40px;
  margin-bottom: 30px;
  color: lightgreen;
}
</style>