// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 生成scheme */
export async function generateScheme (
  params: any,
  options?: { [key: string]: any },
) {
  return request<any>('/mp/api/wx/scheme/generate', {
    method: 'GET',
    params,
    ...(options || {}),
  })
}
