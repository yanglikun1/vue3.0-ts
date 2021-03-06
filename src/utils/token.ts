/*
 * @Description: 凭证信息存取
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-27 16:54:58
 */
import cookie from 'js-cookie'
import { tokenKey, storage } from '@C/index'

/**
 * @description: 获取token
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getToken(): string | null {
  let token: string | null
  switch (storage) {
    case 'cookie':
      token = cookie.get(tokenKey)
      break
    case 'sessionStorage':
      token = sessionStorage.getItem(tokenKey)
      break
    case 'localStorage':
      token = localStorage.getItem(tokenKey)
      break
    default:
      token = cookie.get(tokenKey)
      break
  }
  return token
}

/**
 * @description: 设置token
 * @param {string} token
 * @return {*}
 * @author: gumingchen
 */
export function setToken(token: string): void {
  switch (storage) {
    case 'cookie':
      cookie.set(tokenKey, token)
      break
    case 'sessionStorage':
      sessionStorage.setItem(tokenKey, token)
      break
    case 'localStorage':
      localStorage.setItem(tokenKey, token)
      break
    default:
      cookie.set(tokenKey, token)
      break
  }
}

/**
 * @description: 清除token
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function clearToken(): void {
  switch (storage) {
    case 'cookie':
      cookie.remove(tokenKey)
      break
    case 'sessionStorage':
      sessionStorage.removeItem(tokenKey)
      break
    case 'localStorage':
      localStorage.removeItem(tokenKey)
      break
    default:
      cookie.remove(tokenKey)
      break
  }
}
