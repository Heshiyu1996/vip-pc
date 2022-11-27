import React, { useEffect, useRef, useState } from 'react';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getRoomArrangeStatusList } from '@/services/ant-design-pro/api';
import EditModal from './components/editModal';
import { getDayList } from '@/common/tools';
import moment from 'moment';
import { DayMap } from '@/common/config';
import './index.less';

const dateFormat = 'YYYY-MM-DD';
const defaultDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
const DefaultColumns = [
  {
    title: '客房类型',
    dataIndex: 'roomType',
    width: 160,
    fixed: 'left',
    hideInSearch: true,
  }
];


const ArrangeList: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<any>(moment(defaultDate));

  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  const formRef = useRef<ProFormInstance>();

  const [columns, setColumns] = useState< ProColumns<API.RoomArrangeListItem>[]>(DefaultColumns);
  
  // 查看房态
  const edit = async (selectedItem: API.RoomArrangeListItem) => {
    setVisibleEditModal(true);
    setCurrentRow(selectedItem);
  };

  // 获取房态列表
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async (date) => {
    try {
      setLoading(true);
      const params = {
        // month,
        date
      }
      const res = await getRoomArrangeStatusList(params);
      setLoading(false);
      setData(res?.data || {});
      return res?.data || {};
    } catch (error) {
      setLoading(false);
    }
  }

  const onChangeMonthPicker = async (date) => {
    if (!date) return;
    setCurrentDate(moment(date));

    const dateGroup = moment(date).format(dateFormat)
    // 先请求数据
    const data = await fetchData(dateGroup);
    // 默认获取第一个房型下的所有日期（筛选掉roomType这个key）
    const dateList = Object.keys(data?.[0]).filter((item) => item !== 'roomType');
    const { dayList } = getDayList(dateList);

    const additionColumns = [];
    dateList?.forEach((date, index) => {
      const col = {
        title: `${date}\n${DayMap[dayList[index]]}`,
        dataIndex: date,
        width: 120,
        render: (item, record) => {
          const isEmpty = (item?.totalAmount - item?.bookAmount) === 0;
          
          const info = {
            roomType: record.roomType,
            date,
            isOpen: item.isOpen,
            amountDesc: `${item?.totalAmount ?? '-'}/${(item?.totalAmount - item?.bookAmount) || '-'}/${item?.bookAmount ?? '-'}`,
            totalAmount: item.totalAmount,
            price: item.price,
          }

          return <div className={`u-status-cell ${isEmpty ? 'empty' : ''} ${!item.isOpen ? 'close' : ''}`} onClick={() => edit(info)}>
            {isEmpty && <div className='icon-empty'>罄</div>}
            {!item.isOpen && <div className='icon-close'>关</div>}
            <div className='value'>{item?.totalAmount ?? '-'}/{(item?.totalAmount - item?.bookAmount) || '-'}/{item?.bookAmount ?? '-'}</div>
            <div className='label'>总/剩/售</div>
            <div className='price'>￥{item?.price ?? '-'}</div>
          </div>
        }
      };
      additionColumns.push(col);
    })
    const newColumns = DefaultColumns.concat(additionColumns);
    setColumns(newColumns);
  }

  useEffect(() => {
    onChangeMonthPicker(moment(defaultDate));
  }, []);

  const onOk = () => {
    setVisibleEditModal(false);
    setCurrentRow({});
    onChangeMonthPicker(currentDate)
  }

  return (
    <PageContainer>
      <ProTable<API.RoomArrangeListItem, API.PageParams>
        rowKey="roomType"
        className='u-room-status-table'
        formRef={formRef}
        search={false}
        loading={loading}
        dataSource={data}
        scroll={{ x: 1300, y: 1000 }}
        toolbar={{
          filter: (
            <LightFilter>
              <ProFormDatePicker
                name="startdate"
                placeholder="请选择日期"
                initialValue={moment(defaultDate, dateFormat)}
                fieldProps={{ 
                  onChange: onChangeMonthPicker
                }}
              />
            </LightFilter>
          ),
        }}
        columns={columns}
      />
      {/* 弹框：编辑房态 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onOk} />
    </PageContainer>
  );
};

export default ArrangeList;
