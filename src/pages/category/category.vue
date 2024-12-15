<template>
  <view class="container">
    <view class="category-list">
      <view 
        v-for="(item, index) in categories" 
        :key="item.id"
        class="category-card"
        :style="{ background: generateCategoryGradient(index) }"
        @tap="handleCategoryClick(item)"
      >
        <view class="category-content">
          <text class="category-title">{{ item.name }}</text>
          <text class="category-desc">{{ item.description }}</text>
          <view class="count-box">
            <text class="new-count">
              <text class="count-number">({{ item.newCount }})</text> 
              新活动
            </text>
            <text class="arrow-icon">›</text>
          </view>
        </view>
        
        <view class="overlay"/>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { generateCategoryGradient } from '@/utils/colors'

interface Category {
  id: number
  name: string
  description: string
  newCount: number
}

const categories = ref<Category[]>([
  { 
    id: 1, 
    name: '学术交流', 
    description: '专家讲座、学术研讨、前沿分享',
    newCount: 0 
  },
  { 
    id: 2, 
    name: '社会公益', 
    description: '志愿服务、公益活动、社区关爱',
    newCount: 2 
  },
  { 
    id: 3, 
    name: '体育竞技', 
    description: '体育比赛、运动会、健身活动',
    newCount: 2 
  }
])

const handleCategoryClick = (category: Category) => {
  uni.navigateTo({
    url: `/pages/category/category-activities?id=${category.id}&name=${encodeURIComponent(category.name)}`
  })
}
</script>

<style scoped>
.container {
  padding: 30rpx;
  min-height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  padding: 10rpx;
}

.category-card {
  border-radius: 20rpx;
  padding: 40rpx;
  min-height: 200rpx;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
}

.category-card:active {
  transform: scale(0.97);
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.12);
}

.category-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  position: relative;
  z-index: 1;
}

.category-title {
  font-size: 44rpx;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
  letter-spacing: 2rpx;
}

.category-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.1);
}

.count-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-top: 25rpx;
  background: rgba(255, 255, 255, 0.15);
  padding: 12rpx 20rpx;
  border-radius: 30rpx;
  backdrop-filter: blur(5px);
}

.new-count {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

.count-number {
  font-weight: bold;
  margin-right: 6rpx;
}

.arrow-icon {
  font-size: 40rpx;
  color: #ffffff;
  font-weight: bold;
  opacity: 0.9;
  transform: translateX(4rpx);
  transition: transform 0.3s ease;
}

.category-card:active .arrow-icon {
  transform: translateX(8rpx);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
  pointer-events: none;
  opacity: 0.6;
}
</style> 