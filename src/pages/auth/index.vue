<template>
  <view class="container">
    <view class="auth-form">
      <view class="form-title">用户认证</view>
      
      <!-- 切换身份 -->
      <view class="role-switch">
        <view 
          class="role-item"
          :class="{ active: role === 'student' }"
          @tap="role = 'student'"
        >学生</view>
        <view 
          class="role-item"
          :class="{ active: role === 'teacher' }"
          @tap="role = 'teacher'"
        >教师</view>
      </view>

      <!-- 表单内容 -->
      <view class="form-content">
        <input 
          class="input-item" 
          type="text" 
          placeholder="请输入学号/工号"
          v-model="form.username"
        />
        <input 
          class="input-item" 
          type="safe-password" 
          placeholder="请输入密码"
          v-model="form.password"
        />
      </view>

      <button class="submit-btn" @tap="handleSubmit">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const role = ref('student')
const form = ref({
  username: '',
  password: ''
})

const handleSubmit = () => {
  if (!form.value.username || !form.value.password) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none'
    })
    return
  }

  // TODO: 实现登录逻辑
  uni.showToast({
    title: '登录功能开发中',
    icon: 'none'
  })
}
</script>

<style scoped>
.container {
  padding: 40rpx;
}

.auth-form {
  background: #fff;
  border-radius: 12rpx;
  padding: 40rpx;
}

.form-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
}

.role-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
}

.role-item {
  padding: 20rpx 40rpx;
  margin: 0 20rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
}

.role-item.active {
  background: #018d71;
  color: #fff;
}

.form-content {
  margin-bottom: 40rpx;
}

.input-item {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.submit-btn {
  background: #018d71;
  color: #fff;
  border-radius: 45rpx;
}
</style> 