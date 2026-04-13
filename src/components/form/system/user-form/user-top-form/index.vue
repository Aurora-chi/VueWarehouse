<template>
  <div class="user-top-form">
    <el-form label-width="100px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="登录名：">
            <el-input v-model="form.loginName" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="用户名：">
            <el-input v-model="form.userName" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="状态：">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="正常" value="0" />
              <el-option label="禁用" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <search-button @updata:query="query" @updata:reset="reset" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "userTopForm",
  components: { searchButton },
  data() {
    return {
      form: {
        pageNum: 1,
        pageSize: 10,
        loginName: "",
        userName: "",
        status: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        pageNum: 1,
        pageSize: 10,
        loginName: "",
        userName: "",
        status: "",
      };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>