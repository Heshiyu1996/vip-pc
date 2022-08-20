import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Image, Table, Space } from 'antd';
import AddModal from './components/addModal';
import EditModal from './components/editModal';
import EditMultiPriceModal from './components/edit-multi-price-modal';
import EditMultiCountModal from './components/edit-multi-count-modal';
import { getRoomConfigList, removeRoomConfig } from '@/services/ant-design-pro/api';
import './index.less';

const mockRoomTypeData = [
  {
    id: '0',
    levelName: '大床房',
  },
  {
    id: '1',
    levelName: '双床房',
  },
];

const RoomTypeEnumConfig = (() => {
  const map = {};
  mockRoomTypeData.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const mockUseVipDiscount = [
  {
    id: '0',
    levelName: '全部',
  },
  {
    id: '1',
    levelName: '是',
  },
  {
    id: '2',
    levelName: '否',
  },
];

const VipDiscountEnumConfig = (() => {
  const map = {};
  mockUseVipDiscount.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

// 删除指定行
const handleRemove = async (selectedItem: API.RoomConfigListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedItem) return true;

  try {
    await removeRoomConfig({
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

const RoomConfig: React.FC = () => {
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RoomConfigListItem>();

  const [visibleEditMultiPriceModal, setVisibleEditMultiPriceModal] = useState<boolean>(false);
  const [visibleEditMultiCountModal, setVisibleEditMultiCountModal] = useState<boolean>(false);
  const [currentSelectedRowKey, setCurrentSelectedRowKey] = useState<(string | number)[]>();

  const handleReload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const onRefresh = () => {
    setVisibleAddModal(false);
    setVisibleEditModal(false);
    setVisibleEditMultiPriceModal(false);
    setVisibleEditMultiCountModal(false);
    setCurrentRow(undefined);
    setCurrentSelectedRowKey(undefined);
    handleReload();
  }

  const formRef = useRef<ProFormInstance>();

  const handleEditRoomConfigPrice = (selectedRowKeys: (string | number)[]) => {
    setCurrentSelectedRowKey(selectedRowKeys);
    setVisibleEditMultiPriceModal(true);
  }

  const handleEditRoomConfigCount = (selectedRowKeys: (string | number)[]) => {
    setCurrentSelectedRowKey(selectedRowKeys);
    setVisibleEditMultiCountModal(true);
  }

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.RoomConfigListItem>[] = [
    {
      title: '客房编码',
      dataIndex: 'roomId',
      hideInSearch: true,
    },
    {
      title: '客房图片',
      dataIndex: 'imagesList',
      valueType: 'textarea',
      hideInSearch: true,
      // @ts-ignore
      render: (val: string[]) => val?.map((url, index) => <Image
        key={`${url}${index}`}
        width={100}
        src={url}
        rootClassName='u-image-list'
      />),
    },
    {
      title: '客房类型',
      dataIndex: 'roomType',
      valueEnum: RoomTypeEnumConfig,
      renderText: (val: string) => RoomTypeEnumConfig[val],
    },
    {
      title: '单日价格（元）',
      dataIndex: 'price',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '最低单日价',
      dataIndex: 'lowPrice',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: '最高单日价',
      dataIndex: 'highPrice',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: '数量',
      dataIndex: 'totalCount',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '是否参与会员优惠',
      dataIndex: 'useVipDiscount',
      valueEnum: VipDiscountEnumConfig,
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
      <ProTable<API.RoomConfigListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        rowKey="roomId"
        formRef={formRef}
        search={{
          labelWidth: 120,
        }}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys }) => {
          return (
            <Space size={16}>
              <Button key="multi-price" onClick={() => handleEditRoomConfigPrice(selectedRowKeys)}>
                批量修改价格
              </Button>
              <Button key="multi-count" onClick={() => handleEditRoomConfigCount(selectedRowKeys)}>
                批量修改数量
              </Button>
            </Space>
          );
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
        request={getRoomConfigList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={onRefresh} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onRefresh} />

      {/* 弹框：批量编辑价格 */}
      <EditMultiPriceModal values={currentSelectedRowKey || {}} visible={visibleEditMultiPriceModal} onVisibleChange={setVisibleEditMultiPriceModal} onOk={onRefresh} />
    
      {/* 弹框：批量编辑数量 */}
      <EditMultiCountModal values={currentSelectedRowKey || {}} visible={visibleEditMultiCountModal} onVisibleChange={setVisibleEditMultiCountModal} onOk={onRefresh} />
    </PageContainer>
  );
};

export default RoomConfig;
