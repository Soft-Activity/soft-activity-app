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
        :class="{ active: currentTab === tab.key }"
        @tap="handleTabChange(tab.key)"
      >
        {{ tab.name }}
      </view>
    </view>

    <!-- 热门活动 -->
    <view v-if="currentTab === 'hot'" class="content">
      <!-- 活动分类网格 -->
      <view class="category-section">
        <!-- 分类网格 -->
        <view class="category-grid">
          <view 
            v-for="(category, index) in categories" 
            :key="category.id"
            class="category-item"
            :class="{ active: searchConditions.categoryId === category.id }"
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
          <text class="count-badge">{{ hotActivities.length }}</text>
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
            :class="{ active: searchConditions.isMyParticipation }"
            @tap="handleQuickFilter('myParticipation')"
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
            :key="category.id"
            class="category-item"
            :class="{ active: searchConditions.categoryId === category.id }"
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
          <text class="count-badge">{{ historyActivities.length }}</text>
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
            :class="{ active: searchConditions.isMyParticipation }"
            @tap="handleQuickFilter('myParticipation')"
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
import ActivityList from './components/ActivityList.vue'
import HistoryActivityList from './components/HistoryActivityList.vue'
import type { Activity, HistoryActivity } from '@/types/activity';
import { generateCategoryGradient } from '@/utils/colors'

const tabs = [
  { key: 'hot', name: '热门活动' },
  { key: 'history', name: '历史活动' }
]

const categories = [
  { id: 1, name: '学术交流' },
  { id: 2, name: '社会公益' },
  { id: 3, name: '体育竞技' }
]

const currentTab = ref('hot')
const searchText = ref('')
const currentCategory = ref<number | null>(null)
const hotActivities = ref<Activity[]>([])
const historyActivities = ref<HistoryActivity[]>([])

// 添加查询条件的响应式变量
const searchConditions = ref<{
  categoryId: number | null,
  isMyParticipation: boolean
}>({
  categoryId: null,
  isMyParticipation: false
})


// 切换标签
const handleTabChange = (tab: string) => {
  currentTab.value = tab
  loadActivities()
}

// 搜索
const handleSearch = () => {
  loadActivities()
}

// 点击分类
const handleCategoryClick = (category: { id: number, name: string }) => {
  if (searchConditions.value.categoryId === category.id) {
    searchConditions.value.categoryId = null
  } else {
    searchConditions.value.categoryId = category.id
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

const getCategoryName = () => {
  if (!searchConditions.value.categoryId) return '全部'
  const category = categories.find(c => c.id === searchConditions.value.categoryId)
  return category ? category.name : '全部'
}

// 加载活动数据
const loadActivities = async () => {
  // 使用模拟数据
  if (currentTab.value === 'hot') {
    // 加载热门活动
    hotActivities.value = [
      {
        activityId: 1,
        name: '2024春季学术研讨会',
        organizerId: '1',
        categoryId: 1,
        location: '图书馆报告厅',
        description: '春季学术研讨会',
        status: 2,
        startTime: '2024-04-15 09:00:00',
        endTime: '2024-04-15 17:00:00',
        maxCapacity: 150,
        capacity: 120,
        createTime: '2024-03-01 10:00:00'
      },
      {
        activityId: 2,
        name: '校园环保志愿行动',
        organizerId: '2', 
        categoryId: 2,
        location: '校园广场',
        description: '环保志愿活动',
        status: 1,
        startTime: '2024-04-20 14:00:00',
        endTime: '2024-04-20 17:00:00',
        maxCapacity: 100,
        capacity: 50,
        createTime: '2024-03-15 14:00:00'
      },
      {
        activityId: 3,
        name: '校际篮球联赛',
        organizerId: '3',
        categoryId: 3,
        location: '体育馆',
        description: '校际篮球比赛',
        status: 3,
        startTime: '2024-05-01 09:00:00',
        endTime: '2024-05-03 17:00:00',
        maxCapacity: 300,
        capacity: 200,
        createTime: '2024-03-20 09:00:00'
      }
    ]
  } else {
    // 加载历史活动
    historyActivities.value = [
      {
        activityId: '1',
        name: '2023冬季文化节',
        categoryId: 4,
        location: '学生活动中心',
        startTime: '2023-12-20 10:00:00',
        endTime: '2023-12-20 21:00:00',
        capacity: 300,
        maxCapacity: 400,
        rating: 4.5,
        comments: [
          {
            id: '1',
            userName: '张三',
            content: '活动很精彩',
            rating: 5,
            createTime: '2023-12-21 09:00:00'
          }
        ]
      },
      {
        activityId: '2',
        name: '秋季运动会',
        categoryId: 3,
        location: '运动场',
        startTime: '2023-10-15 08:00:00',
        endTime: '2023-10-15 17:00:00',
        capacity: 500,
        maxCapacity: 600,
        rating: 4.8,
        comments: [
          {
            id: '2',
            userName: '李四',
            content: '组织得很好',
            rating: 5,
            createTime: '2023-10-16 10:00:00'
          }
        ]
      }
    ]
  }
}
onMounted(() => {
  currentTab.value = 'hot'
  loadActivities()
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