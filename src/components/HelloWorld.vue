<template>
  <div class="hello">
    <el-button @click="getDataFunction">000</el-button>
    <el-form>
      <el-form-item prop="starttime">
        <el-date-picker
          v-model="temp.starttime"
          type="date"
          :picker-options="startOptions"
          value-format="yyyy-MM-dd"
          placeholder="开始时间"
        />
      </el-form-item>
      <el-form-item prop="endTime">
        <el-date-picker
          v-model="temp.endTime"
          type="date"
          :picker-options="endOptions"
          value-format="yyyy-MM-dd"
          placeholder="结束时间"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
  data() {
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

      temp: {
        starttime: "",
        endtime: "",
      },
      startOptions: {
        disabledDate: (time) => {
          if (this.temp.endtime) {
            return time.getTime() > new Date(this.temp.endtime).getTime();
          } else {
            // 不能大于当前日期
            return time.getTime() > Date.now();
          }
        },
      },
      // 结束时间
      endOptions: {
        disabledDate: (time) => {
          if (this.temp.starttime) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < new Date(this.temp.starttime).getTime() - 8.64e7 // 加- 8.64e7则表示包当天
            );
          } else {
            return time.getTime() < Date.now();
          }
        },
      },
    };
  },
  created() {
    // this.getDataFunction();  //调用函数
    // this.postDataFunction();
    // console.log("arrItem", this.arrItem);
    console.log('getMonthLastDayFn', this.getMonthLastDayFn())
  },
  methods: {
    getDataFunction() {
      axios
        .get("/getData")
        .then((res) => {
          //请求成功返回的数据
          console.log(res); //可以res.data获取后台传给前端的数据
        })
        .catch((err) => {
          //请求失败返回的数据
          console.log("请求失败");
        });
    },
    postDataFunction() {
      axios
        .post("/postData", { text: "前端发送" })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMonthLastDayFn(){
      let dateStr = '2022-02-22'
      let dateObj = new Date(dateStr)
      let nextMonth = dateObj.getMonth() + 1 // 0-11,下一个月

      dateObj.setMonth(nextMonth)
      dateObj.setDate(1) // 1-31

      let nextMonthFristDayTime = dateObj.getTime(); // 下个月1号对应毫秒
      let theMonthLastDayTime = nextMonthFristDayTime - 24*60*60*1000
      let theMonthDay = (new Date(theMonthLastDayTime)).getDate()
      return theMonthDay
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
