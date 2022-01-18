const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  themeValue: state => state.app.themeValue,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,

  name: state => state.user.name,
  userId: state => state.user.userId,
  bankName: state => state.user.bankName,
  departmentName: state => state.user.departmentName,
  permissions: state => state.user.permissions,
  keyEditable: state => state.user.keyEditable,

  menuList: state => state.permission.menuList, // 轉化前用戶權限菜單列表
  permission_routers: state => state.permission.routers,
}

export default getters