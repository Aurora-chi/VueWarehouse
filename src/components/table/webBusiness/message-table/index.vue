<template>
  <div class="message-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" prop="id" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="电话" align="center">
      </el-table-column>
      <el-table-column prop="cooperationType" label="合作类型" align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
        :formatter="status"
      >
      </el-table-column>
      <el-table-column prop="createTime" label="操作时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="details(scope.row)"
            >详情</el-button
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
  delMessageTableData,
  getMessageTableData,
} from "@/api/webBusiness/message/message-api";
import tablePagination from "@/components/table/table-pagination/index.vue";
export default {
  name: "messageTable",
  components: { tablePagination },
  data() {
    return {
      tableData: [],
      total: 0,
      form: {
        pageNum: 1,
        pageSize: 10,
        cooperationType: "",
        status: "",
      },
    };
  },
  async created() {
    await this.getTableData(this.form);
  },
  methods: {
    async getTableData(data) {
      const res = await getMessageTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    status(r, c, v) {
      return v === 1 ? "已查看" : "未查看";
    },
    details(row) {
      this.$emit("details", row);
    },
    async del(row) {
      await this.$confirm(`确定要删除 "${row.name}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delMessageTableData(row.id);
      if (res.code === 200) {
        this.$emit("updateTable");
        this.$message.success("删除成功");
      }
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.message-table {
  padding: 20px;
}
</style>