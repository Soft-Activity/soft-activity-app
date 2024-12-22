// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加活动地点表 POST /activityLocation/add */
export async function addActivityLocation(
  body: API.ActivityLocation,
  options?: { [key: string]: any }
) {
  return request<boolean>("/activityLocation/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定活动地点表 DELETE /activityLocation/delete/${param0} */
export async function deleteActivityLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteActivityLocationParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/activityLocation/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定活动地点表信息 GET /activityLocation/info/${param0} */
export async function getActivityLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityLocationParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ActivityLocationVO>(`/activityLocation/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取活动地点表列表 GET /activityLocation/list */
export async function getActivityLocations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityLocationsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultActivityLocationVO>("/activityLocation/list", {
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

/** 修改指定活动地点表信息 PUT /activityLocation/update/${param0} */
export async function updateActivityLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateActivityLocationParams,
  body: API.ActivityLocation,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/activityLocation/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
