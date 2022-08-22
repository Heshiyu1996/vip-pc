// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询客房配置列表 GET /api/room/config/list */
export async function getRoomConfigList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RoomConfigList>('/api/room/config/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑客房配置 PUT /api/room/config/edit/{id} */
export async function editRoomConfig(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomConfigListItem>(`/api/room/config/edit/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 批量编辑客房配置价格 PUT /api/room/config/price/edit */
export async function editRoomConfigPrice(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomConfigListItem>(`/api/room/config/price/edit`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 批量编辑客房配置价格 PUT /api/room/config/amount/edit */
export async function editRoomConfigCount(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomConfigListItem>(`/api/room/config/amount/edit`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 新增客房配置 POST /api/room/config/add */
export async function addRoomConfig(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomConfigListItem>('/api/room/config/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 删除客房配置 DELETE /api/room/config/{id} */
export async function removeRoomConfig(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/room/config/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
