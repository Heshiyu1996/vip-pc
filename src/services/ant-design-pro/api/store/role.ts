// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

export async function getRoleList(
  params: {
    // query
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RuleList>('/pc/api/store/role/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function editRole(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/pc/api/store/role/edit/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function addRole(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/pc/api/store/role/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function removeRole(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/store/role/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
