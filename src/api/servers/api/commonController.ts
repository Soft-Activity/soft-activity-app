// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 上传文件 POST /common/upload/file */
export async function uploadFile(
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<string>("/common/upload/file", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 上传图片 POST /common/upload/image */
export async function uploadImage(
  body: {},
  image?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData();

  if (image) {
    formData.append("image", image);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === "object" && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ""));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<string>("/common/upload/image", {
    method: "POST",
    data: formData,
    requestType: "form",
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
