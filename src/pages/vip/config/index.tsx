import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import EditModal from './components/editModal';
import AddModal from './components/addModal';
import { removeVipConfig, getVipConfigList } from '@/services/ant-design-pro/api';

// 删除指定行
const handleRemove = async (selectedItem: API.RuleListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedItem) return true;

  try {
    await removeVipConfig({
      id: selectedItem.id,
    });
    hide();
    message.success('删除成功!');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请稍后重试!');
    return false;
  }
};

const TableList: React.FC = () => {
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);

  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const onEditOk = () => {
    setVisibleEditModal(false);
    setCurrentRow(undefined);
    handleReload();
  }
  const handleReload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '卡类型编码',
      dataIndex: 'id',
    },
    {
      title: '等级名称',
      dataIndex: 'levelName',
    },
    {
      title: '最低充值条件',
      dataIndex: 'minimumRechargeAmount',
      renderText: (val: string) => `${val || '-'}元`,
    },
    {
      title: '会员折扣',
      dataIndex: 'vipDiscount',
    },
    {
      title: '会员日折扣',
      dataIndex: 'vipDayDiscount',
    },
    {
      title: '餐饮折扣',
      dataIndex: 'diningDiscount',
    },
    {
      title: '温泉/乐园折扣(元)',
      dataIndex: 'hotSpringOrParkDiscount',
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
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        rowKey="key"
        // 无查询表单
        search={false}
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
        request={getVipConfigList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={handleReload} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />
    </PageContainer>
  );
};

export default TableList;
