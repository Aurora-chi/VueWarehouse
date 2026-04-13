<template>
  <div class="menu-dialog">
    <el-dialog
      :visible="menuVisible"
      width="45%"
      top="20vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增菜单" : "编辑菜单" }}
      </div>
      <menu-form ref="menuForm" @closeDialog="closeDialog" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import menuForm from "@/components/form/system/menu-form/index.vue";
export default {
  name: "menuDialog",
  components: { menuForm },
  props: {
    menuDialogData: {
      type: Object,
      default: () => {},
    },
    parentId: {
      type: [String, Number],
      required: true,
      default: "",
    },
  },
  data() {
    return {
      menuVisible: false,
      model: "Add",
    };
  },
  watch: {
    menuDialogData: {
      handler(newVal) {
        this.$nextTick(() => {
          this.editMenuForm(newVal);
        });
      },
      deep: true,
    },
    parentId: {
      handler(newVal) {
        this.$nextTick(() => {
          this.addMenuForm(newVal);
        });
      },
      deep: true,
    },
  },
  methods: {
    // 打开Dialog
    openDialog(model) {
      this.menuVisible = true;
      this.model = model;
    },
    // menuDialog关闭回调
    closeDialog() {
      this.$refs.menuForm.initFormData();
      this.$refs.menuForm.clearValidate();
      this.menuVisible = false;
    },
    // 确定按钮
    saveDialog() {
      if (this.model === "Add") {
        this.$refs.menuForm.addFormData();
      } else {
        this.$refs.menuForm.updateFormData();
      }
      this.$emit("update:table");
    },
    // 编辑表单
    editMenuForm(val) {
      this.$refs.menuForm.editFormData(val);
    },
    // 添加表单
    addMenuForm(val) {
      const form = { parentId: val };
      this.$refs.menuForm.editFormData(form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>