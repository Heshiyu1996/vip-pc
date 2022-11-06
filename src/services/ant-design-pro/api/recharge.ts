// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 充值 /pc/api/payment/recharge/add */
export async function rechargeAmount(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/payment/recharge/add`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 核销 /pc/api/payment/consumption/add */
export async function consumptAmount(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/payment/consumption/add`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
