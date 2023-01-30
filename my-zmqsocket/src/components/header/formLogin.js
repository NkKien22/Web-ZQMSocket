import { Button, Form, Input, notification } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, URL_API,CART_ID ,USER_ID} from '../../utils/common';

export const FormLogin = (props) => {
  const { setIsOpenFormLogin } = props;
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    const payload = {
      userName: values.username,
      password: values.password,
    };
    axios.post(`${URL_API}/User/user-login`, payload)
      .then(res => {
        if(res.status === 200) {
          localStorage.setItem(TOKEN_KEY, res.data.access_token);
          localStorage.setItem(REFRESH_TOKEN_KEY, res.data.refresh_token);
          localStorage.setItem(CART_ID, res.data.cartId);
          localStorage.setItem(CART_ID, res.data.cartId);
          localStorage.setItem(USER_ID, res.data.id);
          window.location.reload();
          notification.success({
            message: 'Bạn đã đăng nhập thành công',
          });
          setIsOpenFormLogin(false);
        }else{
          notification.error({
            message: res.data.message
          });
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tài khoản!',
          },
        ]}
      >
        <Input placeholder='Vui lòng nhập tài khoản' />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!',
          },
        ]}
      >
        <Input.Password placeholder='Vui lòng nhập mật khẩu' />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Đăng Nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
