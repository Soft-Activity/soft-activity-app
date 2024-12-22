// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 此处后端没有提供注释 POST /menu/add */
export async function addMenu(
  body: API.Menu,
  options?: { [key: string]: any }
) {
  return request<boolean>("/menu/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /menu/assign */
export async function assignMenu(
  body: API.RoleMenuDTO,
  options?: { [key: string]: any }
) {
  return request<boolean>("/menu/assign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取菜单表列表 GET /menu/list */
export async function getMenuList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMenuListParams,
  options?: { [key: string]: any }
) {
  return request<API.MenuVO[]>("/menu/list", {
    method: "GET",
    params: {
      ...params,
      query: undefined,
      ...params["query"],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /menu/role/${param0} */
export async function getRoleMenus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleMenusParams,
  options?: { [key: string]: any }
) {
  const { roleId: param0, ...queryParams } = params;
  return request<API.MenuVO[]>(`/menu/role/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取我的路由信息 GET /menu/routes-self */
export async function getMyRoutes(options?: { [key: string]: any }) {
  return request<API.RouteVO>("/menu/routes-self", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /menu/update */
export async function updateMenu(
  body: API.Menu,
  options?: { [key: string]: any }
) {
  return request<boolean>("/menu/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
