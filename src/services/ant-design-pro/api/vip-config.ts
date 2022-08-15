// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询会员卡配置列表 GET /api/vip/level/list */
export async function getVipConfigList(
  params: {
    // query
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/vip/level/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑会员卡配置 PUT /api/vip/level/{id} */
export async function editVipConfig(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/api/vip/level/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 新增会员卡配置 POST /api/vip/level/add */
export async function addVipConfig(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/vip/level/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 删除会员卡 DELETE /api/vip/level/{id} */
export async function removeVipConfig(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/vip/level/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
