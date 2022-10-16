import { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { Button, Image, message, Popconfirm } from 'antd';
import { getActivityConfigList, removeActivityConfig } from '@/services/ant-design-pro/api';
import AddModal from './components/addModal';
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
  const [visibleAddModal, setVisibleAddModal] = useState<boolean>(false);

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

  const onAddOk = () => {
    setVisibleAddModal(false);
    handleReload();
  }

  // 删除指定行
  const handleRemove = async (selectedItem: API.RuleListItem) => {
    const hide = message.loading('正在删除');
    if (!selectedItem) return true;
  
    try {
      await removeActivityConfig({
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

  return (
    <>
      <ProList<IItem>
        className='u-activity-config'
        headerTitle="活动配置"
        rowKey="id"
        // dataSource={dataSource}
        request={getActivityConfigList}
        split
        actionRef={actionRef}
        toolBarRender={() => {
          return [
            <Button key='add' type='primary' onClick={() => {
              setVisibleAddModal(true);
            }}>
              新建
            </Button>,
          ];
        }}
        metas={{
          title: {
            dataIndex: 'title'
          },
          description: {
            render: (_, row) => {
              return (
                <>
                链接：
                <a href={row.link} target='_blank' rel="noreferrer">{row.link}</a>
                </>
              );
            }
          },
          content: {
            render: (_, row) => {
              return (
                <Image
                  key={row.image}
                  width={50}
                  src={row.image}
                  rootClassName='u-image-list'
                />
              );
            },
          },

          actions: {
            render: (_, record) => {
              return [
                <Button key='edit' type="link" size="small" onClick={() => {
                  setVisibleEditModal(true);
                  setCurrentRow(record);
                }}>
                  编辑
                </Button>,
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
              ];
            },
          },
        }}
      />

      {/* 弹框：新增 */}
      <AddModal visible={visibleAddModal} onVisibleChange={setVisibleAddModal} onOk={onAddOk} />
      {/* 弹框：编辑 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onEditOk} />
    </>
  );
};
