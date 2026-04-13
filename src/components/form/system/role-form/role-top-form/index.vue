<template>
  <div class="role-top-form">
    <el-form label-width="100px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-form-item label="角色名称：">
            <el-input v-model="form.roleName" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-form-item label="角色标识：">
            <el-input v-model="form.roleCode" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <search-btn @updata:query="query" @updata:reset="reset" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import searchBtn from "@/components/button/search-button/topBtn.vue";
export default {
  name: "roleTopForm",
  components: { searchBtn },
  data() {
    return {
      form: {
        roleCode: "",
        roleName: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        roleCode: "",
        roleName: "",
      };
      this.$emit("reset");
    },
  },
};
</script>

<style lang="scss" scoped>
.role-top-form {
  width: 100%;
}
</style>