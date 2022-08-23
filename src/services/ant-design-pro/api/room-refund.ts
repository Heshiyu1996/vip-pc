// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 获取退款申请记录 GET /pc/api/room/refund/list */
export async function getRoomRefundList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RoomRefundList>('/pc/api/room/refund/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 同意退款 PUT /pc/api/room/refund/accept/{id} */
export async function acceptRoomRefund(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>(`/pc/api/room/refund/accept/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 拒绝退款 PUT /pc/api/room/refund/reject/{id} */
export async function rejectRoomRefund(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>(`/pc/api/room/refund/reject/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 导出退款记录 GET /pc/api/room/refund/export */
export async function exportRoomRefund(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RoomRefundListItem>('/pc/api/room/refund/export', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}
