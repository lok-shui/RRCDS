import url from "postcss-url"

const tokens = {
  admin: {
    token: 'admin-token'
  }
}

const passwords = {
  admin: '111111'
}
const users = {
  'admin-token': {
    introduction: 'I am a super administrator',
    avatar: 'static/images/people.png',
    name: 'Super Admin'
  }
}

export default [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const token = tokens[username]
      const userPassword = passwords[username]
      // mock error
      if (!token || password !== userPassword) {
        return {
          code: 60204,
          title: '登录失败',
          message: '账户或密码不正确',
          success: false
        }
      }

      return {
        code: 20000,
        data: token,
        title: '登录成功',
        success: true,
        message: '成功',
        detail: '成功请求的详情--20000---login successed.'
      }
    }
  },
  // user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      // mock error
      if (!info) {
        return {
          code: 50008,
          data: '',
          title: '请求失败',
          message: 'Login failed, unable to get user details',
          success: false,
          detail: '失败请求的详情--50008---login failed'
        }
      }

      return {
        code: 20000,
        data: info,
        title: '请求成功',
        success: true,
        message: '成功',
        detail: '成功请求的详情--20000---get info successed.'
      }
    }
  }
]