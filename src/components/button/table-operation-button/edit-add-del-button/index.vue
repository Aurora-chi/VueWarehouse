
<template>
  <div class="table-actions">
    <el-button
      type="warning"
      size="mini"
      @click="handleEdit"
      icon="el-icon-edit"
      >编辑</el-button
    >
    <el-button type="primary" size="mini" @click="handleAdd" icon="el-icon-plus"
      >新增</el-button
    >
    <el-button
      type="danger"
      size="mini"
      @click="handleDelete"
      icon="el-icon-delete"
      >删除</el-button
    >
  </div>
</template>

<script>
export default {
  name: "EditAddDelButton",
  props: {
    // 接收行数据
    rowData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  methods: {
    handleEdit() {
      // 通过事件向父组件传递行数据
      this.$emit("edit", this.rowData);
    },
    handleAdd() {
      this.$emit("add", this.rowData);
    },
    handleDelete() {
      this.$emit("delete", this.rowData);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-actions {
  .el-button {
    margin: 0 2px;
  }
}
</style>