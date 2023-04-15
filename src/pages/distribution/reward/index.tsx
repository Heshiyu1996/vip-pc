import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { removeReward, getRewardList, getRoomConfigList } from '@/services/ant-design-pro/api';
import { getParams } from '@/common/tools';
import EditModal from './components/editModal';
import EditDeployModal from './components/editDeplpoyModal';
import AddModal from './components/addModal';
import './index.less';

const defaultCardId = getParams('cardId')
const { confirm } = Modal;

const StaffTableList: React.FC = () => {
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [visibleEditDeployModal, setVisibleEditDeployModal] = useState<boolean>(false);
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

  const handleDeploy = () => {
    setVisibleEditDeployModal(true);
  }


  // 删除指定行
  const handleRemove = async (selectedItem: API.RuleListItem) => {
    const hide = message.loading('正在删除');
    if (!selectedItem) return true;
  
    try {
      await removeReward({
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
  const beforeRemove = (record) => {
    confirm({
      title: '再次提醒',
      content: '是否删除？',
      onOk() {
        handleRemove(record)
      },
    });
  }
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '房型',
      dataIndex: 'roomId',
      valueType: 'select',
      hideInTable: true,
      request: async () => {
        const res = await getRoomConfigList();
        const data = res?.data;
        const options = data?.map((item) => ({ label: item.roomType, value: item.id }))
        return options;
      },
      fieldProps: {
        showSearch: true,
      }
    },
    {
      title: '房型',
      dataIndex: 'roomType',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '奖励金额',
      dataIndex: 'rewardPercent',
      hideInSearch: true,
      renderText: (text) => `${text}%`
    },
    {
      title: '实际发放金额',
      dataIndex: 'actualRewardPercent',
      hideInSearch: true,
      renderText: (text) => `${text}%`
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => [
        <Button key='edit' type="link" size="small" onClick={() => {
          setVisibleEditModal(true);
          setCurrentRow(record);
        }}>
          编辑
        </Button>,
        <Button key='remove' type="link" size="small" danger onClick={() => beforeRemove(record)}>
        删除
      </Button>
      ]
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        form={{
          initialValues: {
            id: defaultCardId
          }
        }}
        toolBarRender={() => [
          <Button key="primary" onClick={handleDeploy}>
            参数配置
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setVisibleAddModal(true)
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={getRewardList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={handleReload} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />

      {/* 弹框：编辑参数配置 */}
      <EditDeployModal values={currentRow || {}} visible={visibleEditDeployModal} onVisibleChange={setVisibleEditDeployModal} onOk={onEditOk} />
    </PageContainer>
  );
};

export default StaffTableList;
