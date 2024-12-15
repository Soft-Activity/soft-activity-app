<template>
  <view class="container">
    <!-- 用户信息区域 -->
    <view class="user-section">
      <image class="avatar" src="/static/default-avatar.png" @tap="goToAuth"/>
      <view class="user-info">
        <text class="nickname">未登录</text>
        <text class="tips">点击头像登录</text>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="menu-list">
      <view class="menu-item" @tap="goToList('enrolled')">
        <text>已报名活动</text>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
      <view class="menu-item" @tap="goToList('history')">
        <text>历史活动</text>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
      <view class="menu-item" @tap="goToList('pending')">
        <text>待评价活动</text>
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const goToAuth = () => {
  uni.navigateTo({
    url: '/pages/auth/index'
  })
}

const goToList = (type: string) => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
}

.user-section {
  padding: 40rpx;
  background: #fff;
  display: flex;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 30rpx;
}

.user-info {
  flex: 1;
}

.nickname {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  display: block;
}

.tips {
  font-size: 24rpx;
  color: #999;
}

.menu-list {
  margin-top: 20rpx;
  background: #fff;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.menu-item:last-child {
  border-bottom: none;
}
</style> 