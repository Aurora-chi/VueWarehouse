import Vue from 'vue'
import Vuex from 'vuex'
import { login, getInfo, logout, getRouters } from '@/api/login'
import Cookies from 'js-cookie'
import { buildMenuTree } from "@/utils/change_Tree_data"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: Cookies.get('Admin-Token') || '',
    // 根据你的数据结构，扩展 state
    userInfo: {},      // 存储完整的用户信息
    name: '',          // 用户名（显示用）
    loginName: '',     // 登录名
    email: '',
    phone: '',
    sex: "",
    avatar: '',
    userId: null,
    roleList: [],      // 角色列表
    permissions: [],
    routers: []
  },

  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo,
    name: state => state.name,
    loginName: state => state.loginName,
    email: state => state.email,
    phone: state => state.phone,
    sex: state => state.sex,
    avatar: state => state.avatar,
    userId: state => state.userId,
    roleList: state => state.roleList,
    permissions: state => state.permissions,
    routers: state => state.routers,
    // 获取第一个角色的角色码
    primaryRole: state => state.roleList?.[0]?.roleCode || '',
    // 判断是否是管理员
    isAdmin: state => state.roleList?.some(role => role.roleCode === 'admin') || false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      // 同时设置各个字段，方便直接使用
      state.name = userInfo.userName || ''
      state.loginName = userInfo.loginName || ''
      state.email = userInfo.email || ''
      state.phone = userInfo.phone || ''
      state.sex = userInfo.sex || 2
      state.avatar = userInfo.avatar || ''
      state.userId = userInfo.id || null
    },
    SET_ROLE_LIST: (state, roleList) => {
      state.roleList = roleList
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    },
    // 清空所有状态
    CLEAR_STATE: (state) => {
      state.token = ''
      state.userInfo = {}
      state.name = ''
      state.loginName = ''
      state.email = ''
      state.phone = ''
      state.sex = ''
      state.avatar = ''
      state.userId = null
      state.roleList = []
      state.permissions = []
      state.routers = []
    }
  },

  actions: {
    // 登录
    async Login({ commit }, userInfo) {
      try {
        const { loginName, password, captcha, deviceId, uuid } = userInfo
        const res = await login({
          loginName: loginName,
          password: password,
          captcha: captcha,
          deviceId: deviceId,
          uuid: uuid
        })
        // 根据你的返回结构调整 token 的获取路径
        const token = res.data?.token || res.token
        if (token) {
          Cookies.set('Admin-Token', token, { expires: 1 / 24 })
          commit('SET_TOKEN', token)
        }

        return res
      } catch (error) {
        // 可以在这里添加错误处理
        console.error('登录失败：', error)
        throw error
      }
    },

    // 获取用户信息 - 适配你的数据结构
    async GetInfo({ commit }) {
      try {
        const res = await getInfo()
        console.log('用户信息返回：', res) // 调试用，可以删除

        // 根据你的数据结构，数据在 res.data 中
        const data = res.data || res

        // 保存用户信息
        if (data.user) {
          commit('SET_USER_INFO', data.user)
        }

        // 保存角色列表
        if (data.roleList && data.roleList.length > 0) {
          commit('SET_ROLE_LIST', data.roleList)
        } else {
          commit('SET_ROLE_LIST', [])
        }

        // 保存权限列表
        if (data.permissions) {
          commit('SET_PERMISSIONS', data.permissions)
        }

        return data
      } catch (error) {
        console.error('获取用户信息失败：', error)
        throw error
      }
    },

    // 退出登录
    async Logout({ commit }) {
      try {
        await logout()
        console.log("退出登入")
        Cookies.remove('Admin-Token')
        commit('CLEAR_STATE')
      } catch (error) {
        console.error('退出登录失败：', error)
        // 即使接口失败，也要清除前端状态
        Cookies.remove('Admin-Token')
        commit('CLEAR_STATE')
        throw error
      }
    },

    // 获取路由
    async GetRouters({ commit }) {
      try {
        const res = await getRouters()
        const tree = buildMenuTree(res.data)
        console.log(tree)
        commit("SET_ROUTERS", tree)
      } catch (error) {
        console.error('获取路由失败：', error)
        throw error
      }
    }
  },

  modules: {}
})