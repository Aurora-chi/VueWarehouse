<template>
  <div class="salesman-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="销售岗位：">
            <el-input v-model="form.salesPost" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="联系人：">
            <el-input v-model="form.contacts" />
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
        <search-button @updata:query="query" @updata:reset="reset" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "salesmanTopForm",
  components: { searchButton },
  data() {
    return {
      form: {
        salesPost: "",
        contacts: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        salesPost: "",
        contacts: "",
      };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>