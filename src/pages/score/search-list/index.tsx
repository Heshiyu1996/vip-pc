import React, { useRef } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
// import { Button, message } from 'antd';
import { getPointList, 
  // exportRechargeList
 } from '@/services/ant-design-pro/api';
import { 
  // download, 
  getParams } from '@/common/tools';

// url携带参数时的查找逻辑
const defaultCardId = getParams('cardId')

const RechargeList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const formRef = useRef<ProFormInstance>();
  // const handleExport = async () => {
  //   const hide = message.loading('导出中...');
  //   const params = formRef.current?.getFieldsValue();
    
  //   try {
  //     const res = await exportRechargeList(params);
  //     const { data } = res || {};
  //     if (!data) throw new Error();
  //     const filename = getParams(data, 'filename');
  //     download(data, filename);
  //     hide();
  //     message.success('导出成功!');
  //   } catch (error) {
  //     hide();
  //     // message.error('导出失败，请稍后重试!');
  //   }
  // }

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '会员卡号',
      dataIndex: 'vipCardId',
      hideInTable: true,
    },
    {
      title: '会员卡号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '名字',
      dataIndex: 'vipCardName',
      valueType: 'textarea',
      hideInTable: true
    },
    {
      title: '名字',
      dataIndex: 'ownerName',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'mobileNumber',
      valueType: 'textarea',
    },
    {
      title: '积分',
      dataIndex: 'totalPointBalance',
      valueType: 'textarea',
      hideInSearch: true
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
        request={getPointList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default RechargeList;
