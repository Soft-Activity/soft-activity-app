import { defineStore } from 'pinia'

interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  role: 'student' | 'teacher'
}

export const useUserStore = defineStore('user', {
  state: () => ({
    token: uni.getStorageSync('token') || '',
    userInfo: null as UserInfo | null,
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  
  actions: {
    async login(username: string, password: string, role: string) {
      try {
        // TODO: 实现登录接口调用
        // const res = await api.login({ username, password, role })
        // this.token = res.data.token
        // uni.setStorageSync('token', res.data.token)
        // await this.getUserInfo()
        
        // 模拟登录成功
        this.token = 'mock_token'
        uni.setStorageSync('token', 'mock_token')
        this.userInfo = {
          id: '1',
          username,
          nickname: '测试用户',
          avatar: '/static/default-avatar.png',
          role: role as 'student' | 'teacher'
        }
        
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
        
        // 返回上一页
        uni.navigateBack()
      } catch (error) {
        uni.showToast({
          title: '登录失败',
          icon: 'error'
        })
        throw error
      }
    },
    
    async getUserInfo() {
      try {
        // TODO: 获取用户信息
        // const res = await api.getUserInfo()
        // this.userInfo = res.data
      } catch (error) {
        uni.showToast({
          title: '获取用户信息失败',
          icon: 'error'
        })
        throw error
      }
    },
    
    logout() {
      this.token = ''
      this.userInfo = null
      uni.removeStorageSync('token')
      uni.showToast({
        title: '已退出登录',
        icon: 'success'
      })
    }
  },
}) 