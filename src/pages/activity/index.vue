<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar 
        v-model="searchText"
        placeholder="搜索活动"
        @confirm="handleSearch"
        radius="30"
        bgColor="#f5f7fa"
      />
    </view>

    <!-- 标签切换 -->
    <view class="tabs">
      <view 
        v-for="tab in tabs" 
        :key="tab.key"
        class="tab-item"
        :class="{ active: searchConditions.currentTab === tab.key }"
        @tap="handleTabChange(tab.key )"
      >
        {{ tab.name }}
      </view>
    </view>

    <!-- 热门活动 -->
    <view v-if="searchConditions.currentTab === 'hot'" class="content">
      <!-- 活动分类网格 -->
      <view class="category-section">
        <!-- 分类网格 -->
        <view class="category-grid">
          <view 
            v-for="(category, index) in categories" 
            :key="category.categoryId"
            class="category-item"
            :class="{ active: searchConditions.categoryId === category.categoryId }"
            :style="{ background: generateCategoryGradient(index) }"
            @tap="handleCategoryClick(category)"
          >
            <text class="category-text">{{ category.name }}</text>
          </view>
        </view>
      </view>

      <!-- 活动数量标题 -->
      <view class="header-row">
        <view class="section-title">
          <text class="title-text">热门活动</text>
          <text class="count-badge">{{ hotActivitiesCount }}</text>
        </view>
        <view class="quick-filters">
          <view 
            class="filter-item"
            :class="{ active: !searchConditions.categoryId && !searchConditions.isMyParticipation }"
            @tap="handleQuickFilter('default')"
          >
            <text class="filter-text">默认</text>
          </view>
          <view 
            class="filter-item"
            :class="{ 
              active: searchConditions.isMyParticipation,
              disabled: !userStore.isLoggedIn
            }"
            @tap="userStore.isLoggedIn && handleQuickFilter('myParticipation')"
          >
            <text class="filter-text">我的参与</text>
          </view>
        </view>
      </view>

      <!-- 活动列表 -->
      <activity-list :activities="hotActivities" />
    </view>

    <!-- 历史活动 -->
    <view v-else class="content">
      <!-- 添加搜索条件和标题行 -->
      <view class="category-section">
        <view class="category-grid">
          <view 
            v-for="(category, index) in categories" 
            :key="category.categoryId"
            class="category-item"
            :class="{ active: searchConditions.categoryId === category.categoryId }"
            :style="{ background: generateCategoryGradient(index) }"
            @tap="handleCategoryClick(category)"
          >
            <text class="category-text">{{ category.name }}</text>
          </view>
        </view>
      </view>

      <view class="header-row">
        <view class="section-title">
          <text class="title-text">历史活动</text>
          <text class="count-badge">{{ historyActivitiesCount }}</text>
        </view>
        <view class="quick-filters">
          <view 
            class="filter-item"
            :class="{ active: !searchConditions.categoryId && !searchConditions.isMyParticipation }"
            @tap="handleQuickFilter('default')"
          >
            <text class="filter-text">默认</text>
          </view>
          <view 
            class="filter-item"
            :class="{ 
              active: searchConditions.isMyParticipation,
              disabled: !userStore.isLoggedIn
            }"
            @tap="userStore.isLoggedIn && handleQuickFilter('myParticipation')"
          >
            <text class="filter-text">我的参与</text>
          </view>
        </view>
      </view>

      <history-activity-list :activities="historyActivities" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import  ActivityList  from './components/ActivityList.vue'
import  HistoryActivityList  from './components/HistoryActivityList.vue'
import { generateCategoryGradient } from '@/utils/colors'
import { getActivityCategorys } from '@/api/servers/api/activityCategory';
import { getActivitys } from '@/api/servers/api/activity';
import { useUserStore } from '@/stores/user';
import { onShow } from '@dcloudio/uni-app';

const userStore = useUserStore()

const tabs = [
  { key: 'hot', name: '热门活动' },
  { key: 'history', name: '历史活动' }
]

const categories = ref<API.ActivityCategoryVO[]>([])

const searchText = ref('')
const hotActivities = ref<API.ActivityVO[]>([])
const hotActivitiesCount = ref(0)
const historyActivities = ref<API.ActivityVO[]>([])
const historyActivitiesCount = ref(0)

// 添加查询条件的响应式变量
const searchConditions = ref<{
  categoryId: number | null,
  isMyParticipation: boolean,
  currentTab: 'hot' | 'history' |string,
  searchText: string | null
  }>({
  categoryId: null,
  isMyParticipation: false,
  currentTab: 'hot',
  searchText: null
})


// 切换标签
const handleTabChange = (tab: string) => {
  searchConditions.value.currentTab = tab
  console.log('tab',searchConditions.value)
  loadActivities()
}

// 搜索
const handleSearch = () => {
  searchConditions.value.searchText = searchText.value
  loadActivities()
}

// 点击分类
const handleCategoryClick = (category: API.ActivityCategoryVO) => {
  if (searchConditions.value.categoryId === category.categoryId) {
    searchConditions.value.categoryId = null
  } else {
    searchConditions.value.categoryId = category.categoryId || null
  }
  loadActivities()
}

// 添加处理方法
const handleQuickFilter = (type: 'default' | 'myParticipation') => {
  if (type === 'default') {
    searchConditions.value = {
      ...searchConditions.value,
      categoryId: null,
      isMyParticipation: false
    }
  } else {
    searchConditions.value = {
      ...searchConditions.value,
      isMyParticipation: true
    }
  }
  loadActivities()
}

//加载活动分类
const loadCategories = async () => {
  try {
    const res = await getActivityCategorys(
      {
        current:1,
        pageSize:100,
        param: {
        }
    }
    )
    categories.value = res?.list || []
  } catch (error) {
    console.error('加载活动分类错误:', error)
  }
}

// 加载活动数据
const loadActivities = async () => {
  // 根据筛选条件，获取不同的活动列表
  const statuses = searchConditions.value.currentTab === 'hot' ? '0,1' : '2'
  const userId = searchConditions.value.isMyParticipation ? useUserStore().userInfo?.userId : undefined
  console.log('searchConditions',searchConditions.value)
  console.log('userId',userId)
  const res = await getActivitys({
    current: 1,
    pageSize: 1000,
    param: {
      ...(searchConditions.value.categoryId && { categoryId: Number(searchConditions.value.categoryId) }),
      ...(searchConditions.value.searchText && { name: searchConditions.value.searchText }),
      ...(userId && { studentId: userId }),
      //@ts-ignore
      statuses:statuses
    }
  })
  
  if(searchConditions.value.currentTab === 'hot'){
    hotActivities.value = res?.list || []
    hotActivitiesCount.value = res?.total || 0
  }else{
    historyActivities.value = res?.list || []
    historyActivitiesCount.value = res?.total || 0
  }
}
onShow(async () => {
  searchConditions.value.currentTab = 'hot'
  await useUserStore().getUserInfo()
  await loadCategories()
  await loadActivities()
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f8fafc;
}

.search-box {
  padding: 30rpx 20rpx;
  background: linear-gradient(to bottom, #ffffff, #f8fafc);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  padding: 0 30rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
  position: sticky;
  justify-content: space-around;
  align-items: stretch;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.tab-item {
  flex: 1;
  padding: 24rpx 40rpx;
  font-size: 30rpx;
  color: #666;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.tab-item.active {
  color: #2b6cb0;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 30rpx;
  right: 30rpx;
  height: 6rpx;
  background: linear-gradient(to right, #2b6cb0, #4299e1);
  border-radius: 6rpx;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content {
  padding: 30rpx 20rpx;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24rpx;
  padding: 20rpx 0 40rpx;
}

.category-item {
  height: 140rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.category-item.active {
  transform: scale(1.05);
  box-shadow: 0 8rpx 24rpx rgba(43, 108, 176, 0.2);
  border: 4rpx solid rgba(43, 108, 176, 0.8);
}

.category-text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
  letter-spacing: 2rpx;
}

.quick-filters {
  display: flex;
  gap: 20rpx;
  padding: 20rpx 0;
}

.filter-item {
  padding: 12rpx 32rpx;
  background: #f5f7fa;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666;
  transition: all 0.3s ease;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.filter-item.active {
  background: linear-gradient(to right, #2b6cb0, #4299e1);
  color: #fff;
  box-shadow: 0 4rpx 12rpx rgba(43, 108, 176, 0.2);
}

.filter-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #e2e8f0;
  color: #a0aec0;
  box-shadow: none;
}

.search-conditions {
  display: flex;
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  margin: 20rpx 0;
  gap: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
}

.condition-item {
  display: flex;
  align-items: center;
  font-size: 28rpx;
}

.condition-value {
  color: #2b6cb0;
  margin-left: 10rpx;
  font-weight: 500;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.title-text {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  letter-spacing: 1rpx;
}

.count-badge {
  background: rgba(43, 108, 176, 0.1);
  color: #2b6cb0;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: 500;
}

.filter-text {
  font-weight: 500;
}
</style>