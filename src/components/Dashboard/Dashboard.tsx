import { Flex } from 'antd';

import CreateProduct from '../CreateProduct/CreateProduct';
import UserList from '../UserList/UserList';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <Flex vertical>
      <Flex justify='flex-end' className='full-width create-product-wrapper'>
        <CreateProduct />
      </Flex>

      <Flex className='full-width' vertical>
        <UserList />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
