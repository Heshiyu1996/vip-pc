import React, { useRef, useState } from 'react';
import { history } from 'umi';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal, 
  // Popconfirm
 } from 'antd';
import { 
  removeConsumptionList, 
  getConsumptionList, 
  exportConsumptionList
} from '@/services/ant-design-pro/api';
import moment from 'moment';
import { download, getParams } from '@/common/tools';
import EditModal from './components/editModal';
import AddModal from './components/addModal';

const { confirm } = Modal;
const defaultCardId = getParams('cardId')

const mocChannelData = [
  {
    id: 0,
    levelName: '卡内余额',
  },
  {
    id: 1,
    levelName: '微信支付',
  },
  {
    id: 2,
    levelName: '住房券',
  },
  {
    id: 3,
    levelName: '线下',
  },
  {
    id: 4,
    levelName: '系统赠送',
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

// 撤销消费
const handleRemove = async (selectedItem: API.RuleListItem) => {
  const hide = message.loading('正在撤销');
  if (!selectedItem) return true;

  try {
    await removeConsumptionList({
      id: selectedItem.id,
    });
    hide();
    message.success('撤销成功!');
    handleReload();
    return true;
  } catch (error) {
    hide();
    message.error('撤销失败，请稍后重试!');
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

  const beforeRemove = (record) => {
    confirm({
      title: '再次提醒',
      content: '是否确认撤销该消费？',
      onOk() {
        handleRemove(record)
      },
    });
  }

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '流水号',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: '会员卡号',
      dataIndex: 'cardId',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => history.push(`/vip/list?cardId=${entity.cardId}`)}
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
      title: '消费方式',
      dataIndex: 'assetsTypeText',
      hideInSearch: true,
      valueType: 'textarea',
    },
    {
      title: '金额/数量',
      dataIndex: 'amount',
      valueType: 'textarea',
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
      renderText: (val: string) => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '记录状态',
      dataIndex: 'isDelete',
      renderText: (val: string) => val ? '已撤销' : '正常',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (record?.isDelete) return;
        return <Button key='remove' type="link" size="small" danger onClick={() => beforeRemove(record)}>
          撤销
        </Button>
      }
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
            cardId: defaultCardId
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
