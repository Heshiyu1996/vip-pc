import { removeVip, rule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import EditModal from './components/editModal';
import AddModal from './components/addModal';
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
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

const handleRemove = async (selectedItem: API.RuleListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedItem) return true;

  try {
    await removeVip({
      key: selectedItem.key,
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
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

    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '名字',
      dataIndex: 'ownerName',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity); // setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
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
      title: '会员卡号',
      dataIndex: 'cardId',
      valueType: 'textarea',
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
        request={rule}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />

      {/* <EditModal
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            setVisibleEditModal(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setVisibleEditModal(false);
        }}
        updateModalVisible={visibleEditModal}
        values={currentRow || {}}
      /> */}
    </PageContainer>
  );
};

export default TableList;
