<template>
  <div class="certificates-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column
        prop="id"
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column prop="name" label="资质名称" align="center">
      </el-table-column>
      <el-table-column prop="year" label="资质年份" align="center">
      </el-table-column>
      <el-table-column prop="sort" label="显示排序" align="center">
      </el-table-column>
      <el-table-column
        prop="display"
        label="是否显示"
        align="center"
        :formatter="display"
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
import {
  delCertificatesTableData,
  getCertificatesTableData,
} from "@/api/webConfig/about/certificates/certificates-api";
import tablePagination from "@/components/table/table-pagination/index.vue";
export default {
  name: "certificatesTable",
  components: { tablePagination },
  data() {
    return {
      tableData: [],
      total: 0,
      form: {
        pageNum: 1,
        pageSize: 10,
        year: "",
        name: "",
        display: "",
      },
    };
  },
  async created() {
    await this.getTableData(this.form);
  },
  methods: {
    async getTableData(data) {
      const res = await getCertificatesTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    edit(row) {
      this.$emit("edit", row);
    },
    async del(row) {
      await this.$confirm(`确定要删除 "${row.name}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delCertificatesTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      }
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    handleSelectionChange(val) {
      const ids = val.map((item) => item.id);
      this.$emit("selectTableID", ids);
    },
    display(r, c, v) {
      return v === 1 ? "是" : "否";
    },
  },
};
</script>

<style lang="scss" scoped>
.certificates-table {
  padding: 0 20px;
}
</style>