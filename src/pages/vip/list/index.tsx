import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal, Tag } from 'antd';
import { removeVip, getVipList, getVipConfigList } from '@/services/ant-design-pro/api';
import { getParams } from '@/common/tools';
import EditModal from './components/editModal';
import AddModal from './components/addModal';
import DrawerDetail from './components/drawer-detail';
import './index.less';

const defaultCardId = getParams('cardId')
const { confirm } = Modal;

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

  // 删除指定行
  const handleRemove = async (selectedItem: API.RuleListItem) => {
    const hide = message.loading('正在注销');
    if (!selectedItem) return true;
  
    try {
      await removeVip({
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
      title: '卡号',
      dataIndex: 'id',
      valueType: 'textarea',
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
      dataIndex: 'currentLevel',
    },
    {
      title: '身份证号',
      dataIndex: 'identityNumber',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: '余额',
      dataIndex: 'totalBalance',
      valueType: 'textarea',
    },
    {
      title: '赠送金',
      dataIndex: 'giftBalance',
      valueType: 'textarea',
      hideInSearch: true,
      // hideInTable: true,
    },
    {
      title: '住房券',
      dataIndex: 'roomTicket',
      valueType: 'textarea',
      hideInSearch: true,
      // hideInTable: true,
    },
    {
      title: '账号状态',
      dataIndex: 'isDelete',
      // 后端不支持这个 isDelete 入参
      // valueEnum: EnableIsDeleteEnumConfig,
      renderText: (val: string) => val ? <Tag color="magenta">已注销</Tag> : <Tag color="green">正常</Tag>,
      
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      render: (_, record) => {
        const options = [
          <Button key='detail' type="link" size="small" onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}>
            查看详情
          </Button>,
          <Button key='edit' type="link" size="small" onClick={() => {
            setVisibleEditModal(true);
            setCurrentRow(record);
          }}>
            编辑
          </Button>
        ];
        if (!record.isDelete) {
          options.push(
            <Button key='remove' type="link" size="small" danger onClick={() => beforeRemove(record)}>
            注销
          </Button>
          )
        };
        return options;
      }
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
      <DrawerDetail 
        visible={showDetail && !!currentRow?.id}
        values={currentRow || {}}
        columns={columns}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
      />
    </PageContainer>
  );
};

export default TableList;
