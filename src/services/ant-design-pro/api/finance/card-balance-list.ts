// @ts-ignore
/* eslint-disable */
import { requestList } from '@/common/tools';
import { request } from 'umi';

export async function getFinanceCardBalanceList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/finance/card-balance/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFinanceCardBalanceStatistics(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/finance/card-balance/statistics`, {
    method: 'GET',
    data: params,
    ...(options || {}),
  });
}