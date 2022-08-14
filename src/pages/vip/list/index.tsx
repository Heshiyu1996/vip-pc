import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/EditModal';
import EditModal from './components/EditModal';
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
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};
/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
}; // 删除指定记录

const handleRemove = async (selectedItem: API.RuleListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedItem) return true;

  try {
    await removeRule({
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
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
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
        <a
          key="config"
          onClick={() => {
            setVisibleEditModal(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a key="subscribeAlert" onClick={() => handleRemove(record)}>
          删除
        </a>,
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
      <ModalForm
        title="新增"
        width="400px"
        visible={visibleAddModal}
        onVisibleChange={setVisibleAddModal}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);

          if (success) {
            setVisibleAddModal(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '名字必填',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>

      {/* 弹框：编辑 */}
      <EditModal
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
      />
    </PageContainer>
  );
};

export default TableList;
