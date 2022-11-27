import { request } from 'umi';
import { message, Upload } from 'antd';
import { ValidFileType, DayMap } from './config';
import type { IFile } from './config';

export function download (href: string, title: string) {
  const a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('download', title);
  a.click();
}

export const getParams = (key, url = window.location.href): string | Record<string, any> => {
  const query = url.split('?')[1] || '';
  const vars = query.split('&');
  const map = {};

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    const [k, v] = pair;
    map[k] = v;
  }

  if (!key) return map;
  return map[key];
}

export const requestList = <T>(url: string, options?: Record<string, any>,) => {
  return request<T>(url, options).then((res: T) => {
    const { success, msg, data } = res;
    const modifiedRes = {
      success,
      msg,
      data: data?.list,
      total: data?.total
    }
    return modifiedRes;
  })
}

// 回填 Upload 组件前，处理图片列表
export const handlePreviewImageList = (imgList: string[]): IFile[] => {
  const fileList = imgList?.map((item) => (
    {
      uid: item,
      name: `${item}.png`,
      status: 'done',
      url: item,
      // 这个字段用来标识是否为原有图片（不需要像新上传的图片一样要读取response）
      exist: true,
    }
  ))
  return fileList;
}

const FILE_MAX_SIZE = 20;
export const beforeUpload = (file: File) => {
  const isImage = ValidFileType.includes(file.type);
  if (!isImage) {
    message.error(`${file.name} 不是图片类型`);
    return Upload.LIST_IGNORE;
  }
  // 校验文件大小
  const isLarge = file.size > FILE_MAX_SIZE * 1024 * 1024;
  if (isLarge) {
      message.error(`文件大小不能超过${FILE_MAX_SIZE}M哦`);
      return Upload.LIST_IGNORE;
  }
  return true;
}

export const getDayCount = (date = '2022-10') => {
  const [year, month] = date.split('-').map((item) => Number(item));
  const day = new Date(year, month, 0);
  return day.getDate();
}

export const getDayList = (dateList = []) => {
  const dayList = [];
  dateList.forEach((date) => {
    const currentDay = new Date(date).getDay();
    dayList.push(currentDay);
  })
  return { dateList, dayList };
}
