// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function getPermissionList(
  params: {
    // query
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/pc/api/permission/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
