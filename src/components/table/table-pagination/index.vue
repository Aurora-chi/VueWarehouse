<template>
  <div class="pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tablePagination",
  props: {
    total: {
      type: [Number],
      default: 0,
      required: true,
    },
  },
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 改变每页数量回调函数
    handleSizeChange(val) {
      this.page.pageNum = 1; // 切换每页条数时，回到第一页
      this.page.pageSize = val; // 如果有 pageSize 变量，需要更新
      this.$emit("update:page", this.page);
    },

    // 当前页改变触发
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.$emit("update:page", this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>