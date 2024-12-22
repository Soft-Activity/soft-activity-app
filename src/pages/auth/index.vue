<template>
  <view class="container">
    <view class="auth-form">
      <view class="form-title">用户认证</view>
      
      <!-- 切换身份 -->
      <view class="role-switch">
        <view 
          class="role-item"
          :class="{ active: role === 'student' }"
          @tap="role = 'student'"
        >学生</view>
        <view 
          class="role-item"
          :class="{ active: role === 'teacher' }"
          @tap="role = 'teacher'"
        >教师</view>
      </view>

      <!-- 表单内容 -->
      <view class="form-content">
        <!-- 教师认证表单 -->
        <template v-if="role === 'teacher'">
          <input 
            class="input-item" 
            type="text" 
            placeholder="请输入工号"
            v-model="form.studentId"
          />
          <view class="password-input">
            <input 
              class="input-item" 
              :password="!showPassword"
              type="text" 
              placeholder="请输入密码"
              v-model="form.password"
            />
            <view class="password-icon" @tap="togglePassword">
              <uni-icons 
                :type="showPassword ? 'eye' : 'eye-slash'" 
                size="20" 
                color="#999"
              />
            </view>
          </view>
        </template>

        <!-- 学生认证表单 -->
        <template v-if="role === 'student'">
          <input 
            class="input-item" 
            type="text" 
            placeholder="请输入学号"
            v-model="form.studentId"
          />
          <input 
            class="input-item" 
            type="text" 
            placeholder="请输入姓名"
            v-model="form.name"
          />
          <picker 
            class="input-item picker" 
            mode="selector" 
            :range="genderOptions" 
            @change="handleGenderChange"
          >
            <text :class="{ placeholder: !form.gender }">
              {{ form.gender || '请选择性别' }}
            </text>
          </picker>
          <picker 
            class="input-item picker" 
            mode="selector" 
            :range="gradeOptions" 
            @change="handleGradeChange"
          >
            <text :class="{ placeholder: !form.grade }">
              {{ form.grade ? `${form.grade}级` : '请选择年级' }}
            </text>
          </picker>
          <picker 
            class="input-item picker" 
            mode="selector" 
            :range="typeOptions" 
            @change="handleTypeChange"
          >
            <text :class="{ placeholder: !form.type }">
              {{ form.type || '请选择学生类型' }}
            </text>
          </picker>
          <picker 
            class="input-item picker" 
            mode="selector" 
            :range="collegeOptions" 
            @change="handleCollegeChange"
          >
            <text :class="{ placeholder: !form.college }">
              {{ isLoadingCollege ? '加载中...' : (form.college || '请选择学院') }}
            </text>
          </picker>
          <picker 
            class="input-item picker" 
            mode="selector" 
            :range="classOptions"
            @change="handleClassChange"
          >
            <text :class="{ placeholder: !form.classes }">
              {{ 
                isLoadingClasses 
                  ? '加载中...' 
                  : (form.classes ||  '请选择班级')
              }}
            </text>
          </picker>
          
        </template>
      </view>

      <button class="submit-btn" @tap="handleSubmit">登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { getClassList, getCollegeList } from '@/api/servers/api/student';

const userStore = useUserStore()
const role = ref('student')

// 选项数据
const genderOptions = ['男', '女']
const gradeOptions = [2021, 2022, 2023, 2024]
const typeOptions = ['本科生', '研究生', '博士生']
const collegeOptions = ref<string[]>([])
const classOptions = ref<string[]>([])
// 班级选项映射
const isLoadingCollege = ref(false)
const isLoadingClasses = ref(false)

// 表单数据
const form = ref({
  // 教师信息
  username: '',
  password: '',
  // 学生信息
  studentId: '',
  name: '',
  gender: '',
  college: '',
  classes: '',
  grade: null as number | null,
  type: ''
})

//获取学院列表的函数
const fetchCollegeList = async () => {
  isLoadingCollege.value = true
  const response = await getCollegeList()
  console.log(response)
  collegeOptions.value = response as string[]
  isLoadingCollege.value = false
}

// 获取班级列表的函数
const fetchClasses = async () => {
  isLoadingClasses.value = true
  // 将params转换为StudentQuery
  const studentQuery: API.StudentQuery = {
    ...(form.value.college ? { college: form.value.college } : {}),
    ...(form.value.classes ? { classes: form.value.classes } : {}),
    ...(form.value.grade ? { grade: form.value.grade } : {}),
  }
  try {
    const response = await getClassList({param: studentQuery})
      
    console.log(response)
    classOptions.value = response as string[]
  } catch (error) {
    console.error('获取班级列表失败:', error)
    uni.showToast({
      title: '获取班级列表失败',
      icon: 'none'
    })
  } finally {
    isLoadingClasses.value = false
  }
}

// 处理选择器变化
const handleGenderChange = (e: any) => {
  form.value.gender = genderOptions[e.detail.value]
  fetchClasses()
}

const handleGradeChange = (e: any) => {
  form.value.grade = gradeOptions[e.detail.value]
  fetchClasses()
}


const handleCollegeChange = async (e: any) => {
  form.value.college = collegeOptions.value[e.detail.value]
  form.value.classes = '' // 清空已选择的班级
  
  await fetchClasses()
  
}

const handleClassChange = (e: any) => {
  form.value.classes = classOptions.value[e.detail.value]
}
const handleTypeChange = (e: any) => {
  form.value.type = typeOptions[e.detail.value]
}



// 处理提交
const handleSubmit = () => {
  console.log(role.value)
  console.log(form.value)
  if (role.value === 'student') {
    // 验证学生表单
    if (!form.value.studentId || !form.value.name || !form.value.gender || 
        !form.value.college || !form.value.classes || !form.value.grade || 
        !form.value.type) {

      uni.showToast({
        title: '请填写完整���',
        icon: 'none'
      })
      return
    }
  } else {
    // 验证教师表单
    if (!form.value.studentId || !form.value.password) {
      uni.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
  }
  // 绑定
  if(role.value === 'student'){
    userStore.bindForStudent({
      code: '',
      studentId: form.value.studentId,
      name: form.value.name,
      gender: form.value.gender,
      college: form.value.college,
      classes: form.value.classes,
      grade: form.value.grade as number,
      type: form.value.type
    })
  }else{
    userStore.bindWithPassword({
      code: '',
      studentId: form.value.studentId,
      password: form.value.password
    })
  }



  
}
onMounted(async () => {
  await fetchCollegeList()
})

// 修改密码显示控制
const showPassword = ref(false)

// 切换密码显示/隐藏
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.container {
  padding: 40rpx;
  min-height: 100vh;
  background: #f5f5f5;
}

.auth-form {
  background: #fff;
  border-radius: 12rpx;
  padding: 40rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
  color: #333;
}

.role-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
  gap: 20rpx;
}

.role-item {
  padding: 20rpx 40rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
  font-size: 28rpx;
  transition: all 0.3s;
}

.role-item.active {
  background: #2979ff;
  color: #fff;
}

.form-content {
  margin-bottom: 40rpx;
}

.input-item {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  margin-bottom: 20rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  font-size: 28rpx;
}

.input-item:focus {
  border-color: #2979ff;
}

.submit-btn {
  background: #2979ff;
  color: #fff;
  border-radius: 45rpx;
  font-size: 32rpx;
  height: 88rpx;
  line-height: 88rpx;
}

.submit-btn:active {
  opacity: 0.8;
}

.picker {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 28rpx;
}

.placeholder {
  color: #999;
}

/* 添加禁用态样式 */
.picker[disabled] {
  background-color: #f5f5f5;
  color: #999;
}

/* 添加加载状态样式 */
.picker.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.password-input {
  position: relative;
  margin-bottom: 20rpx;
}

.password-icon {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 40rpx;
  height: 40rpx;
  padding: 10rpx;
}

.password-input .input-item {
  padding-right: 80rpx;
}
</style> 