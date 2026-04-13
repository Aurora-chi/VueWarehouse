<template>
  <div class="news-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="id" type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="subTitle" label="副标题" align="center">
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center">
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
      <el-table-column prop="filePath" label="文件路径" align="center">
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
  delNewsTableData,
  getNewsTableData,
} from "@/api/webConfig/news/news-api";
import tablePagination from "@/components/table/table-pagination/index.vue";
export default {
  name: "newsTable",
  components: { tablePagination },
  data() {
    return {
      tableData: [],
      total: 0,
      maxHeight: 563,
      form: {
        pageNum: 1,
        pageSize: 10,
        title: "",
        top: "",
        display: "",
        navId: "1",
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
    async getTableData(data) {
      const res = await getNewsTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      } else {
        this.$message.error("表格数据获取失败", res.msg);
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
      const res = await delNewsTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      } else {
        this.$message.error("删除失败", res.msg);
      }
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    // 选择的表格回调
    handleSelectionChange(val) {
      this.$emit(
        "batchDelId",
        val.map((item) => item.id)
      );
    },
    handleResize() {
      if (window.innerWidth < 1200 && window.innerWidth > 768) {
        this.maxHeight = 500;
      } else if (window.innerWidth < 768) {
        this.maxHeight = 383;
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
.new-table {
  width: 100%;
  padding: 20px;
}
</style>