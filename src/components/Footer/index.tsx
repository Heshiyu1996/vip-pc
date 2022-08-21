import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = '';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '1',
          title: '祥顺控股',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
