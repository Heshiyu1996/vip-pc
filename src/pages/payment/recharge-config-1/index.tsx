import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import EditModal from './components/editModal';
import AddModal from './components/addModal';
import { removeRechargeConfig, getRechargeConfigList } from '@/services/ant-design-pro/api';

const RechargeConfig: React.FC = () => {
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);

  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const actionRef = useRef<ActionType>();
  const handleReload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  // 删除指定行
  const handleRefund = async (selectedItem: API.RuleListItem) => {
    const hide = message.loading('正在删除');
    if (!selectedItem) return true;
  
    try {
      await removeRechargeConfig({
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

  const formRef = useRef<ProFormInstance>();
  const handleExport = async () => {
    const hide = message.loading('导出中...');
    const params = formRef.current?.getFieldsValue();
    
    try {
      const res = await exportRechargeList(params);
      const { data } = res || {};
      if (!data) throw new Error();
      const filename = getParams(data, 'filename');
      download(data, filename);
      hide();
      message.success('导出成功!');
    } catch (error) {
      hide();
      // message.error('导出失败，请稍后重试!');
    }
  }

  const onEditOk = () => {
    setVisibleEditModal(false);
    setCurrentRow(undefined);
    handleReload();
  }

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '流水号',
      dataIndex: 'id',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '流水号',
      dataIndex: 'flowId',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: '会员卡号',
      dataIndex: 'cardId',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => setCurrentRow(entity)}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '名字',
      dataIndex: 'ownerName',
      valueType: 'textarea',
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      valueEnum: ChannelEnumConfig,
      renderText: (val: string) => ChannelEnumConfig[val],
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '充值时间',
      dataIndex: 'createTime',
      key: 'showTime',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
      fieldProps: {
        showTime: { format: 'HH:mm' },
        format: "YYYY-MM-DD HH:mm"
      },
    },
    {
      title: '充值时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      key: 'showTime',
      hideInSearch: true,
      sorter: true,
      renderText: (val: string) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => 
        <Popconfirm
          key={record.id}
          title="确定退款吗?"
          onConfirm={() => handleRefund(record)}
          okText="确定"
          cancelText="取消"
        >
          <Button key='remove' type="link" size="small" danger>
            退款
          </Button>
        </Popconfirm>
      ,
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button key="primary" onClick={() => {
            setVisibleAddModal(true)
          }}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={getRechargeConfigList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={handleReload} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />
    </PageContainer>
  );
};

export default RechargeConfig;
