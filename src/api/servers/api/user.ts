// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加用户 POST /user/add */
export async function addUser(
  body: API.UserCreateParm,
  options?: { [key: string]: any }
) {
  return request<boolean>("/user/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 微信用户通过账号密码绑定账号 POST /user/bind-wx-by-password */
export async function bindWxByPassword(
  body: API.UserWXPasswordBindDTO,
  options?: { [key: string]: any }
) {
  return request<API.UserAuthVO>("/user/bind-wx-by-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 微信用户通过学生信息绑定账号 POST /user/bind-wx-by-student-info */
export async function bindWxByStudentInfo(
  body: API.UserWXStudentBindDTO,
  options?: { [key: string]: any }
) {
  return request<API.UserAuthVO>("/user/bind-wx-by-student-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /user/current */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.UserVO>("/user/current", {
    method: "GET",
    ...(options || {}),
  });
}

/** 删除指定用户 DELETE /user/delete/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/user/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定用户信息 GET /user/info/${param0} */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserVO>(`/user/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取用户列表 GET /user/list */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultUserVO>("/user/list", {
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

/** 用户账号密码登录 POST /user/login-by-password */
export async function loginByPassword(
  body: API.UserPasswordLoginDTO,
  options?: { [key: string]: any }
) {
  return request<API.UserAuthVO>("/user/login-by-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户微信登录 POST /user/login-by-wx */
export async function loginByWx(
  body: API.UserWXLoginDTO,
  options?: { [key: string]: any }
) {
  return request<API.UserAuthVO>("/user/login-by-wx", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改指定用户信息 PUT /user/update/${param0} */
export async function updateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserParams,
  body: API.UserCreateParm,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/user/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 用户上传头像 POST /user/upload-avatar */
export async function uploadAvatar(body: {}, options?: { [key: string]: any }) {
  return request<string>("/user/upload-avatar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户查看头像 GET /user/view-avatar/${param0} */
export async function viewAvatar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.viewAvatarParams,
  options?: { [key: string]: any }
) {
  const { filename: param0, ...queryParams } = params;
  return request<string>(`/user/view-avatar/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}
