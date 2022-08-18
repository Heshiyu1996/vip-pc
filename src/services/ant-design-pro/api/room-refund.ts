// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取退款申请记录 GET /api/room/refund/list */
export async function getRoomRefundList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RoomRefundList>('/api/room/refund/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同意退款 PUT /api/room/refund/confirm/{orderId} */
export async function confirmRoomRefund(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>(`/api/room/refund/confirm/${params.orderId}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 拒绝退款 PUT /api/room/refund/reject/{orderId} */
export async function rejectRoomRefund(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>(`/api/room/refund/reject/${params.orderId}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 导出退款记录 POST /api/room/refund/export */
export async function exportRoomRefund(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>('/api/room/refund/export', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
