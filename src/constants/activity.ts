// 活动状态
export enum ActivityStatus {
    ENROLLED = 0,
    ONGOING = 1,
    COMPLETED = 2,
    CANCELLED = 3
}
// 我的活动类型
export enum MyActivityType {
    ENROLLED = 'enrolled',
    CHECKIN = 'checkin',
    PENDING = 'pending',
    HISTORY = 'history',
    CANCELLED = 'cancelled'
}
//我的活动类型查询条件map,未匹配的类型返回空对象
export const myActivityTypeQueryMap: Record<MyActivityType, API.ActivityQuery> = {
    [MyActivityType.ENROLLED]: {
        //@ts-ignore
        statuses: '0,1'
    },
    [MyActivityType.CHECKIN]: {
        //@ts-ignore
        statuses: '0,1',
        isCheckIn: true,
        isStudentCheckIn: false
    },
    [MyActivityType.PENDING]: {
        //@ts-ignore
        statuses: '2',
        isStudentComment: false
    },
    [MyActivityType.HISTORY]: {
        //@ts-ignore
        statuses: '2'
    },
    [MyActivityType.CANCELLED]: {
        //@ts-ignore
        statuses: '3'
    }
}