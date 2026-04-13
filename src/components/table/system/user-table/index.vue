<template>
  <div class="user-table">
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="loginName" label="登录名" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户昵称" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
          :formatter="sex"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          :formatter="status"
        >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
            <el-button type="warning" size="mini" @click="resetPwd(scope.row)"
              >重置密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <table-pagination :total="total" @update:page="changePage" />
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import { getUserTableData } from "@/api/system/user/user-api";
import tablePagination from "@/components/table/table-pagination/index.vue";
import { delUserTableData } from "@/api/system/user/user-api";
export default {
  name: "userTable",
  components: { tablePagination },
  data() {
    return {
      tableData: [],
      maxHeight: 563,
      total: 0,
      form: {
        pageNum: 1,
        pageSize: 10,
        loginName: "",
        userName: "",
        status: "",
      },
    };
  },
  created() {
    this.getTableData(this.form);
  },
  mounted() {
    this.handleResize = debounce(this.handleResize, 100);
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 获取表格数据
    async getTableData(data) {
      const res = await getUserTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    //  表格页面切换回调
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.getTableData(this.form);
    },
    // 编辑
    edit(row) {
      this.$emit("edit", row.id);
    },
    // 删除
    async del(row) {
      await this.$confirm(`确定要删除用户 "${row.userName}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delUserTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      }
    },
    // 重置密码
    resetPwd(row) {
      this.$emit("resetPwd", row.id);
    },
    sex(r, c, v) {
      const map = {
        0: "女",
        1: "男",
        2: "未知",
      };
      return map[v] || v;
    },
    status(r, c, v) {
      const map = {
        0: "正常",
        1: "停用",
      };
      return map[v] || v;
    },
    handleResize() {
      if (window.innerWidth < 1200 && window.innerWidth > 768) {
        this.maxHeight = 500;
      } else if (window.innerWidth < 768) {
        this.maxHeight = 380;
      } else {
        this.maxHeight = 563;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-table {
  .table {
    padding: 0px 20px;
  }
}
</style>