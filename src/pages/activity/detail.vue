<template>
  <view class="container">
    <!-- 活动封面图 -->
    <view class="cover-container">
      <image 
        v-if="false" 
        :src="activityDetail.coverImage" 
        mode="widthFix" 
        class="cover-image"
      />
      <view 
        v-else 
        class="cover-gradient"
        :style="getCoverStyle"
      >
        <text class="gradient-title">{{ activityDetail.title }}</text>
      </view>
    </view>
    
    <!-- 活动基本信息 -->
    <view class="info-section">
      <view class="title">{{ activityDetail.title }}</view>
      <view class="status-tag" :class="activityDetail.status">
        {{ getStatusText(activityDetail.status) }}
      </view>
      
      <view class="info-item">
        <uni-icons type="calendar" size="16"></uni-icons>
        <view class="time-info">
          <text>开始时间：{{ activityDetail.startTime }}</text>
          <text>结束时间：{{ activityDetail.endTime }}</text>
        </view>
      </view>
      <view class="info-item">
        <uni-icons type="location" size="16"></uni-icons>
        <text>活动地点：{{ activityDetail.location }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="person" size="16"></uni-icons>
        <text>组织者：{{ activityDetail.organizer }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="bars" size="16"></uni-icons>
        <text>活动分类：{{ activityDetail.category }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="personadd" size="16"></uni-icons>
        <text>报名情况：{{ activityDetail.enrollCount }}/{{ activityDetail.maxEnroll }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="calendar" size="16"></uni-icons>
        <text>创建时间：{{ activityDetail.createTime }}</text>
      </view>
    </view>

    <!-- 活动详情描述 -->
    <view class="detail-section">
      <view class="section-title">
        <text>活动详情</text>
      </view>
      <view class="description-content">
        <text>{{ activityDetail.description }}</text>
      </view>
    </view>

    <!-- 活动评价区域 -->
    <view class="comments-section" v-if="activityDetail.status === 'ended'">
      <view class="section-title">活动评价</view>
      <view class="comment-item" v-for="comment in comments" :key="comment.id">
        <view class="comment-header">
          <image :src="comment.userAvatar" class="user-avatar"/>
          <text class="username">{{ comment.userName }}</text>
          <uni-rate :value="comment.rating" readonly size="15"/>
        </view>
        <view class="comment-content">{{ comment.content }}</view>
      </view>
    </view>

    <!-- 底部操作栏 - 根据活动状态显示不同的操作按钮 -->
    <view class="action-bar">
      <!-- 活动未开始时显示报名/取消报名按钮 -->
      <template v-if="activityDetail.status === 'not_started'">
         <!-- 根据报名状态添加不同样式 -->
        <button 
          class="action-button"
          :class="{ 'action-button-enrolled': isEnrolled }"
          @tap="handleEnroll"
        >
          {{ isEnrolled ? '取消报名' : '立即报名' }} <!-- 根据报名状态显示不同文本 -->
        </button>
      </template>
      <!-- 活动结束且已报名但未评价时显示评价按钮 -->
      <template v-else-if="activityDetail.status === 'ended' && isEnrolled && !hasCommented">
        <button class="action-button action-button-comment" @tap="showCommentModal">评价活动</button>
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
import { ref, onMounted, computed } from 'vue'
import { generateActivityGradient } from '@/utils/colors'
import { addRegistration, cancelRegistration } from '@/api/servers/api/registration';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

interface ActivityDetail {
  id: string
  title: string
  coverImage: string
  status: 'not_started' | 'ongoing' | 'ended'
  startTime: string
  endTime: string
  location: string
  enrollCount: number
  maxEnroll: number
  description: string
  organizer: string
  category: string
  createTime: string
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

    // 模拟数据加载
    activityDetail.value = {
      id: id || '1',
      title: '2024年前端技术分享与交流会',
      coverImage: '',
      status: 'ended',
      startTime: '2024-03-23 14:00:00',
      endTime: '2024-03-23 17:30:00',
      location: '杭州市西湖区科技园B座3层多功能会议室',
      enrollCount: 25,
      maxEnroll: 50,
      description: `诚邀各位开发者参加我们的前端技术分享会！

      【活动亮点】
      1. 前沿技术分享：深入探讨Vue3、React18、TypeScript等热门技术
      2. 实战经验交流：资深工程师分享实际项目开发经验
      3. 互动问答环节：与讲师面对面交流，解答技术难题
      4. 社交网络建设：认识同行，拓展人脉

      【议程安排】
      14:00-14:30 签到入场
      14:30-15:30 主题分享：Vue3组件库开发实践
      15:30-15:45 茶歇交流
      15:45-16:45 主题分享：前端性能优化策略
      16:45-17:30 开放讨论&答疑

      【温馨提示】
      * 请提前15分钟到达会场
      * 现场提供免费茶歇
      * 请带好个人电脑，以便参与互动环节
      * 场地内提供免费WiFi`,
      organizer: '前端技术交流社区',
      category: '技术分享会',
      createTime: '2024-03-10 10:00:00'
    }

    // 设置用户为已报名状态，这样可以看到评价按钮
    isEnrolled.value = true
  } catch (error) {
    showError('加载活动详情失败')
    console.error('加载活动详情错误:', error)
  }
}

// 修改加载评论列表函数
const loadComments = async () => {
  try {
    comments.value = [
      {
        id: '1',
        userAvatar: '/static/default-avatar.png',
        userName: '张三',
        rating: 5,
        content: '讲师的分享非常专业，尤其是Vue3组件库开发那部分，解决了我们团队一直困扰的几个问题。现场氛围也很好，认识了不少同行，收获满满！'
      },
      {
        id: '2',
        userAvatar: '/static/avatar2.png',
        userName: '李四',
        rating: 4,
        content: '干货满满的一场技术分享会，特别是性能优化部分的内容对我们项目很有帮助。建议下次可以多一些实战案例分析，总体来说非常值得参加！'
      },
      {
        id: '3',
        userAvatar: '/static/avatar3.png',
        userName: '王五',
        rating: 5,
        content: '分享的内容很接地气，不是纸上谈兵，而是实打实的项目经验。茶歇时间的交流也很有收获，认识了几个同城的开发者，已经约好了后续技术交流，感谢主办方提供这么好的平台！'
      }
    ]
  } catch (error) {
    showError('加载评论失败')
    console.error('加载评论错误:', error)
  }
}

// 处理活动报名和取消报名的函数
const handleEnroll = async () => {
  // 检查活动ID是否存在
  if (!activityDetail.value.id) {
    showError('活动信息不完整')
    return
  }
  
  try {
    if (isEnrolled.value) {
      // 如果已报名,则执行取消报名操作
      await cancelRegistration({
        activityId: Number(activityDetail.value.id),
        studentId: userStore.userId,
      })
      uni.showToast({ 
        title: '已取消报名',
        icon: 'success'
      })
    } else {
      // 如果未报名,先检查活动名额是否已满
      if (activityDetail.value.enrollCount >= activityDetail.value.maxEnroll) {
        showError('活动名额已满')
        return
      }
      // 调用报名接口,传入活动ID和用户ID
      await addRegistration({
        activityId: Number(activityDetail.value.id),
        studentId: userStore.userId,
      })
      // 报名成功后显示提示
      uni.showToast({ 
        title: '报名成功',
        icon: 'success'
      })
    }
    // 切换报名状态
    isEnrolled.value = !isEnrolled.value
  } catch (error) {
    // 处理报名/取消报名过程中的错误
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

// 添加计算封面样式的函数
const getCoverStyle = computed(() => {
  const gradientIndex = parseInt(activityDetail.value.id || '0', 10)
  const gradient = generateActivityGradient(gradientIndex)
  return {
    height: '400rpx',
    background: gradient
  }
})

onMounted(() => {
  loadActivityDetail()
  loadComments()
})
</script>

<style scoped>
.container {
  padding-bottom: 100rpx;
  background-color: #f5f7fa;
}

.cover-image {
  width: 100%;
}

.info-section {
  padding: 30rpx;
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  margin-top: -20rpx;
  position: relative;
  box-shadow: 0 -4rpx 10rpx rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #2c3e50;
}

.status-tag {
  display: inline-block;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  margin-bottom: 20rpx;
}

.not_started {
  background: rgba(24, 144, 255, 0.1);
  color: #1890ff;
  border: 1rpx solid rgba(24, 144, 255, 0.2);
}

.ongoing {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
  border: 1rpx solid rgba(82, 196, 26, 0.2);
}

.ended {
  background: rgba(153, 153, 153, 0.1);
  color: #999;
  border: 1rpx solid rgba(153, 153, 153, 0.2);
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  color: #666;
  font-size: 28rpx;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item uni-icons {
  margin-right: 20rpx;
  flex-shrink: 0;
}

.info-item text {
  flex: 1;
  word-break: break-all;
}

.detail-section, .comments-section {
  margin-top: 20rpx;
  padding: 30rpx;
  background: #fff;
  border-radius: 12rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  padding-left: 16rpx;
  border-left: 8rpx solid #018d71;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-item {
  margin-bottom: 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.comment-item:last-child {
  border-bottom: none;
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
  border: 2rpx solid #fff;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.username {
  font-size: 28rpx;
  margin-right: 20rpx;
  color: #2c3e50;
  font-weight: 500;
}

.comment-content {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  padding-left: 76rpx;
  max-height: 240rpx;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.description-content {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx 40rpx;
  background: #fff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.action-button {
  background: #4CAF50;
  color: #fff;
  border-radius: 45rpx;
  font-weight: 500;
  font-size: 32rpx;
  height: 88rpx;
  line-height: 88rpx;
  transition: all 0.3s ease;
}

.action-button-enrolled {
  background: #f44336;
}

.action-button-comment {
  background: #FFC107;
}

.action-button:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.cover-container {
  width: 100%;
}

.cover-gradient {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400rpx;
  position: relative;
  overflow: hidden;
}

.gradient-title {
  color: #fff;
  font-size: 40rpx;
  font-weight: bold;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
  padding: 0 40rpx;
  text-align: center;
  letter-spacing: 2rpx;
  line-height: 1.4;
  position: relative;
  z-index: 1;
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
  color: #2c3e50;
}

.rating-section {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  padding: 20rpx 0;
}

.comment-textarea {
  width: 100%;
  height: 200rpx;
  padding: 20rpx;
  box-sizing: border-box;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  background: #f9f9f9;
}

.submit-button {
  background: #018d71;
  color: #fff;
  border-radius: 45rpx;
  font-weight: 500;
  font-size: 32rpx;
  height: 88rpx;
  line-height: 88rpx;
  margin-top: 20rpx;
}

.time-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.time-info text {
  color: #666;
  font-size: 28rpx;
}
</style> 