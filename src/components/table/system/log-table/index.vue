<template>
  <div class="log-table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" prop="id" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="module" label="操作模块" align="center">
      </el-table-column>
      <el-table-column prop="name" label="操作名称" align="center">
      </el-table-column>
      <el-table-column
        prop="type"
        label="操作类型"
        align="center"
        :formatter="type"
      >
      </el-table-column>
      <el-table-column prop="userName" label="操作用户" align="center">
      </el-table-column>
      <el-table-column prop="userIp" label="用户IP" align="center">
      </el-table-column>
      <el-table-column prop="duration" label="执行时长" align="center">
      </el-table-column>
      <el-table-column prop="startTime" label="操作时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="details(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <table-pagination :total="total" @update:page="changePage" />
  </div>
</template>

<script>
import tablePagination from "@/components/table/table-pagination/index.vue";
import { getLogTableData, detailsLogTableData } from "@/api/system/log/log-api";
export default {
  name: "logTable",
  components: { tablePagination },
  data() {
    return {
      tableData: [],
      total: 0,
      maxHeight: 550,
      form: {
        pageNum: 1,
        pageSize: 10,
        module: "",
        name: "",
        type: "",
        status: "",
        beginTime: "",
        endTime: "",
      },
    };
  },
  async created() {
    await this.getLogTableData();
  },
  mounted() {
    this.checkWindowWidth();
    window.addEventListener("resize", this.checkWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkWindowWidth);
  },
  methods: {
    type(r, c, v) {
      const map = {
        1: "新增",
        2: "修改",
        3: "删除",
        4: "导入",
        5: "导出",
        6: "查询",
        0: "其它",
      };
      return map[v] || v;
    },
    async getLogTableData() {
      const res = await getLogTableData(this.form);
      this.total = res.count;
      this.tableData = res.data;
    },
    // 监听窗口变化函数
    checkWindowWidth() {
      const width = window.innerWidth;
      if (width < 1200 && width > 770) {
        this.maxHeight = 417;
      } else if (width < 770) {
        this.maxHeight = 220;
      } else {
        this.maxHeight = 550;
      }
    },
    // 详情
    async details(row) {
      const res = await detailsLogTableData(row.id);
      this.$emit("details", res.data);
    },
    //  切换表格页面
    changePage(val) {
      this.form.pageNum = val.pageNum;
      this.form.pageSize = val.pageSize;
      this.getLogTableData();
    },
    //搜索方法
    query(val) {
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.form = val;
      this.getLogTableData();
    },
    // 重置方法
    reset(val) {
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.form = val;
      this.getLogTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
.log-table {
  padding: 0 20px;
}
</style>