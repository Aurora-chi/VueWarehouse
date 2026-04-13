<template>
  <div class="navigation-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="导航名称：">
            <el-input v-model="form.navName" />
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16">
        <search-button @updata:query="query" @updata:reset="reset" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "navigationTopForm",
  components: { searchButton },
  data() {
    return {
      form: {
        navName: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form.navName = "";
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>