<template>
  <div class="history-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
          <el-form-item label="是否显示：">
            <el-select style="width: 100%" v-model="form.display">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
        <search-button @updata:query="query" @updata:reset="reset" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "historyTopForm",
  components: { searchButton },
  data() {
    return {
      form: { display: "" },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = { display: "" };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>