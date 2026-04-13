<template>
  <div class="project-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="navName" label="导航名称" align="center">
      </el-table-column>
      <el-table-column prop="tag" label="项目标注" align="center">
      </el-table-column>
      <el-table-column
        prop="enableStatus"
        label="启用状态"
        align="center"
        :formatter="isEnableStatus"
      >
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
import {
  delProjectTableData,
  getProjectTableData,
} from "@/api/webConfig/project/project-api";
import tablePagination from "@/components/table/table-pagination/index.vue";
export default {
  name: "projectTable",
  components: { tablePagination },
  data() {
    return {
      total: 0,
      maxHeight: 563,
      tableData: [],
      form: {
        pageNum: 1,
        pageSize: 10,
        tag: "",
        enableStatus: "",
      },
    };
  },
  async created() {
    await this.getTableData(this.form);
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
      const res = await getProjectTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    edit(row) {
      this.$emit("edit", row);
    },
    async del(row) {
      await this.$confirm(`确定要删除标题 "${row.standardNo}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delProjectTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      } else {
        this.$message.error("删除失败", res.msg);
      }
    },
    // 切换表格页面
    changePage(page) {
      this.$emit("changePage", page);
    },
    handleResize() {
      if (window.innerWidth < 1200 && window.innerWidth > 768) {
        this.maxHeight = 500;
      } else if (window.innerWidth < 768) {
        this.maxHeight = 443;
      } else {
        this.maxHeight = 563;
      }
    },
    isEnableStatus(r, c, v) {
      const map = {
        0: "启用",
        1: "禁用",
      };
      return map[v] || v;
    },
  },
};
</script>

<style lang="scss" scoped>
.project-table {
  width: 100%;
  padding: 0 20px;
}
</style>