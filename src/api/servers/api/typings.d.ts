declare namespace API {
  type Account = {
    /** 学工号 */
    userId?: string;
    /** 密码 */
    password?: string;
    /** 微信openid */
    openId?: string;
  };

  type AccountQuery = {
    /** 学工号 */
    userId?: string;
    /** 密码 */
    password?: string;
    /** 微信openid */
    openId?: string;
  };

  type AccountVO = {
    /** 学工号 */
    userId?: string;
    /** 密码 */
    password?: string;
    /** 微信openid */
    openId?: string;
  };

  type Activity = {
    /** 活动id */
    activityId?: number;
    /** 活动名称 */
    name?: string;
    /** 组织者学号id */
    organizerId?: string;
    /** 分类id */
    categoryId?: number;
    /** 活动地点 */
    location?: string;
    /** 描述 */
    description?: string;
    /** 是否取消 0未开始 1进行中 2 已结束 3 已取消 */
    status?: number;
    /** 活动开始时间 */
    startTime?: string;
    /** 活动结束时间 */
    endTime?: string;
    /** 最大容量 */
    maxCapacity?: number;
    /** 当前容量 */
    capacity?: number;
    /** 创建时间 */
    createTime?: string;
    /** 是否需要打卡 0否 1是 */
    isCheckIn?: boolean;
    /** 打卡地点ID */
    checkInLocationId?: number;
    /** 打卡范围(单位:米) */
    checkInRadius?: number;
    /** 打卡开始时间 */
    checkInStartTime?: string;
    /** 打卡结束时间 */
    checkInEndTime?: string;
  };

  type ActivityAiReviewCreateParam = {
    /** 活动id */
    activityId?: number;
    /** ai分析 */
    aiAnalysis?: string;
    /** rank > 3的人数 */
    goodNum?: number;
    /** rank = 3 */
    mediumNum?: number;
    /** rank < 3 的人数 */
    poorNum?: number;
    /** 平均分 */
    averageScore?: number;
  };

  type ActivityAiReviewQuery = {
    /** 活动id */
    activityId?: number;
    /** ai分析 */
    aiAnalysis?: string;
    /** rank > 3的人数 */
    goodNum?: number;
    /** rank = 3 */
    mediumNum?: number;
    /** rank < 3 的人数 */
    poorNum?: number;
    /** 平均分 */
    averageScore?: number;
  };

  type ActivityAiReviewVO = {
    /** 活动id */
    activityId?: number;
    /** ai分析 */
    aiAnalysis?: string;
    /** rank > 3的人数 */
    goodNum?: number;
    /** rank = 3 */
    mediumNum?: number;
    /** rank < 3 的人数 */
    poorNum?: number;
    /** 平均分 */
    averageScore?: number;
  };

  type ActivityCategory = {
    /** 分类id */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 描述 */
    description?: string;
  };

  type ActivityCategoryQuery = {
    /** 分类id */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 描述 */
    description?: string;
  };

  type ActivityCategoryStatQuery = {
    /** 分类id */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 描述 */
    description?: string;
    /** 活动状态 */
    activityStatus?: number;
    /** 活动开始时间 */
    activityStartTime?: string;
    /** 活动结束时间 */
    activityEndTime?: string;
  };

  type ActivityCategoryStatVO = {
    /** 分类id */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 描述 */
    description?: string;
    activityCount?: number;
    /** 总活动数 */
    totalActivities?: number;
    /** 未开始活动数 */
    notStarted?: number;
    /** 进行中活动数 */
    ongoing?: number;
    /** 已结束活动数 */
    ended?: number;
    /** 已取消活动数 */
    cancelled?: number;
    /** 总参与人数 */
    totalParticipants?: number;
    /** 总容量 */
    totalCapacity?: number;
  };

  type ActivityCategoryVO = {
    /** 分类id */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 描述 */
    description?: string;
    activityCount?: number;
  };

  type ActivityCheckInParam = {
    /** 活动id */
    activityId: number;
    /** 打卡经度 */
    gcj02Longitude: number;
    /** 打卡纬度 */
    gcj02Latitude: number;
  };

  type ActivityLocation = {
    /** 主键ID */
    locationId?: number;
    /** 地点名称 */
    name?: string;
    /** 纬度 */
    lat?: number;
    /** 经度 */
    lng?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type ActivityLocationQuery = {
    /** 主键ID */
    locationId?: number;
    /** 地点名称 */
    name?: string;
    /** 纬度 */
    lat?: number;
    /** 经度 */
    lng?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type ActivityLocationVO = {
    /** 主键ID */
    locationId?: number;
    /** 地点名称 */
    name?: string;
    /** 纬度 */
    lat?: number;
    /** 经度 */
    lng?: number;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
  };

  type ActivityQuery = {
    /** 活动id */
    activityId?: number;
    /** 活动名称 */
    name?: string;
    /** 组织者学号id */
    organizerId?: string;
    /** 分类id */
    categoryId?: number;
    /** 活动地点 */
    location?: string;
    /** 描述 */
    description?: string;
    /** 是否取消 0未开始 1进行中 2 已结束 3 已取消 */
    status?: number;
    /** 活动开始时间 */
    startTime?: string;
    /** 活动结束时间 */
    endTime?: string;
    /** 最大容量 */
    maxCapacity?: number;
    /** 当前容量 */
    capacity?: number;
    /** 创建时间 */
    createTime?: string;
    /** 是否需要打卡 0否 1是 */
    isCheckIn?: boolean;
    /** 打卡地点ID */
    checkInLocationId?: number;
    /** 打卡范围(单位:米) */
    checkInRadius?: number;
    /** 打卡开始时间 */
    checkInStartTime?: string;
    /** 打卡结束时间 */
    checkInEndTime?: string;
    /** 状态 */
    statuses?: number[];
    /** 分类名称 */
    categoryName?: string;
    /** 组织者姓名 */
    organizerName?: string;
    /** 参与学生id */
    studentId?: string;
    /** 参与学生是否评论 */
    isStudentComment?: boolean;
    /** 参与学生是否打卡 */
    isStudentCheckIn?: boolean;
    sorter?: Sorter;
  };

  type ActivityRecentMonthStatVO = {
    /** 日期 */
    date?: string;
    /** 活动数量 */
    activityCount?: number;
    /** 参与人数 */
    totalParticipants?: number;
  };

  type ActivityVO = {
    /** 活动id */
    activityId?: number;
    /** 活动名称 */
    name?: string;
    /** 组织者学号id */
    organizerId?: string;
    /** 分类id */
    categoryId?: number;
    /** 活动地点 */
    location?: string;
    /** 描述 */
    description?: string;
    /** 是否取消 0未开始 1进行中 2 已结束 3 已取消 */
    status?: number;
    /** 活动开始时间 */
    startTime?: string;
    /** 活动结束时间 */
    endTime?: string;
    /** 最大容量 */
    maxCapacity?: number;
    /** 当前容量 */
    capacity?: number;
    /** 创建时间 */
    createTime?: string;
    /** 是否需要打卡 0否 1是 */
    isCheckIn?: boolean;
    /** 打卡地点ID */
    checkInLocationId?: number;
    /** 打卡范围(单位:米) */
    checkInRadius?: number;
    /** 打卡开始时间 */
    checkInStartTime?: string;
    /** 打卡结束时间 */
    checkInEndTime?: string;
    /** 分类名称 */
    categoryName?: string;
    /** 组织者姓名 */
    organizerName?: string;
    /** 平均评分 */
    avgRating?: number;
    /** 最近的评论 */
    recentComments?: CommentVO[];
    /** 评论总数 */
    commentCount?: number;
    /** 已打卡人数 */
    checkInCount?: number;
    /** 打卡地点名称 */
    checkInLocationName?: string;
  };

  type aiParams = {
    userInput: string;
  };

  type cancelRegisterParams = {
    activityId: number;
  };

  type Comment = {
    /** 评论id */
    commentId?: number;
    /** 报名id */
    activityId?: number;
    /** 学生用户id */
    studentId?: string;
    /** 评分0-5 */
    rating?: number;
    /** 内容 */
    content?: string;
    /** 评论时间 */
    createTime?: string;
  };

  type CommentQuery = {
    /** 评论id */
    commentId?: number;
    /** 报名id */
    activityId?: number;
    /** 学生用户id */
    studentId?: string;
    /** 评分0-5 */
    rating?: number;
    /** 内容 */
    content?: string;
    /** 评论时间 */
    createTime?: string;
  };

  type CommentVO = {
    /** 评论id */
    commentId?: number;
    /** 报名id */
    activityId?: number;
    /** 学生用户id */
    studentId?: string;
    /** 评分0-5 */
    rating?: number;
    /** 内容 */
    content?: string;
    /** 评论时间 */
    createTime?: string;
    /** 活动名称 */
    activityName?: string;
    student?: UserVO;
    /** 学院 */
    collegeName?: string;
    /** 学号 */
    schoolId?: string;
  };

  type deleteAccountParams = {
    id: string;
  };

  type deleteActivityAiReviewParams = {
    id: number;
  };

  type deleteActivityCategoryParams = {
    id: number;
  };

  type deleteActivityLocationParams = {
    id: number;
  };

  type deleteActivityParams = {
    id: number;
  };

  type deleteCommentParams = {
    id: number;
  };

  type deleteRegistrationParams = {
    id: number;
  };

  type deleteRoleParams = {
    id: number;
  };

  type deleteStudentParams = {
    id: string;
  };

  type deleteUserParams = {
    id: string;
  };

  type downloadStudentExcelParams = {
    param: StudentQuery;
  };

  type getAccountParams = {
    id: string;
  };

  type getAccountsParams = {
    current?: number;
    pageSize?: number;
    param: AccountQuery;
  };

  type getActivityAiReviewParams = {
    id: number;
  };

  type getActivityAiReviewsParams = {
    current?: number;
    pageSize?: number;
    param: ActivityAiReviewQuery;
  };

  type getActivityCategoryParams = {
    id: number;
  };

  type getActivityCategorysParams = {
    current?: number;
    pageSize?: number;
    param: ActivityCategoryQuery;
  };

  type getActivityCategoryStatisticsParams = {
    param: ActivityCategoryStatQuery;
  };

  type getActivityLocationParams = {
    id: number;
  };

  type getActivityLocationsParams = {
    current?: number;
    pageSize?: number;
    param: ActivityLocationQuery;
  };

  type getActivityParams = {
    id: number;
  };

  type getActivitysParams = {
    current?: number;
    pageSize?: number;
    param: ActivityQuery;
  };

  type getClassListParams = {
    param: StudentQuery;
  };

  type getCommentParams = {
    id: number;
  };

  type getCommentsParams = {
    current?: number;
    pageSize?: number;
    param: CommentQuery;
  };

  type getMenuListParams = {
    query: MenuQuery;
  };

  type getMyActivitysParams = {
    current?: number;
    pageSize?: number;
    param: ActivityQuery;
  };

  type getRegistrationParams = {
    id: number;
  };

  type getRegistrationsParams = {
    current?: number;
    pageSize?: number;
    param: RegistrationQuery;
  };

  type getRoleMenusParams = {
    roleId: number;
  };

  type getRoleParams = {
    id: number;
  };

  type getRolesParams = {
    current?: number;
    pageSize?: number;
    param: RoleQuery;
  };

  type getStudentParams = {
    id: string;
  };

  type getStudentsParams = {
    current?: number;
    pageSize?: number;
    param: StudentQuery;
  };

  type getUserParams = {
    id: string;
  };

  type getUsersParams = {
    current?: number;
    pageSize?: number;
    param: UserQuery;
  };

  type ImportRowResult = {
    success?: boolean;
    message?: string;
  };

  type ImportTotalResult = {
    success?: ImportRowResult[];
    failed?: ImportRowResult[];
  };

  type isCheckinParams = {
    activityId: number;
  };

  type isCommentParams = {
    activityId: number;
  };

  type isRegisterParams = {
    activityId: number;
  };

  type ListResultAccountVO = {
    list?: AccountVO[];
    total?: number;
  };

  type ListResultActivityAiReviewVO = {
    list?: ActivityAiReviewVO[];
    total?: number;
  };

  type ListResultActivityCategoryVO = {
    list?: ActivityCategoryVO[];
    total?: number;
  };

  type ListResultActivityLocationVO = {
    list?: ActivityLocationVO[];
    total?: number;
  };

  type ListResultActivityVO = {
    list?: ActivityVO[];
    total?: number;
  };

  type ListResultCommentVO = {
    list?: CommentVO[];
    total?: number;
  };

  type ListResultRegistrationVO = {
    list?: RegistrationVO[];
    total?: number;
  };

  type ListResultRoleVO = {
    list?: RoleVO[];
    total?: number;
  };

  type ListResultStudentVO = {
    list?: StudentVO[];
    total?: number;
  };

  type ListResultUserVO = {
    list?: UserVO[];
    total?: number;
  };

  type Menu = {
    /** 菜单ID */
    menuId?: number;
    /** 父菜单ID */
    parentId?: number;
    /** 路由名称 */
    name?: string;
    /** 路由路径 */
    path?: string;
    /** 组件路径 */
    component?: string;
    /** 重定向地址 */
    redirect?: string;
    /** 菜单标题 */
    title?: string;
    /** 图标 */
    icon?: string;
    /** 排序 */
    sortOrder?: number;
    /** 是否隐藏 */
    hidden?: boolean;
    /** 总是显示 */
    alwaysShow?: boolean;
    /** 是否缓存 */
    keepAlive?: boolean;
    /** 是否显示面包屑 */
    breadcrumb?: boolean;
    /** 激活菜单 */
    activeMenu?: string;
    /** 不显示标签页 */
    noTagsView?: boolean;
    /** 是否可跳转 */
    canTo?: boolean;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 0禁用 ，1启用 */
    status?: number;
  };

  type MenuQuery = {
    /** 菜单ID */
    menuId?: number;
    /** 父菜单ID */
    parentId?: number;
    /** 路由名称 */
    name?: string;
    /** 路由路径 */
    path?: string;
    /** 组件路径 */
    component?: string;
    /** 重定向地址 */
    redirect?: string;
    /** 菜单标题 */
    title?: string;
    /** 图标 */
    icon?: string;
    /** 排序 */
    sortOrder?: number;
    /** 是否隐藏 */
    hidden?: boolean;
    /** 总是显示 */
    alwaysShow?: boolean;
    /** 是否缓存 */
    keepAlive?: boolean;
    /** 是否显示面包屑 */
    breadcrumb?: boolean;
    /** 激活菜单 */
    activeMenu?: string;
    /** 不显示标签页 */
    noTagsView?: boolean;
    /** 是否可跳转 */
    canTo?: boolean;
    /** 创建时间 */
    createTime?: string;
    /** 更新时间 */
    updateTime?: string;
    /** 0禁用 ，1启用 */
    status?: number;
  };

  type MenuVO = {
    menuId?: number;
    parentId?: number;
    name?: string;
    path?: string;
    component?: string;
    redirect?: string;
    meta?: MetaVO;
    sortOrder?: number;
    status?: number;
  };

  type MetaVO = {
    title?: string;
    icon?: string;
    hidden?: boolean;
    alwaysShow?: boolean;
    noCache?: boolean;
    breadcrumb?: boolean;
    activeMenu?: string;
    noTagsView?: boolean;
    canTo?: boolean;
    permission?: string[];
  };

  type registerActivityParams = {
    activityId: number;
  };

  type Registration = {
    /** 报名id */
    registrationId?: number;
    /** 学生用户id */
    studentId?: string;
    /** 活动id */
    activityId?: number;
    /** 报名状态 0 已报名 1 已取消 */
    status?: number;
    /** 报名时间 */
    createTime?: string;
    /** 是否已打卡 0未打卡 1已打卡 */
    isCheckIn?: boolean;
    /** 打卡时间 */
    checkInTime?: string;
    /** 打卡纬度 */
    checkInLat?: number;
    /** 打卡经度 */
    checkInLng?: number;
  };

  type RegistrationQuery = {
    /** 报名id */
    registrationId?: number;
    /** 学生用户id */
    studentId?: string;
    /** 活动id */
    activityId?: number;
    /** 报名状态 0 已报名 1 已取消 */
    status?: number;
    /** 报名时间 */
    createTime?: string;
    /** 是否已打卡 0未打卡 1已打卡 */
    isCheckIn?: boolean;
    /** 打卡时间 */
    checkInTime?: string;
    /** 打卡纬度 */
    checkInLat?: number;
    /** 打卡经度 */
    checkInLng?: number;
  };

  type RegistrationVO = {
    /** 报名id */
    registrationId?: number;
    /** 学生用户id */
    studentId?: string;
    /** 活动id */
    activityId?: number;
    /** 报名状态 0 已报名 1 已取消 */
    status?: number;
    /** 报名时间 */
    createTime?: string;
    /** 是否已打卡 0未打卡 1已打卡 */
    isCheckIn?: boolean;
    /** 打卡时间 */
    checkInTime?: string;
    /** 打卡纬度 */
    checkInLat?: number;
    /** 打卡经度 */
    checkInLng?: number;
    /** 用户名 */
    userName?: string;
    /** 学院名称 */
    collegeName?: string;
    /** 学号 */
    schoolId?: string;
  };

  type Role = {
    /** 用户id */
    roleId?: number;
    /** 角色中文名称 */
    cname?: string;
    /** 角色英文名称 */
    ename?: string;
  };

  type RoleMenuDTO = {
    roleId?: number;
    menuIds?: number[];
  };

  type RoleQuery = {
    /** 用户id */
    roleId?: number;
    /** 角色中文名称 */
    cname?: string;
    /** 角色英文名称 */
    ename?: string;
  };

  type RoleVO = {
    /** 用户id */
    roleId?: number;
    /** 角色中文名称 */
    cname?: string;
    /** 角色英文名称 */
    ename?: string;
  };

  type RouteVO = {
    routes?: MenuVO[];
    permissions?: string[];
  };

  type Sorter = {
    /** 排序字段 */
    column?: string;
    /** 排序方式 asc/desc */
    mode?: string;
    /** 是否自定义字段 */
    customField?: boolean;
  };

  type Student = {
    /** 学生学号 */
    studentId?: string;
    /** 姓名 */
    name?: string;
    /** 学院 */
    college?: string;
    /** 班级 */
    classes?: string;
    /** 年级 */
    grade?: number;
    /** 类型:本科生/研究生/博士生 */
    type?: string;
    /** 性别 男/女 */
    gender?: string;
    /** 是否已认证0为认证，1已认证 */
    isVerified?: boolean;
  };

  type StudentQuery = {
    /** 学生学号 */
    studentId?: string;
    /** 姓名 */
    name?: string;
    /** 学院 */
    college?: string;
    /** 班级 */
    classes?: string;
    /** 年级 */
    grade?: number;
    /** 类型:本科生/研究生/博士生 */
    type?: string;
    /** 性别 男/女 */
    gender?: string;
    /** 是否已认证0为认证，1已认证 */
    isVerified?: boolean;
  };

  type StudentVO = {
    /** 学生学号 */
    studentId?: string;
    /** 姓名 */
    name?: string;
    /** 学院 */
    college?: string;
    /** 班级 */
    classes?: string;
    /** 年级 */
    grade?: number;
    /** 类型:本科生/研究生/博士生 */
    type?: string;
    /** 性别 男/女 */
    gender?: string;
    /** 是否已认证0为认证，1已认证 */
    isVerified?: boolean;
  };

  type unbindWXByUserIdParams = {
    userId: string;
  };

  type updateAccountParams = {
    id: string;
  };

  type updateActivityAiReviewParams = {
    id: number;
  };

  type updateActivityCategoryParams = {
    id: number;
  };

  type updateActivityLocationParams = {
    id: number;
  };

  type updateActivityParams = {
    id: number;
  };

  type updateCommentParams = {
    id: number;
  };

  type updateRegistrationParams = {
    id: number;
  };

  type updateRoleParams = {
    id: number;
  };

  type updateStudentParams = {
    id: string;
  };

  type updateUserParams = {
    id: string;
  };

  type UserAuthVO = {
    token?: string;
  };

  type UserChangePasswordDTO = {
    /** 旧密码 */
    oldPassword: string;
    /** 新密码 */
    newPassword: string;
  };

  type UserCreateParm = {
    /** 学号/学工号 */
    userId?: string;
    /** 姓名 */
    name?: string;
    /** 学号 */
    studentId?: string;
    /** 学院/部门 */
    college?: string;
    /** 图片路径 */
    avatar?: string;
    /** 性别 */
    gender?: string;
    /** 角色ids */
    roleIds?: number[];
  };

  type UserPasswordLoginDTO = {
    /** 学号 */
    studentId: string;
    /** 密码 */
    password: string;
  };

  type UserQuery = {
    /** 学号/学工号 */
    userId?: string;
    /** 姓名 */
    name?: string;
    /** 学号 */
    studentId?: string;
    /** 学院/部门 */
    college?: string;
    /** 图片路径 */
    avatar?: string;
    /** 性别 */
    gender?: string;
    /** 角色id */
    roleId?: number;
  };

  type UserResetPasswordDTO = {
    /** 用户id */
    userId: string;
    /** 新密码 */
    newPassword: string;
  };

  type UserVO = {
    /** 学号/学工号 */
    userId?: string;
    /** 姓名 */
    name?: string;
    /** 学号 */
    studentId?: string;
    /** 学院/部门 */
    college?: string;
    /** 图片路径 */
    avatar?: string;
    /** 性别 */
    gender?: string;
    /** 角色列表 */
    roles?: Role[];
    /** 是否绑定微信 */
    bindWX?: boolean;
    /** 是否设置密码 */
    setPassword?: boolean;
  };

  type UserWXLoginDTO = {
    code?: string;
  };

  type UserWXPasswordBindDTO = {
    /** 微信登录凭证 */
    code: string;
    /** 学号/学工号 */
    studentId: string;
    /** 密码 */
    password: string;
  };

  type UserWXStudentBindDTO = {
    /** 微信登录凭证 */
    code: string;
    /** 学生学号 */
    studentId: string;
    /** 姓名 */
    name: string;
    /** 学院 */
    college: string;
    /** 班级 */
    classes: string;
    /** 年级 */
    grade: number;
    /** 类型:本科生/研究生/博士生 */
    type: string;
    /** 性别 男/女 */
    gender: string;
    /** 是否已认证0为认证，1已认证 */
    isVerified?: boolean;
  };

  type viewAvatarParams = {
    filename: string;
  };

  type viewFileParams = {
    filename: string;
  };

  type viewImageParams = {
    filename: string;
  };
}
