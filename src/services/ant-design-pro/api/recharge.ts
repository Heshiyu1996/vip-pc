// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 充值 /api/payment/recharge/add */
export async function rechargeAmount(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/payment/recharge/add`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
