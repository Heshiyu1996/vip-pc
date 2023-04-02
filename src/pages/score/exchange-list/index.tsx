import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { getPointExchangeList,acceptExchangeList, rejectExchangeList } from '@/services/ant-design-pro/api';
import { getParams } from '@/common/tools';
import EditModal from './components/editModal';
import AddModal from './components/addModal';

// url携带参数时的查找逻辑
const defaultCardId = getParams('cardId')

const RechargeList: React.FC = () => {
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);

  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const actionRef = useRef<ActionType>();
  const handleReload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const handleAccept = async (selectedItem: API.RuleListItem) => {
    const hide = message.loading('正在兑换');
    if (!selectedItem) return true;
  
    try {
      await acceptExchangeList({
        id: selectedItem.id,
      });
      hide();
      message.success('确认兑换成功!');
      handleReload();
      return true;
    } catch (error) {
      hide();
      message.error('兑换失败，请稍后重试!');
      return false;
    }
  };
  const handleReject = async (selectedItem: API.RuleListItem) => {
    const hide = message.loading('正在拒绝兑换');
    if (!selectedItem) return true;
  
    try {
      await rejectExchangeList({
        id: selectedItem.id,
      });
      hide();
      message.success('拒绝兑换成功!');
      handleReload();
      return true;
    } catch (error) {
      hide();
      message.error('拒绝兑换失败，请稍后重试!');
      return false;
    }
  };

  const formRef = useRef<ProFormInstance>();
  const onEditOk = () => {
    setVisibleEditModal(false);
    setCurrentRow(undefined);
    handleReload();
  }

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '兑换单号',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: '会员卡号',
      dataIndex: 'vipCardId',
    },
    {
      title: '会员名',
      dataIndex: 'vipCardName',
      valueType: 'textarea',
    },
    {
      title: '兑换品',
      dataIndex: 'itemName',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'orderStatus',
    },
    {
      title: '兑换时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
    {
      title: '兑换时间',
      dataIndex: 'updateTime',
      hideInTable: true,
      valueType: 'dateRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      
      // TODO: 操作需根据状态来调整
      render: (_, record) => {
        return [<Popconfirm
          key={record.id}
          title="确定兑换吗?"
          onConfirm={() => handleAccept(record)}
          okText="确定"
          cancelText="取消"
        >
          <Button key='remove' type="link" size="small">
            确认
          </Button>
        </Popconfirm>, 
          <Popconfirm
          key={record.id}
          title="拒绝兑换吗?"
          onConfirm={() => handleReject(record)}
          okText="确定"
          cancelText="取消"
        >
          <Button key='remove' type="link" size="small" danger>
            拒绝
          </Button>
        </Popconfirm>]
      }
      ,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        rowKey="id"
        formRef={formRef}
        form={{
          initialValues: {
            cardId: defaultCardId
          }
        }}
        search={{
          labelWidth: 120,
        }}
        // toolBarRender={() => [
        //   <Button key="primary" onClick={handleExport}>
        //     导出
        //   </Button>,
        // ]}
        request={getPointExchangeList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={handleReload} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />
    </PageContainer>
  );
};

export default RechargeList;
