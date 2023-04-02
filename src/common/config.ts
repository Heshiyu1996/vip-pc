export enum EChannel {
  WECHAT = '0',
  ONLINE = '1',
}

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
