// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 获取订房记录 GET /api/room/order/list */
export async function getRoomOrderList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RoomRefundList>('/api/room/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同意订房 PUT /api/room/order/accept/{id} */
export async function confirmRoomOrder(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>(`/api/room/order/accept/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 拒绝订房 PUT /api/room/order/reject/{id} */
export async function rejectRoomOrder(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>(`/api/room/order/reject/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 导出订房记录 POST /api/room/order/export */
export async function exportRoomOrder(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>('/api/room/order/export', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
