import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询热门活动列表 GET /pc/api/store/activity/list */
export async function getActivityConfigList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return requestList<API.StoreConfigList>('/pc/api/store/activity/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增热门活动 POST /pc/api/store/activity/add */
export async function addActivityConfig(params?: Record<string, any>, options?: Record<string, any>) {
  return request<API.StoreConfigList>('/pc/api/store/activity/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 编辑热门活动 PUT /pc/api/store/activity/{id} */
export async function editActivityConfig(params?: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(`/pc/api/store/activity/edit/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}


/** 删除热门活动 DELETE /pc/api/store/activity/{id} */
export async function removeActivityConfig(params?: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(`/pc/api/store/activity/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
