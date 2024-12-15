<template>
  <view class="container">
    <!-- 活动封面图 -->
    <image :src="activityDetail.coverImage" mode="widthFix" class="cover-image"/>
    
    <!-- 活动基本信息 -->
    <view class="info-section">
      <view class="title">{{ activityDetail.title }}</view>
      <view class="status-tag" :class="activityDetail.status">
        {{ getStatusText(activityDetail.status) }}
      </view>
      
      <view class="info-item">
        <uni-icons type="calendar" size="16"></uni-icons>
        <text>开始时间：{{ activityDetail.startTime }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="location" size="16"></uni-icons>
        <text>活动地点：{{ activityDetail.location }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="person" size="16"></uni-icons>
        <text>报名人数：{{ activityDetail.enrollCount }}/{{ activityDetail.maxEnroll }}</text>
      </view>
    </view>

    <!-- 活动详情描述 -->
    <view class="detail-section">
      <view class="section-title">活动详情</view>
      <rich-text :nodes="activityDetail.description"></rich-text>
    </view>

    <!-- 活动评价区域 -->
    <view class="comments-section" v-if="activityDetail.status === 'ended'">
      <view class="section-title">活动评价</view>
      <view class="comment-item" v-for="comment in comments" :key="comment.id">
        <view class="comment-header">
          <image :src="comment.userAvatar" class="user-avatar"/>
          <text class="username">{{ comment.userName }}</text>
          <uni-rate :value="comment.rating" disabled size="15"/>
        </view>
        <view class="comment-content">{{ comment.content }}</view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="action-bar">
      <template v-if="activityDetail.status === 'not_started'">
        <button 
          class="action-button"
          :class="{ enrolled: isEnrolled }"
          @tap="handleEnroll"
        >
          {{ isEnrolled ? '取消报名' : '立即报名' }}
        </button>
      </template>
      <template v-else-if="activityDetail.status === 'ended' && isEnrolled && !hasCommented">
        <button class="action-button" @tap="showCommentModal">评价活动</button>
      </template>
    </view>

    <!-- 评价弹窗 -->
    <uni-popup ref="popup" type="bottom">
      <view class="comment-modal">
        <view class="modal-title">活动评价</view>
        <view class="rating-section">
          <text>评分：</text>
          <uni-rate v-model="commentForm.rating" />
        </view>
        <textarea 
          v-model="commentForm.content"
          placeholder="请输入您的评价"
          class="comment-textarea"
        />
        <button class="submit-button" @tap="submitComment">提交评价</button>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ActivityDetail {
  id: string
  title: string
  coverImage: string
  status: 'not_started' | 'ongoing' | 'ended'
  startTime: string
  location: string
  enrollCount: number
  maxEnroll: number
  description: string
}

interface Comment {
  id: string
  userAvatar: string
  userName: string
  rating: number
  content: string
}

// 修改页面实例类型定义
interface PageInstance {
  $page: {
    fullPath: string
    options: Record<string, string>
    path: string
  }
}

const activityDetail = ref<ActivityDetail>({} as ActivityDetail)
const comments = ref<Comment[]>([])
const isEnrolled = ref(false)
const hasCommented = ref(false)
const popup = ref()

const commentForm = ref({
  rating: 0,
  content: ''
})

// 获取活动状态文本
const getStatusText = (status: string) => {
  const statusMap = {
    'not_started': '未开始',
    'ongoing': '进行中',
    'ended': '已结束'
  } as const
  return statusMap[status as keyof typeof statusMap] || status
}

// 添加错误处理的工具函数
const showError = (message: string) => {
  uni.showToast({
    title: message,
    icon: 'error',
    duration: 2000
  })
}

// 修改加载活动详情函数
const loadActivityDetail = async () => {
  try {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1] as PageInstance
    const id = currentPage.$page?.options?.id

    if (!id) {
      showError('活动ID不存在')
      return
    }

    // TODO: 调用接口获取活动详情
    // const res = await api.getActivityDetail(id)
    // activityDetail.value = res.data
    
    // 模拟数据加载
    activityDetail.value = {
      id,
      title: '示例活动',
      coverImage: '/static/demo.jpg',
      status: 'not_started',
      startTime: '2024-03-20 14:00',
      location: '活动中心',
      enrollCount: 0,
      maxEnroll: 100,
      description: '这是一个示例活动描述'
    }
  } catch (error) {
    showError('加载活动详情失败')
    console.error('加载活动详情错误:', error)
  }
}

// 修改加载评论列表函数
const loadComments = async () => {
  try {
    // TODO: 调用接口获取评论列表
    // const res = await api.getActivityComments(activityDetail.value.id)
    // comments.value = res.data

    // 模拟数据
    comments.value = []
  } catch (error) {
    showError('加载评论失败')
    console.error('加载评论错误:', error)
  }
}

// 修改报名处理函数
const handleEnroll = async () => {
  if (!activityDetail.value.id) {
    showError('活动信息不完整')
    return
  }
  
  try {
    if (isEnrolled.value) {
      // TODO: 调用取消报名接口
      // await api.cancelEnroll(activityDetail.value.id)
      uni.showToast({ 
        title: '已取消报名',
        icon: 'success'
      })
    } else {
      // 检查报名人数
      if (activityDetail.value.enrollCount >= activityDetail.value.maxEnroll) {
        showError('活动名额已满')
        return
      }
      // TODO: 调用报名接口
      // await api.enroll(activityDetail.value.id)
      uni.showToast({ 
        title: '报名成功',
        icon: 'success'
      })
    }
    isEnrolled.value = !isEnrolled.value
  } catch (error) {
    showError('操作失败，请稍后重试')
    console.error('报名操作错误:', error)
  }
}

// 显示评价弹窗
const showCommentModal = () => {
  popup.value.open()
}

// 修改提交评价函数
const submitComment = async () => {
  if (commentForm.value.rating === 0) {
    showError('请选择评分')
    return
  }
  if (!commentForm.value.content.trim()) {
    showError('请输入评价内容')
    return
  }

  try {
    // TODO: 调用提交评价接口
    // await api.submitComment({
    //   activityId: activityDetail.value.id,
    //   rating: commentForm.value.rating,
    //   content: commentForm.value.content
    // })
    
    uni.showToast({ 
      title: '评价成功',
      icon: 'success'
    })
    popup.value.close()
    hasCommented.value = true
    // 重新加载评论列表
    await loadComments()
    
    // 清空表单
    commentForm.value = {
      rating: 0,
      content: ''
    }
  } catch (error) {
    showError('评价失败，请稍后重试')
    console.error('提交评价错误:', error)
  }
}

onMounted(() => {
  loadActivityDetail()
  loadComments()
})
</script>

<style scoped>
.container {
  padding-bottom: 100rpx;
}

.cover-image {
  width: 100%;
}

.info-section {
  padding: 30rpx;
  background: #fff;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.status-tag {
  display: inline-block;
  padding: 4rpx 16rpx;
  border-radius: 4rpx;
  font-size: 24rpx;
  margin-bottom: 20rpx;
}

.not_started {
  background: #e6f7ff;
  color: #1890ff;
}

.ongoing {
  background: #f6ffed;
  color: #52c41a;
}

.ended {
  background: #f5f5f5;
  color: #999;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  color: #666;
  font-size: 28rpx;
}

.info-item uni-icons {
  margin-right: 10rpx;
}

.detail-section, .comments-section {
  margin-top: 20rpx;
  padding: 30rpx;
  background: #fff;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  padding-left: 16rpx;
  border-left: 8rpx solid #018d71;
}

.comment-item {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.user-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.username {
  font-size: 28rpx;
  margin-right: 20rpx;
}

.comment-content {
  font-size: 28rpx;
  color: #333;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.action-button {
  background: #018d71;
  color: #fff;
  border-radius: 45rpx;
}

.action-button.enrolled {
  background: #f5f5f5;
  color: #999;
}

.comment-modal {
  background: #fff;
  padding: 30rpx;
  border-radius: 20rpx 20rpx 0 0;
}

.modal-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}

.rating-section {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.comment-textarea {
  width: 100%;
  height: 200rpx;
  padding: 20rpx;
  box-sizing: border-box;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
}

.submit-button {
  background: #018d71;
  color: #fff;
  border-radius: 45rpx;
}
</style> 