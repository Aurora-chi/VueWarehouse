<template>
  <div class="image">
    <div class="bodyer">
      <el-tabs
        tab-position="left"
        style="height: 100%"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          v-for="item in tabList"
          :key="item.id"
          :name="item.id"
          :label="item.navName"
        >
        </el-tab-pane>
        <div style="height: 100%" v-if="form.navId">
          <add-btn @updata:addNew="addNew" />
          <image-table
            ref="imageTable"
            @edit="edit"
            @changePage="changePage"
            @updateTable="updateTable"
          />
        </div>
        <el-empty v-else description="请选择左侧导航"></el-empty>
      </el-tabs>
      <image-dialog
        ref="imageDialog"
        :model="model"
        :navId="form.navId"
        @updateTable="updateTable"
      />
    </div>
  </div>
</template>

<script>
import imageDialog from "@/components/dialogs/webConfig/image-dialog/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import axios from "axios";
import { getUrl } from "@/utils/set-url";
import imageTable from "@/components/table/webConfig/image-table/index.vue";
export default {
  name: "dhtpgl",
  components: { imageTable, addBtn, imageDialog },
  data() {
    return {
      url: "",
      headers: {},
      model: "",
      tabList: [],
      form: {
        pageNum: 1,
        pageSize: 10,
        navId: "",
      },
    };
  },
  async created() {
    this.setUploadData();
    await this.getNavigation();
  },
  methods: {
    setUploadData() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    async handleTabClick(tab) {
      this.form.navId = tab.name;
      await this.$nextTick();
      this.$refs.imageTable.getTableData(this.form);
    },
    addNew() {
      this.model = "Add";
      this.$refs.imageDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.imageDialog.openDialog();
      this.$refs.imageDialog.detailsFormData(row.id);
    },
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.updateTable();
    },
    updateTable() {
      this.$refs.imageTable.getTableData(this.form);
    },
    // 获取树形导航
    async getNavigation() {
      const url = "http://" + this.url + "/web/navigation/getNavigationTree";
      const res = await axios.post(url, {}, this.headers);
      if (res.data.code === 200) {
        this.tabList = res.data.data.map((item) => ({
          id: String(item.id),
          navName: item.navName,
        }));
      } else {
        this.$message.error("导航数据获取失败", res.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
  padding: 20px;
  .bodyer {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #fff;
  }
}
</style>