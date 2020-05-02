<!--  -->
<template>
  <div>
    <el-dialog :title="s.title" :visible.sync="s.showDialog">
      <el-row>
        <el-col :span="4" class="lable">题目：</el-col>
        <el-col :span="20">
          <el-input v-model="user.tit" :disabled="isAdmin=='2'"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="lable">内容：</el-col>
        <el-col :span="20">
          <el-input v-model="user.con" type="textarea" :disabled="isAdmin=='2'"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="lable">时间：</el-col>
        <el-col :span="20">
          <el-date-picker v-model="user.time" :disabled="isAdmin=='2'" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="s.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="update" :disabled="isAdmin=='2'">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  requestAddNews,
  findNews,
  requestUpdateNews
} from "../Util/request.js";
export default {
  //import引入的组件需要注入到对象中才能使用

  components: {},
  props: ["s"],
  data() {
    //这里存放数据
    return {
      isAdmin: localStorage.getItem("isAdmin"),
      user: {
        tit: "",
        con: "",
        time: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   取消
    cancel() {
      this.empty();
      this.$emit("hide");
    },
    // 清空对话框
    empty() {
      this.user = {
        title: "",
        con: "",
        time: ""
      };
    },
    //  添加
    confirm() {
      //   添加的请求 注意现在的time是个时间对象要newDate一下
      var data = {
        ...this.user,
        time: new Date(this.user.time).getTime()
      };
      //   发请求
      requestAddNews(data).then(res => {
        //   添加成功，1弹内容
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          //   2清空对话框
          this.empty();
          //   3添加对话框消失
          this.$emit("hide");
          //   4添加成功通知父组件重新查询管理员
          this.$emit("init");
        }
      });
    },
    // 查看
    look(id) {
      findNews({
        id: id
      }).then(res => {
        if (res.data.isok) {
          // 获取某条数据
          this.user = res.data.data[0];
          //   时间需要转为时间对象
          this.user.time = new Date(parseInt(this.user.time));
        }
      });
    },
    // 修改
    update() {
      delete this.user._id;
      this.user.time = new Date(this.user.time).getTime();
      requestUpdateNews(this.user).then(res => {
        if (res.data.isok) {
          // 弹成功
          this.$message({
            message: res.data.info,
            type: "success"
          });
          //   清空对话框
          this.empty();
          //   对话框消失
          this.$emit("hide");
          //   通知组件重新查询数据
          this.$emit("init");
        }
      });
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
<style lang='css' scoped>
.lable {
  line-height: 40px;
}
.el-row {
  margin-bottom: 20px;
}
</style>