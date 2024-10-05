// TODO: 缺少接口：查询、删除、新增、编辑
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { removeStaff, getStaffList, exportStaff } from '@/services/ant-design-pro/api';
import { download, getParams } from '@/common/tools';
import EditModal from './components/editModal';
import AddModal from './components/addModal';
import './index.less';

const defaultCardId = getParams('cardId')
const { confirm } = Modal;

const StaffTableList: React.FC = () => {
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

  // 删除指定行
  const handleRemove = async (selectedItem: API.RuleListItem) => {
    const hide = message.loading('正在注销');
    if (!selectedItem) return true;
  
    try {
      await removeStaff({
        id: selectedItem.id,
      });
      hide();
      message.success('注销成功!');
      handleReload();
      return true;
    } catch (error) {
      hide();
      message.error('注销失败，请稍后重试!');
      return false;
    }
  };
  const beforeRemove = (record) => {
    confirm({
      title: '再次提醒',
      content: '是否注销该会员？',
      onOk() {
        handleRemove(record)
      },
    });
  }
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '会员卡号',
      dataIndex: 'vipCardId',
      valueType: 'textarea',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '登录账号',
      dataIndex: 'username',
      valueType: 'textarea',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '名字',
      dataIndex: 'ownerName',
      hideInSearch: true,
    },
    {
      title: '名字',
      dataIndex: 'name',
      hideInTable: true,
    },
    {
      title: '手机号',
      dataIndex: 'mobileNumber',
      valueType: 'textarea',
    },
    {
      title: '部门',
      dataIndex: 'departmentName',
      hideInSearch: true,
    },
    {
      title: '职位',
      dataIndex: 'permissionRole',
      hideInSearch: true,
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
        注销
      </Button>
      ]
    },
  ];

  const formRef = useRef<ProFormInstance>();
  const handleExport = async () => {
    const hide = message.loading('导出中...');
    const params = formRef.current?.getFieldsValue();
    
    try {
      const res = await exportStaff(params);
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

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="username"
        search={{
          labelWidth: 120,
        }}
        form={{
          initialValues: {
            id: defaultCardId
          }
        }}
        toolBarRender={() => [
          <Button key="primary" onClick={handleExport}>
            导出
          </Button>,
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
        request={getStaffList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      {visibleAddModal && <AddModal visible onVisibleChange={setVisibleAddModal} onOk={handleReload} />}

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />
    </PageContainer>
  );
};

export default StaffTableList;
