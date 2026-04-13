<template>
  <div class="faq-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="title" label="问题标题" align="center">
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
  delFaqTableData,
  getFaqTableData,
} from "@/api/webConfig/support/faq/faq-api";
import tablePagination from "@/components/table/table-pagination/index.vue";
export default {
  name: "faqTable",
  components: { tablePagination },
  data() {
    return {
      tableData: [],
      maxHeight: 563,
      total: 0,
      form: {
        pageNum: 1,
        pageSize: 10,
        title: "",
        isDisplay: "",
      },
    };
  },
  async created() {
    await this.getFormData(this.form);
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
    async getFormData(data) {
      const res = await getFaqTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      } else {
        this.$message.error("表格数据获取失败", res.msg);
      }
    },
    // 编辑
    edit(row) {
      this.$emit("edit", row.id);
    },
    // 删除
    async del(row) {
      await this.$confirm(`确定要删除 "${row.title}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delFaqTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      } else {
        this.$message.error("删除失败", res.msg);
      }
    },
    // 切换页面
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

<style lang='scss' scoped>
.faq-table {
  width: 100%;
  padding: 0 20px;
}
</style>