// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加 POST /activity/add */
export async function addActivity(
  body: API.Activity,
  options?: { [key: string]: any }
) {
  return request<boolean>("/activity/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定 DELETE /activity/delete/${param0} */
export async function deleteActivity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteActivityParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/activity/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定信息 GET /activity/info/${param0} */
export async function getActivity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ActivityVO>(`/activity/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取列表 GET /activity/list */
export async function getActivitys(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivitysParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultActivityVO>("/activity/list", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // pageSize has a default value: 10
      pageSize: "10",
      ...params,
      param: undefined,
      ...params["param"],
    },
    ...(options || {}),
  });
}

/** 获取我的列表 GET /activity/list-self */
export async function getMyActivitys(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMyActivitysParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultActivityVO>("/activity/list-self", {
    method: "GET",
    params: {
      // current has a default value: 1
      current: "1",
      // pageSize has a default value: 10
      pageSize: "10",
      ...params,
      param: undefined,
      ...params["param"],
    },
    ...(options || {}),
  });
}

/** 统计最近一个月内的活动统计情况 GET /activity/statistics-recent-month */
export async function getActivityRecentMonthStatistics(options?: {
  [key: string]: any;
}) {
  return request<API.ActivityRecentMonthStatVO[]>(
    "/activity/statistics-recent-month",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 修改指定信息 PUT /activity/update/${param0} */
export async function updateActivity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateActivityParams,
  body: API.Activity,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/activity/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
