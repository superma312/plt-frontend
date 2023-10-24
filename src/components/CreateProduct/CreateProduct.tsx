import { Form, Input, InputNumber, Button, Modal } from 'antd';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { CREATE_PRODUCT } from '../../api/graphql/mutation';
import { GET_USERS } from '../../api/graphql/query';
import './CreateProduct.css';

interface User {
  name: string;
  email: string;
  age?: number;
}

interface Product {
  name: string;
  price: number;
}

interface ProductFormData {
  userName: string;
  userEmail: string;
  userAge?: number;
  productName: string;
  productPrice?: string;
}

const CreateProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [price, setPrice] = useState();
  const [form] = Form.useForm();
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT);
  const { refetch } = useQuery(GET_USERS);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: ProductFormData) => {
    const createUserInput: User = {
      name: values.userName,
      email: values.userEmail,
    };

    if (values.userAge || values.userAge === 0) {
      createUserInput.age = values.userAge;
    }

    const createProductInput: Product = {
      name: values.productName,
      price: values.productPrice ? Number(values.productPrice) : 0
    };

    await createProduct({
      variables: {
        createProductInput,
        createUserInput,
      },
    });

    refetch();
    form.resetFields();
    handleCancel();
  };

  const handleChange = (value: any) => {
    const regex = /^-?\d+(\.\d{1,2})?$/;
    console.log(regex.test(value))
    if (regex.test(value)) {
      setPrice(value);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Product
      </Button>

      <Modal
        title="Create Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <Button form="productForm" type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
            <CancelBtn />
          </>
        )}
      >
        <Form
          id='productForm'
          name='productForm'
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
        >
          <div>
            <Form.Item
              name="userName"
              label="User Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your user's name",
                },
              ]}
            >
              <Input placeholder="User Name" />
            </Form.Item>

            <Form.Item
              name="userEmail"
              label="User Email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="userAge" label="User Age">
              <InputNumber
                placeholder="Age (optional)"
                className="full-width"
                min={1}
                max={100}
                onKeyDown={(event) => {
                  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item
              name="productName"
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the product name',
                },
              ]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>

            <Form.Item name="productPrice" label="Product Price">
              <InputNumber
                placeholder="Price (optional)"
                className="full-width"
                onKeyDown={(event) => {
                  if (!/^[0-9]+$/.test(event.key) && event.key !== 'Backspace' && event.key !== '.') {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProduct;
