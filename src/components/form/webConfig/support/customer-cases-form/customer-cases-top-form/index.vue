<template>
  <div class="customer-cases-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="标题：">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="是否显示：">
            <el-select v-model="form.isDisplay" style="width: 100%">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <search-button @updata:query="query" @updata:reset="reset" />
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "customerCasesTopForm",
  components: { searchButton },
  data() {
    return {
      form: {
        title: "",
        isDisplay: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = { title: "", isDisplay: "" };
      this.$emit("query", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.null {
  width: 100%;
  padding: 20px;
}
</style>