<template>
  <div>
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
        <div class="inspection-vehicle">
          <div class="left">
            <div class="detection" style="flex: 1">安检</div>
          </div>

          <div class="right">
            <div class="type" :style="{ height: changeSmallDivHeight + 'px' }">
              小型
            </div>
            <div class="type" :style="{ height: changeMediumDivHeight + 'px' }">
              中型
            </div>
            <div class="type" :style="{ height: changeLargeDivHeight + 'px' }">
              大型
            </div>
            <div
              class="type"
              :style="{ height: changeSpecialDivHeight + 'px' }"
            >
              特种车辆
            </div>
          </div>
        </div>

        <div
          class="detection"
          :style="{ height: changeEnvironmentalDivHeight + 'px' }"
        >
          单环检
        </div>
        <div
          class="detection"
          :style="{ height: changeThreeInspectionDivHeight + 'px' }"
        >
          三检合一
        </div>
        <div
          class="detection"
          :style="{ height: changeOthersDivHeight + 'px' }"
        >
          过户、外廓办变更
        </div>
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
            :class="item.first === '环检' ? 'environment-input' : ''"
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
            :class="item.compAmount ? 'not-disabled' : 'disabled'"
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
  computed: {
    // 通过属性计算，调整检测车辆div高度
    changeSmallDivHeight() {
      return this.count("小型");
    },
    changeMediumDivHeight() {
      return this.count("中型");
    },
    changeLargeDivHeight() {
      return this.count("大型");
    },
    changeSpecialDivHeight() {
      return this.count("特种车辆");
    },
    changeEnvironmentalDivHeight() {
      return this.count("环检");
    },
    changeThreeInspectionDivHeight() {
      return this.count("三检合一");
    },
    changeOthersDivHeight() {
      return this.count("过户");
    },
  },
  created() {
    this.getCarData();
  },
  // 组件销毁前执行一次函数
  beforeDestroy() {},
  methods: {
    // 传入车辆类型，检查数据中有多少条类型相同的车辆并返回计算好的高度
    count(str) {
      let count = 0;
      this.formData.forEach((item) => {
        if (item.first === str) {
          count++;
        }
      });
      // 一个input的高度为29px margin-bottom 为10px  减去最后一个margin的高度
      return 39 * count - 10;
    },
    // 获取车辆信息，并传入表单数据中
    getCarData() {
      this.formData = JSON.parse(JSON.stringify(this.data));
    },
    getFormData() {
      return this.formData;
    },
  },
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
.inspection-vehicle {
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
  }
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
  .environment-input {
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
  .not-disabled {
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