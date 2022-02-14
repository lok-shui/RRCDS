<template>
  <div></div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      buttonContent: '关闭页面'
    }
  },
  computed: {
    ...mapState({
      // 主题色
      theme: (state) => state.settings.theme,
      // 获取tagsView状态，判断是否有页签头
      tagsView: (state) => state.settings.tagsView,
      // 获取打开的页签
      visitedViews: (state) => state.tagsView.visitedViews
    })
  },
  watch: {
    // 监听页签头是否存在
    tagsView () {
      this.watchTagsView()
    }
  },
  mounted () {
    this.watchTagsView()
  },
  methods: {
    goBackHome () {
      if (this.tagsView === true) {
        this.delTag()
      } else {
        this.$router.push('/')
      }
    },
    watchTagsView () {
      // 页签存在，并且当前路由的fullPath是/error/401，按钮文字设置为关闭页面
      if (this.tagsView === true && this.$route.fullPath === '/error/401') {
        this.buttonContent = '关闭页面'
      } else {
        // 其他情况，按钮文字都是返回首页
        this.buttonContent = '返回首页'
      }
    },
    // 关闭当前401，跳转至上一页签
    delTag () {
      let nextTagIndex
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === this.$route.path) {
          nextTagIndex = i
          break
        }
      }
      if (nextTagIndex) {
        this.$route
          .dispatch('tagsView/delView', this.$route)
          .then(({ visitedViews }) => {
            if (this.$route.path === this.$route.path) {
              if (visitedViews[nextTagIndex]) {
                this.$router.push(visitedViews[nextTagIndex])
              } else {
                if (visitedViews.length > 0) {
                  this.$router.push(visitedViews[nextTagIndex - 1])
                } else {
                  this.$router.push('/')
                }
              }
            }
          })
      } else {
        // 一级401时，即路由地址是/401，不是/error/401时，点击页面'返回首页'按钮，
        // 首先返回登录页，若之前登录过，有缓存，会直接跳转到首页，如果没有缓存，跳转至登录页
        this.$router.push('/login')
      }
    }
  }
}
</script>
