import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index.js'

export default {
  computed: {
    // 獲取菜單列表數據
    ...mapGetters([
      'keyEditable'
    ])
  },
  methods: {
    // 操作類型
    oppFilter (options, value) {
      let txt = ''
      if (value !== null && value !== undefined) {
        options.forEach(option => {
          option.value === value && (txt = option.label)
        })
      }
      return txt
    },
    // 編輯彈窗-設置關鍵字編輯狀態
    setEditable (arr) {
      if (arr.length > 0) {
        arr.forEach(item => {
          if (item.hasOwnProperty('keyEditable')) {
            item.keyEditable = this.keyEditable
            if (item.keyEditable === 0) {
              item.disabled = true
            } else {
              item.disabled = false
            }
          }
        })
      }
    },
    // 編輯彈窗-取消設置關鍵字編輯狀態
    resetEditable (arr) {
      if (arr.length > 0) {
        arr.forEach((item) => {
          if (item.hasOwnProperty('keyEditable')) {
            item.keyEditable = ''
            item.disabled = false
          }
        })
      }
    },
    // 狀態判斷是否可操作 操作類型opp 1-編輯 2-刪除 3-發送 4-申請回執 5-數據導出 6-下載報文
    judgeStatus (opp, seletedArr) {
      let canOpp = true
      const txtArr = ['编辑', '刪除', '发送', '申请回执', '数据导出', '下载报文']
      let txt = seletedArr.length > 1 ? `选中数据包含不允许${txtArr[opp - 1]}的数据` : `当前状态不允许${txtArr[opp - 1]}`
      const notAllow = {
        1: ['20', '21', '22', '44', '54', '申报待反馈', '变更待反馈', '撤销待反馈', '撤销成功', '已废弃'],
        2: ['20', '21', '40', '22', '44', '54', '30', '申报待反馈', '变更待反馈', '预撤销', '撤销待反馈', '撤销成功', '已废弃', '预更新'],
        3: ['08', '14', '34', '44', '54', '待补录', '申报成功', '更新成功', '撤销成功', '已废弃'],
        4: ['08', '10', '14', '30', '34', '40', '44', '54', '待补录', '新增待发送', '申报成功', '预更新', '更新成功', '预撤销', '撤销成功', '已废弃'],
        5: ['54', '已废弃']
      }
      seletedArr.forEach(item => {
        if (notAllow[opp].indexOf(item.procstate) > -1) {
          this.$message.warning(txt)
          canOpp = false
        }
      })
      return canOpp
    },
    // 獲取查看彈窗items
    getViewItems (orignItems, resultItems) {
      let items = []
      for (let i = 0; i < orignItems.length; i++) {
        items.push({ ...orignItems[i] })
      }
      resultItems = items.concat(resultItems)
      resultItems.forEach((item) => {
        if (!item.disabled) {
          item.disabled = 'disabled'
        }
        if (item.hasOwnProperty('show')) {
          item.show = true
        }
      })
      return resultItems
    },
    // 創建時間、修改時間格式轉換
    viewTimeFormat (data) {
      data.modifytime && (data.modifytimeFormat = parseTime(data.modifytime, '{y}{m}{h} {h}:{i}:{s}'))
      data.createtime && (data.createtimeFormat = parseTime(data.createtime, '{y}{m}{h} {h}:{i}:{s}'))
    },
    parseItems (item, hasSys) {
      if (item.createtime !== null && item.createtime.length === 13) {
        item.createtime = parseTime(new Date(parseTime(item.createtime)), '{y}-{m}-{h} {h}:{i}:{s}')
      }
      if (item.modifytime !== null && item.modifytime.length === 13) {
        item.modifytime = parseTime(new Date(parseTime(item.modifytime)), '{y}-{m}-{h} {h}:{i}:{s}')
      }
      if (hasSys === true) {
        if (item.sysupdate !== null && item.sysupdate.length === 13) {
          item.sysupdate = parseTime(new Date(parseTime(item.sysupdate)), '{y}-{m}-{h} {h}:{i}:{s}')
        }
      }
    },
    // 新增和編輯彈窗欄位差異化處理
    initItems (dialogItems, dialogRules, dialogType) {
      if (dialogType === 1) {
        dialogRules.actiondesc[0].required = false
      } else {
        dialogRules.actiondesc[0].required = true
      }
      dialogItems.forEach(item => {
        if (item.editShow === true) {
          if (dialogType === 1) {
            item.show = false
          } else {
            item.show = true
          }
        }
      })
    },
    // 和上面的initItems函數一樣，只是傳入的頁面的狀態變量不同
    showItems (dialogItems, dialogRules, state) {
      if (state === 'new') {
        dialogRules.actiondesc[0].required = false
      } else {
        dialogRules.actiondesc[0].required = true
      }
      dialogItems.forEach(item => {
        if (item.editShow === true) {
          if (state === 'new') {
            item.show = false
          } else {
            item.show = true
          }
        }
      })
    },
    // 拼接items
    concatItems (mainItems, mainCheckItems) {
      const viewItems = [
        { type: 'Input', label: '录入柜员', prop: 'usercreate', placeholder: '请输入录入柜员' },
        { type: 'Date', label: '录入时间', prop: 'createtime', placeholder: '请选择录入时间', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' },
        { type: 'Input', label: '编辑柜员', prop: 'userin', placeholder: '请输入编辑柜员' },
        { type: 'Date', label: '编辑时间', prop: 'modifytime', placeholder: '请选择编辑时间', format: 'yyyy-MM-dd HH:mm:ss', valueFormat: 'yyyy-MM-dd HH:mm:ss' }
      ]
      let items = []
      for (let i = 0; i < mainItems.length; i++) {
        items.push({ ...mainItems[i] })
      }
      mainCheckItems = items.concat(viewItems)
      mainCheckItems.forEach((item) => {
        if (item.hasOwnProperty('show')) {
          item.show = true
        }
        item.disabled = true
      })
      return mainCheckItems
    },
    // 選擇起始日期 sign:1-可以選擇大於當天的日期 否則不可選擇大於當天的日期
    changeStartdate (val, itemArr, attr, sign) {
      if (val) {
        let date = val.slice(0, 4) + '/' + val.slice(4, 6) + '/' + val.slice(6, 8)
        date = new Date(Date.parse(date))
        itemArr.forEach(item => {
          if (item.prop === attr) {
            item.pickOptions = {
              disabledDate (time) {
                let result = sign === 1 ? time.getTime() < date.getTime() : (time.getTime() < date.getTime() || time.getTime() > Date.now())
                return result
              }
            }
          }
        })
      } else {
        itemArr.forEach(item => {
          if (item.prop === attr) {
            item.pickOptions = {
              disabledDate (time) {
                return sign === 1 ? '' : time.getTime() > Date.now()
              }
            }
          }
        })
      }
    },
    // 選擇截止日期
    changeEnddate (val, itemArr, attr, sign) {
      if (val) {
        let date = val.slice(0, 4) + '/' + val.slice(4, 6) + '/' + val.slice(6, 8)
        date = new Date(Date.parse(date))
        itemArr.forEach(item => {
          if (item.prop === attr) {
            item.pickOptions = {
              disabledDate (time) {
                return time.getTime() > date.getTime()
              }
            }
          }
        })
      } else {
        itemArr.forEach(item => {
          if (item.prop === attr) {
            item.pickOptions = {
              disabledDate (time) {
                return sign === 1 ? '' : time.getTime() > Date.now()
              }
            }
          }
        })
      }
    }

  }
}
