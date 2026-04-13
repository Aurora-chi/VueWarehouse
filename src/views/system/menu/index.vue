<template>
  <div class="menu">
    <div class="top">
      <el-form class="top-form" @submit.native.prevent>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
            <el-form-item label="菜单名称：" label-width="120px">
              <el-input
                type="text"
                style="width: 100%"
                v-model="formInline.name"
                @keyup.enter.native="query"
              />
            </el-form-item>
          </el-col>
          <!-- 搜索和重置按钮 -->
          <topBtn @updata:query="query" @updata:reset="reset" />
        </el-row>
      </el-form>
    </div>
    <div class="bodyer">
      <el-row class="header-btn">
        <el-col>
          <!-- 新增按钮和展开/折叠按钮 -->
          <headerBtn @updata:addNew="addNew" @updata:expand="toggleExpandAll" />

          <!-- 收费表单按钮 -->
          <!-- <payment-btn @openPaymentDialog="openPaymentDialog" /> -->
        </el-col>
      </el-row>
      <el-row class="content">
        <el-col :span="24">
          <menu-table
            :isExpand="isExpand"
            @edit="edit"
            @add="add"
            @del="del"
            ref="menuTable"
          />
          <!-- 表格 -->
        </el-col>
      </el-row>
    </div>
    <menu-dialog
      ref="menuDialog"
      :menuDialogData="menuDialogData"
      :parentId="parentId"
      @update:table="updateTable"
    />
    <!-- 收费表单 -->
    <!-- <payment-dialog
      :visible.sync="paymentVisible"
      @closePaymentDialog="closePaymentDialog"
    /> -->
  </div>
</template>

<script>
import {
  detailsMenuTableData,
  delMenuTableData,
} from "@/api/system/menu/menu-api";
import topBtn from "@/components/button/search-button/topBtn.vue";
import headerBtn from "@/components/button/headerBtn/index.vue";
import menuTable from "@/components/table/system/menu-table/index.vue";
import menuDialog from "@/components/dialogs/system/menu-dialog/index.vue";
// import paymentBtn from "@/components/button/headerBtn/paymentBtn/index.vue";
// import paymentDialog from "@/components/dialogs/payment-dialog/index.vue";
export default {
  name: "menu",
  components: {
    topBtn,
    headerBtn,
    menuTable,
    menuDialog,
    // paymentBtn,
    // paymentDialog,
  },
  data() {
    return {
      isExpand: true, // 是否展开
      formInline: {
        name: "",
      },
      menuDialogData: {},
      parentId: "",
      // paymentVisible: false,
    };
  },
  methods: {
    // 新增按钮
    addNew() {
      this.$refs.menuDialog.openDialog("Add");
    },
    // 折叠按钮
    toggleExpandAll() {
      this.isExpand = !this.isExpand;
    },
    // 搜索按钮
    query() {
      this.$refs.menuTable.handleSearch(this.formInline.name);
    },
    // 重置按钮
    reset() {
      this.$refs.menuTable.resetSearch();
      this.formInline.name = "";
    },
    // 编辑
    async edit(row) {
      const res = await detailsMenuTableData(row.id);
      this.menuDialogData = res.data;
      this.$refs.menuDialog.openDialog("edit");
    },
    // 新增
    add(row) {
      this.parentId = row.id;
      this.$refs.menuDialog.openDialog("Add");
    },
    // 删除
    async del(row) {
      await this.$confirm(`确定要删除菜单"${row.menuName}"吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await delMenuTableData(row.id);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.$refs.menuTable.getTableData();
      } else {
        this.$message.error("删除失败：", res.msg);
      }
    },
    // 刷新表格
    updateTable() {
      this.$refs.menuTable.getTableData();
    },
    // // 打开表单
    // openPaymentDialog() {
    //   this.paymentVisible = true;
    // },
    // // 关闭表单
    // closePaymentDialog() {
    //   this.paymentVisible = false;
    // },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
  padding: 20px;
  .top {
    width: 100%;
    margin-bottom: 20px;
    padding: 0px 12px 14px;
    background-color: #fff;
  }
  .bodyer {
    width: 100%;
    background-color: #fff;
    .header-btn {
      width: 100%;
    }
    .content {
      width: 100%;
    }
  }
}

.top-form {
  .el-form-item {
    margin: 16px 10px 0px 0px;
    padding: 0px 12px;
  }
}
</style>