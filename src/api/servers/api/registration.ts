// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加报名表 POST /registration/add */
export async function addRegistration(
  body: API.Registration,
  options?: { [key: string]: any }
) {
  return request<boolean>("/registration/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定报名表 DELETE /registration/delete/${param0} */
export async function deleteRegistration(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRegistrationParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/registration/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 取消报名 POST /registration/cancel */
export async function cancelRegistration(
  body: API.Registration,
  options?: { [key: string]: any }
) {
  return request<boolean>("/registration/cancel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取指定报名表信息 GET /registration/info/${param0} */
export async function getRegistration(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRegistrationParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RegistrationVO>(`/registration/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取报名表列表 GET /registration/list */
export async function getRegistrations(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRegistrationsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultRegistrationVO>("/registration/list", {
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

/** 修改指定报名表信息 PUT /registration/update/${param0} */
export async function updateRegistration(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateRegistrationParams,
  body: API.Registration,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/registration/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
