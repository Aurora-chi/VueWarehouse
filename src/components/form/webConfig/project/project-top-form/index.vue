<template>
  <div class="project-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="项目标注：">
            <el-input v-model="form.tag" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="启用状态：">
            <el-select style="width: 100%" v-model="form.enableStatus">
              <el-option label="启用" value="0" />
              <el-option label="禁用" value="1" />
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
  name: "projectTopForm",
  components: { searchButton },
  data() {
    return {
      form: {
        tag: "",
        enableStatus: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        tag: "",
        enableStatus: "",
      };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>