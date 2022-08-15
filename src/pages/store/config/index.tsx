/*
 * @Author: 宇仔(heshiyu.hsy@mybank.cn)
 * @Date: 2022-08-15 14:25:39
 * @LastEditTime: 2022-08-15 19:49:32
 * @LastEditors: 宇仔(heshiyu.hsy@mybank.cn)
 * @Description: 
 */
import { useState, useRef } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { Button, Image } from 'antd';
import EditModal from './components/editModal';
import './index.less';

interface IItem {
  id: string;
  label: string;
  value: string;
  imageList: string[];
  title: string;
}

const dataSource = [
  {
    id: '1',
    label: '店铺信息',
    value: 'eu dolore officia',
    imageList: [
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
      'http://dummyimage.com/400x400',
    ],
    title: ''
  },
  {
    id: '2',
    label: '商户资质',
    value: 'aute incididunt',
    imageList: [
      'http://dummyimage.com/400x400',
    ],
    title: ''
  },
  {
    id: '3',
    label: '商户信息',
    value: 'Lorem',
    imageList: [
      'http://dummyimage.com/400x400',
    ],
    title: ''
  },
  {
    id: '4',
    label: '商户声明',
    value: 'Lorem',
    imageList: [
      'http://dummyimage.com/400x400',
    ],
    title: ''
  },
  {
    id: '5',
    label: '防疫政策',
    value: 'Lorem',
    imageList: [
      'http://dummyimage.com/400x400',
    ],
    title: ''
  },
];

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
        dataSource={dataSource}
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
                  {row?.imageList?.map((url, index) => <Image
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