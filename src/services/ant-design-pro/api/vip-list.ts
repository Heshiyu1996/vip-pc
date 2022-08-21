// @ts-ignore
/* eslint-disable */
import { request } from 'umi';


/** 获取当前登录的用户信息 GET /api/user/info */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/user/info', {
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
    // // 跳过统一错误统一处理
    // skipErrorHandler: true,
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

const requestList = <T>(url: string, options?: { [key: string]: any },) => {
  return request<T>(url, options).then((res: T) => {
    const { success, msg, data } = res;
    const modifiedRes = {
      success,
      msg,
      data: data?.list,
      total: data?.total
    }
    console.log(modifiedRes, 1232312);
    return modifiedRes;
  })
}

/** 查询会员卡列表 GET /api/vip/info/list */
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
  return requestList<API.RuleList>('/api/vip/info/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 编辑会员卡 PUT /api/vip/info/{id} */
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

/** 删除会员卡 DELETE /api/vip/info/{id} */
export async function removeVip(params?: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/vip/info/${params.id}`, {
    method: 'DELETE',
    data: params,
    ...(options || {}),
  });
}
