// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询充值列表 GET /pc/api/payment/recharge/list */
export async function getRechargeList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/payment/recharge/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除充值列表记录 DELETE /pc/api/payment/recharge/{id} */
export async function removeRechargeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/payment/recharge/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}

/** 导出充值列表记录 GET /pc/api/payment/recharge/export */
export async function exportRechargeList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/payment/recharge/export`, {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
}
