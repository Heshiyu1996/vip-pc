import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
// import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        欢迎使用金水台VIP管理系统
      </Card>
    </PageContainer>
  );
};

export default Welcome;
