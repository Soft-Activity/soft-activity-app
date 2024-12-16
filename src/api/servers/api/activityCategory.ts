// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加活动分类表 POST /activityCategory/add */
export async function addActivityCategory(
  body: API.ActivityCategory,
  options?: { [key: string]: any }
) {
  return request<boolean>("/activityCategory/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定活动分类表 DELETE /activityCategory/delete/${param0} */
export async function deleteActivityCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteActivityCategoryParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/activityCategory/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定活动分类表信息 GET /activityCategory/info/${param0} */
export async function getActivityCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityCategoryParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ActivityCategoryVO>(`/activityCategory/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取活动分类表列表 GET /activityCategory/list */
export async function getActivityCategorys(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityCategorysParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultActivityCategoryVO>("/activityCategory/list", {
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

/** 修改指定活动分类表信息 PUT /activityCategory/update/${param0} */
export async function updateActivityCategory(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateActivityCategoryParams,
  body: API.ActivityCategory,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/activityCategory/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
