<template>
  <view class="container">
    <!-- 活动列表区域 -->
    <scroll-view 
      scroll-y 
      class="activity-container"
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="onRefresh"
      @scrolltolower="onLoadMore"
    >
      <!-- 已报名活动列表 -->
      <activity-list 
        v-if="type === 'enrolled'" 
        :activities="activities" 
      />
      
      <!-- 历史活动和待评价活动列表 -->
      <history-activity-list 
        v-else 
        :activities="activities" 
      />
      
      <!-- 空状态 -->
      <view v-if="activities.length === 0" class="empty-state">
        <image src="/static/images/empty.png" mode="aspectFit" class="empty-image"/>
        <text class="empty-text">{{ getEmptyText }}</text>
      </view>

      <!-- 加载更多状态 -->
      <uni-load-more :status="loadMoreStatus" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ActivityList from '../activity/components/ActivityList.vue'
import HistoryActivityList from '../activity/components/HistoryActivityList.vue'
import type { Activity, HistoryActivity } from '@/types/activity'

// 定义活动类型映射
type ActivityMap = {
  enrolled: Activity[]
  history: HistoryActivity[]
  pending: HistoryActivity[]
}

const activities = ref<ActivityMap[keyof ActivityMap]>([])
const page = ref(1)
const isRefreshing = ref(false)
const loadMoreStatus = ref<'more' | 'loading' | 'noMore'>('more')
const type = ref<keyof ActivityMap>('enrolled')

// 获取空状态文本
const getEmptyText = computed(() => {
  const textMap = {
    'enrolled': '暂无已报名活动',
    'history': '暂无历史活动',
    'pending': '暂无待评价活动'
  }
  return textMap[type.value as keyof typeof textMap] || '暂无活动'
})

// 加载活动数据
const loadActivities = async (isRefresh = false) => {
  try {
    loadMoreStatus.value = 'loading'
    
    const mockData: ActivityMap = {
      enrolled: Array(10).fill(null).map((_, index) => ({
        activityId: index + 1,
        name: `已报名活动${index + 1}`,
        status: 'not_started',
        location: '活动中心',
        startTime: '2024-03-20 14:00',
        endTime: '2024-03-20 16:00',
        maxCapacity: 50,
        capacity: Math.floor(Math.random() * 50),
        categoryId: Math.floor(Math.random() * 5) + 1,
        organizerId: 'org_' + index,
        description: '这是一个活动描述',
        createTime: '2024-03-01 12:00:00'
      })) ,
      
      history: Array(10).fill(null).map((_, index) => ({
        activityId: index + 1,
        name: `历史活动${index + 1}`,
        status: 'ended',
        location: '活动中心',
        startTime: '2024-02-20 14:00',
        endTime: '2024-02-20 16:00',
        maxCapacity: 50,
        capacity: 50,
        categoryId: Math.floor(Math.random() * 5) + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        organizerId: 'org_' + index,
        description: '这是一个历史活动',
        createTime: '2024-02-01 12:00:00',
        comments: [
          {
            id: '1',
            userName: '用户A',
            content: '活动很精彩！',
            rating: 5
          }
        ]
      } )),
      
      pending: Array(10).fill(null).map((_, index) => ({
        activityId: index + 1,
        name: `待评价活动${index + 1}`,
        status: 'ended',
        location: '活动中心',
        startTime: '2024-03-01 14:00',
        endTime: '2024-03-01 16:00',
        maxCapacity: 50,
        capacity: 50,
        categoryId: Math.floor(Math.random() * 5) + 1,
        rating: 0,
        organizerId: 'org_' + index,
        description: '这是一个待评价活动',
        createTime: '2024-03-01 12:00:00',
        comments: []
      }))
    }

    const newActivities = mockData[type.value]

    if (isRefresh) {
      activities.value = newActivities
    } else {
      activities.value = [...activities.value, ...newActivities]
    }

    page.value++
    loadMoreStatus.value = newActivities.length < 10 ? 'noMore' : 'more'
  } catch (error) {
    console.error('加载活动列表失败:', error)
    loadMoreStatus.value = 'more'
  }
}

// 下拉刷新
const onRefresh = async () => {
  isRefreshing.value = true
  page.value = 1
  await loadActivities(true)
  isRefreshing.value = false
  uni.showToast({ title: '刷新成功', icon: 'success' })
}

// 加载更多
const onLoadMore = () => {
  if (loadMoreStatus.value === 'more') {
    loadActivities()
  }
}

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  const { type: pageType } = currentPage.options || {}
  
  if (pageType) {
    type.value = pageType
    // 设置页面标题
    const titleMap = {
      'enrolled': '已报名活动',
      'history': '历史活动',
      'pending': '待评价活动'
    }
    uni.setNavigationBarTitle({
      title: titleMap[pageType as keyof typeof titleMap] || '我的活动'
    })
    loadActivities(true)
  }
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.activity-container {
  height: 100vh;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100rpx 0;
}

.empty-image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}

.empty-text {
  color: #999;
  font-size: 28rpx;
}
</style> 