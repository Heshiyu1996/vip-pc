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

  type RoomArrangeList = {
    data?: RoomArrangeListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RoomArrangeListItem = {
    /**
     * 客房图片
     */
     imagesList?: string[];
     /**
      * 当前剩余
      */
     restCount: number;
     /**
      * 客房编码
      */
     roomId: string;
     /**
      * 客房类型
      */
     roomType:   string;
     totalCount: number;
     /**
      * 预定情况
      */
     orderList?: {
      endTime:   number;
      orderId:   string;
      startTime: number;
     }[];
  };

  type RoomConfigList = {
    data?: RoomConfigListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RoomConfigListItem = {
    /**
     * 客房图片
     */
    imagesList: string[];
    /**
     * 单日价格
     */
    price: number;
    /**
     * 客房编码
     */
    roomId: string;
    /**
     * 客房类型
     */
    roomType: string;
    /**
     * 数量
     */
    totalCount: number;
    /**
     * 是否参与会员优惠
     */
    useVipDiscount: string;
};

  type RoomRefundList = {
    data?: RoomRefundListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RoomRefundListItem = {
    /**
     * 金额
     */
    amount: number;
    /**
     * 会员卡号
     */
    cardNo: string;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 预订天数
     */
    days: number;
    /**
     * 名字
     */
    name: string;
    /**
     * 预订渠道
     */
    orderChannel: string;
    /**
     * 预订结束日期
     */
    orderEndTime: number;
    /**
     * 订单号
     */
    orderId: string;
    /**
     * 预订开始日期
     */
    orderStartTime: number;
    /**
     * 退款进度（0-待处理；1-同意；2-已拒绝）
     */
    statusRefund: string;
  };

  type RoomOrderList = {
    data?: RoomOrderListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RoomOrderListItem = {
    /**
     * 会员卡号
     */
    cardNo: string;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 预订天数
     */
    days: number;
    /**
     * 名字
     */
    name: string;
    /**
     * 预订渠道
     */
    orderChannel: string;
    /**
     * 订单号
     */
    orderId: string;roomType
    /**
     * 订单状态
     */
    orderStatus?: string;
    /**
     * 客房类型
     */
    roomType?: string;
    /**
     * 预订开始时间
     */
    orderStartTime: number;
    /**
     * 预订结束时间
     */
    orderEndTime: number;
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
