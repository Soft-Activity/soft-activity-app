// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加 POST /activityAiReview/add */
export async function addActivityAiReview(
  body: API.ActivityAiReviewCreateParam,
  options?: { [key: string]: any }
) {
  return request<boolean>("/activityAiReview/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定 DELETE /activityAiReview/delete/${param0} */
export async function deleteActivityAiReview(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteActivityAiReviewParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/activityAiReview/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定信息 GET /activityAiReview/info/${param0} */
export async function getActivityAiReview(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityAiReviewParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ActivityAiReviewVO>(`/activityAiReview/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取列表 GET /activityAiReview/list */
export async function getActivityAiReviews(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getActivityAiReviewsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultActivityAiReviewVO>("/activityAiReview/list", {
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

/** 修改指定信息 PUT /activityAiReview/update/${param0} */
export async function updateActivityAiReview(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateActivityAiReviewParams,
  body: API.ActivityAiReviewCreateParam,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/activityAiReview/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
