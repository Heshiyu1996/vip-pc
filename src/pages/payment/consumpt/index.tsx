import React, { useState, useEffect } from 'react';
import {
  PageContainer,
} from '@ant-design/pro-components';
import { Input, InputNumber, Row, Col, Descriptions, Button, message, Modal, Select, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { getVipConfigList, getVipList, consumptAmount } from '@/services/ant-design-pro/api';
import md5 from 'md5';
import './index.less';
import { getParams } from '@/common/tools';

const defaultCardId = getParams('cardId');
enum EConsumptionType {
  RECHARGE_BALANCE,
  GIFT_BALANCE,
  ROOM_TICKET,
}
const EConsumptionTypeText ={
  [EConsumptionType.RECHARGE_BALANCE]: '充值金',
  [EConsumptionType.GIFT_BALANCE]: '赠送金',
  [EConsumptionType.ROOM_TICKET]: '住房券',
}
  
const Consumpt: React.FC = () => {
  const [ifSearchById, setIfSearchById] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>(defaultCardId);
  const [amount, setAmount] = useState<number>();
  const [remark, setRemark] = useState<string>('');
  const [password, setPassword] = useState<string>();
  const [vipInfo, setVipInfo] = useState<API.RuleListItem>({});

  const [isLoading, setIsLoading] = useState<boolean>();

  const [vipConfigList, setVipConfigList] = useState<any>();
  useEffect(() => {
    getVipConfigList({}).then((res) => {
      // 默认“全部”
      const configList = [
        { id: '', levelName: '全部' }
      ];
      configList.push(...res?.data || []);
      const map = {};
      configList.forEach((item) => {
        map[item.id] = item.levelName;
      });
      setVipConfigList(map);
    })
  }, []);

  const onSearch = (val: string) => {
    const params = {};
    if (ifSearchById) {
      params.id = val;
    } else {
      params.mobileNumber = val;
    }
    getVipList(params).then((res) => {
      const { data } = res;
      if (!data?.length) {
        message.error(ifSearchById ? '会员卡号不存在，请重新输入!' : '会员手机号不存在，请重新输入!');
        setVipInfo({});
        return;
      }

      const info = data?.[0];
      setVipInfo(info);
    })
  }
  
  const onChangeSearchType = (type) => {
    console.log(type);
    // 按照“会员卡号”搜索
    if (type === 'id') {
      setIfSearchById(true);
    }
    // 按照“手机号”搜索
    else {
      setIfSearchById(false);
    }
  }

  // 当url携带cardId时，自动触发搜索
  useEffect(() => {
    if (defaultCardId) {
      onSearch(defaultCardId);
    }
  }, [defaultCardId]);

  // 重置
  const handleReset = () => {
    setAmount(undefined);
    setRemark('');
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

  const [consumtionType, setConsumtionType] = useState(EConsumptionType.RECHARGE_BALANCE);
  const onChangeType = (ev) => {
    const val = ev.target.value;
    setConsumtionType(val);
  }


  const consumption = () => {
    if (!vipInfo?.id) {
      message.error('请输入会员卡号!');
      return;
    }
    if (!amount) {
      message.error('请输入核销金额!');
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
      remark,
      assetsType: consumtionType
    }

    setIsLoading(true);
    consumptAmount(params).then(() => {
      const consumptionContent = <span>
        {consumtionType === EConsumptionType.ROOM_TICKET ? 
          `${amount} 张 ${EConsumptionTypeText[EConsumptionType.ROOM_TICKET]}`
          :
          `${amount} 元 ${EConsumptionTypeText[consumtionType]}`
        }
      </span>

      Modal.success({
        title: '核销成功!',
        content: (<p>已成功为 <b>{vipInfo.ownerName}(卡号: {vipInfo.id}) </b> 核销 {consumptionContent}.</p>)
      })
      handleReset();
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <PageContainer>
      <div className="u-consumption">
        <div className="u-consumption-form">
          <Row gutter={[16, 24]}>
            <Col span={6} className="u-col">
              核销账户：
            </Col>
            <Col span={18}>
              <Input.Group compact>
                <Select className='u-search-type' style={{ width: '30%' }} defaultValue="id" onChange={onChangeSearchType}>
                  <Select.Option value="id">会员卡号</Select.Option>
                  <Select.Option value="mobileNumber">手机号</Select.Option>
                </Select>
                <Input.Search
                  placeholder={`${ ifSearchById ? '请输入会员卡号' : '请输入会员手机号'}`}
                  enterButton="查找"
                  size="large"
                  allowClear
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  onSearch={onSearch}
                  style={{ maxWidth: 440, width: '70%' }}
                />
              </Input.Group>
            </Col>
          </Row>

          {vipInfo?.id && <div>
            <Row gutter={[16, 24]}>
              <Col span={24}>
                <Descriptions title="用户信息" bordered column={1}>
                  <Descriptions.Item label="会员卡号">{vipInfo?.id}</Descriptions.Item>
                  <Descriptions.Item label="会员名字">{vipInfo?.ownerName}</Descriptions.Item>
                  <Descriptions.Item label="手机号">{vipInfo?.mobileNumber}</Descriptions.Item>
                  <Descriptions.Item label="当前等级">{vipInfo?.currentLevel}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={6} className="u-col">
                核销类别：
              </Col>
              <Col span={18}>
                <Radio.Group value={consumtionType} onChange={onChangeType}>
                  <Radio value={EConsumptionType.RECHARGE_BALANCE}>充值金</Radio>
                  <Radio value={EConsumptionType.GIFT_BALANCE}>赠送金</Radio>
                  <Radio value={EConsumptionType.ROOM_TICKET}>住房券</Radio>
                </Radio.Group>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={6} className="u-col">
                {consumtionType === EConsumptionType.ROOM_TICKET ? '数量' : '金额'}：
              </Col>
              <Col span={18}>
                <InputNumber 
                  placeholder='请输入'
                  size="large"
                  controls={false}
                  value={amount}
                  addonAfter={consumtionType === EConsumptionType.ROOM_TICKET ? '张' : '元'}
                  onChange={handleAmount}
                  style={{ maxWidth: 522, width: '100%' }}
                />
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={6} className="u-col">
                备注：
              </Col>
              <Col span={18}>
                <Input.TextArea
                  placeholder='请输入'
                  size="large"
                  allowClear
                  value={remark}
                  onChange={(ev) => setRemark(ev.target.value)}
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
                <Button type="primary" block size="large" loading={isLoading} onClick={consumption}>核销</Button>
              </Col>
            </Row>
          </div>}
        </div>
      </div>
    </PageContainer>
  );
};

export default Consumpt;
