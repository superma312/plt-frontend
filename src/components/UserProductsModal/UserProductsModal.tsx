import { FC, useEffect, useState } from 'react';
import { Modal, Table, Space, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@apollo/client';

import { FIND_USER_BY_EMAIL } from '../../api/graphql/query';
import { Product } from '../../types/product';

interface UserProductsModalProps {
  email: string;
  isModalOpen: boolean;
  onClose: () => void;
}

const UserProductsModal: FC<UserProductsModalProps> = ({
  email,
  isModalOpen,
  onClose,
}) => {
  const [products, setProducts] = useState([]);
  const { loading, error, data, refetch } = useQuery(FIND_USER_BY_EMAIL, {
    variables: { email },
    skip: !isModalOpen,
  });

  useEffect(() => {
    if (isModalOpen) {
      refetch();
    }
  }, [isModalOpen, refetch]);

  useEffect(() => {
    if (!loading) {
      setProducts(data && data.findOneUserByEmail && data.findOneUserByEmail.orders
        ? data.findOneUserByEmail.orders.map((product: Product, index: number) => ({
          ...product,
          key: index,
        }))
        : []
      );
    }
  }, [loading, data]);

  const columns: ColumnsType<Product> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  return (
    <Modal
      title="User Product List"
      open={isModalOpen}
      onCancel={onClose}
      footer={null}
    >
      {error && (
        <Space className='full-width'>
          <Alert
            message={error.message}
            type='error'
          />
        </Space>
      )}

      <Table columns={columns} dataSource={products} className='full-width' />
    </Modal>
  );
};

export default UserProductsModal;
