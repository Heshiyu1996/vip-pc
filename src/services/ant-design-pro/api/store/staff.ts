// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

export async function getStaffList(
  params: {
    // query
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RuleList>('/pc/api/store/staff/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

export async function editStaff(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/pc/api/store/staff/edit/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function addStaff(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/pc/api/store/staff/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function removeStaff(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/store/staff/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}

export async function exportStaff(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>('/pc/api/store/staff/export', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}

export async function searchStaff(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>('/pc/api/store/staff/userAndVip/search', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}
