<template>
  <view class="activity-list">
    <view 
      v-for="(activity, index) in activities" 
      :key="activity.activityId"
      class="activity-card"
      @tap="handleActivityClick(activity)"
    >
      <view class="activity-cover" :style="{ background: generateActivityGradient(index) }">
        <text class="activity-category">{{ activity.categoryName }}</text>
      </view>
      <view class="activity-info">
        <view class="activity-header">
          <text class="activity-name">{{ activity.name }}</text>
          <view :class="['status-tag', getStatusClass(activity)]">
            {{ getStatusText(activity) }}
          </view>
        </view>
        
        <view class="activity-details">
          <view class="detail-item">
            <text class="label">📍 地点：</text>
            <text>{{ activity.location }}</text>
          </view>
          <view class="detail-item">
            <text class="label">🕒 开始时间：</text>
            <text>{{ formatTime(activity.startTime) }}</text>
          </view>
          <view class="detail-item">
            <text class="label">🔚 结束时间：</text>
            <text>{{ formatTime(activity.endTime) }}</text>
          </view>
          <view class="detail-item">
            <text class="label">👥 活动名额：</text>
            <text>{{ activity.capacity }} / {{ activity.maxCapacity }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import dayjs from 'dayjs'
import type { Activity } from '@/types/activity'
import { ActivityStatus, ActivityStatusText, ActivityStatusClass } from '@/types/activity'
import { generateActivityGradient } from '@/utils/colors'
import { getCategoryName } from '@/types/activity'

const props = defineProps<{
  activities: API.ActivityVO[]
}>()

const formatTime = (time: string | undefined) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}


const getStatusClass = (activity: API.ActivityVO) => {
  return ActivityStatusClass[activity.status as ActivityStatus]
}

const getStatusText = (activity: API.ActivityVO) => {
  return ActivityStatusText[activity.status as ActivityStatus]
}

const handleActivityClick = (activity: API.ActivityVO) => {
  uni.navigateTo({
    url: `/pages/activity/detail?id=${activity.activityId}`
  })
}
</script>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding: 20rpx;
}

.activity-card {
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.activity-card:active {
  transform: scale(0.98);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
}

.activity-cover {
  width: 100%;
  height: 260rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.activity-category {
  color: #ffffff;
  font-size: 36rpx;
  font-weight: bold;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
  letter-spacing: 2rpx;
}

.activity-info {
  padding: 24rpx;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.activity-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.status-tag {
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  font-size: 24rpx;
  font-weight: 500;
}

.status-upcoming {
  background: #e6f7ff;
  color: #1890ff;
}

.status-ongoing {
  background: #f6ffed;
  color: #52c41a;
}

.status-full {
  background: #fff7e6;
  color: #fa8c16;
}

.status-cancelled {
  background: #fff1f0;
  color: #f5222d;
}

.activity-details {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.detail-item {
  font-size: 26rpx;
  color: #666;
  display: flex;
  align-items: center;
}

.label {
  color: #888;
  margin-right: 8rpx;
  min-width: 160rpx;
}
</style> 