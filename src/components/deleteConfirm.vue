<template>
  <div>
    <!-- 刪除彈窗的組件 -->
    <el-dialog
      title="删除数据"
      :visible="deleteVisible"
      @close="closeDel"
      width="30%"
    >
      <el-form inline ref="deleteForm" :model="dialogData" :rules="rules">
        <el-form-item label="变更/撤销原因" prop="actiondese">
          <el-input type="textarea" v-model="dialogData.actiondese"></el-input>
        </el-form-item>
        <p>确定要删除吗？</p>
        <!-- 操作按钮 -->
        <el-row class="btnWrap">
          <el-form-item v-for="item in dialogHandle" :key="item.label">
            <el-button :type="item.type" @click="item.handle()">
              {{ item.label }}
            </el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    deleteVisible: {
      type: Boolean,
      default: false,
    },
    dialogData: {
      type: Object,
      default: () => ({}),
    },
    dialogHandle: {
      type: Array,
      default: () => [],
    }
  },
  data () {
    return {
      rules: {
        actiondese: [{ required: true, message: "变更/撤销原因不能为空", trigger: ['blur', 'change']}]
      },
    }
  },
  methods: {
    closeDel() {
      this.$emit('update:deleteVisible', false)
    }
  },
}
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item {
  display: flex;
}
>>> .el-dialog__body .el-form-item__error {
  top: 100%;
}
.btnWrap {
  display: flex;
  justify-content: flex-end;
  button {
    min-width: 80px;
    border-radius: 2px;
  }
  .resetBtn {
    margin-left: 5px;
  }
}
</style>