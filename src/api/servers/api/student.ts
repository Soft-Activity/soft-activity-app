// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** 添加学生 POST /student/add */
export async function addStudent(
  body: API.Student,
  options?: { [key: string]: any }
) {
  return request<boolean>("/student/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除指定学生 DELETE /student/delete/${param0} */
export async function deleteStudent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteStudentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/student/delete/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取指定学生信息 GET /student/info/${param0} */
export async function getStudent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudentParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<API.StudentVO>(`/student/info/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取学生列表 GET /student/list */
export async function getStudents(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudentsParams,
  options?: { [key: string]: any }
) {
  return request<API.ListResultStudentVO>("/student/list", {
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

/** 修改指定学生信息 PUT /student/update/${param0} */
export async function updateStudent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateStudentParams,
  body: API.Student,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<boolean>(`/student/update/${param0}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}
