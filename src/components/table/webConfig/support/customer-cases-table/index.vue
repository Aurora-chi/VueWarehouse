<template>
  <div class="customer-cases-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="remarks" label="概述" align="center">
      </el-table-column>
      <el-table-column prop="coverImagePath" label="封面图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="getImageUrl(scope.row.coverImagePath)"
            fit="cover"
          ></el-image>
        </template>
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
import tablePagination from "@/components/table/table-pagination/index.vue";
import {
  delCustomerCasesTableData,
  getCustomerCasesTableData,
} from "@/api/webConfig/support/customer-cases/customer-cases-api";
import { getUrl } from "@/utils/set-url";
export default {
  name: "customerCasesTable",
  components: { tablePagination },
  data() {
    return {
      total: 0,
      maxHeight: 563,
      tableData: [],
      form: {
        pageNum: 1,
        pageSize: 10,
        title: "",
        isDisplay: "",
      },
    };
  },
  async created() {
    await this.getTableData(this.form);
  },
  mounted() {
    // 0.1秒监听屏幕变化
    this.handleResize = debounce(this.handleResize, 100);
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 释放监听
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 获取表格数据
    async getTableData(data) {
      const res = await getCustomerCasesTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    // 补全图片url
    getImageUrl(coverImagePath) {
      return "http://" + getUrl() + coverImagePath;
    },
    // 切换表格页面
    changePage(val) {
      this.$emit("changePage", val);
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
      const res = await delCustomerCasesTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      } else {
        this.$message.error("删除失败", res.msg);
      }
    },
    handleResize() {
      if (window.innerWidth < 1200 && window.innerWidth > 768) {
        this.maxHeight = 508;
      } else if (window.innerWidth < 768 && window.innerWidth > 300) {
        this.maxHeight = 430;
      } else if (window.innerWidth < 300) {
        this.maxHeight = 390;
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
  },
};
</script>

<style lang="scss" scoped>
</style>