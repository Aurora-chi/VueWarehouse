<template>
  <div class="message-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="合作类型：">
            <el-input v-model="form.cooperationType" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="转态：">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="已查看" value="1" />
              <el-option label="未查看" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <search-button @updata:query="query" @updata:reset="reset" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "messageForm",
  components: { searchButton },
  data() {
    return {
      form: {
        cooperationType: "",
        status: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = { cooperationType: "", status: "" };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>