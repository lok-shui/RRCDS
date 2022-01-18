<template>
  <div class="hello">
    <!-- 网址：https://www.jianshu.com/p/344db10c24c2 -->
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
export default {
  data() {
    return {
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
