
import { request } from 'umi';

export async function addPointRecharge(params?: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(`/pc/api/point/income/add`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

export async function addPointConsumption(params?: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(`/pc/api/point/consumption/add`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
