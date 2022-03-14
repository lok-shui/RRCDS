<template>
  <div>
    <div>原数组: {{arrItem}}</div>
    <div>过滤后的数组:{{resVal}}</div>
    <!-- <div>{{val1}}</div> -->
    
    The folder currently open doesn't have a git respository
  </div>
</template>
<script>
export default {
  data() {con
    return {
      arrItem: [
        1,
        1,
        "true",
        "true",
        true,
        true,
        15,
        15,
        false,
        false,
        undefined,
        undefined,
        null,
        null,
        NaN,
        NaN,
        "NaN",
        0,
        0,
        "a",
        "a",
        {},
        {},
      ],
      resVal: '',
      val1 : NaN
    }
  },
  mounted(){
    this.resVal = this.filterArr(this.arrItem)
    console.log('this.resVal',this.resVal)
  },
  methods: {
    unique(arr){
      if (!Array.isArray(arr)) {
        console.log('type error')
        return
      }
      var array = []
      for (var i = 0; i < arr.length; i++) {
        if (!array.includes(arr[i])) {
          array.push(arr[i])
        }
      }
      return array
    },
    filterArr(arr){
        return arr.filter((item, index, arr) => {
    // 当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });

    }
  }
}
</script>