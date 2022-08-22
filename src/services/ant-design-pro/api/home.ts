// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 查询首页看板数据 GET /api/home/data */
export async function getHomeData(
  options?: { [key: string]: any },
) {
  return request<any>('/api/home/data', {
    method: 'GET',
    params: {},
    ...(options || {}),
  })
}
