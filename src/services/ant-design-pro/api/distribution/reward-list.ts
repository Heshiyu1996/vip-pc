// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询营销奖励配置列表 GET /pc/api/distribution/reward/list */
export async function getRewardList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/distribution/reward/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增营销奖励配置 POST /pc/api/distribution/reward/add */
export async function addReward(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/distribution/reward/add`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 编辑营销奖励配置 PUT /pc/api/distribution/reward/edit/{id} */
export async function editReward(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/distribution/reward/edit/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 删除营销奖励配置 DELETE /pc/api/distribution/reward/{id} */
export async function removeReward(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/distribution/reward/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}


/** 设置营销奖励参数配置 PUT /pc/api/distribution/reward/setting */
export async function editRewardSetting(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/distribution/reward/setting`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
