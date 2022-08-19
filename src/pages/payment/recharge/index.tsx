import React, { useState } from 'react';
import {
  PageContainer,
} from '@ant-design/pro-components';
import { Input, InputNumber, Row, Col, Descriptions, Button, message, Modal } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { getVipList, rechargeAmount } from '@/services/ant-design-pro/api';
import md5 from 'md5';
import { EChannel } from '@/common/config';
import './index.less';

const mockLevelData = [
  {
    id: '0',
    levelName: '普通用户',
  },
  {
    id: '1',
    levelName: '一级',
  },
  {
    id: '2',
    levelName: '二级',
  },
  {
    id: '3',
    levelName: '三级',
  },
  {
    id: '4',
    levelName: '四级',
  },
  {
    id: '5',
    levelName: '五级',
  },
];

const LevelEnumConfig = (() => {
  const map = {};
  mockLevelData.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const Recharge: React.FC = () => {
  const [searchText, setSearchText] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [password, setPassword] = useState<string>();
  const [vipInfo, setVipInfo] = useState<API.RuleListItem>({});

  const [isLoading, setIsLoading] = useState<boolean>();

  const onSearch = (val: string) => {
    getVipList({ cardId: val }).then((res) => {
      const { data } = res;
      if (!data?.length) {
        message.error('会员卡号不存在，请重新输入!');
        return;
      }

      const info = data?.[0];
      setVipInfo(info);
    })
  }

  // 重置
  const handleReset = () => {
    setAmount(0);
    setPassword('');
    setSearchText('');
    setVipInfo({});
  }

  const handleAmount = (val) => {
    setAmount(val);
  }

  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
  }

  const recharge = () => {
    if (!vipInfo?.id) {
      message.error('请输入会员卡号!');
      return;
    }
    if (!amount) {
      message.error('请输入充值金额!');
      return;
    }
    if (!password) {
      message.error('请输入管理员密码!');
      return;
    }

    const params = {
      cardId: vipInfo?.id,
      amount,
      password: md5(password),
      channel: EChannel.ONLINE
    }

    setIsLoading(true);
    rechargeAmount(params).then(() => {
      Modal.success({
        title: '充值成功!',
        content: (<p>已成功为 <b>{vipInfo.ownerName}(卡号: {vipInfo.cardId}) </b> 充值 <b>{amount}</b> 元.</p>)
      })
      handleReset();
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <PageContainer>
      <div className="u-recharge">
        <div className="u-recharge-form">
          <Row gutter={[16, 24]}>
            <Col span={6} className="u-col">
              充值账户：
            </Col>
            <Col span={18}>
              <Input.Search
                placeholder='请输入会员卡号'
                enterButton="查找"
                size="large"
                allowClear
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onSearch={onSearch}
                style={{ maxWidth: 522, width: '100%' }}
              />
            </Col>
          </Row>

          {vipInfo?.cardId && <div>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Descriptions title="用户信息" bordered column={1}>
                  <Descriptions.Item label="会员卡号">{vipInfo?.cardId}</Descriptions.Item>
                  <Descriptions.Item label="会员名字">{vipInfo?.ownerName}</Descriptions.Item>
                  <Descriptions.Item label="手机号">{vipInfo?.mobileNumber}</Descriptions.Item>
                  <Descriptions.Item label="当前等级">{LevelEnumConfig[vipInfo?.currentLevelCode]}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={6} className="u-col">
                充值金额：
              </Col>
              <Col span={18}>
                <InputNumber 
                  placeholder='请输入'
                  size="large"
                  controls={false}
                  value={amount}
                  addonAfter="元"
                  onChange={handleAmount}
                  style={{ maxWidth: 522, width: '100%' }}
                />
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={6} className="u-col">
                管理员密码：
              </Col>
              <Col span={18}>
                <Input.Password 
                  placeholder='请输入'
                  size="large"
                  allowClear
                  value={password}
                  onChange={handlePassword}
                  style={{ maxWidth: 522, width: '100%' }}
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col flex="auto">
                <Button type="primary" block size="large" loading={isLoading} onClick={recharge}>充值</Button>
              </Col>
            </Row>
          </div>}
        </div>
      </div>
    </PageContainer>
  );
};

export default Recharge;
