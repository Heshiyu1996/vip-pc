// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login/{username} */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询会员卡列表 GET /api/vip/info/list */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    currentPage?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/vip/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 编辑规则 PUT /api/vip/info/{id} */
export async function editVip(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>(`/api/vip/info/${params.id}`, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

/** 新增会员卡 POST /api/vip/info/add */
export async function addVip(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/vip/info/add', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/vip/info/{id} */
export async function removeVip(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/vip/info/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
