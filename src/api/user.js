import request from '@/utils/request'
import Api from '@/utils/api'
import { apiUrl } from '@/config/api-url-config';

export function login (data) {
  return request({
    url:'/user/login',
    methods: 'post',
    data
  })
}

export function getInfo (token) {
  return Api.jsonPost(apiUrl.user.getUserInfo, { token: token })
}

export function getMenus (token) {
  return Api.jsonPost(apiUrl.user.findRCDSMenus, { token: token })
}

export function getUserPermission (token) {
  return Api.jsonPost(apiUrl.user.getUserPermission, { token: token })
}

export function logout (token) {
  return Api.jsonPost(apiUrl.user.logout, {})
}

export function setPerference (data) {
  return request({
    url:'/preferences/setSettings',
    methods: 'post',
    data
  })
}

export function getPreference (token) {
  return request({
    url:'/preferences/getSettings',
    methods: 'get',
  })
}