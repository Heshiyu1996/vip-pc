// @ts-ignore
/* eslint-disable */
import { requestList } from '@/common/tools';
// import { request } from 'umi';

export async function getReportStoreMerchantList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/report/store/merchant/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
