// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询排房列表 GET /api/room/arrangement/list */
export async function getRoomArrangeList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RoomArrangeList>('/api/room/arrangement/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询排房详情 GET /api/room/arrangement/detail/{id} */
export async function getRoomArrangeDetail(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomArrangeList>(`/api/room/arrangement/detail/${params.id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除排房列表记录 DELETE /api/room/arrangement/{id} */
export async function removeRoomArrangeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/room/arrangement/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}

/** 导出排房列表记录 DELETE /api/room/arrangement/export */
export async function exportRoomArrangeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/room/arrangement/export`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
