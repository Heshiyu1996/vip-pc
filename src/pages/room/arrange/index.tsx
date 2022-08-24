import React, { useRef, useState } from 'react';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Image } from 'antd';
import { getRoomArrangeList, exportRoomArrangeList } from '@/services/ant-design-pro/api';
import { download, getParams } from '@/common/tools';
import EditModal from './components/editModal';
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

const ArrangeList: React.FC = () => {
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  const formRef = useRef<ProFormInstance>();
  const handleExport = async () => {
    const hide = message.loading('导出中...');
    const params = formRef.current?.getFieldsValue();
    
    try {
      const res = await exportRoomArrangeList(params);
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

  const columns: ProColumns<API.RoomArrangeListItem>[] = [
    {
      title: '客房编码',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '客房图片',
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
      title: '客房类型',
      dataIndex: 'roomType',
      hideInSearch: true,
    },
    {
      title: '客房类型',
      dataIndex: 'roomType',
      hideInTable: true,
      valueEnum: RoomTypeEnumConfig,
      renderText: (val: string) => RoomTypeEnumConfig[val],
    },
    {
      title: '余量情况',
      dataIndex: 'restAmount',
      hideInSearch: true,
      valueType: 'textarea',
      renderText: (val: string, record: API.RoomArrangeListItem) => `(${val} / ${record.totalAmount})`,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => 
        <Button key='detail' type="link" size="small" onClick={() => handleDetail(record)}>
          查看预订情况
        </Button>
      ,
    },
  ];

  // 查看预订情况
  const handleDetail = async (selectedItem: API.RoomArrangeListItem) => {
    setVisibleEditModal(true);
    setCurrentRow(selectedItem);
  };

  const onClose = () => {
    setVisibleEditModal(false);
    setCurrentRow({});
    
  }

  return (
    <PageContainer>
      <ProTable<API.RoomArrangeListItem, API.PageParams>
        headerTitle="查询结果"
        rowKey="id"
        formRef={formRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="primary" onClick={handleExport}>
            导出
          </Button>,
        ]}
        request={getRoomArrangeList}
        columns={columns}
      />
      {/* 弹框：查看预订情况 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onClose} />
    </PageContainer>
  );
};

export default ArrangeList;
