import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const isLoggedIn = ref(false)
  const userId = ref('')
  const name = ref('')
  const department = ref('')
  const avatar = ref('')

  // 获取用户信息
  const getUserInfo = () => {
    return {
      userId: userId.value,
      name: name.value,
      department: department.value,
      avatar: avatar.value,
      isLoggedIn: isLoggedIn.value
    }
  }

  // 设置用户信息
  const setUserInfo = (userInfo: {
    userId?: string
    name?: string
    department?: string
    avatar?: string
  }) => {
    if (userInfo.userId) userId.value = userInfo.userId
    if (userInfo.name) name.value = userInfo.name
    if (userInfo.department) department.value = userInfo.department
    if (userInfo.avatar) avatar.value = userInfo.avatar
    isLoggedIn.value = true
    
    // 保存到本地存储
    uni.setStorageSync('userInfo', getUserInfo())
  }

  // 从本地存储恢复用户信息
  const restoreUserInfo = () => {
    const savedInfo = uni.getStorageSync('userInfo')
    if (savedInfo) {
      setUserInfo(savedInfo)
    }
  }

  // 检查是否登录
  const checkLogin = () => {
    if (!isLoggedIn.value) {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      })
      uni.navigateTo({
        url: '/pages/auth/index'
      })
      return false
    }
    return true
  }

  // 退出登录
  const logout = () => {
    isLoggedIn.value = false
    userId.value = ''
    name.value = ''
    department.value = ''
    avatar.value = ''
    
    // 清除本地存储
    uni.removeStorageSync('userInfo')
  }

  return {
    // 状态
    isLoggedIn,
    userId,
    name,
    department,
    avatar,
    
    // 方法
    getUserInfo,
    setUserInfo,
    restoreUserInfo,
    checkLogin,
    logout
  }
})