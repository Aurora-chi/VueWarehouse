<template>
  <div class="profile-table">
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
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="sort" label="显示排序" align="center">
      </el-table-column>
      <el-table-column
        prop="isHome"
        label="是否前台展示"
        align="center"
        :formatter="isHome"
      >
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column prop="pcFilePath" label="图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="`http://${url}${scope.row.pcImageFilePath}`"
            fit="cover"
          ></el-image>
        </template>
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
  delProfileTableData,
  getProfileTableData,
} from "@/api/webConfig/about/profile/profile-api";
import tablePagination from "@/components/table/table-pagination/index.vue";
import { getUrl } from "@/utils/set-url";
export default {
  name: "profileTable",
  components: { tablePagination },
  data() {
    return {
      url: "",
      total: 0,
      tableData: [],
      form: {
        pageNum: 1,
        pageSize: 10,
        title: "",
        isHome: "",
        beginTime: "",
        endTime: "",
      },
    };
  },
  async created() {
    this.setUrl();
    await this.getTableData(this.form);
  },
  methods: {
    async getTableData(data) {
      const res = await getProfileTableData(data);
      if (res.code === 200) {
        this.tableData = res.data;
        this.total = res.count;
      }
    },
    handleSelectionChange(val) {
      const ids = val.map((item) => item.id);
      this.$emit("bacthDel", ids);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    edit(row) {
      this.$emit("edit", row);
    },
    async del(row) {
      await this.$confirm(`确定要删除 "${row.title}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delProfileTableData(row.id);
      if (res.code === 200) {
        this.$emit("updateTable");
        this.$message.success("删除成功");
      }
    },
    isHome(r, c, v) {
      return v === 1 ? "是" : "否";
    },
    setUrl() {
      this.url = getUrl();
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-table {
  padding: 0 20px;
}
</style>