// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询积分规则配置列表 GET /pc/api/point/rule/list */
export async function getPointRuleList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.StoreConfigList>('/pc/api/point/rule/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑积分规则配置 PUT /pc/api/point/rule/{id} */
export async function editPointRule(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/pc/api/point/rule/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}
