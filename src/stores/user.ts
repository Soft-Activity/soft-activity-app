import { defineStore } from 'pinia'
import { ref } from 'vue'
import { bindWxByPassword, bindWxByStudentInfo, getCurrentUser, loginByWx ,unbindMyWx } from '@/api/servers/api/user'

export const useUserStore = defineStore('user', () => {
  // 状态
  const isLoggedIn = ref(false)
  const userInfo = ref<API.UserVO>({})
  const token = ref('')

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const response = await getCurrentUser()
      if(response.userId == null){
        setUserInfo({},false)
        clearToken()
        throw "用户不存在"
      }
      if(!response.bindWX){
        clearToken()
        setUserInfo({},false)
        throw "用户未绑定微信"
      }
      setUserInfo(response)
      return response
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return 
    }
  }

  // 设置用户信息
  const setUserInfo = (info: API.UserVO,isLogin:boolean = true) => {
    userInfo.value = info
    isLoggedIn.value = isLogin
    
    // 保存到本地存储
    uni.setStorageSync('userInfo', info)
  }

  // 设置token
  const setToken = (newToken: string) => {
    token.value = newToken
    uni.setStorageSync('token', newToken)
  }

  // 获取token
  const getToken = () => {
    return token.value || uni.getStorageSync('token')
  }
  //清除token
  const clearToken = () => {
    token.value = ''
    uni.removeStorageSync('token')
  }

  // 从本地存储恢复用户信息
  const restoreUserInfo = async () => {
    const savedToken = uni.getStorageSync('token')
    if (savedToken) {
      token.value = savedToken
      await getUserInfo()
    }
  }

  // 检查是否登录
  const checkLogin = () => {
    if (!isLoggedIn.value) {
      showLoginModal()
      return false
    }
    return true
  }

  // 退出登录
  const logout = () => {
    isLoggedIn.value = false
    userInfo.value = {}
    token.value = ''
    
    // 清除本地存储
    uni.removeStorageSync('userInfo')
    uni.removeStorageSync('token')
  }
  //登录
  const showLoginModal = async () => {
    clearToken();
    uni.showModal({
      title: '登录确认',
      content: '是否确认登录?',
      success: (result) => {
        if(result.confirm) {
          uni.login({
            success: async (res) => {
              try { 
                const response = await loginByWx({code: res.code})
                if(response.token){
                  setToken(response.token)
                  uni.showToast({
                    title: '登录成功', 
                    icon: 'none'
                  })
                }else{
                  throw "登录失败"
                }
              } catch (error) {
                console.error('登录失败:', error)
                uni.showToast({
                  title: '登录失败'+error,
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })
  }
  //学生学习绑定
  const bindForStudent = async (studentInfo:API.UserWXStudentBindDTO) => {
    uni.login({
      success: async (res) => {
        try {
          const response = await bindWxByStudentInfo({...studentInfo, code: res.code})
          if(response.token){
            setToken(response.token)
            uni.showToast({
              title: '绑定成功',
              icon: 'none'
            })
            //跳转到首页
            uni.switchTab({ url: '/pages/my/index' })
        }
      } catch (error) {
        console.error('绑定失败:', error)
        uni.showToast({
          title: '绑定失败',
            icon: 'none'
          })
        }
      }
    })
  }

  const bindWithPassword = async (passwordInfo:API.UserWXPasswordBindDTO) => {
    uni.login({
      success: async (res) => {
        try {
          const response = await bindWxByPassword({...passwordInfo, code: res.code})
          if(response.token){
            setToken(response.token)
          uni.showToast({
            title: '绑定成功',
            icon: 'none'
          })
          //跳转到首页
          uni.switchTab({ url: '/pages/my/index' })
        }
      } catch (error) {
        console.error('绑定失败:', error)
        uni.showToast({
          title: '绑定失败:'+error,
          icon: 'none'
        })
      }
      }
    })
  }
  //解绑
  const unbind = async () => {
    try {
      const response = await unbindMyWx()
      if(response){
        uni.showToast({
          title: '解绑成功',
          icon: 'none'
        })
        logout()
      }
    } catch (error) {
      console.error('解绑失败:', error)
      uni.showToast({
        title: '解绑失败',
        icon: 'none'
      })
    }
  }

  
  return {
    // 状态
    isLoggedIn,
    userInfo,
    token,
    
    // 方法
    getUserInfo,
    setUserInfo,
    setToken,
    getToken,
    restoreUserInfo,
    checkLogin,
    logout,
    clearToken,
    showLoginModal,
    bindForStudent,
    bindWithPassword,
    unbind
  }
})
