import React from 'react';
import {
  PageContainer,
} from '@ant-design/pro-components';
import { Tabs } from 'antd';
import TableDept from './components/table-dept';
import TableStaff from './components/table-staff';

const RechargeList: React.FC = () => {
  return (
    <PageContainer>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="部门汇总" key="1">
          <TableDept />
        </Tabs.TabPane>
        <Tabs.TabPane tab="员工汇总" key="2">
          <TableStaff />
        </Tabs.TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default RechargeList;
