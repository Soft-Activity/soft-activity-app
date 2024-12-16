<template>
  <view class="container">
    <view class="chat-container">
      <!-- 头部 -->
      <view class="header">
        <view class="back-btn" @tap="goBack">
          <uni-icons type="left" size="20"></uni-icons>
        </view>
        <text class="title">智能咨询</text>
      </view>

      <!-- 问题输入区域 -->
      <view class="question-section">
        <text class="question-title">提问</text>
        <text class="question-subtitle">您好,我是基于大语言模型的AI智能助手,请问我有什么可以帮助你的?</text>
        <!-- 常见问题 -->
        <view class="faq-section">
          <text class="faq-title">常见问题：</text>
          <view class="faq-list">
            <view class="faq-item" @tap="selectQuestion('如何报名活动？')">
              <text>• 如何报名活动？</text>
            </view>
            <view class="faq-item" @tap="selectQuestion('活动规则说明')">
              <text>• 活动规则说明</text>
            </view>
            <view class="faq-item" @tap="selectQuestion('活动评价方式')">
              <text>• 活动评价方式</text>
            </view>
          </view>
        </view>
        <textarea
          class="question-input"
          v-model="inputMessage" 
          placeholder="请输入您的问题"
          auto-height
        />
        
        <button class="submit-btn" @tap="sendMessage">发送问题</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputMessage = ref('')

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  // TODO: 处理发送消息逻辑
  inputMessage.value = ''
}

// 选择常见问题
const selectQuestion = (question: string) => {
  inputMessage.value = question
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding-top: 20px ;
  background-color: #f0f7ff;
}

.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 24rpx 32rpx;
  background: #1e88e5;
  display: flex;
  align-items: center;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  color: #fff;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1rpx;
}

.question-section {
  padding: 40rpx;
  background: #fff;
  border-radius: 20rpx;
  margin: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(30,136,229,0.1);
}

.question-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #1e88e5;
  margin-bottom: 20rpx;
  display: block;
}

.question-subtitle {
  font-size: 28rpx;
  color: #546e7a;
  margin-bottom: 40rpx;
  display: block;
  line-height: 1.6;
  background: #e3f2fd;
  padding: 20rpx;
  border-radius: 12rpx;
}

.question-input {
  width: 95%;
  min-height: 200rpx;
  background: #f5f7fa;
  border-radius: 16rpx;
  padding: 24rpx;
  font-size: 28rpx;
  margin-bottom: 32rpx;
  border: 2rpx solid #e3f2fd;
}

.submit-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #1e88e5, #1976d2);
  color: #fff;
  border-radius: 44rpx;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  transition: all 0.3s;
  box-shadow: 0 4rpx 12rpx rgba(25,118,210,0.3);
}

.submit-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2rpx 6rpx rgba(25,118,210,0.2);
}

.faq-section {
  margin: 30rpx 0;
  padding: 30rpx;
  background: #f8fbff;
  border-radius: 16rpx;
  border: 2rpx solid #e3f2fd;
}

.faq-title {
  font-size: 30rpx;
  color: #1e88e5;
  margin-bottom: 24rpx;
  font-weight: 500;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.faq-item {
  font-size: 28rpx;
  color: #546e7a;
  padding: 16rpx 24rpx;
  background: #fff;
  border-radius: 12rpx;
  transition: all 0.3s;
  border: 1rpx solid #e3f2fd;
}

.faq-item:active {
  color: #1e88e5;
  transform: translateX(4rpx);
  background: #e3f2fd;
}
</style>