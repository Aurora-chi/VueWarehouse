<template>
  <div class="standard-form">
    <el-row>
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标准号：">
            <el-input v-model="form.standardNo" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标准名称：">
            <el-input v-model="form.standardName" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="是否显示：">
            <el-select v-model="form.isDisplay" style="width: 100%">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <search-button @updata:query="query" @updata:reset="reset" />
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "standardForm",
  components: { searchButton },
  data() {
    return {
      form: {
        standardNo: "",
        standardName: "",
        isDisplay: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.clearForm();
      this.$emit("reset", this.form);
    },
    clearForm() {
      this.form = {
        standardNo: "",
        standardName: "",
        isDisplay: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>