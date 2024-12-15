import type { Comment } from './comment'

// 活动状态枚举
export enum ActivityStatus {
  CANCELLED = 1,
  NOT_STARTED = 2,
  ONGOING = 3,
  ENDED = 4
}

// 活动接口
export interface Activity {
  activityId: number
  name: string
  organizerId: string
  categoryId: number
  location: string
  description: string
  status: ActivityStatus
  startTime: string
  endTime: string
  maxCapacity: number
  capacity: number
  createTime: string
}

// 活动列表查询参数
export interface ActivityQuery {
  categoryId?: number
  page: number
  pageSize: number
  status?: ActivityStatus
}

// 活动状态文本映射
export const ActivityStatusText: Record<ActivityStatus, string> = {
  [ActivityStatus.CANCELLED]: '已取消',
  [ActivityStatus.NOT_STARTED]: '未开始',
  [ActivityStatus.ONGOING]: '进行中',
  [ActivityStatus.ENDED]: '已结束'
}

// 活动状态样式类映射
export const ActivityStatusClass: Record<ActivityStatus, string> = {
  [ActivityStatus.CANCELLED]: 'status-cancelled',
  [ActivityStatus.NOT_STARTED]: 'status-upcoming',
  [ActivityStatus.ONGOING]: 'status-ongoing',
  [ActivityStatus.ENDED]: 'status-ended'
} 

export interface HistoryActivity {
  activityId: string
  name: string
  categoryId: number
  location: string
  startTime: string
  endTime: string
  capacity: number
  maxCapacity: number
  rating: number
  comments?: Comment[]
}

export const getCategoryName = (categoryId: number): string => {
  const categories: Record<number, string> = {
    1: '学术活动',
    2: '志愿服务',
    3: '体育运动',
    4: '文化活动'
  }
  return categories[categoryId] || '未分类活动'
}