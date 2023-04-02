// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询充值列表 GET /pc/api/point/order/list */
export async function getPointExchangeList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/point/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 确认兑换 PUT /pc/api/point/order/accept/{id} */
export async function acceptExchangeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/point/order/accept/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 拒绝兑换 PUT /pc/api/point/order/reject/{id} */
export async function rejectExchangeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/point/order/reject/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
