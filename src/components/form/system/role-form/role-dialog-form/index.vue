<template>
  <div class="role-dialog-form">
    <el-row>
      <el-form label-width="100px" ref="form" :model="form" :rules="rules">
        <el-col :span="24">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="form.roleName" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色标识：" prop="roleCode">
            <el-input v-model="form.roleCode" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单权限：">
            <el-tree
              ref="menuTree"
              :data="treeData"
              show-checkbox
              node-key="id"
              accordion
              @check="handleCheckChange"
              :props="{ label: 'menuName', children: 'children' }"
              :default-checked-keys="form.menuIdList"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getRouters } from "@/api/login";
import {
  updateRoleTableData,
  addRoleTableData,
  detailsRoleTableData,
} from "@/api/system/role/role-api";
import { buildMenuTree } from "@/utils/change_Tree_data";
export default {
  name: "roleDialogForm",
  props: {
    roleId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      treeData: [],
      form: {
        id: "",
        roleName: "",
        roleCode: "",
        menuIdList: [],
      },
      rules: {
        roleName: [{ required: true, message: "请输入", trigger: "blur" }],
        roleCode: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  async created() {
    await this.getMenuData();
  },
  methods: {
    // tree节点变化更新
    handleCheckChange() {
      this.form.menuIdList = this.$refs.menuTree.getCheckedKeys();
    },
    // 更新编辑表单数据
    async updateForm() {
      const res = await detailsRoleTableData(this.roleId);
      this.form = {
        id: res.data.id,
        roleName: res.data.roleName,
        roleCode: res.data.roleCode,
        menuIdList: res.data.menuIdList,
      };
    },
    // 获取导航数据
    async getMenuData() {
      const res = await getRouters();
      this.treeData = buildMenuTree(res.data);
    },
    // 清除表单数据
    clearFormData() {
      this.form = {
        id: "",
        roleName: "",
        roleCode: "",
        menuIdList: [],
      };
      if (this.$refs.menuTree) {
        this.$refs.menuTree.setCheckedKeys([]);
      }
      this.$refs.form.clearValidate();
    },
    // 提交表单
    async saveDialog(model) {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (model === "Add") {
            const res = await addRoleTableData(this.form);
            if (res.code) {
              this.$message.success("添加成功");
              this.$emit("closeDialog");
            }
          } else {
            console.log("form:", this.form);
            const res = await updateRoleTableData(this.form);
            if (res.code) {
              this.$message.success("编辑成功");
              this.$emit("closeDialog");
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>