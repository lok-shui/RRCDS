<template>
  <div class="dialogItems">
    <el-form
      inline
      :label-width="labelWidth"
      :ref="refName"
      :model="dialogData"
      :rules="rules"
      :validate-on-rule-change="false"
      label-position="right"
      class="mainForm"
      :inline-message="true"
    >
      <div class="titleWrap">{{ leftTitle }}</div>
      <div class="itemWrap">
        <div class="formBox">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            v-for="(item, index) in dialogFormItems"
            :key="index"
            :class="item.hasBtn === true ? 'double': ''"
          >
            <!-- input 輸入框 -->
            <el-input
              clearable
              v-if="item.type === 'Input'"
              v-model="dialogData[item.prop]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :minlength="item.minlength || ''"
              :maxlength="item.maxlength || ''"
              @change="item.change && item.change(dialogData[item.prop])"
            ></el-input>
            <!-- textarea輸入框 -->
            <el-input
              clearable
              v-if="item.type === 'Textarea'"
              type="textarea"
              v-model="dialogData[item.prop]"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :minlength="item.minlength || ''"
              :maxlength="item.maxlength || ''"
            ></el-input>
            <!-- 下拉框 -->
            <el-select
              clearable
              filterable
              v-if="item.type === 'Select'"
              :placeholder="item.placeholder"
              v-model="dialogData[item.prop]"
              :disabled="item.disabled"
              :readonly="item.readonly"
              @change="item.change(dialogData[item.prop])"
            >
              <el-option
                v-for="op in item.options"
                :key="op.value"
                :value="op.value"
                :label="op.value + '-' + op.label"
              ></el-option>
            </el-select>
            <!-- 單選 -->
            <el-radio-group v-if="item.type === 'Radio'" v-model="dialogData[item.prop]">
              <el-radio
                v-for="ra in item.radio"
                :key="ra.value"
                :label="ra.value"
                :disabled="item.disabled"
              >
                {{ ra.label }}
              </el-radio>
            </el-radio-group>
            <!-- 單選按鈕 -->
            <el-radio-group
              v-if="item.type === 'RadioChoose'"
              v-model="dialogData[item.prop]"
              @change="item.change(dialogData[item.prop])"
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
              v-model="dialogData[item.prop]"
              type="date"
              :picker-options="item.pickOptions || ''"
              :format="item.format || 'yyyy-MM-dd'"
              :value-format="item.valueFormat || 'yyyyMMdd'"
              :disabled="item.disabled"
              :readonly="item.readonly"
              @change="item.change && item.change(dialogData[item.prop])"
            ></el-date-picker>
            <!-- 日期聯動 -->
            <el-date-picker 
              v-if="item.type === 'StartTime'"
              :editable="false"
              :picker-options="pickerOptionsStart"
              size="mini"
              type="date"
              v-model="dialogData[item.prop]"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              @change="changeEnd(dialogData[item.prop])"
            />
            <el-date-picker 
              v-if="item.type === 'EndTime'"
              :editable="false"
              :picker-options="pickerOptionsEnd"
              size="mini"
              type="date"
              v-model="dialogData[item.prop]"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              @change="changeStart(dialogData[item.prop])"
            />
            <!-- 時間 -->
            <el-time-select
              v-if="item.type === 'Time'"
              v-model="dialogData[item.prop]"
              type=""
            ></el-time-select>

          </el-form-item>
        </div>
      </div>
      <!-- 操作按鈕 -->
      <el-row class="btnWrap" v-if="isHandle">
        <el-form-item v-for="item in dialogHandle" :key="item.babel">
          <el-button
            :type="item.type"
            :class="item.class === 'reset' ? 'resetBtn' : ''"
            @click="item.handle()"
          >
            {{ item.babel }}
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { parseTime } from "@/utils/index.js"

export default {
  props: {
    formModel: {
      type: Object,
      default: () => ({})
    },
    isHandle: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "",
    },
    leftTitle: {
      type: String,
      default: "錄入區",
    },
    refName: {
      type: String,
      default: "dataForms",
    },
    dialogFormItems: {
      type: Array,
      default: () => []
    },
    dialogHandle: {
      type: Array,
      default: () => []
    },
    dialogData: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Object,
      default: () => ({})
    },
  },

  data () {
    return {
      pickerOptionsStart: {},
      pickerOptionsEnd: {},
    }
  },
  methods: {
    changeStart(val) {
      val = parseTime(val);
      if (!val) {
        this.pickerOptionsStart = {
          disabledDate: {},
        }
        return;
      }
      this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
        disabledDate: (time) => {
          time = parseInt(parseTime(new Date(time), '{y}{m}{d}'))
          let times = ""
          times = time > val;
          return times;
        }
      })
    },
    changeEnd(val) {
      val = parseTime(val);
      if (!val) {
        this.pickerOptionsEnd = {
          disabledDate: {},
        }
        return;
      }
      this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
        disabledDate: (time) => {
          time = parseInt(parseTime(new Date(time), '{y}{m}{d}'))
          return time < val;
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item {
  display: flex;
}
>>> .el-radio.is-disabled .el-radio__label,
>>> .el-input__inner:disabled, >>> .el-textarea__inner:disabled {
  color: #2d2d2d;
}
// 不可編輯時的選中radio顔色
>>> .el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #4b4b4b;
  border-color: #dfe4ed;
}
// 輸入框的padding值
>>> .el-input--suffix .el-input__inner {
  padding-right: 7px;
}
.dialogItems {
  .mainForm {
    position: relative;
  }
  .titleWrap {
    line-height: 20px;
    text-align: center;
    padding: 2px 10px;
    color: #1ca261;
    font-weight: bold;
    cursor: pointer;
    border-top: 3px solid #1fce93;
    position: absolute;
    top: -15px;
    left: 20px;
    background: #f7f7ff;
  }
  .itemWrap {
    margin-bottom: 30px;
    background: #fafafa;
    border-radius: 4px;
    padding: 15px;
    border: 1px solid #f0f0f0;
  }
  .formBox {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .double {
      >>> .el-form-item__content {
        display: flex;
        justify-content: center;
        button {
          margin-left: 10px;
          height: 30px;
          border-radius: 3px;
        }
      }
    }
    .el-form-item {
      display: flex;
      width: 50%;
      font-size: 13px;
      box-sizing: border-box;
      margin-right: 0;
      // 左label
      >>> .el-form-item__label {
        width: 40%;
      }
      // 右content
      >>> .el-form-item__content {
        width: 55%;
      }
      >>> .el-input__inner,
      >>> .el-select,
      >>> .el-date-editor,
      >>> .el-textara,
      >>> .el-radio-group {
        width: 100%;
        border-radius: 3px;
        font-size: 13px;
        // &::placeholder {
        //   color: #606266
        // }
      }
    }
    >>> .el-input__suffix {
      pointer-events: inherit;
    }
  }
  .btnWrap {
    display: flex;
    justify-content: center;
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