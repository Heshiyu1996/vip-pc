// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询店铺配置列表 GET /pc/api/store/config/list */
export async function getStoreConfigList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.StoreConfigList>('/pc/api/store/config/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑店铺配置 PUT /pc/api/store/config/{id} */
export async function editStoreConfig(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/pc/api/store/config/edit/${params.key}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
