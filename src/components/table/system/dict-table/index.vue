<template>
  <div class="dict-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" prop="id" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="字典名称" align="center">
      </el-table-column>
      <el-table-column prop="type" label="字典类型" align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        :formatter="status"
      >
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center">
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
import tablePagination from "@/components/table/table-pagination/index.vue";
import { getDictTableData, delDictTableData } from "@/api/system/dict/dict-api";
export default {
  name: "dictTable",
  components: { tablePagination },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        this.uptateFormData(newVal);
        this.getTabelData();
      },
    },
    deep: true,
    immediate: true,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      form: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        type: "",
        status: "",
      },
    };
  },
  async created() {
    await this.getTabelData();
  },
  methods: {
    status(r, c, v) {
      const map = {
        0: "正常",
        1: "禁用",
      };
      return map[v] || v;
    },
    uptateFormData(newVal) {
      this.form = newVal;
    },
    async getTabelData() {
      const res = await getDictTableData(this.form);
      this.tableData = res.data;
      this.total = res.count;
    },
    // 切换表格页面
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.getTabelData();
    },
    // 编辑
    edit(row) {
      this.$emit("edit", row);
    },
    // 删除
    async del(row) {
      await this.$confirm(`确定要删除字典 "${row.name}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delDictTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.getTabelData();
      } else {
        this.$message.error("删除失败：", res.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dict-table {
  padding: 0 20px 20px 20px;
}
</style>