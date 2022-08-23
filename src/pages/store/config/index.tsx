import { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { Button, Image } from 'antd';
import { getStoreConfigList } from '@/services/ant-design-pro/api';
import EditModal from './components/editModal';
import './index.less';

interface IItem {
  id: string;
  label: string;
  value: string;
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
        headerTitle="店铺配置"
        rowKey="id"
        // dataSource={dataSource}
        request={getStoreConfigList}
        split
        actionRef={actionRef}
        metas={{
          title: {
            dataIndex: 'label'
          },
          description: {
            dataIndex: 'value',
          },
          content: {
            render: (_, row) => {
              return (
                <div key={row.id}>
                  {row?.images?.map((url, index) => <Image
                    key={`${url}${index}`}
                    width={50}
                    src={url}
                    rootClassName='u-image-list'
                  />)}
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
