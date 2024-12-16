<template>
  <view class="container">
    <!-- 用户信息区域 -->
    <view class="user-section" @tap="handleUserClick">
      <image class="avatar" :src="userAvatar" />
      <view class="user-info" v-if="isLoggedIn">
        <text class="nickname">{{ userName }}</text>
        <view class="user-details">
          <text class="user-id">{{ userId }}</text>
          <text class="department">{{ userDepartment }}</text>
        </view>
      </view>
      <view class="user-info" v-else>
        <text class="nickname">未登录</text>
        <text class="tips">点击头像登录</text>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="menu-list" v-if="isLoggedIn">
      <!-- 活动相关菜单组 -->
      <view class="menu-group">
        <view class="menu-item" @tap="goToList('enrolled')">
          <text>已报名活动</text>
          <view class="menu-right">
            <text class="count-text">{{ enrolledCount }}</text>
            <uni-icons type="right" size="16"></uni-icons>
          </view>
        </view>
        <view class="menu-item" @tap="goToList('history')">
          <text>历史活动</text>
          <view class="menu-right">
            <text class="count-text">{{ historyCount }}</text>
            <uni-icons type="right" size="16"></uni-icons>
          </view>
        </view>
        <view class="menu-item" @tap="goToList('pending')">
          <text>待评价活动</text>
          <view class="menu-right">
            <text class="count-text">{{ pendingCount }}</text>
            <uni-icons type="right" size="16"></uni-icons>
          </view>
        </view>
      </view>

      <!-- 添加咨询记录入口 -->
      <view class="menu-group">
        <view class="menu-item" @tap="goToAiChat">
          <text>智能咨询</text>
          <view class="menu-right">
            <uni-icons type="right" size="16"></uni-icons>
          </view>
        </view>
      </view>

      <!-- 账号相关菜单组 -->
      <view class="menu-group">
        <view class="menu-item" @tap="handleUnbind">
          <text class="unbind-text">解除绑定</text>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 模拟用户数据
onMounted(() => {
  // 模拟设置用户信息
  userStore.setUserInfo({
    userId: '2022280381',
    name: '张三',
    department: '计算机科学与技术学院',
    avatar: '/static/default-avatar.png',
  })
})

// 使用 computed 获取用户信息
const isLoggedIn = computed(() => userStore.isLoggedIn)
const userName = computed(() => userStore.name)
const userId = computed(() => userStore.userId)
const userDepartment = computed(() => userStore.department)
const userAvatar = computed(() => userStore.avatar || '/static/default-avatar.png')

// 模拟活动数量数据
const enrolledCount = ref(2)
const historyCount = ref(5)
const pendingCount = ref(1)

const handleUserClick = () => {
  if (!isLoggedIn.value) {
    goToAuth()
  }
}

const goToAuth = () => {
  uni.navigateTo({
    url: '/pages/auth/index'
  })
}

const goToList = (type: string) => {
  if (!isLoggedIn.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return
  }
  uni.navigateTo({
    url: `/pages/my/my-activities?type=${type}`
  })
}

const handleUnbind = () => {
  uni.showModal({
    title: '提示',
    content: '确定要解除绑定吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.showToast({
          title: '已解除绑定',
          icon: 'success'
        })
      }
    }
  })
}

// 添加跳转方法
const goToAiChat = () => {
  uni.navigateTo({
    url: '/pages/my/ai-chat'
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f7f8fa;
}

/* 用户信息区域样式优化 */
.user-section {
  padding: 48rpx 40rpx;
  background: linear-gradient(135deg, #4a90e2, #2979ff);
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 12rpx rgba(41, 121, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.user-section::after {
  content: '';
  position: absolute;
  right: -20%;
  top: -20%;
  width: 400rpx;
  height: 400rpx;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
}

.avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  margin-right: 36rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.avatar:active {
  transform: scale(0.95);
  border-color: rgba(255, 255, 255, 1);
}

.user-info {
  flex: 1;
}

.nickname {
  font-size: 36rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
  display: block;
  color: #ffffff;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.user-id, .department {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
}

.tips {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.8);
}

/* 菜单样式优化 */
.menu-list {
  margin-top: 24rpx;
  padding: 0 24rpx;
}

.menu-group {
  margin-bottom: 24rpx;
  background: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.menu-group:active {
  transform: scale(0.99);
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #f0f2f5;
  transition: all 0.3s ease;
  position: relative;
}

.menu-item:active {
  background-color: #f5f7fa;
}

.menu-item::after {
  content: '';
  position: absolute;
  left: 32rpx;
  right: 32rpx;
  bottom: 0;
  height: 1rpx;
  background: #f0f2f5;
  transform: scaleY(0.5);
}

.menu-item:last-child::after {
  display: none;
}

.menu-item text {
  font-size: 28rpx;
  color: #333333;
}

/* 解除绑定按钮样式优化 */
.unbind-text {
  color: #2979ff;
  font-weight: 500;
  position: relative;
}

.unbind-text::before {
  content: '';
  position: absolute;
  bottom: -4rpx;
  left: 0;
  width: 100%;
  height: 4rpx;
  background: rgba(41, 121, 255, 0.2);
  border-radius: 2rpx;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.menu-item:active .unbind-text::before {
  transform: scaleX(1);
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.count-text {
  font-size: 26rpx;
  color: #999999;
  background: #f5f7fa;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  min-width: 40rpx;
  text-align: center;
}
</style> 