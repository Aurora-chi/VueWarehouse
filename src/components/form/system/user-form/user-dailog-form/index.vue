<template>
  <div class="user-dialog-form">
    <el-form label-width="100px" ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="24">
          <el-form-item label="登录名：" prop="loginName">
            <el-input v-model="form.loginName" :disabled="model !== 'Add'" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model="form.userName" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="密码：" v-if="model === 'Add'" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色：">
            <el-select
              v-model="form.roleIdList"
              multiple
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in roleList"
                :key="item.roleCode"
                :label="item.roleName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号：">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="邮箱：">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别：">
            <el-radio v-model="form.sex" label="0">女</el-radio>
            <el-radio v-model="form.sex" label="1">男</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态：" prop="status">
            <el-radio v-model="form.status" label="0">正常</el-radio>
            <el-radio v-model="form.status" label="1">停用</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { getRoleListData } from "@/api/system/user/user-api";
export default {
  name: "userDialogForm",
  data() {
    return {
      roleList: {},
      model: "Add",
      form: {
        id: "",
        loginName: "",
        userName: "",
        password: "",
        email: "",
        phone: "",
        sex: 2,
        avatar: "",
        status: "",
        roleIdList: [],
      },
      rules: {
        loginName: [{ required: true, message: "请输入", trigger: "blur" }],
        userName: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        status: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  async created() {
    await this.getRoleList();
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const res = await getRoleListData();
      this.roleList = res.data;
      this.model = "Add";
    },
    // 传递表单数据
    getFormData() {
      return this.form;
    },
    // 设置表单数据
    setFormData(data, model) {
      this.form = data;
      this.form.sex = String(data.sex);
      this.form.status = String(data.status);
      this.model = model;
    },
    // 表单验证
    async validate() {
      try {
        await this.$refs.form.validate();
        return true;
      } catch (e) {
        return false;
      }
    },
    // 清除表单数据
    clearFormData() {
      this.form = {
        id: "",
        loginName: "",
        userName: "",
        password: "",
        email: "",
        phone: "",
        sex: 2,
        avatar: "",
        status: "",
        roleIdList: [],
      };
      this.$refs.form.clearValidate();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>