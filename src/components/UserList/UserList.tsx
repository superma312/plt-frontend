import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Alert, Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { GET_USERS } from '../../api/graphql/query';
import { User } from '../../types/user';
import UserProductsModal from '../UserProductsModal/UserProductsModal';

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [products, setProducts] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [isUserProductsModalOpen, setIsUserProductsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setProducts(data.users
        ? data.users.map((user: User, index: number) => ({
          ...user,
          key: index,
          product_count: user.orders.length
        }))
        : []
      );
    }
  }, [loading, data]);

  if (error) {
    return (
      <Space className='full-width'>
        <Alert
          message={error.message}
          type='error'
        />
      </Space>
    );
  }

  const showUserProductModal = (email: string) => {
    setSelectedUserEmail(email);
    setIsUserProductsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUserProductsModalOpen(false);
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: "Product's Count",
      dataIndex: 'product_count',
      key: 'product_count',
    },
    {
      title: 'Action',
      key: 'action',
      render: (user) => (
        <Space size='middle'>
          <Button type="primary" onClick={() => showUserProductModal(user.email)}>
            Product List
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>Users</h2>

      <Table columns={columns} dataSource={products} className='full-width' />

      <UserProductsModal
        email={selectedUserEmail}
        isModalOpen={isUserProductsModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default UserList;