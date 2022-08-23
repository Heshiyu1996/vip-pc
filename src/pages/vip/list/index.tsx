import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
  ProDescriptions,
} from '@ant-design/pro-components';
import { Drawer, Button, message, Row, Col } from 'antd';
import { removeVip, getVipList } from '@/services/ant-design-pro/api';
import EditModal from './components/editModal';
import AddModal from './components/addModal';
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

const TableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);

  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const actionRef = useRef<ActionType>();
  const handleReload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }
  const onEditOk = () => {
    setVisibleEditModal(false);
    setCurrentRow(undefined);
    handleReload();
  }

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '会员卡号',
      dataIndex: 'id',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '名字',
      dataIndex: 'ownerName',
    },
    {
      title: '手机号',
      dataIndex: 'mobileNumber',
      valueType: 'textarea',
    },
    {
      title: '当前等级',
      dataIndex: 'currentLevelCode',
      hideInForm: true,
      valueEnum: LevelEnumConfig,
      renderText: (val: string) => LevelEnumConfig[val],
    },
    {
      title: '身份证号',
      dataIndex: 'identityNumber',
      valueType: 'textarea',
    },
    {
      title: '会员卡余额',
      dataIndex: 'totalBalance',
      valueType: 'textarea',
    },
    {
      title: '赠送金额',
      dataIndex: 'giftBalance',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button key='edit' type="link" size="small" onClick={() => {
          setVisibleEditModal(true);
          setCurrentRow(record);
        }}>
          编辑
        </Button>
        ,
        <Button key='remove' type="link" size="small" danger onClick={() => handleRemove(record)}>
          删除
        </Button>,
      ],
    },
  ];

  // 删除指定行
  const handleRemove = async (selectedItem: API.RuleListItem) => {
    const hide = message.loading('正在删除');
    if (!selectedItem) return true;
  
    try {
      await removeVip({
        id: selectedItem.id,
      });
      hide();
      message.success('删除成功!');
      handleReload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请稍后重试!');
      return false;
    }
  };

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisibleAddModal(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={getVipList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={handleReload} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />

      {/* 详情抽屉 */}
      <Drawer
        className="u-drawer-vip-detail"
        width={600}
        visible={showDetail && !!currentRow?.id}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        <>
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />

          <Row gutter={[16, 24]}>
            <Col span={24} className="u-title">
              支付管理
            </Col>
            <Col span={6}>
              <Button onClick={() => window.open(`/payment/recharge?cardId=${currentRow?.id}`)}>会员卡充值</Button>
            </Col>
            <Col span={6}>
              <Button onClick={() => window.open(`/payment/recharge-list?cardId=${currentRow?.id}`)}>查询充值记录</Button>
            </Col>
            <Col span={6}>
              <Button onClick={() => window.open(`/payment/consumption-list?cardId=${currentRow?.id}`)}>查询消费记录</Button>
            </Col>
          </Row>

          <Row gutter={[16, 24]}>
            <Col span={24} className="u-title">
              订房管理
            </Col>
            <Col span={6}>
              <Button onClick={() => window.open(`/room/order?cardId=${currentRow?.id}`)}>查询订房记录</Button>
            </Col>
            <Col span={6}>
              <Button onClick={() => window.open(`/room/refund?cardId=${currentRow?.id}`)}>查询退款记录</Button>
            </Col>
          </Row>
        </>
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
