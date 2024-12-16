// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加账号表 POST /account/add */
export async function addAccount(
  body: API.Account,
  options?: { [key: string]: any }
) {
  return request<boolean>("/account/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定账号表 DELETE /account/delete/${param0} */
export async function deleteAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAccountParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/account/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定账号表信息 GET /account/info/${param0} */
export async function getAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AccountVO>(`/account/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取账号表列表 GET /account/list */
export async function getAccounts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultAccountVO>("/account/list", {
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

/** 修改指定账号表信息 PUT /account/update/${param0} */
export async function updateAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateAccountParams,
  body: API.Account,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/account/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
