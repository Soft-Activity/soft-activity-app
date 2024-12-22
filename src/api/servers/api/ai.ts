// @ts-ignore
/* eslint-disable */
import { request } from "@/api/request";

/** ai助手交流 POST /ai/query */
export async function ai(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.aiParams,
  options?: { [key: string]: any }
) {
  return request<string>("/ai/query", {
    method: "POST",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
