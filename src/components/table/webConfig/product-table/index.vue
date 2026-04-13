<template>
  <div class="productTable">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="产品名称" align="center">
      </el-table-column>
      <el-table-column prop="type" label="产品类型" align="center">
      </el-table-column>
      <el-table-column prop="images" label="封面图" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="getHomeImg(scope.row)"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="显示排序" align="center">
      </el-table-column>
      <el-table-column
        prop="display"
        label="是否显示"
        align="center"
        :formatter="isDispaly"
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
  delProductTableData,
  getProductTableData,
} from "@/api/webConfig/product/product-api";
import { getUrl } from "@/utils/set-url";

export default {
  name: "productTable",
  components: { tablePagination },
  props: {
    NavId: {
      type: Number,
      default: null,
    },
  },
  watch: {
    NavId: {
      handler(newVal) {
        this.form.navId = newVal;
        this.$nextTick(() => {
          this.getTableData(this.form);
        });
      },
      immediate: true,
    },
  },
  data() {
    return {
      total: 0,
      tableData: [],
      form: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        type: "",
        navId: null,
      },
    };
  },
  methods: {
    async getTableData(data) {
      const res = await getProductTableData(data);
      this.tableData = res.data;
      this.total = res.count;
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
    isDispaly(r, c, v) {
      return v === 1 ? "是" : "否";
    },
    edit(row) {
      this.$emit("edit", row);
    },
    async del(row) {
      await this.$confirm(`确定要删除标题 "${row.name}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delProductTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      } else {
        this.$message.error("删除失败", res.msg);
      }
    },
    getHomeImg(row) {
      const homeImg = row.images.find((item) => item.isHome === 1);
      if (homeImg) {
        return "http://" + getUrl() + "/" + homeImg.filePath;
      }
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>