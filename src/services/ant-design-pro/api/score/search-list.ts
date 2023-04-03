// @ts-ignore
/* eslint-disable */
import { requestList } from '@/common/tools';

/** 查询积分列表 GET /pc/api/point/list */
export async function getPointList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/point/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
