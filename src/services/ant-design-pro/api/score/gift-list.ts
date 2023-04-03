// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 查询充值列表 GET /pc/api/point/item/list */
export async function getPointItemList(
  params: {
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RechargeList>('/pc/api/point/item/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新增兑换品 /pc/api/point/item/add */
export async function addPointItem(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/point/item/add`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 编辑兑换品 /pc/api/point/item/edit */
export async function editPointItem(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/point/item/edit/${params?.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 编辑兑换品余量 /pc/api/point/item/restAmount/edit */
export async function editPointItemRestAmount(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/point/item/restAmount/edit/${params?.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 删除兑换品 DELETE /pc/api/point/item/{id} */
export async function removePointItem(params?: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(`/pc/api/point/item/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
