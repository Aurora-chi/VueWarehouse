<template>
  <div class="standard-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="standardNo" label="标准号" align="center">
      </el-table-column>
      <el-table-column prop="standardName" label="标准名称" align="center">
      </el-table-column>
      <el-table-column prop="sort" label="显示排序" align="center">
      </el-table-column>
      <el-table-column
        prop="isDisplay"
        label="是否显示"
        align="center"
        :formatter="isDisplay"
      >
      </el-table-column>
      <el-table-column
        prop="isTop"
        label="是否置顶"
        align="center"
        :formatter="isTop"
      >
      </el-table-column>
      <el-table-column prop="filePath" label="附件路径" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="200">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="download(scope.row)"
            >下载</el-button
          >
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
import tablePagination from "@/components/table/table-pagination/index.vue";
import {
  delStandardTableData,
  getStandardTableData,
} from "@/api/webConfig/support/standard/standard-api";
export default {
  name: "standardTable",
  components: { tablePagination },
  data() {
    return {
      total: 0,
      maxHeight: 563,
      tableData: [],
      form: {
        pageNum: 1,
        pageSize: 10,
        standardNo: "",
        standardName: "",
        isDisplay: 1,
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
      const res = await getStandardTableData(data);
      this.tableData = res.data;
      this.total = res.count;
    },

    // 下载
    download(row) {
      this.$emit("downlaod", row);
    },
    // 编辑
    edit(row) {
      this.$emit("edit", row);
    },
    // 删除
    async del(row) {
      await this.$confirm(`确定要删除标准号 "${row.standardNo}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delStandardTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      }
    },
    // 表格页面变化
    changePage(page) {
      this.$emit("changePage", page);
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
    isDisplay(r, c, v) {
      const map = {
        0: "否",
        1: "是",
      };
      return map[v] || v;
    },
    isTop(r, c, v) {
      const map = {
        0: "否",
        1: "是",
      };
      return map[v] || v;
    },
  },
};
</script>

<style lang="scss" scoped>
.standard-table {
  width: 100%;
  padding: 0px 20px;
}
</style>