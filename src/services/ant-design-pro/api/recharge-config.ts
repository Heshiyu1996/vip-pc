import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询充值配置 GET /pc/api/payment/rechargeConfig/list */
export async function getRechargeConfigList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return requestList<API.RechargeConfigList>('/pc/api/payment/rechargeConfig/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增充值配置 POST /pc/api/payment/rechargeConfig/add */
export async function addRechargeConfig(params?: Record<string, any>, options?: Record<string, any>) {
  return request<API.RechargeConfigListItem>('/pc/api/payment/rechargeConfig/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 编辑充值配置 PUT /pc/api/payment/rechargeConfig/{id} */
export async function editRechargeConfig(params?: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(`/pc/api/payment/rechargeConfig/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}


/** 删除充值配置 DELETE /pc/api/payment/rechargeConfig/{id} */
export async function removeRechargeConfig(params?: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(`/pc/api/payment/rechargeConfig/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
