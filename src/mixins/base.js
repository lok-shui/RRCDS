import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index.js'

export default {
  computed: {
    // 獲取菜單列表數據
    ...mapGetters([
      'keyEditable',
    ])
  },
  methods: {
    // 操作類型
    oppFilter ( options, value) {
      let txt = '';
      if( value !== null && value !== undefined) {
        options.forEach( option => {
          option.value == value && (txt = option.label)
        })
      }
      return txt;
    },
    // 編輯彈窗-設置關鍵字編輯狀態
    setEditable(arr) {
      if(arr.length > 0) {
        arr.forEach( item => {
          if(item.hasOwnProperty('keyEditable')) {
            item.keyEditable = this.keyEditable
          }
        })
      }
    }

  }
}