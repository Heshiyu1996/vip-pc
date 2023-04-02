import { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { Button } from 'antd';
import { getPointRuleList } from '@/services/ant-design-pro/api';
import EditModal from './components/editModal';
import './index.less';

interface IItem {
  id: string;
  sourceKey: string;
  pointAmount: string;
  images: string[];
  title: string;
}

export default () => {
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.StoreConfigListItem>();

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

  return (
    <>
      <ProList<IItem>
        className='u-score-rule'
        headerTitle="积分规则配置"
        rowKey="id"
        request={getPointRuleList}
        split
        actionRef={actionRef}
        metas={{
          title: {
            dataIndex: 'sourceKey'
          },
          content: {
            render: (_, row) => {
              return (
                <div key={row.id} className="item-wrapper">
                  <div className='item'>{row.pointAmount}</div>
                  <div className='item'>{row.expiredType}</div>
                </div>
              );
            },
          },

          actions: {
            render: (_, record) => {
              return <Button key='edit' type="link" size="small" onClick={() => {
                setVisibleEditModal(true);
                setCurrentRow(record);
              }}>
                编辑
              </Button>;
            },
          },
        }}
      />

      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />
    </>
  );
};
