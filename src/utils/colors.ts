// 分类页面的渐变色
const categoryGradients = [
  ['#2979ff', '#1565c0'], // 蓝色系
  ['#00b0ff', '#0091ea'], // 浅蓝系
  ['#2962ff', '#2979ff'], // 深蓝系
  ['#304ffe', '#3d5afe'], // 靛蓝系
]

// 活动卡片的渐变色
const activityGradients = [
  'linear-gradient(45deg, #FF6B6B, #FFE66D)',  // 红橙色
  'linear-gradient(45deg, #4ECDC4, #556270)',  // 青灰色
  'linear-gradient(45deg, #556270, #4ECDC4)',  // 灰青色
  'linear-gradient(45deg, #50C9C3, #96DEDA)',  // 浅青色
  'linear-gradient(45deg, #2193b0, #6dd5ed)',  // 蓝色
  'linear-gradient(45deg, #cc2b5e, #753a88)',  // 紫红色
]

// 分类页面使用
export const generateCategoryGradient = (index: number): string => {
  const colors = categoryGradients[index % categoryGradients.length]
  return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`
}

// 活动列表使用
export const generateActivityGradient = (index: number): string => {
  return activityGradients[index % activityGradients.length]
} 