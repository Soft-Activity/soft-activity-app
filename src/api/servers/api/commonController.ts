// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 上传文件 POST /common/upload/file */
export async function uploadFile(body: {}, options?: { [key: string]: any }) {
  return request<string>("/common/upload/file", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 上传图片 POST /common/upload/image */
export async function uploadImage(body: {}, options?: { [key: string]: any }) {
  return request<string>("/common/upload/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 查看文件 GET /common/view/file */
export async function viewFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.viewFileParams,
  options?: { [key: string]: any }
) {
  return request<string>("/common/view/file", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看图片 GET /common/view/image */
export async function viewImage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.viewImageParams,
  options?: { [key: string]: any }
) {
  return request<string>("/common/view/image", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
