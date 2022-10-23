import React, { useRef, useState } from 'react';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getRoomArrangeList } from '@/services/ant-design-pro/api';
import EditModal from './components/editModal';
import { getDayList } from '@/common/tools';
import './index.less';
import moment from 'moment';
import { DayMap } from '@/common/config';

const monthFormat = 'YYYY/MM';
const DefaultColumns = [
  {
    title: '客房类型',
    dataIndex: 'roomType',
    width: 160,
    fixed: 'left',
    hideInSearch: true,
  },
  // { title: 'Column 1', dataIndex: 'address', key: '1' },
  // {
  //   title: '操作',
  //   dataIndex: 'option',
  //   valueType: 'option',
  //   render: (_, record) => 
  //     <Button key='detail' type="link" size="small" onClick={() => handleDetail(record)}>
  //       查看预订情况
  //     </Button>
  //   ,
  // },
];

const ArrangeList: React.FC = () => {
  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  const formRef = useRef<ProFormInstance>();

  const [columns, setColumns] = useState< ProColumns<API.RoomArrangeListItem>[]>(DefaultColumns);
  
  // // 查看预订情况
  // const handleDetail = async (selectedItem: API.RoomArrangeListItem) => {
  //   setVisibleEditModal(true);
  //   setCurrentRow(selectedItem);
  // };

  const onClose = () => {
    setVisibleEditModal(false);
    setCurrentRow({});
    
  }

  const onChangeMonthPicker = (date) => {
    if (!date) return;
    const dateGroup = moment(date).format(monthFormat)
    console.log(dateGroup, 412321);
    const { dateList, dayList, dateListWithoutYear } = getDayList(dateGroup);

    console.log(dateList, 1);
    console.log(dayList, 2);
    console.log(dateListWithoutYear, 3);

    const additionColumns = [];
    dateListWithoutYear?.forEach((date, index) => {
      const col = {
        title: `${date}\n${DayMap[dayList[index]]}`,
        dataIndex: dateList[index],
        width: 120,
      };
      additionColumns.push(col);
    })
    const newColumns = columns.concat(additionColumns);
    console.log(newColumns, 4949494949);
    
    setColumns(newColumns);
  }

  return (
    <PageContainer>
      <ProTable<API.RoomArrangeListItem, API.PageParams>
        rowKey="id"
        className='u-room-status-table'
        formRef={formRef}
        search={false}
        request={getRoomArrangeList}
        scroll={{ x: 1300 }}
        toolbar={{
          // search: {
          //   onSearch: (value) => {
          //     alert(value);
          //   },
          // },
          filter: (
            <LightFilter>
              <ProFormDatePicker name="startdate" placeholder="请选择月份" fieldProps={{ 
                defaultValue: moment('2015-01', monthFormat),
                // format: monthFormat,
                picker: "month",
                format: 'YYYY-MM',
                onChange: onChangeMonthPicker
              }} />
            </LightFilter>
          ),
        }}
        columns={columns}
      />
      {/* 弹框：查看预订情况 */}
      <EditModal values={currentRow || {}} visible={visibleEditModal} onVisibleChange={setVisibleEditModal} onOk={onClose} />
    </PageContainer>
  );
};

export default ArrangeList;
