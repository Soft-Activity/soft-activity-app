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
        v-if="type === 'enrolled' || type === 'checkin'" 
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
import { getMyActivitys } from '@/api/servers/api/activity';
import { myActivityTypeQueryMap } from '@/constants/activity';



const activities = ref<API.ActivityVO[]>([])
const page = ref(1)
const pageSize = ref(10)
const isRefreshing = ref(false)
const loadMoreStatus = ref<'more' | 'loading' | 'noMore'>('more')
const type = ref<'enrolled' | 'history' | 'pending' | 'checkin'>('enrolled')

// 获取空状态文本
const getEmptyText = computed(() => {
  const textMap = {
    'enrolled': '暂无新活动',
    'history': '暂无历史活动',
    'pending': '暂无待评价活动'
  }
  return textMap[type.value as keyof typeof textMap] || '暂无活动'
})

// 加载活动数据
const loadActivities = async (isRefresh = false) => {
  try {
    loadMoreStatus.value = 'loading'
    console.log('page',page.value)
    console.log('isRefresh',isRefresh)
    //根据switch的值，获取不同的活动列表
    const queryParams = myActivityTypeQueryMap[type.value]

    const newActivities = await getMyActivitys(
      {
        current: page.value,
        pageSize: pageSize.value,
        param: queryParams
      }
    )

    if (isRefresh) {
      activities.value = newActivities.list || [] 
    } else {
      activities.value = [...activities.value, ...(newActivities.list || [])]
    }

    page.value++
    loadMoreStatus.value = (newActivities.list || []).length < pageSize.value ? 'noMore' : 'more'
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
      'pending': '待评价活动',
      'checkin': '待打卡活动'
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