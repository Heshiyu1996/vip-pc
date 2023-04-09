// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

export async function getDeptList(
  params: {
    // query
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RuleList>('/pc/api/store/department/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function editDept(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/pc/api/store/department/edit/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function addDept(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/pc/api/store/department/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function removeDept(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/store/department/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
