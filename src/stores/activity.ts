import { defineStore } from 'pinia'

export interface Activity {
  id: string
  title: string
  coverImage: string
  startTime: string
  status: 'not_started' | 'ongoing' | 'ended'
  location: string
  enrollCount: number
  maxEnroll: number
  description: string
}

export interface Comment {
  id: string
  activityId: string
  userId: string
  userAvatar: string
  userName: string
  rating: number
  content: string
  createTime: string
}

export const useActivityStore = defineStore('activity', {
  state: () => ({
    activityList: [] as Activity[],
    currentActivity: null as Activity | null,
    comments: [] as Comment[],
  }),
  
  actions: {
    async getActivityList(categoryId?: number) {
      try {
        // TODO: 调用接口获取活动列表
        // const res = await api.getActivityList({ categoryId })
        // this.activityList = res.data
        
        // 模拟数据
        this.activityList = [
          {
            id: '1',
            title: '示例活动1',
            coverImage: '/static/demo.jpg',
            startTime: '2024-03-20 14:00',
            status: 'not_started',
            location: '活动中心',
            enrollCount: 0,
            maxEnroll: 100,
            description: '这是一个示例活动描述'
          }
        ]
      } catch (error) {
        uni.showToast({
          title: '获取活动列表失败',
          icon: 'error'
        })
        throw error
      }
    },
    
    async getActivityDetail(id: string) {
      try {
        // TODO: 调用接口获取活动详情
        // const res = await api.getActivityDetail(id)
        // this.currentActivity = res.data
        
        // 模拟数据
        this.currentActivity = this.activityList.find(item => item.id === id) || null
      } catch (error) {
        uni.showToast({
          title: '获取活动详情失败',
          icon: 'error'
        })
        throw error
      }
    },
    
    async getComments(activityId: string) {
      try {
        // TODO: 调用接口获取评论列表
        // const res = await api.getComments(activityId)
        // this.comments = res.data
        
        // 模拟数据
        this.comments = []
      } catch (error) {
        uni.showToast({
          title: '获取评论失败',
          icon: 'error'
        })
        throw error
      }
    }
  }
}) 