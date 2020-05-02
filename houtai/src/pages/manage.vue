<!--  -->
<template>
  <div>
    <h1>管理员列表</h1>
    <el-button type="success" @click="willadd">新增</el-button>
    <el-row>
      <el-col :span="20" :offset="2">
        <el-table :data="arr" style="width: 100%">
          <el-table-column prop="name" label="账号" width="180"></el-table-column>
          <el-table-column prop="prop" label="属性" width="180"></el-table-column>
          <el-table-column label="时间">
            <template slot-scope="scope">
              <span>{{scope.row.time |time}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="warning" @click="look(scope.row.id)">查看</el-button>
              <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 添加管理员 的组件addManage -->
    <add-manage ref="add" :s="status" @hide="hide" @init="init"></add-manage>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { findManage, requestDelManage } from "../Util/request";
import addManage from "../components/addManage";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    addManage
  },
  data() {
    //这里存放数据
    return {
      arr: [],
      status: {
        title: "添加管理员",
        isAdd: true, //如果是添加true，如果是修改false
        showDialog: false //对话框出现的状态
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 点击按钮出现添加对话框
    willadd() {
      this.status.title = "添加管理员";
      this.status.showDialog = true;
      this.status.isAdd = true;
    },
    // 隐藏
    hide() {
      this.status.showDialog = false;
    },
    // 初始化数据
    init() {
      //   一进页面就要查询
      findManage({}).then(res => {
        if (res.data.isok) {
          //请求成功
          this.arr = res.data.data;
        }
      });
    },
    // 查看

    look(id) {
      // 通过ref调用子组件的look方法
      this.$refs.add.look(id);
      this.status.title = "修改管理员";
      this.status.isAdd = false;
      this.status.showDialog = true;
    },
    //删除
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击了确定按钮
          requestDelManage({
            id: id
          }).then(res => {
            //删除成功
            if (res.data.isok) {
              this.$message({
                type: "success",
                message: res.data.info
              });
              //刷新页面
              this.init();
            }
          });
        })
        .catch(() => {
          //点击了取消按钮要做事情
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 一进去就查询
    this.init();
  },
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
</style>