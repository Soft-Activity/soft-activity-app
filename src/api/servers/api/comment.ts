// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加评论 POST /comment/add */
export async function addComment(
  body: API.Comment,
  options?: { [key: string]: any }
) {
  return request<boolean>("/comment/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定 DELETE /comment/delete/${param0} */
export async function deleteComment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteCommentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/comment/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定信息 GET /comment/info/${param0} */
export async function getComment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.CommentVO>(`/comment/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取我是否评论过活动 GET /comment/is-comment/${param0} */
export async function isComment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.isCommentParams,
  options?: { [key: string]: any }
) {
  const { activityId: param0, ...queryParams } = params;
  return request<boolean>(`/comment/is-comment/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取列表 GET /comment/list */
export async function getComments(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCommentsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultCommentVO>("/comment/list", {
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

/** 修改指定信息 PUT /comment/update/${param0} */
export async function updateComment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateCommentParams,
  body: API.Comment,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/comment/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
