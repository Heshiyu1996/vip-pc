// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询消费列表 GET /api/payment/consumption/list */
export async function getConsumptionList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RuleList>('/api/payment/consumption/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 删除消费列表记录 DELETE /api/payment/consumption/{id} */
export async function removeConsumptionList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/payment/consumption/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}

/** 导出消费列表记录 DELETE /api/payment/consumption/export */
export async function exportConsumptionList(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/payment/consumption/export`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
