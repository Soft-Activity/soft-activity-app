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

/** 批量导入学生 POST /student/batch-import */
export async function batchImportStudents(
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

  return request<API.ImportTotalResult>("/student/batch-import", {
    method: "POST",
    data: formData,
    requestType: "form",
    ...(options || {}),
  });
}

/** 获取学生班级列表 GET /student/class-list */
export async function getClassList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getClassListParams,
  options?: { [key: string]: any }
) {
  return request<string[]>("/student/class-list", {
    method: "GET",
    params: {
      ...params,
      param: undefined,
      ...params["param"],
    },
    ...(options || {}),
  });
}

/** 获取学生学院列表 GET /student/college-list */
export async function getCollegeList(options?: { [key: string]: any }) {
  return request<string[]>("/student/college-list", {
    method: "GET",
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

/** 下载批量导入模板 GET /student/download-batch-import-template */
export async function downloadStudentBatchImportTemplate(options?: {
  [key: string]: any;
}) {
  return request<any>("/student/download-batch-import-template", {
    method: "GET",
    ...(options || {}),
  });
}

/** 下载学生信息 GET /student/download-excel */
export async function downloadStudentExcel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadStudentExcelParams,
  options?: { [key: string]: any }
) {
  return request<any>("/student/download-excel", {
    method: "GET",
    params: {
      ...params,
      param: undefined,
      ...params["param"],
    },
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
