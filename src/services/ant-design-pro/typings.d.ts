// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    id?: number;
    ownerName?: string;
    mobileNumber?: string;
    identityNumber?: string;
    totalBalance?: number;
    currentLevelCode?: number;
    cardId?: string;

    key?: number;
    // disabled?: boolean;
    // href?: string;
    // avatar?: string;
    // // name?: string;
    // owner?: string;
    // desc?: string;
    // callNo?: number;
    // status?: number;
    // updatedAt?: string;
    // createdAt?: string;
    // progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type VipConfigList = {
    data?: VipConfigListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type VipConfigListItem = {
    birthdayPackage?:         string | string[];
    createTime?:              string;
    diningDiscount?:          number;
    hotSpringOrParkDiscount?: number;
    id?:                      number;
    isDelete?:                number;
    levelName?:               string;
    minimumRechargeAmount?:   number;
    privilege?:               string;
    updater?:                 string;
    updateTime?:              string;
    vipDayDiscount?:          number;
    vipDiscount?:             number;
    key?: number;
  };

  type StoreConfigList = {
    success?: boolean;
    data?: StoreConfigListItem[];
    /** 列表的内容总数 */
    total?: number;
  };
  type StoreConfigListItem = {
    id?: string;
    label?: string;
    value?: string;
    imageList?: string[];
  };

  type RechargeList = {
    data?: RechargeListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RechargeListItem = {
    amount?: number;
    cardId?: string;
    /**
     * 充值渠道（0：微信；1：线下）
     */
    channel?:    number;
    createTime?: number;
    /**
     * 流水号
     */
    id?:   string;
    name?: string;
  };
  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
