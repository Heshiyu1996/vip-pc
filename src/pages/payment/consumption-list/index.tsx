import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { removeConsumptionList, getConsumptionList, exportConsumptionList } from '@/services/ant-design-pro/api';
import moment from 'moment';
import { download, getParams } from '@/common/tools';
import EditModal from './components/editModal';
import AddModal from './components/addModal';

const defaultCardId = getParams('cardId')

const mocChannelData = [
  {
    id: '0',
    levelName: '微信',
  },
  {
    id: '1',
    levelName: '线下',
  },
];

const ChannelEnumConfig = (() => {
  const map = {};
  mocChannelData.forEach((item) => {
    map[item.id] = item.levelName;
  });
  return map;
})();

const ConsumptionList: React.FC = () => {
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
const handleRemove = async (selectedItem: API.RuleListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedItem) return true;

  try {
    await removeConsumptionList({
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
      const res = await exportConsumptionList(params);
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
      title: '流水号',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      valueEnum: ChannelEnumConfig,
      renderText: (val: string) => ChannelEnumConfig[val],
    },
    {
      title: '消费时间',
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
      title: '消费时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      key: 'showTime',
      hideInSearch: true,
      sorter: true,
      renderText: (val: string) => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '消费时间',
      dataIndex: 'createTime',
      valueType: 'textarea',
      hideInSearch: true,
      renderText: (val: string) => moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => 
        <Button key='remove' type="link" size="small" danger onClick={() => handleRemove(record)}>
          删除
        </Button>
      ,
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
            vipCardId: defaultCardId
          }
        }}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="primary" onClick={handleExport}>
            导出
          </Button>,
        ]}
        request={getConsumptionList}
        columns={columns}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={handleReload} />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />
    </PageContainer>
  );
};

export default ConsumptionList;
