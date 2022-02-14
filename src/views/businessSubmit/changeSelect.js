const SELECTS = require('../businessSubmit/sameOption')

const OPERTYPE = SELECTS.operateOptions;

// value轉爲label(中文)
function ToLabel(tableData) {
  tableData.forEach(item => {
    OPERTYPE.find(option => {
      if (option.value === item.opertype) {
        item.opertype = option.label
      }
    })
  })
}

export {
  ToLabel,
  OPERTYPE,
}