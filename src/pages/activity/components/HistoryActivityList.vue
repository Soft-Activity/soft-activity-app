<template>
  <view class="activity-list">
    <view 
      v-for="(activity,index) in activities" 
      :key="activity.activityId"
      class="activity-card"
      @tap="handleActivityClick(activity)"
    >
      <view class="activity-cover" :style="{ background: generateActivityGradient(index) }">
        <text class="activity-category">{{ getCategoryName(activity.categoryId) }}</text>
      </view>
      <view class="activity-info">
        <view class="activity-header">
          <text class="activity-name">{{ activity.name }}</text>
          <view class="rating">
            <uni-rate :value="activity.rating" readonly size="15"/>
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
            <text class="label">👥 参与人数：</text>
            <text>{{ activity.capacity }} / {{ activity.maxCapacity }}</text>
          </view>
        </view>

        <view class="comments" v-if="activity.comments?.length">
          <view 
            v-for="comment in activity.comments.slice(0, 2)" 
            :key="comment.id"
            class="comment-item"
          >
            <text class="comment-user">{{ comment.userName }}：</text>
            <text class="comment-content">{{ comment.content }}</text>
          </view>
          <text class="more-comments" v-if="activity.comments.length > 2">
            查看全部{{ activity.comments.length }}条评论 >
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import dayjs from '@/utils/dayjs'
import { generateActivityGradient } from '@/utils/colors'
import type { HistoryActivity } from '@/types/activity'
import { getCategoryName } from '@/types/activity'



const props = defineProps<{
  activities: HistoryActivity[]
}>()


const formatTime = (time: string) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm')
}

const handleActivityClick = (activity: HistoryActivity) => {
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
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
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
  padding: 20rpx;
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

.rating {
  display: flex;
  gap: 4rpx;
}

.star {
  color: #ddd;
  font-size: 28rpx;
}

.star.active {
  color: #ffd700;
}

.activity-details {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.detail-item {
  font-size: 26rpx;
  color: #666;
}

.label {
  color: #999;
}

.comments {
  margin-top: 16rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid #eee;
}

.comment-item {
  font-size: 24rpx;
  line-height: 1.6;
  margin-bottom: 8rpx;
}

.comment-user {
  color: #666;
  font-weight: bold;
}

.comment-content {
  color: #333;
}

.more-comments {
  font-size: 24rpx;
  color: #018d71;
  margin-top: 8rpx;
  display: block;
}
</style> 