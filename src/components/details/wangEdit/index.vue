<template>
  <div class="wang-editor">
    <!-- 工具栏容器 -->
    <div ref="toolbarRef" class="editor-toolbar"></div>
    <!-- 编辑器容器 -->
    <div ref="editorRef" class="editor-container"></div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "WangEditor",
  props: {
    value: {
      type: [String],
      default: "",
    },
    height: {
      type: [Number, String],
      default: 700,
    },
    placeholder: {
      type: String,
      default: "请输入内容...",
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.initEditor();
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  watch: {
    value(val) {
      if (this.editor && val !== this.editor.txt.html()) {
        this.editor.txt.html(val);
      }
    },
  },
  methods: {
    initEditor() {
      // 创建编辑器
      this.editor = new E(this.$refs.toolbarRef, this.$refs.editorRef);

      // 配置占位符
      this.editor.config.placeholder = this.placeholder;

      // 配置高度
      this.editor.config.height = this.height;

      // 配置菜单
      this.editor.config.menus = [
        "head", // 标题
        "bold", // 粗体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景色
        "link", // 链接
        "list", // 列表
        "justify", // 对齐
        "quote", // 引用
        "emoticon", // 表情
        "image", // 图片
        "table", // 表格
        "video", // 视频
        "code", // 代码
        "undo", // 撤销
        "redo", // 重做
      ];

      // 内容变化回调
      this.editor.config.onchange = (html) => {
        this.$emit("input", html);
        this.$emit("change", html);
      };

      // 失去焦点回调
      this.editor.config.onblur = (html) => {
        this.$emit("blur", html);
      };

      // 获得焦点回调
      this.editor.config.onfocus = () => {
        this.$emit("focus");
      };

      // 创建编辑器
      this.editor.create();

      // 设置初始内容
      if (this.value) {
        this.editor.txt.html(this.value);
      }
    },

    // 获取 HTML 内容
    getHtml() {
      return this.editor ? this.editor.txt.html() : "";
    },

    // 获取纯文本内容
    getText() {
      return this.editor ? this.editor.txt.text() : "";
    },

    // 设置 HTML 内容
    setHtml(html) {
      if (this.editor) {
        this.editor.txt.html(html);
      }
    },

    // 清空内容
    clear() {
      if (this.editor) {
        this.editor.txt.clear();
      }
    },

    // 禁用编辑器
    disable() {
      if (this.editor) {
        this.editor.disable();
      }
    },

    // 启用编辑器
    enable() {
      if (this.editor) {
        this.editor.enable();
      }
    },
  },
};
</script>

<style lang="scss" >
.wang-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  img {
    width: 100% !important;
  }
}
.editor-container {
  min-height: 170px;
}
.editor-toolbar {
  border-bottom: 1px solid #dcdfe6;
}
</style>