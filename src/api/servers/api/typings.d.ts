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
  };

  type ActivityCategoryStatVO = {
    /** 分类id */
    categoryId?: number;
    /** 分类名称 */
    name?: string;
    /** 描述 */
    description?: string;
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

  type getActivityParams = {
    id: number;
  };

  type getActivitysParams = {
    current?: number;
    pageSize?: number;
    param: ActivityQuery;
  };

  type getClassListParams = {
    college: string;
  };

  type getCommentParams = {
    id: number;
  };

  type getCommentsParams = {
    current?: number;
    pageSize?: number;
    param: CommentQuery;
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

  type registerActivityParams = {
    activityId: number;
  };

  type Registration = {
    /** 报名id */
    registrationId?: number;
    /** 学生学号 */
    studentId?: string;
    /** 活动id */
    activityId?: number;
    /** 报名状态 0 已报名 1 已取消 */
    status?: number;
    /** 报名时间 */
    createTime?: string;
  };

  type RegistrationQuery = {
    /** 报名id */
    registrationId?: number;
    /** 学生学号 */
    studentId?: string;
    /** 活动id */
    activityId?: number;
    /** 报名状态 0 已报名 1 已取消 */
    status?: number;
    /** 报名时间 */
    createTime?: string;
  };

  type RegistrationVO = {
    /** 报名id */
    registrationId?: number;
    /** 学生学号 */
    studentId?: string;
    /** 活动id */
    activityId?: number;
    /** 报名状态 0 已报名 1 已取消 */
    status?: number;
    /** 报名时间 */
    createTime?: string;
  };

  type Role = {
    /** 用户id */
    roleId?: number;
    /** 角色中文名称 */
    cname?: string;
    /** 角色英文名称 */
    ename?: string;
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
    userId: string;
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
    roles?: Role[];
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
