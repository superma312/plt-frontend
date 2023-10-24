import { Layout } from 'antd';
import { FC, ReactNode } from 'react';

import './PageLayout.css';

const { Header, Content } = Layout;

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({
  children,
}) => (
  <Layout>
    <Header>
      <h2 className='text-white m-0'>
        Dashboard
      </h2>
    </Header>

    <Content className='page-content'>
      {children}
    </Content>
  </Layout>
);

export default PageLayout;
