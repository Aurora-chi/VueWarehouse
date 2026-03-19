<template>
  <div class="chargeForm">
    <el-row :gutter="10" class="header-row">
      <el-col :span="3">检测车辆</el-col>
      <el-col :span="6"> 类别</el-col>
      <el-col :span="2"> 收费标准</el-col>
      <el-col :span="2"> 综检</el-col>
      <el-col :span="11"> 备注</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3">
        <!-- 检测车型 -->
        <div class="jccl">
          <div class="left">
            <div class="detection" style="flex: 1">安检</div>
          </div>

          <div class="right">
            <div class="type x">小型</div>
            <div class="type z">中型</div>
            <div class="type d">大型</div>
            <div class="type t">特种车辆</div>
          </div>
        </div>

        <div class="detection dhj">单环检</div>
        <div class="detection sjhy">三检合一</div>
        <div class="detection dhj">过户、外廓办变更</div>
      </el-col>
      <!-- 类别 -->
      <el-col :span="6">
        <div v-for="item in formData" :key="item.code" class="label-input">
          {{ item.second }}
        </div>
      </el-col>
      <!-- 收费标准 -->
      <el-col :span="2">
        <div v-for="item in formData" :key="item.code" class="input">
          <el-input
            v-model="item.amount"
            :placeholder="item.amount"
            :class="item.first === '环检' ? 'dhjInputStyle' : ''"
          >
            <template slot="prepend">￥</template>
          </el-input>
        </div>
      </el-col>
      <!-- 综检 -->
      <el-col :span="2">
        <div v-for="item in formData" :key="item.code" class="input">
          <el-input
            v-model="item.compAmount"
            :class="item.compAmount ? 'notDisabled' : 'disabled'"
            :disabled="item.compAmount ? false : true"
          >
            <template v-if="item.compAmount ? true : false" slot="prepend"
              >¥</template
            >
          </el-input>
        </div>
      </el-col>
      <!-- 备注 -->
      <el-col :span="11">
        <div v-for="item in formData" :key="item.code" class="label-input">
          {{ item.remark }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "chargeForm",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: [],
    };
  },
  computed: {},
  mounted() {
    this.get_data();
  },
  methods: {
    get_data() {
      this.formData = JSON.parse(JSON.stringify(this.data));
    },
    getFormData() {
      return this.formData;
    },
  },
  // 组件销毁前执行一次函数
  beforeDestroy() {},
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 0px;
}
.header-row {
  font-size: 16px;
  margin-bottom: 10px;
}
.jccl {
  display: flex;
  height: 100%;
  .left {
    flex: 1;
    display: flex;
    margin-right: 5px;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    .x {
      height: 185px;
    }
    .z {
      height: 107px;
    }
    .d {
      height: 107px;
    }
    .t {
      height: 224px;
    }
  }
}
.dhj {
  height: 68px;
}
.sjhy {
  height: 146px;
}
.detection {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5ebf7;
  text-align: center;
  padding: 0px 15px;
  margin-bottom: 10px;
}
.type {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f7ff;
  padding: 15px 10px;
  margin-bottom: 10px;
  text-align: center;
}
.label-input {
  height: 29px;
  padding: 4px 4px 4px 10px;
  margin-bottom: 10px;
  background-color: #f5f5f7;
  border: 1px solid #ececec;
  color: #555555;
}
.input {
  height: 29px;
  margin-bottom: 10px;
  cursor: pointer;
  .el-input__inner {
    height: 29px;
    color: #ff6900;
    text-align: right;
    border-left: none;
    padding: 0px 10px 0px 0px;
    cursor: pointer;
  }
  .dhjInputStyle {
    .el-input__inner {
      color: #098837;
    }
  }
  .el-input-group__prepend {
    background-color: #fff;
    border-right: none;
    padding: 0px 0px 0px 10px;
  }
  // 使用父级选择器，当 input 聚焦时，改变其父级下的 prepend
  &:focus-within {
    .el-input-group__prepend {
      border-color: #ff8c00 !important;
      border-right-color: #ff8c00 !important;
    }
    .el-input__inner {
      border-color: #ff8c00 !important;
    }
  }
  .disabled {
    .el-input__inner {
      border: 1px solid #ececec;
    }
  }
  .notDisabled {
    .el-input__inner {
      color: #0062c7;
    }
  }
}
.sfbz {
  .el-form-item {
    margin: 0;
    .el-form-item__content {
      line-height: 29px;
    }
  }
}
</style>