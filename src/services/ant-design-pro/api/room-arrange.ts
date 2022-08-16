// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询排房列表 GET /api/room/arrange/list */
export async function getRoomArrangeList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RoomArrangeList>('/api/room/arrange/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询排房详情 GET /api/room/arrange/detail/{id} */
export async function getRoomArrangeDetail(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomArrangeList>(`/api/room/arrange/detail/${params.id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除排房列表记录 DELETE /api/room/arrange/{id} */
export async function removeRoomArrangeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/room/arrange/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}

/** 导出排房列表记录 DELETE /api/room/arrange/export */
export async function exportRoomArrangeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/room/arrange/export`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
