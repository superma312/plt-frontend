import React from 'react';
import { ConfigProvider } from 'antd';

import Dashboard from './components/Dashboard/Dashboard';
import PageLayout from './components/PageLayout/PageLayout';
import ApolloProviderWrapper from './services/ApolloProviderWrapper';
import './App.css';

function App() {
  return (
    <ApolloProviderWrapper>
      <ConfigProvider>
        <PageLayout>
          <Dashboard />
        </PageLayout>
      </ConfigProvider>
    </ApolloProviderWrapper>
  );
}

export default App;
