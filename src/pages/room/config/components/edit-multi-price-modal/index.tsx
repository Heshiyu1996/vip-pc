import React, { useEffect, useRef, useState, useMemo } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormRadio,
  ProTable,
  ProFormCheckbox,
  ProFormSelect,
  ProFormDateRangePicker,
} from '@ant-design/pro-components';
import { message, InputNumber } from 'antd';
import moment from 'moment';
import { editRoomConfigPrice, editRoomConfigAmount, getRoomConfigList } from '@/services/ant-design-pro/api';
import './index.less';

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

const DefaultDayList = [
  { label: '一', value: 'Mon' },
  { label: '二', value: 'Tue' },
  { label: '三', value: 'Wed' },
  { label: '四', value: 'Thur' },
  { label: '五', value: 'Fri' },
  { label: '六', value: 'Sat' },
  { label: '日', value: 'Sun' },
];
const DefaultColumns = [
  {
    title: '房型ID',
    dataIndex: 'roomId',
    hideInTable: true,
  },
  {
    title: '房型',
    dataIndex: 'roomType',
    // with: 80,
    fixed: 'left',
  }
]
enum EOpType {
  price,
  amount
}

const EditMultiModal: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange, onOk } = props;
  const [opType, setOpType] = useState(EOpType.price);
  const [visibleDayGroup, setVisibleDayGroup] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayList, setDayList] = useState(DefaultDayList);
  const [selectedDates, setSelectedDates] = useState([]);

  const DayMap = useMemo(() => {
    const map = {};
    dayList.forEach((item) => {
      map[item.value] = item.label;
    });
    return map;
  }, [dayList]);

  const [tableListDataSource, setTableListDataSource] = useState([]);
  const [columns, setColumn] = useState(DefaultColumns);

  const formRef = useRef<ProFormInstance>();
  const tableRef = useRef();
  const priceListRef = useRef({});

  const handleEdit = async () => {
    const hide = message.loading('正在更新');
    
    const configList = [];
    for (const key in priceListRef?.current) {
      const [startDate, endDate, dayOrigin] = key?.split('|');
      const priceMap = priceListRef?.current[key] || {};
      const list = Object.keys(priceMap).map((roomId) => ({ roomId, [opType === EOpType.price ? 'price' : 'amount']: priceMap[roomId] }));
      const priceItem = {
        startDate,
        endDate,
        day: dayOrigin?.split(','),
        list
      };
      configList.push(priceItem);
    };
    console.log(configList, 2992);

    try {
      if (opType === EOpType.price) {
        await editRoomConfigPrice({ configList });
      } else {
        await editRoomConfigAmount({ configList });
      }
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
    // 清空表格数据
    tableRef.current.reset();
    setTableListDataSource(newData);
  }

  const addDayGroup = () => {
    const dayGroup = formRef.current?.getFieldValue('dayGroup');
    if (!dayGroup?.length) return;

    const newSelectedDay = [...selectedDays];
    newSelectedDay.push(dayGroup);
    setSelectedDays(newSelectedDay);
  }

  const addDateGroup = () => {
    const dateGroupOrigin = formRef.current?.getFieldValue('dateGroup');
    if (!dateGroupOrigin?.length) return;

    // 直接转成 'YYYY-MM-DD~YYYY-MM-DD' 格式再存储
    const dateGroup = dateGroupOrigin?.map((date) => moment(date).format('YYYY-MM-DD')).join('~');
    
    const isTheSame = selectedDates.includes(dateGroup);
    if (isTheSame) return;

    // 判断是否有交叉（此校验放到后端）
    const newSelectedDate = [...selectedDates];
    newSelectedDate.push(dateGroup);
    console.log(newSelectedDate, dateGroup, 333);
    
    setSelectedDates(newSelectedDate);
  }

  const handleChangePrice = (price, params) => {
    const { day, roomId } = params;
    console.log(selectedDates, 999)
    // 遍历所选日期，去生成 priceListRef 的 id
    selectedDates.forEach((date) => {
      const [startDate, endDate] = date?.split('~');
      const id = `${startDate}|${endDate}|${day?.join(',')}`;
      console.log(priceListRef.current[id], 1996)
      const targetPriceItem = priceListRef.current[id] || {};
      targetPriceItem[roomId] = price;
    });
  }
  // 「星期组别」已选值发生变化
  useEffect(() => {
    // 更新“待选项”（置灰、恢复）
    const selectedDayAll = [];
    selectedDays?.forEach((item) => selectedDayAll.push(...item));
    const newDayList = dayList.map((day) => ({ ...day, disabled: selectedDayAll.includes(day.value) }));
    setDayList(newDayList);
    formRef.current?.setFieldValue('dayGroup', []);

    // 更新column
    const priceColumns = selectedDays.map((dayGroup) => (
      {
        title: `每周${dayGroup?.map((day) => DayMap[day]).join('/')}`,
        dataIndex: `price-${dayGroup?.join('-')}`,
        render: (dom, entity) => <InputNumber
          placeholder='请输入'
          controls={false}
          addonAfter={`${opType === EOpType.price ? '元' : '间'}`}
          onChange={(val) => handleChangePrice(val, {
            day: dayGroup,
            roomId: entity.roomId
          })}
        />
      }
    ))
    const newColumns = columns.slice(0, 2).concat(priceColumns);
    setColumn(newColumns);

    // 清空表格数据
    tableRef?.current?.reset();
    // setTableListDataSource([]);
  }, [selectedDays, selectedDates, opType]);

  // 「星期组别」、「日期组别」已选值发生变化
  useEffect(() => {
    if (!selectedDays?.length && !selectedDates?.length) return;
    console.log(selectedDates, 777)
    // 清空 configList 记录
    priceListRef.current = {};
    selectedDates.forEach((date) => {
      const [startDate, endDate] = date?.split('~');
      selectedDays.forEach((day) => {
        const priceItem = {}
        // 前端侧 id 作为唯一标识
        const id = `${startDate}|${endDate}|${day?.join(',')}`;
        priceListRef.current[id] = priceItem;
      });
    })
    console.log(priceListRef.current, 123123);
    
  }, [selectedDays, selectedDates]);

  const removeDayGroup = (idx) => {
    selectedDays.splice(idx, 1);
    setSelectedDays([...selectedDays]);
  }

  return (
    <ModalForm
      className='u-edit-multi-price-modal'
      formRef={formRef}
      title="批量修改"
      visible={visible}
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
        label="修改内容"
        rules={[
          {
            required: true,
            message: '请选择修改内容!',
          },
        ]}
        name="opType"
        initialValue={EOpType.price}
        options={[
          { value: EOpType.price, label: '房价' },
          { value: EOpType.amount, label: '数量' },
        ]}
        fieldProps={{
          onChange: (e) => {
            const type = e.target.value;
            setOpType(type);
          }
        }}
      />

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
          // { value: '1', label: '按日期', disabled: true },
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
              options={dayList}
              required
              addonAfter={
                <div className='icon increase' onClick={addDayGroup} />
              }
            />
            {!!selectedDays?.length && <div className='day-selected-wrapper'>
              {selectedDays.map((group, idx) => 
                <div className='item' key={group}>
                  已选组{idx + 1}：{group?.map((day) => DayMap[day]).join('、')}
                  <div className='icon decrease' onClick={() => removeDayGroup(idx)} />
                </div>)
              }
            </div>}

            <ProFormDateRangePicker
              name="dateGroup"
              label="日期时间段"
              required
              fieldProps={{
                format: 'YYYY-MM-DD'
              }}
              addonAfter={
                <div className='icon increase' onClick={addDateGroup} />
              }
            />
            {!!selectedDates?.length && <div className='day-selected-wrapper'>
              {selectedDates.map((date, idx) => 
                <div className='item' key={date}>
                  已选组{idx + 1}：{date}
                  <div className='icon decrease' onClick={() => removeDayGroup(idx)} />
                </div>)
              }
            </div>}
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

      <div className='tip'>
        在 <b>{selectedDates?.map((date) => date).join('、')} </b>这段日期内，
        给 <b>每周{selectedDays.map((group) => group?.map((day) => DayMap[day]).join('/')).join('、每周')}</b> 配置不同的{opType === EOpType.price ? '价格' : '数量'}
      </div>

      <ProTable
        actionRef={tableRef}
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
        scroll={{ x: 600 }}
      />
    </ModalForm>
  );
};

export default EditMultiModal;
