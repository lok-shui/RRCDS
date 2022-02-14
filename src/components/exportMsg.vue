<template>
  <div class="btnWraper">
    <!-- 導出組件 -->
    <el-button type="primary" class="editBtn" @click="mainExport">
      <a-icon type="vertical-align-bottom" />数据导出
    </el-button>
  </div>
</template>
<script>
import ExportServie from "@/service/commonModule.js"
import ExportExcel from "@/vendor/Export2Excel"
import { parseTime } from "@/utils/index.js"

const optData = require("@/views/businessSubmit/changeSelect.js")
const MENU = require("@/config/page-url-config");

export default {
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
    msgType: {
      type: String,
      default: "",
    }
  },
  data () {
    return {
      exportVal: [],
      exportNames: [],
      currentDate: new Date(),
      fullName: "", // 導出文件的全名
      // 導出：在接口成功響應之前禁止按鈕多次點擊調用
      isExport: false,
    }
  },
  created() {
    this.startTime()
  },
  methods: {
    // 時間轉換
    startTime() {
      this.currentDate = parseTime(new Date(this.currentDate), "{y}{m}{d}")
    },
    // 大寫key值轉爲小寫
    lower(item) {
      for (let i = 0; i < item.length; i++) {
        for (let key in item[i]) {
          item[i][key.toLowerCase()] = item[i][key];
          delete item[i][key]
        }
      }
      return item;
    },
    // 主信息導出（導出文件名格式：交易名稱_當天的8位日期， 如：[2104]同业往来账户_20211104.et）
    mainExport() {
      if (this.selected.length) {
        let judge = this.judgeStatus(5, this.selected);
        if (!judge || this.isExport) return;
        this.isExport = true;
        for (let a in MENU.pageUrl) {
          if (a === this.msgType) {
            this.fullName = MENU.pageUrl[a].label + "_" + this.currentDate;
            const newArr = this.exportData()
            this.rowExportPort(newArr)
          }
        }
      } else {
        this.$message.warining("请选择要导出的项")
      }
    },
    // export接口
    async rowExportPort(param) {
      await ExportServie.msgExport(param).then(response => {
        if (response.success === true) {
          this.exportVal = this.lower(response.data.valueList);
          optData.ToLabel(this.exportVal);
          this.exportNames = response.data.chNameList;
          this.exportExcelFile(this.exportVal)
        } else {
          this.$message.error(response.detail)
        }
        this.isExport = false;
      }).catch(error => {
        this.isExport = false;
      })
    },
    
    exportExcelFile(list) {
      const names = this.exportNames.map(item => {
        return item.CHNAME;
      })
      const values = this.exportNames.map((item) => {
        return item.ENNAME;
      })
      const data = this.formatJson(values, list);
      ExportExcel.export_json_to_excel({
        header: names,
        data,
        filename: this.fullName,
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => {
        filterVal.map(j => {
          return v[j]
        })
      })
    },
    // 导出参数
    exportData() {
      const newArr = this.selected.map((item) => {
        return {
          levyno: item.levyno,
          msgType: this.msgType,
        }
      })
      return newArr;
    }
  }
}
</script>
<style lang="scss" scoped>
.btnWraper {
  display: inline-block;
}
button {
  margin-right: 6px;
  margin-bottom: 5px;
  border: none;
  border-radius: 4px;
}
.editBtn {
  background: #6ec542;
}
</style>