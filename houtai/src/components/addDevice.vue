<!--  -->
<template>
  <div>
    <el-dialog :title="s.title" :visible.sync="s.showDialog">
      <el-row>
        <el-col :span="4" class="lable">IP：</el-col>
        <el-col :span="20">
          <el-input v-model="user.ip"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="lable">机房：</el-col>
        <el-col :span="20">
          <el-input v-model="user.door"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="lable">编号：</el-col>
        <el-col :span="20">
          <el-input v-model="user.num"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="lable">宽带：</el-col>
        <el-col :span="20">
          <el-input v-model="user.width"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="lable">状态：</el-col>
        <el-col :span="20">
          <el-radio v-model="user.status" label="1">空闲</el-radio>
          <el-radio v-model="user.status" label="0">已出售</el-radio>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="lable">时间：</el-col>
        <el-col :span="20">
          <el-date-picker v-model="user.time" :disabled="!s.isAdd" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="s.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  requestAddDevice,
  findDevice,
  requestUpdateDevice
} from "../Util/request.js";
export default {
  //import引入的组件需要注入到对象中才能使用

  components: {},
  props: ["s"],
  data() {
    //这里存放数据
    return {
      user: {
        ip: "",
        door: "",
        num: "",
        width: "",
        status: ""
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
        ip: "",
        door: "",
        num: "",
        width: "",
        status: ""
      };
    },
    //  添加
    confirm() {
      //   发请求
      requestAddDevice(this.user).then(res => {
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
      findDevice({
        id: id
      }).then(res => {
        if (res.data.isok) {
          // 获取某条数据
          this.user = res.data.data[0];
        }
      });
    },
    // 修改
    update() {
      delete this.user._id;
      requestUpdateDevice(this.user).then(res => {
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