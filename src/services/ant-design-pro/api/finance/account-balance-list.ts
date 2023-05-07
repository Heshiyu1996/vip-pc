// @ts-ignore
/* eslint-disable */
import { requestList } from '@/common/tools';
import { request } from 'umi';

export async function getFinanceAccountBalanceList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/finance/account-balance/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getFinanceAccountBalanceStatistics(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/finance/account-balance/statistics`, {
    method: 'GET',
    data: params,
    ...(options || {}),
  });
}