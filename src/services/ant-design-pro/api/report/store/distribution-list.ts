// @ts-ignore
/* eslint-disable */
import { requestList } from '@/common/tools';
// import { request } from 'umi';

export async function getStoreDistributionDeptPerformanceList (
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/report/store/distribution/dept-performance/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getStoreDistributionStaffPerformanceList (
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/report/store/distribution/staff-performance/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getStoreDistributionStaffSaleList (
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/report/store/distribution/staff-sale/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
