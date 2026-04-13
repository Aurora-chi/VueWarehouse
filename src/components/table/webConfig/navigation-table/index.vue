<template>
  <div class="navigation-table">
    <el-table
      ref="table"
      :data="tableData"
      style="width: 100%"
      :tree-props="{ children: 'children' }"
      row-key="id"
    >
      <el-table-column prop="navName" label="导航名称" align="center">
      </el-table-column>
      <el-table-column prop="path" label="请求地址" align="center">
      </el-table-column>
      <el-table-column
        prop="isHome"
        label="是否首页"
        align="center"
        :formatter="isDispaly"
      ></el-table-column>
      <el-table-column
        prop="isFrame"
        label="是否外链"
        align="center"
        :formatter="isDispaly"
      ></el-table-column>
      <el-table-column
        prop="isDisplay"
        label="是否显示"
        align="center"
        :formatter="isDispaly"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="210">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="add(scope.row)"
            >新建</el-button
          >
          <el-button type="warning" size="mini" @click="edit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { buildMenuTree } from "@/utils/change_Tree_data";
import {
  delNavigationTableData,
  getNavigationTableData,
} from "@/api/webConfig/navigation/navigation-api";
export default {
  name: "navigationTable",

  data() {
    return {
      tableData: [],
      form: {
        navName: "",
      },
    };
  },
  async created() {
    this.getTableData(this.form);
  },
  methods: {
    async getTableData(data) {
      const res = await getNavigationTableData(data);
      if (res.code === 200) {
        const val = buildMenuTree(res.data);
        this.tableData = val;
      }
    },
    // 树形表格 展开/折叠 核心方法
    toggleTreeExpand(isExpand) {
      if (!this.$refs.table) return;
      const toggle = (row) => {
        this.$refs.table.toggleRowExpansion(row, isExpand);
        if (row.children && row.children.length) {
          row.children.forEach((item) => toggle(item));
        }
      };
      this.tableData.forEach((row) => toggle(row));
    },
    isDispaly(r, c, v) {
      return v === 1 ? "是" : "否";
    },
    add(row) {
      this.$emit("add", row);
    },
    edit(row) {
      this.$emit("edit", row);
    },
    async del(row) {
      await this.$confirm(`确定要删除 "${row.navName}" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delNavigationTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$emit("updateTable");
      } else {
        this.$message.error("删除失败", res.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation-table {
  padding: 0 20px;
}
</style>