// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询会员卡配置列表 GET /api/store/config/list */
export async function getStoreConfigList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/store/config/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑会员卡配置 PUT /api/store/config/{id} */
export async function editStoreConfig(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/api/store/config/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
