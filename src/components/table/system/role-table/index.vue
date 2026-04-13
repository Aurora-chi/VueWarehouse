<template>
  <div class="role-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" prop="id" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" align="center">
      </el-table-column>
      <el-table-column prop="roleCode" label="角色标识" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <table-pagination :total="total" @update:page="changePage" />
  </div>
</template>

<script>
import { debounce } from "lodash";
import { delRoleTableData, getRoleTableData } from "@/api/system/role/role-api";
import tablePagination from "@/components/table/table-pagination/index.vue";
export default {
  name: "roleTable",
  components: { tablePagination },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    formData: {
      async handler(newVal) {
        this.form = newVal;
        await this.getTableData(this.form);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.handleResize = debounce(this.handleResize, 100);
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  data() {
    return {
      form: {
        pageNum: 1,
        pageSize: 10,
        roleCode: "",
        roleName: "",
      },
      tableData: [],
      total: 0,
      maxHeight: 520,
    };
  },
  async created() {
    await this.getTableData();
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 992) {
        this.maxHeight = 400;
      } else {
        this.maxHeight = 520;
      }
    },
    // 获取表格数据
    async getTableData() {
      const res = await getRoleTableData(this.form);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    // 编辑
    edit(row) {
      this.$emit("edit", row);
    },
    // 删除
    async del(row) {
      await this.$confirm(`确定要删除角色 "${row.roleName}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delRoleTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.getTableData();
      } else {
        this.$message.error("删除失败");
      }
    },
    // 更改表格页面
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.getTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
.role-table {
  padding: 20px;
}
</style>