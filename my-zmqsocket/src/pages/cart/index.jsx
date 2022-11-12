import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  notification,
  Popconfirm,
  Table,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_API } from "../../utils/common";
import { DeleteOutlined } from "@ant-design/icons";
import { formatPrice } from "../../helpers";

const { Search } = Input;

export const Cart = (props) => {
  const { userId } = props;
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [openFormOrder, setOpenOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);

  //   key: x?.variantId,
  //   name: x?.productName,
  //   quantity: x?.quantity,
  //   price: x?.price
  // {
  //     key: '1',
  //     name: 'Mike',
  //     age: 32,
  //     address: '10 Downing Street',
  //   },
  const onChangeQuantity = (record, val) => {
    data.forEach((x) => {
      if (x.key === record.key) x.quantity = val;
    });
  };

  const updateCart = (cartId, quantity) => {
    const payload = {
      cartId,
      quantity,
    };
    axios.put(`${URL_API}/CartItem/update-cartItem`, payload).then((res) => {
      if (res)
        notification.success({
          message: "Cập nhật giỏ hàng thành công",
        });
    });
  };

  const handleDeleteItem = (cartId) => {
    axios
      .delete(`${URL_API}/CartItem/delete-cart?cartId=${cartId}`)
      .then((res) => {
        if (res)
          notification.success({
            message: "Xóa sản phẩm giỏ hàng thành công",
          });
      })
      .then(() => {
        getCarts(userId);
      });
  };

  const onClose = () => {
    setOpenOrder(false);
  };

  const columns = [
    {
      title: "Ten sản phảm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{formatPrice(text)}</a>,
    },
    {
      title: "Số l[ợng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div>
          <InputNumber
            min={1}
            max={10}
            defaultValue={record.quantity}
            onChange={(val) => onChangeQuantity(record, val)}
          />
          <Button
            className="ms-2"
            onClick={() => updateCart(record.key, record.quantity)}
          >
            Cập nhật
          </Button>
        </div>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <a>{formatPrice(text)}</a>,
    },
    {
      title: "Xóa",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc chắn xóa?"
          onConfirm={() => handleDeleteItem(record.key)}
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];

  const getCarts = (userId) => {
    axios
      .get(`${URL_API}/CartItem/getbyid-cartItem?userId=${userId}`)
      .then((res) => {
        setData(
          res?.data?.item.map((x) => ({
            key: x?.cartId,
            productName: x?.productName,
            quantity: x?.quantity,
            price: x?.price,
            total: x?.total,
          }))
        );
        setTotalPrice(res?.data?.message);
      });
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = (values) => {
    setLoading(true);
    // const payload = {
    //   username: values.username,
    //   password: values.password,
    // };
  };

  const onSearch = (value) => {
    axios
      .get(`${URL_API}/Coupon/get-coupon-by-code?code=${value}`)
      .then((res) => {
        if (res?.data?.status === "200") {
          setCoupon(value);
        } else {
          notification.warning({
            message: "Mã giảm giá khong hợp lệ, vui lòng nhập lại hoặc bỏ qua",
          });
        }
      });
  };

  useEffect(() => {
    if (userId) getCarts(userId);
  }, [userId]);

  return (
    <div className="container mt-5">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <h4 className="ms-auto mt-3">Tổng tiền: {formatPrice(totalPrice)}</h4>
      <Button
        type="primary"
        disabled={selectedRowKeys.length === 0}
        size="large"
        onClick={setOpenOrder}
      >
        Dặt hàng
      </Button>
      <Drawer
        title="Thong tin dặt hàng"
        placement="right"
        onClose={onClose}
        open={openFormOrder}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và t3n!",
              },
            ]}
          >
            <Input placeholder="Họ và ten" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ddiaj chỉ!",
              },
            ]}
          >
            <Input placeholder="Ddia chi" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập SDT",
              },
            ]}
          >
            <Input type="number" placeholder="SDT" />
          </Form.Item>
          <Form.Item name="email">
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Mo tả" />
          </Form.Item>
          <Form.Item name="codeCoupon">
            <Search
              placeholder="Mã giảm giá"
              onSearch={onSearch}
              style={{ width: 200 }}
              enterButton="Áp dụng"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
