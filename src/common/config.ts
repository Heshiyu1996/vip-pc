export enum EChannel {
  WECHAT = '0',
  ONLINE = '1',
}

// 入住专享特权
export const CheckInOptions = [
  { label: '延迟退房', value: '延迟退房' },
  { label: '管家服务', value: '管家服务' },
  { label: 'VIP通道', value: 'VIP通道' },
  { label: '免押入住', value: '免押入住' },
  { label: '欢迎水果', value: '欢迎水果' },
  { label: '安睡奶', value: '安睡奶' },
  { label: '茶礼盒', value: '茶礼盒' },
  { label: '商城积分奖品兑换', value: '商城积分奖品兑换' },
]

// 生日特权
export const BirthdayOptions = [
  { label: '免费入住(豪华房1间)', value: '免费入住(豪华房1间)1' },
  { label: '免费入住(温泉房1间)', value: '免费入住(温泉房1间)' },
  { label: '免费入住(园景豪华温泉房1间)', value: '免费入住(园景豪华温泉房1间)' },
  { label: '生日大礼包', value: '生日大礼包' },
  { label: '自助晚餐(随行1人免费)', value: '自助晚餐(随行1人免费)' },
]

export interface IFile {
  uid: string;
  name: string;
  status: string;
  url: string;
  exist?: boolean;
}

export const ValidFileType = ['image/png', 'image/jpg', 'image/jpeg'];

export const DayMap = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
}
