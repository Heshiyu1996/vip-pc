// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { requestList } from '@/common/tools';

/** 获取当前登录的用户信息 GET /pc/api/user/info */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/pc/api/user/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /pc/api/user/login/{username} */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/pc/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    // // 跳过统一错误统一处理
    // skipErrorHandler: true,
    ...(options || {}),
  });
}
/** 退出登录接口 POST /pc/api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/pc/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /pc/api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/pc/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询会员卡列表 GET /pc/api/vip/info/list */
export async function getVipList(
  params: {
    // query
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return requestList<API.RuleList>('/pc/api/vip/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 编辑会员卡 PUT /pc/api/vip/info/{id} */
export async function editVip(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/pc/api/vip/info/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 新增会员卡 POST /pc/api/vip/info/add */
export async function addVip(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/pc/api/vip/info/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 删除会员卡 DELETE /pc/api/vip/info/{id} */
export async function removeVip(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/pc/api/vip/info/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
