/*
 * @Description: 用户信息
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 17:05:11
 */
import { getMenus, getPermissions, getIsGet } from '@U/auth'
import { IAuth, IMenu, ISideMenu } from './index.type'

/**
 * @description: 递归筛选出 目录、菜单
 * @param {Array} list
 * @return {*}
 * @author: gumingchen
 */
function menuProcessing(list: Array<IMenu> = []): Array<ISideMenu> {
  const result: Array<ISideMenu> = []
  list.forEach(item => {
    if (item.type === 0 || item.type === 1) {
      const obj: ISideMenu = {
        id: item.id,
        parentId: item.parentId,
        name: item.name,
        icon: item.icon,
        routePath: item.url ? `/${item.url.replace(/\//gu, '-')}` : '',
        routeName: item.url ? item.url.replace(/\//gu, '-') : '',
        type: item.type,
        children: []
      }
      if (item.list && item.list.length > 0) {
        obj.children = menuProcessing(item.list)
      }
      result.push(obj)
    }
  })
  return result
}

export default {
  namespaced: true,
  state: {
    menus: getMenus(),
    permissions: getPermissions(),
    isGetAuth: getIsGet()
  },
  getters: {
    getMenus: (state: IAuth): Array<ISideMenu> => {
      const result: Array<ISideMenu> = menuProcessing(state.menus)
      return result
    }
  },
  mutations: {
    SET_MENU: (state: IAuth, menus: Array<IMenu>): void => {
      state.menus = menus
    },
    SET_PERMISSION: (state: IAuth, permissions: string[]): void => {
      state.permissions = permissions
    },
    SET_IS_GET_AUTH: (state: IAuth, isGetAuth: boolean): void => {
      state.isGetAuth = isGetAuth
    }
  },
  actions: {
    setAuth: ({ commit }): void => {
      commit('SET_MENU', getMenus())
      commit('SET_PERMISSION', getPermissions())
      commit('SET_IS_GET_AUTH', getIsGet())
    }
  }
}
