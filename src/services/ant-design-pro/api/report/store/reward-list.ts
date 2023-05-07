// @ts-ignore
/* eslint-disable */
import { requestList } from '@/common/tools';
// import { request } from 'umi';

export async function getReportStoreRewardDeptList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/report/store/reward/dept/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getReportStoreRewardStaffList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/report/store/reward/staff/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
