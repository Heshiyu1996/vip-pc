// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询房态房价配置列表 GET /pc/api/room/arrangement/list */
export async function getRoomArrangeList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RoomArrangeList>('/pc/api/room/arrangement/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询房态房价配置详情 GET /pc/api/room/arrangement/detail/{id} */
export async function getRoomArrangeDetail(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomArrangeList>(`/pc/api/room/arrangement/detail/${params.id}`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除房态房价配置列表记录 DELETE /pc/api/room/arrangement/{id} */
export async function removeRoomArrangeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/room/arrangement/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}

/** 导出房态房价配置列表记录 GET /pc/api/room/arrangement/export */
export async function exportRoomArrangeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/room/arrangement/export`, {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}


/** 查询房态 GET /pc/api/room/arrangement/status */
export async function getRoomArrangeStatusList(
  params: {},
  options?: { [key: string]: any },
) {
  return requestList<API.RoomArrangeList>('/pc/api/room/arrangement/status', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}