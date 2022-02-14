<template>
  <div class="formWrap">
    <!-- 查詢區form組件 -->
    <el-form
      inline
      :label-width="labelWidth"
      :model="searchData"
      :ref="refName"
    >
      <el-row>
        <el-col
          :md="12"
          :xl="8"
          :xm="24"
          v-for="item in searchForm"
          :key="item.prop"
        >
          <el-form-item :label="item.label">
            <!-- 輸入框 -->
            <el-input
              clearable
              v-if="item.type === 'Input'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
              :minlength="item.minlength || ''"
              :maxlength="item.maxlength || ''"
            ></el-input>
            <!-- 下拉框 -->
            <el-select
              clearable
              filterable
              :popper-append-to-body="false"
              :placeholder="item.placeholder"
              v-if="item.type === 'Select'"
              v-model="searchData[item.prop]"
              @change="item.change(searchDate[item.prop])"
            >
              <el-option
                v-for="op in item.options"
                :key="op.value"
                :value="op.value"
                :label="op.value + '-' + op.label"
              ></el-option>
            </el-select>
            <!-- 單選 -->
            <el-radio-group v-if="item.type === 'Radio'" v-model="searchData[item.prop]">
              <el-radio
                v-for="ra in item.radio"
                :key="ra.value"
                :label="ra.value"
              >
                {{ ra.label }}
              </el-radio>
            </el-radio-group>
            <!-- 單選按鈕 -->
            <el-radio-group
              v-if="item.type === 'RadioChoose'"
              v-model="searchData[item.prop]"
              @change="item.change(searchData[item.prop])"
            >
              <el-radio
                v-for="ra in item.radio"
                :key="ra.value"
                :label="ra.value"
                :disabled="item.disabled"
              >
                {{ ra.label }}
              </el-radio>
            </el-radio-group>
            <!-- 日期 -->
            <el-date-picker
              v-if="item.type === 'Date'"
              :placeholder="item.placeholder"
              v-model="searchData[item.prop]"
              :picker-options="item.pickOptions || ''"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              @change="item.change && item.change(searchData[item.prop])"
            ></el-date-picker>
            <!-- 時間 -->
            <el-time-select
              v-if="item.type === 'Time'"
              v-model="searchData[item.prop]"
              type=""
            ></el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 操作按鈕 -->
      <el-row v-if="isHandle">
        <el-col :span="24" class="btnWrap">
          <span v-for="item in searchHandle" :key="item.label" class="btnItem">
            <el-button
              :type="item.type"
              :class="item.class === 'reset' ? 'resetBtn' : ''"
              @click="item.handle()"
            >
              {{ item.label }}
            </el-button>
          </span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    isHandle: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "",
    },
    searchForm: {
      type: Array,
      default: () => [],
    },
    searchHandle: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: Object,
      default: () => ({}),
    },
    refName: {
      type: String,
      default: "searchRef",
    },
  },
}
</script>
<style lang="scss" scoped>
.el-select-dropdown {
  position: absolute !important;
  top: 30px !important;
  left: 0 !important;
}
.el-form-item,
.el-form-item--small {
  display: inline-block;
  width: 100%;
  font-size: 13px;
  // 左label
  >>> .el-form-item__label {
    width: 40%;
  }
  // 右content
  >>> .el-form-item__content {
    width: 45%;
  }
  >>> .el-input__inner,
  >>> .el-select,
  >>> .el-date-editor,
  >>> .el-radio-group {
    width: 100%;
    border-radius: 3px;
    font-size: 13px;
  }
}
>>> .el-input__suffix {
  pointer-events: inherit;
}
.formWrap {
  margin-bottom: 30px;
  background: #fafafa;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid #f0f0f0;
  .btnWrap {
    display: inline-block;
    text-align: right;
    .btnItem {
      width: 150px;
    }
    button {
      min-width: 80px;
      border-radius: 2px;
    }
    .resetBtn {
      margin-left: 5px;
    }
  }
}
</style>