// @ts-ignore
/* eslint-disable */
import { requestList } from '@/common/tools';

/** 查询积分兑换记录列表 GET /pc/api/point/order/list */
export async function getPointOrderList(
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
