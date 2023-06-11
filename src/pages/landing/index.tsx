import React, { useLayoutEffect, useState } from 'react';
import { generateScheme } from '@/services/ant-design-pro/api'
import { getParams } from '@/common/tools';
import moment from 'moment';

/** 房源分享 */
const PageLanding: React.FC = () => {
  const [tip, setTip] = useState('翔顺金水台VIP欢迎你');

  const init = () => {
    const path = '/pages/book-detail/index';
    let queryJson = {};

    // 获取分销参数
    const invitation = getParams('invitation') || '';
    if (!invitation) return null;
    // base64解码
    const invitationEncodeVal = window.atob(invitation) || null;
    const invitationVal = JSON.parse(invitationEncodeVal) || {};
    const { roomId: id } = invitationVal;
    
    // 计算当前日期
    const dateToday = new Date();
    const dateTomorrow = new Date(dateToday.getTime() + 24 * 60 * 60 * 1000);
    const [startDate, endDate] = [moment(dateToday).format('YYYY-MM-DD'), moment(dateTomorrow).format('YYYY-MM-DD')]
    queryJson = {
      id,
      startDate,
      endDate,
      invitation,
    };
    const query = Object.keys(queryJson).map((key) => (`${key}=${queryJson[key]}`)).join('&');

    return { path, query };
  }

  const getScheme = async (params) => {
    let wxLink = '';
    try {
      const res = await generateScheme(params)
      wxLink = res.data;
    } catch (error) {
      // wxLink = error?.data;
    }
    location.href = wxLink;
  }
  useLayoutEffect(() => {
    document.title ='金水台VIP'

    const params = init();
    if (!params) return;
    
    setTip('正在跳转“翔顺金水台VIP会员微信小程序”...');
    getScheme(params);
  }, []);

  return (
    <div>
      {tip}
    </div>
  );
};

export default PageLanding;
