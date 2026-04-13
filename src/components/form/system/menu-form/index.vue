<template>
  <div class="menu-form">
    <el-form
      class="form"
      label-width="100px"
      :rules="rules"
      :model="form"
      ref="form"
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="上级菜单：" prop="parentId">
            <el-cascader
              v-model="form.parentId"
              :options="treeData"
              :props="{
                value: 'id',
                label: 'menuName',
                children: 'children',
                checkStrictly: true,
                emitPath: false,
              }"
              clearable
              filterable
              style="width: 100%"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="菜单类型：" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio :label="1">目录</el-radio>
              <el-radio :label="2">菜单</el-radio>
              <el-radio :label="3">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="菜单图标：">
            <el-input v-model="form.icon" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="菜单名称：" prop="menuName">
            <el-input v-model="form.menuName" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="显示排序：">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              step-strictly
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="是否显示：" prop="isDisplay">
            <el-radio v-model="form.isDisplay" :label="1">是</el-radio>
            <el-radio v-model="form.isDisplay" :label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="是否外链：" prop="isFrame">
            <el-radio v-model="form.isFrame" :label="1">是</el-radio>
            <el-radio v-model="form.isFrame" :label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="请求地址：">
            <el-input v-model="form.path" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="权限标识：">
            <el-input v-model="form.perms" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  getMenuTableData,
  addMenuTableData,
  updateMenuTableData,
} from "@/api/system/menu/menu-api";
import { buildMenuTree } from "@/utils/change_Tree_data";
export default {
  name: "menuForm",
  data() {
    return {
      form: {
        id: "",
        parentId: "",
        menuType: "",
        icon: "",
        menuName: "",
        sort: "",
        isDisplay: "",
        isFrame: "",
        path: "",
        perms: "",
      },
      rules: {
        parentId: [{ required: true, message: "请选择", trigger: "blur" }],
        menuType: [{ required: true, message: "请选择", trigger: "change" }],
        menuName: [{ required: true, message: "请选择", trigger: "blur" }],
        isDisplay: [{ required: true, message: "请选择", trigger: "change" }],
        isFrame: [{ required: true, message: "请选择", trigger: "change" }],
      },
      treeData: [
        {
          id: 0,
          menuName: "主目录",
          children: [],
        },
      ],
    };
  },
  async created() {
    await this.getTreeData();
  },
  methods: {
    // 初始化表单数据
    initFormData() {
      this.form = {
        id: "",
        parentId: "",
        type: "",
        icon: "",
        menuName: "",
        sort: "",
        isDisplay: "",
        isFrame: "",
        path: "",
        perms: "",
      };
    },
    // 编辑表单数据
    editFormData(val) {
      this.form = val;
    },
    // 获取表单数据
    async getTreeData() {
      const res = await getMenuTableData();
      this.treeData[0].children = buildMenuTree(res.data);
    },
    // 菜单选择变更回调函数
    handleChange(value) {
      this.form.parentId = value;
    },
    // 新增表单
    async addFormData() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await addMenuTableData(this.form);
          if (res.code === 200) {
            this.$message.success("添加成功");
            this.$emit("closeDialog");
          } else {
            this.$message.error("添加失败：", res.msg);
          }
        }
      });
    },
    // 修改表单
    async updateFormData() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await updateMenuTableData(this.form);
          if (res.code === 200) {
            this.$message.success("修改成功");
            this.$emit("closeDialog");
          } else {
            this.$message.error("修改失败：", res.msg);
          }
        }
      });
    },
    // 清空校验
    clearValidate() {
      this.$refs.form.clearValidate();
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-form {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.el-radio {
  margin-right: 20px;
}
</style>