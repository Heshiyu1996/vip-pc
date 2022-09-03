import React, { useRef, useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormRadio,
  ProTable,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';
import { editRoomConfigPrice, getRoomConfigList } from '@/services/ant-design-pro/api';

interface IProps {
  visible: boolean;
  onVisibleChange: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
export type FormValueType = {
  ids: string[];
  price: string;
} & Partial<API.RuleListItem>;

const FormLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 },
}
const DayList = [
  { label: '一', value: 'Mon' },
  { label: '二', value: 'Tue' },
  { label: '三', value: 'Wed' },
  { label: '四', value: 'Thur' },
  { label: '五', value: 'Fri' },
  { label: '六', value: 'Sat' },
  { label: '七', value: 'Sun' },
];

const DayMap =  (() => {
  const map = {};
  DayList.forEach((item) => {
    map[item.value] = item.label;
  });
  return map;
})();


const DefaultColumns = [
  {
    title: '房型ID',
    dataIndex: 'roomId',
  },
  {
    title: '房型',
    dataIndex: 'roomType',
  }
]

const EditMultiPriceModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  const [visibleDayGroup, setVisibleDayGroup] = useState(true);
  const [selectedDay, setSelectedDay] = useState([]);

  const [tableListDataSource, setTableListDataSource] = useState([]);
  const [columns, setColumn] = useState(DefaultColumns);

  const formRef = useRef<ProFormInstance>();

  const handleEdit = async (fields: FormValueType) => {
    const hide = message.loading('正在更新');

    try {
      await editRoomConfigPrice({
        ids: fields.ids,
        price: fields.price,
      });
      hide();
      message.success('编辑成功!');
      return true;
    } catch (error) {
      hide();
      message.error('编辑失败，请稍后重试!');
      return false;
    }
  };

  const handleChangeRoomType = (_, options) => {
    const newData = options?.map((item) => ({
      key: item.value,
      roomId: item.value,
      roomType: item.label
    }));
    setTableListDataSource(newData);
  }

  const addDayGroup = () => {
    const dayGroup = formRef.current?.getFieldValue('dayGroup');
    setSelectedDay(dayGroup);
  }

  return (
    <ModalForm
      formRef={formRef}
      title="批量修改价格"
      visible={true || visible}
      layout="horizontal"
      {...FormLayout}
      onVisibleChange={onVisibleChange}
      onFinish={async (value) => {
        const success = await handleEdit(value);
        if (success) {
          onVisibleChange(false);
          onOk();
        }
      }}
    >

      <ProFormRadio.Group
        label="类别"
        rules={[
          {
            required: true,
            message: '请选择类别!',
          },
        ]}
        name="willSendMessage"
        initialValue="0"
        options={[
          { value: '0', label: '按星期' },
          { value: '1', label: '按日期' },
        ]}
        fieldProps={{
          onChange: (e) => {
            const visible = e.target.value === '0';
            setVisibleDayGroup(visible);
          }
        }}
      />

      {
        visibleDayGroup && 
          <>
            <ProFormCheckbox.Group
              name="dayGroup"
              label="星期组别"
              options={DayList}
              addonAfter={
                <div className='icon increase' onClick={addDayGroup}>添加</div>
              }
              rules={[
                {
                  required: true,
                  message: '请选择星期组别!',
                },
              ]}
            />
            <div className='day-selected-wrapper'>
              已选组1: {selectedDay.map((id) => DayMap[id]).join('、')}
            </div>
          </>
      }

      <ProFormSelect
        name="roomType"
        label="适用房型"
        request={async () => {
          const res = await getRoomConfigList();
          const data = res?.data;
          const options = data?.map((item) => ({ label: item.roomType, value: item.id }))
          return options;
        }}
        placeholder="请选择"
        rules={[{ 
          required: true, 
          message: '请选择适用房型!'
        }]}
        fieldProps={{
          mode: "multiple",
          onChange: handleChangeRoomType
        }}
      />

      <ProTable
        dataSource={tableListDataSource}
        rowKey="roomId"
        pagination={{
          showQuickJumper: true,
          hideOnSinglePage: true
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        toolBarRender={false}
      />
    </ModalForm>
  );
};

export default EditMultiPriceModal;
