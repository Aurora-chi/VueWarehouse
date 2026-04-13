<template>
  <div class="menu-table">
    <el-table
      ref="menuTable"
      :data="displayData"
      row-key="id"
      :default-expand-all="isExpand"
      :indent="26"
    >
      <el-table-column
        prop="menuName"
        label="菜单名称"
        align="center"
        min-width="130"
      />
      <el-table-column prop="sort" label="排序" align="center" min-width="80" />
      <el-table-column
        prop="menuType"
        label="菜单类型"
        align="center"
        :formatter="menuType"
        min-width="80"
      />
      <el-table-column
        prop="perms"
        label="权限标识"
        align="center"
        min-width="180"
      />
      <el-table-column
        prop="isDisplay"
        label="是否显示"
        align="center"
        :formatter="isDisplay"
        min-width="80"
      />
      <el-table-column label="操作" align="center" min-width="255">
        <template slot-scope="scope">
          <operation-btn
            :rowData="scope.row"
            @edit="handleEdit"
            @add="handleAdd"
            @delete="handleDelete"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMenuTableData } from "@/api/system/menu/menu-api";
import { buildMenuTree } from "@/utils/change_Tree_data";
import operationBtn from "@/components/button/table-operation-button/edit-add-del-button/index.vue";

export default {
  name: "MenuTable",
  components: { operationBtn },
  props: {
    isExpand: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tableData: [], // 原始数据
      searchKeyword: "", // 搜索关键词
      searchResult: [], // 搜索结果
    };
  },
  computed: {
    // 显示的数据（搜索状态显示搜索结果，否则显示原始数据）
    displayData() {
      return this.searchKeyword ? this.searchResult : this.tableData;
    },
  },
  async created() {
    await this.getTableData();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.menuTable.doLayout();
    });
  },
  watch: {
    tableData: {
      handler() {
        this.$nextTick(() => {
          if (this.$refs.menuTable) {
            this.$refs.menuTable.doLayout();
          }
        });
      },
      deep: true,
    },
    isExpand: {
      handler(newVal) {
        this.$nextTick(() => {
          this.setExpandAll(newVal);
        });
      },
      immediate: true,
    },
  },
  methods: {
    isDisplay(r, c, v) {
      const map = {
        0: "否",
        1: "是",
      };
      return map[v] || v;
    },
    menuType(r, c, v) {
      const map = {
        1: "目录",
        2: "菜单",
        3: "按钮",
      };
      return map[v] || v;
    },
    async getTableData() {
      try {
        const res = await getMenuTableData();
        const data = buildMenuTree(res.data);
        this.tableData = data;
      } catch (e) {
        console.error("表格数据请求失败：", e);
        this.$message.error("加载菜单数据失败");
      }
    },

    // 搜索方法 - 根据菜单名称搜索
    handleSearch(val) {
      if (!this.searchKeyword.trim()) {
        this.$message.warning("请输入菜单名称");
        this.searchKeyword = val;
      }

      const keyword = this.searchKeyword.trim().toLowerCase();

      // 递归搜索菜单名称
      const searchInTree = (nodes, result = []) => {
        if (!nodes || !Array.isArray(nodes)) return result;

        nodes.forEach((node) => {
          // 检查当前节点的菜单名称是否包含关键词
          const isMatch =
            node.menuName && node.menuName.toLowerCase().includes(keyword);

          // 递归搜索子节点
          const matchedChildren = [];
          if (node.children && node.children.length) {
            searchInTree(node.children, matchedChildren);
          }

          // 如果当前节点匹配或者有匹配的子节点，则保留该节点
          if (isMatch || matchedChildren.length > 0) {
            const newNode = { ...node };
            if (matchedChildren.length > 0) {
              newNode.children = matchedChildren;
            }
            result.push(newNode);
          }
        });

        return result;
      };

      // 执行搜索
      this.searchResult = searchInTree(this.tableData);

      // 计算匹配的总数（展平所有匹配的节点）
      const totalMatches = this.getAllRows(this.searchResult).length;

      if (totalMatches === 0) {
        this.$message.info(`未找到包含"${this.searchKeyword}"的菜单`);
      } else {
        this.$message.success(`找到 ${totalMatches} 条匹配结果`);
      }

      // 搜索结果出来后，自动展开所有节点以便查看
      this.$nextTick(() => {
        this.setExpandAll(true);
      });
    },

    // 重置搜索方法
    resetSearch() {
      this.searchKeyword = "";
      this.searchResult = [];

      // 重置后重新应用原来的展开状态
      this.$nextTick(() => {
        this.setExpandAll(this.isExpand);
      });

      this.$message.info("已重置搜索");
    },

    // 展开/折叠表格
    setExpandAll(expand) {
      if (!this.$refs.menuTable) return;

      const currentData = this.displayData;
      const allRows = this.getAllRows(currentData);

      allRows.forEach((row) => {
        this.$refs.menuTable.toggleRowExpansion(row, expand);
      });
    },

    // 递归获取所有行数据
    getAllRows(data, result = []) {
      if (!data || !Array.isArray(data)) return result;

      data.forEach((item) => {
        result.push(item);
        if (item.children && item.children.length) {
          this.getAllRows(item.children, result);
        }
      });

      return result;
    },

    // 编辑列表
    handleEdit(row) {
      this.$emit("edit", row);
    },

    // 新增列表
    handleAdd(row) {
      this.$emit("add", row);
    },

    // 删除列表
    handleDelete(row) {
      this.$emit("del", row);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-table {
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;

  .search-area {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px 0;

    .search-tip {
      color: #67c23a;
      font-size: 14px;
      margin-left: 8px;
    }
  }
}
</style>