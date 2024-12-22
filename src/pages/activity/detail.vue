<template>
  <view class="container">
    <!-- 活动封面图 -->
    <view class="cover-container">
      <image v-if="false" src="" mode="widthFix" class="cover-image" />
      <view v-else class="cover-gradient" :style="getCoverStyle">
        <text class="gradient-title">{{ activityDetail.name }}</text>
      </view>
    </view>

    <!-- 活动基本信息 -->
    <view class="info-section">
      <view class="title">{{ activityDetail.name }}</view>
      <view class="status-tag" :class="getStatusClass(activityDetail)">
        {{ getStatusText(activityDetail) }}
      </view>

      <view class="info-item">
        <uni-icons type="calendar" size="16"></uni-icons>
        <view class="time-info">
          <text>开始时间：{{ formatDate(activityDetail.startTime || '') }}</text>
          <text>结束时间：{{ formatDate(activityDetail.endTime || '') }}</text>
        </view>
      </view>
      <view class="info-item">
        <uni-icons type="location" size="16"></uni-icons>
        <text>活动地点：{{ activityDetail.location }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="person" size="16"></uni-icons>
        <text>组织者：{{ activityDetail.organizerName }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="bars" size="16"></uni-icons>
        <text>活动分类：{{ activityDetail.categoryName }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="personadd" size="16"></uni-icons>
        <text>报名情况：{{ activityDetail.capacity }}/{{ activityDetail.maxCapacity }}</text>
      </view>
      <view class="info-item">
        <uni-icons type="calendar" size="16"></uni-icons>
        <text>创建时间：{{ formatDate(activityDetail.createTime || '') }}</text>
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
    <view class="comments-section" v-if="activityDetail.status === ActivityStatus.ENDED">
      <view class="section-title">活动评价</view>
      <view class="comment-item" v-for="comment in comments" :key="comment.commentId">
        <view class="comment-header">
          <image :src="comment.student?.avatar" class="user-avatar" />
          <text class="username">{{ comment.student?.name }}</text>
          <uni-rate :value="comment.rating" readonly size="15" />
        </view>
        <view class="comment-content">{{ comment.content }}</view>
      </view>
    </view>

    <!-- 底部操作栏 - 根据活动状态显示不同的操作按钮 -->
    <view class="action-bar">
      <!-- 活动未开始时显示报名/取消报名按钮 -->
      <template v-if="activityDetail.status === ActivityStatus.NOT_STARTED">
        <!-- 根据报名状态添加不同样式 -->
        <button class="action-button" :class="{ 'action-button-enrolled': isEnrolled }" @tap="handleEnroll">
          {{ isEnrolled ? '取消报名' : '立即报名' }} <!-- 根据报名状态显示不同文本 -->
        </button>
      </template>
      <!-- 活动结束且已报名但未评价时显示评价按钮 -->
      <template v-else-if="activityDetail.status === ActivityStatus.ENDED && isEnrolled && !hasCommented">
        <button class="action-button action-button-comment" @tap="showCommentModal">评价活动</button>
      </template>
      <!-- 活动进行中的活动可以打卡 -->
      <template v-else-if="activityDetail.status === ActivityStatus.ONGOING && isEnrolled && activityDetail?.isCheckIn ">
        <template v-if="hasCheckedIn">
          <button class="action-button action-button-checkin" :disabled="true">已打卡</button>
        </template>
        <template v-else-if="!isCheckInTime">
          <button class="action-button action-button-checkin" :disabled="true">还未到打卡时间</button>
        </template>
        <template v-else>
          <button class="action-button action-button-checkin" @tap="handleCheckIn">活动打卡</button>
        </template>
      </template>
      <template v-else-if="activityDetail.status === ActivityStatus.ONGOING && isEnrolled && !activityDetail?.isCheckIn">
        <button class="action-button action-button-checkin" :disabled="true">活动无打卡</button>
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
        <textarea v-model="commentForm.content" placeholder="请输入您的评价" class="comment-textarea" />
        <button class="submit-button" @tap="submitComment">提交评价</button>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { generateActivityGradient } from '@/utils/colors'
import { addRegistration, cancelRegister, checkInActivity, isRegister, registerActivity } from '@/api/servers/api/registration';
import { useUserStore } from '@/stores/user';
import { ActivityStatus, ActivityStatusClass, ActivityStatusText } from '@/types/activity';
import { getActivity } from '@/api/servers/api/activity';
import { addComment, getComments, isComment } from '@/api/servers/api/comment';
import { onShow } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
import { isCheckin } from '@/api/servers/api/registration';

const userStore = useUserStore()

// 修改页面实例类型定义
//格式化日期
const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

const activityDetail = ref<API.ActivityVO>({} as API.ActivityVO)
const comments = ref<API.CommentVO[]>([])
const isEnrolled = ref(false)
const hasCheckedIn = ref(false)
const hasCommented = ref(false)
const popup = ref()


const commentForm = ref({
  rating: 0,
  content: ''
})

const getStatusClass = (activity: API.ActivityVO) => {
  return ActivityStatusClass[activity.status as ActivityStatus]
}

const getStatusText = (activity: API.ActivityVO) => {
  return ActivityStatusText[activity.status as ActivityStatus]
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
    const currentPage = pages[pages.length - 1] as any
    const { id } = currentPage.options || {}
    // 模拟数据加载
    activityDetail.value = await getActivity({ id: Number(id) })

    // 设置用户为已报名状态，这样可以看到评价按钮
    isEnrolled.value = await isRegister({ activityId: Number(id) })
    if(isEnrolled.value){
      if(activityDetail.value.status === ActivityStatus.ONGOING){
        hasCheckedIn.value = await isCheckin({ activityId: Number(id) })
      }else{
        hasCommented.value = await isComment({ activityId: Number(id) })
      }
    }

    console.log('isEnrolled', isEnrolled.value)
    console.log('hasCommented', hasCommented.value)
  } catch (error) {
    showError('加载活动详情失败')
    console.error('加载活动详情错误:', error)
  }
}

// 修改加载评论列表函数
const loadComments = async () => {
  try {
    const res = await getComments({
      current: 1,
      pageSize: 1000,
      param: {
        activityId: Number(activityDetail.value.activityId)
      }
    })
    comments.value = res.list || []
  } catch (error) {
    showError('加载评论失败')
    console.error('加载评论错误:', error)
  }
}

// 处理活动报名和取消报名的函数
const handleEnroll = async () => {
  // 检查活动ID是否存在
  if (!activityDetail.value.activityId) {
    showError('活动信息不完整')
    return
  }

  try {
    if (isEnrolled.value) {
      // 如果已报名,则执行取消报名操作
      try {
        const res = await cancelRegister({ activityId: Number(activityDetail.value.activityId) })
        if (res) {
          uni.showToast({
            title: '已取消报名',
            icon: 'success'
          })
        } else {
          throw new Error('取消报名失败')
        }
      } catch (error) {
        throw new Error('取消报名失败')
      }
    } else {
      try {
        // 调用报名接口,传入活动ID和用户ID
        const res = await registerActivity({
          activityId: Number(activityDetail.value.activityId)
        })
        if (res) {
          // 报名成功后显示提示
          uni.showToast({
            title: '报名成功',
            icon: 'success'
          })
        } else {
          throw new Error('报名失败')
        }
      } catch (error) {
        throw new Error('报名失败')
      }
    }
    // 切换报名状态
    isEnrolled.value = !isEnrolled.value
  } catch (error) {
    showError(error as string)
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
    // 调用提交评价接口
    const res = await addComment({
      activityId: Number(activityDetail.value.activityId),
      rating: commentForm.value.rating,
      content: commentForm.value.content
    })
    if (res) {
      uni.showToast({
        title: '评价成功',
        icon: 'success'
      })
    } else {
      throw new Error('评价失败')
    }

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
  const gradientIndex = activityDetail.value.activityId || 0
  const gradient = generateActivityGradient(gradientIndex)
  return {
    height: '400rpx',
    background: gradient
  }
})

const isCheckInTime = computed(() => {
  if(activityDetail.value.startTime== null || activityDetail.value.endTime== null){
    return false
  }
  return dayjs().isAfter(dayjs(activityDetail.value.startTime)) && dayjs().isBefore(dayjs(activityDetail.value.endTime))
})

// 处理打卡
const handleCheckIn = async () => {
    //使用火星标
    uni.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: async (res) => {
        console.log('res', res)
        const latitude = res.latitude
        const longitude = res.longitude
        try {
          const res = await checkInActivity({
            activityId: Number(activityDetail.value.activityId),
            gcj02Longitude: longitude,
            gcj02Latitude: latitude
          })
          if (res) {
            uni.showToast({
              title: '打卡成功',
              icon: 'success'
            })
            hasCheckedIn.value = true
          } else {
            throw new Error('打卡失败')
          }
        } catch (error) {
          console.error('打卡失败', error)
          uni.showModal({
            title: '打卡失败',
            content: typeof error === 'string' ? error : '打卡失败',
            showCancel: false
          })
        }
      }
    })
}

onShow(async () => {
  await loadActivityDetail()
  if (activityDetail.value.status === ActivityStatus.ENDED) {
    await loadComments()
  }
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

.status-not_started {
  background: rgba(24, 144, 255, 0.1);
  color: #1890ff;
  border: 1rpx solid rgba(24, 144, 255, 0.2);
}

.status-ongoing {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
  border: 1rpx solid rgba(82, 196, 26, 0.2);
}

.status-ended {
  background: rgba(153, 153, 153, 0.1);
  color: #999;
  border: 1rpx solid rgba(153, 153, 153, 0.2);
}

.status-cancelled {
  background: rgba(255, 0, 0, 0.1);
  color: #ff0000;
  border: 1rpx solid rgba(255, 0, 0, 0.2);
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

.detail-section,
.comments-section {
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

.action-button-checkin {
  background: #018d71;
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