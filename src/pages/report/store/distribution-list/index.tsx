import React from 'react';
import {
  PageContainer,
} from '@ant-design/pro-components';
import { Tabs } from 'antd';
import TableDeptPerformance from './components/table-dept-performance';
import TableStaffPerformance from './components/table-staff-performance';
import TableStaffSale from './components/table-staff-sale';

const RechargeList: React.FC = () => {
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="部门业绩统计" key="1">
          <TableDeptPerformance />
        </Tabs.TabPane>
        <Tabs.TabPane tab="员工业绩统计" key="2">
          <TableStaffPerformance />
        </Tabs.TabPane>
        <Tabs.TabPane tab="员工卖货明细" key="3">
          <TableStaffSale />
        </Tabs.TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default RechargeList;
