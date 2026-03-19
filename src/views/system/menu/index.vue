<template>
  <div class="menu">
    <div class="top">
      <el-form class="top-form">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
            <el-form-item label="菜单名称：" label-width="120px">
              <el-input
                type="text"
                style="width: 100%"
                v-model="formInline.name"
                @keyup.enter="query"
              />
            </el-form-item>
          </el-col>
          <topbtn />
        </el-row>
      </el-form>
    </div>
    <div class="bodyer">
      <el-row class="header-btn">
        <el-col>
          <headerBtn />
          <charge-btn @open-chargeDialog="handleOpenDialog" />
        </el-col>
      </el-row>
      <div class="content">2</div>
    </div>
    <Dialog
      :visible.sync="dialogVisible"
      @close-chargeDialog="handleCloseDialog"
    />
  </div>
</template>

<script>
import topbtn from "@/components/button/topBtn.vue";
import headerBtn from "@/components/button/headerBtn/index.vue";
import chargeBtn from "@/components/button/headerBtn/chargeBtn/index.vue";
import Dialog from "@/components/dialog/charge/index.vue";
export default {
  name: "cdgl",
  components: { topbtn, headerBtn, chargeBtn, Dialog },
  data() {
    return {
      formInline: {},
      dialogVisible: false,
    };
  },
  methods: {
    // 打开表单
    handleOpenDialog() {
      this.dialogVisible = true;
    },
    // 关闭表单
    handleCloseDialog() {
      this.dialogVisible = false;
    },
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
  }
}

.top-form {
  .el-form-item {
    margin: 16px 10px 0px 0px;
    padding: 0px 12px;
  }
}
</style>