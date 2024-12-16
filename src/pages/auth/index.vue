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
        <!-- 基础认证信息 -->
        <input 
          class="input-item" 
          type="text" 
          :placeholder="role === 'student' ? '请输入学号' : '请输入工号'"
          v-model="form.username"
        />
        
        <!-- 教师才需要输入密码 -->
        <input 
          v-if="role === 'teacher'"
          class="input-item" 
          type="safe-password" 
          placeholder="请输入密码"
          v-model="form.password"
        />

        <!-- 学生特有信息 -->
        <template v-if="role === 'student'">
          <input 
            class="input-item" 
            type="text" 
            placeholder="请输入姓名"
            v-model="form.name"
          />
          <input 
            class="input-item" 
            type="text" 
            placeholder="请输入学院"
            v-model="form.department"
          />
          <input 
            class="input-item" 
            type="text" 
            placeholder="请输入班级"
            v-model="form.className"
          />
        </template>
      </view>

      <button class="submit-btn" @tap="handleSubmit">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const role = ref('student')

// 表单数据
const form = ref({
  // 基础认证信息
  username: '', // 学号/工号
  password: '', // 密码
  // 学生信息
  name: '', // 姓名
  department: '', // 学院
  className: '', // 班级
})

// 处理提交
const handleSubmit = () => {
  // 验证表单
  if (role.value === 'student') {
    if (!form.value.username || !form.value.name || 
        !form.value.department || !form.value.className) {
      uni.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
  } else {
    if (!form.value.username || !form.value.password) {
      uni.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
  }

  // 模拟登录成功
  if (role.value === 'student') {
    userStore.setUserInfo({
      userId: form.value.username,
      name: form.value.name,
      department: form.value.department,
      avatar: '/static/default-avatar.png',
    })
  } else {
    userStore.setUserInfo({
      userId: form.value.username,
      name: '教师用户',
      department: '教师',
      avatar: '/static/default-avatar.png',
    })
  }

  uni.showToast({
    title: '登录成功',
    icon: 'success',
    success: () => {
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    }
  })
}
</script>

<style scoped>
.container {
  padding: 40rpx;
  min-height: 100vh;
  background: #f5f5f5;
}

.auth-form {
  background: #fff;
  border-radius: 12rpx;
  padding: 40rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
  color: #333;
}

.role-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
  gap: 20rpx;
}

.role-item {
  padding: 20rpx 40rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
  font-size: 28rpx;
  transition: all 0.3s;
}

.role-item.active {
  background: #2979ff;
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
  font-size: 28rpx;
}

.input-item:focus {
  border-color: #2979ff;
}

.submit-btn {
  background: #2979ff;
  color: #fff;
  border-radius: 45rpx;
  font-size: 32rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.submit-btn:active {
  opacity: 0.8;
}
</style> 