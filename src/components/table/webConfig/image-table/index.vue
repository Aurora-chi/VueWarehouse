<template>
  <div class="image-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column label="导航图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="`http://${url}${scope.row.imagePath}`"
            fit="cover"
          />
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
import tablePagination from "@/components/table/table-pagination/index.vue";
import {
  delImageTableData,
  getImageTableData,
} from "@/api/webConfig/image/image-api";
import { getUrl } from "@/utils/set-url";
export default {
  name: "imageTable",
  components: { tablePagination },
  data() {
    return {
      url: "",
      tableData: [],
      total: 0,
    };
  },
  created() {
    this.setUrl();
  },
  methods: {
    setUrl() {
      this.url = getUrl();
    },
    async getTableData(data) {
      const res = await getImageTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    edit(row) {
      this.$emit("edit", row);
    },
    async del(row) {
      await this.$confirm(`确定要删除 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delImageTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      }
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    isDisplay(r, c, v) {
      return v === 1 ? "是" : "否";
    },
  },
};
</script>

<style lang="scss" scoped>
.image-table {
  padding: 0 20px;
}
</style>