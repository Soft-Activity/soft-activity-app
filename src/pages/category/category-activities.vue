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
      <activity-list :activities="activities" />
      
      <!-- 空状态 -->
      <view v-if="activities.length === 0" class="empty-state">
        <image src="/static/images/empty.png" mode="aspectFit" class="empty-image"/>
        <text class="empty-text">暂无活动</text>
      </view>

      <!-- 加载更多状态 -->
      <uni-load-more :status="loadMoreStatus" />
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ActivityList from '../activity/components/ActivityList.vue'
import { getActivitys } from '@/api/servers/api/activity';

const activities = ref<API.ActivityVO[]>([])
const page = ref(1)
const pageSize = ref(10)
const isRefreshing = ref(false)
const loadMoreStatus = ref<'more' | 'loading' | 'noMore'>('more')
const categoryId = ref(0)

// 获取页面参数
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  const { id, name } = currentPage.options || {}
  console.log('id:', id)
  console.log('name:', name)
  
  if (id) {
    categoryId.value = Number(id)
    // 设置页面标题
    uni.setNavigationBarTitle({
      title: decodeURIComponent(name || '活动列表')
    })
    loadActivities(true)
  }
})

// 加载活动数据
const loadActivities = async (isRefresh = false) => {
  try {
    loadMoreStatus.value = 'loading'
    
    // 模拟数据
    const res = await getActivitys({
      current: page.value,
      pageSize: pageSize.value,
      param: {
        categoryId: categoryId.value,
        //@ts-ignore
        statuses: '0,1'
      }
    })

    const newActivities = (res.list || []) as API.ActivityVO[]

    if (isRefresh) {
      activities.value = newActivities
    } else {
      activities.value = [...activities.value, ...newActivities]
    }

    page.value++
    loadMoreStatus.value = newActivities.length < pageSize.value ? 'noMore' : 'more'
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
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
}

.activity-container {
  flex: 1;
  padding: 5rpx;
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