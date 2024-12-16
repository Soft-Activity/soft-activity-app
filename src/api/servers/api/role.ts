// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加角色 POST /role/add */
export async function addRole(
  body: API.Role,
  options?: { [key: string]: any }
) {
  return request<boolean>("/role/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定角色 DELETE /role/delete/${param0} */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/role/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定角色信息 GET /role/info/${param0} */
export async function getRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.RoleVO>(`/role/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取角色列表 GET /role/list */
export async function getRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRolesParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultRoleVO>("/role/list", {
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

/** 修改指定角色信息 PUT /role/update/${param0} */
export async function updateRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateRoleParams,
  body: API.Role,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/role/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
