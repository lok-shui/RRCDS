<template>
  <div class="btnWraper">
    <!-- 下載報文組件 -->
  </div>
</template>
<script>
import DocService from "@/service/commonModule.js"
export default {
  props: {
    selectedArr: {
      type: Array,
      default: () => [],
    }
  },
  data () {
    return {
      // 下載：在接口成功響應之前禁止按鈕多次點擊調用
      isDownload: false, 
    }
  },
  methods: {
    downloadMessageBtn() {
      if (this.selectedArr.length) {
        if (this.selectedArr.length > 1) {
          this.$message.warning("每次只能选择一条记录");
        } else {
          let judge = this.judgeStatus(6, this.selectedArr);
          if (!judge || this.isDownload) return
          this.isDownload = true
          const newArr = this.msgidData()
          this.downloadPort(newArr[0])
        }
      } else {
        this.$message.warning("请选择要下载报文的项")
      }
    },
    async downloadPort(param) {
      await DocService.getDownload(param).then( res => {
        this.isDownload = false;
        if (res.data.success === false) {
          this.$message.error(res.data.detail);
          return;
        }
        const resHeader = res.headers["content-disposition"];
        const filename = resHeader.split("=")[1]
        const blob = new Blob([res.data], {type: 'text/xml'})
        if (window.navigator && window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, filename)
        } else {
          const link = document.createElement('a')
          link.style.display = 'none';
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(link.href)
        }
      }).catch(error => {
        this.$message.error(error)
        this.isDownload = false;
      })
    },
    msgidData() {
      const newArr = this.selectedArr.map((item) => {
        return {
          msgid: item.msgid
        }
      })
      return newArr
    }
  },
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