import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Image, Space, Popconfirm } from 'antd';
import AddModal from './components/addModal';
import EditModal from './components/editModal';
// import EditMultiPriceModal from './components/edit-multi-price-modal';
// import EditMultiCountModal from './components/edit-multi-count-modal';
import EditMultiModal from './components/edit-multi-price-modal';
import { getRoomConfigList, removeRoomConfig } from '@/services/ant-design-pro/api';
import './index.less';

const mockUseVipDiscount = [
  {
    id: null,
    levelName: '全部',
  },
  {
    id: true,
    levelName: '是',
  },
  {
    id: false,
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

const mockEnableRoomTicket = [
  {
    id: null,
    levelName: '全部',
  },
  {
    id: true,
    levelName: '是',
  },
  {
    id: false,
    levelName: '否',
  },
];

const EnableRoomTicketEnumConfig = (() => {
  const map = {};
  mockEnableRoomTicket.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const RoomConfig: React.FC = () => {
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RoomConfigListItem>();

  // const [visibleEditMultiPriceModal, setVisibleEditMultiPriceModal] = useState<boolean>(false);
  // const [visibleEditMultiCountModal, setVisibleEditMultiCountModal] = useState<boolean>(false);
  const [visibleEditMultiModal, setVisibleEditMultiModal] = useState<boolean>(false);

  const handleReload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const onRefresh = () => {
    setVisibleAddModal(false);
    setVisibleEditModal(false);
    // setVisibleEditMultiPriceModal(false);
    // setVisibleEditMultiCountModal(false);
    setVisibleEditMultiModal(false);
    setCurrentRow(undefined);
    // setCurrentSelectedRowKey(undefined);
    handleReload();
  }

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
      handleReload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请稍后重试!');
      return false;
    }
  };

  const formRef = useRef<ProFormInstance>();

  const handleEditRoomConfigPrice = () => {
    // setVisibleEditMultiPriceModal(true);
    setVisibleEditMultiModal(true);
  }

  // const handleEditRoomConfigCount = () => {
  //   setVisibleEditMultiCountModal(true);
  // }

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.RoomConfigListItem>[] = [
    {
      title: '编码',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '名称',
      dataIndex: 'roomType',
    },
    {
      title: '图片',
      dataIndex: 'images',
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
      title: '描述',
      dataIndex: 'roomType',
      hideInSearch: true,
    },
    {
      title: '所需积分',
      dataIndex: 'roomType',
      hideInSearch: true,
    },
    {
      title: '余量/总量',
      dataIndex: 'roomType',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'vipDiscount',
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

        <Popconfirm
          key={record.id}
          title="确定删除吗?"
          onConfirm={() => handleRemove(record)}
          okText="确定"
          cancelText="取消"
        >
          <Button key='remove' type="link" size="small" danger>
            删除
          </Button>
        </Popconfirm>
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RoomConfigListItem, API.PageParams>
        headerTitle="查询结果"
        actionRef={actionRef}
        rowKey="id"
        formRef={formRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
            <Space size={16}>
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  setVisibleAddModal(true);
                }}
              >
                  <PlusOutlined /> 新增
              </Button>
            </Space>,
        ]}
        request={getRoomConfigList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={onRefresh} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onRefresh} />
    </PageContainer>
  );
};

export default RoomConfig;
