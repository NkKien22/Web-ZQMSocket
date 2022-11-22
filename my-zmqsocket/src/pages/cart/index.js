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
import { Steps } from "antd";
import { Col, Row } from "react-bootstrap";

const { Search } = Input;
const { Step } = Steps;

export const Cart = (props) => {
  const { userId } = props;
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [openFormOrder, setOpenOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [couponValid, setCouponValid] = useState(false);
  const [step, setStep] = useState(0);

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
    }).then(() => {
      window.location.reload();
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
        window.location.reload();
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
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = (values) => {
    setLoading(true);
    const product = data
      .filter((x) => selectedRowKeys.includes(x.key))
      .map((x) => ({
        cartID: x.key,
        price: x.price,
      }));
    const payload = {
      codeCoupon: couponValid ? coupon : null,
      userID: userId,
      description: values.description,
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      email: values.email,
      product,
    };
    axios
      .post(`${URL_API}/Order/create-order`, payload)
      .then((res) => {
        if (res) {
          notification.success({
            message: "Đặt hàng thành công",
          });
          setOpenOrder(false);
          setStep(3);
        }
      })
      .finally(() => setLoading(true));
  };

  const onSearch = (value) => {
    axios
      .get(`${URL_API}/Coupon/get-coupon-by-code?code=${value}`)
      .then((res) => {
        if (res?.data?.status === "200") {
          setCoupon(value);
          setCouponValid(true);
        } else {
          setCouponValid(false);
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
      <Row>
        <Col sm={12}>
          <Steps current={step}>
            <Step title="Giỏ hàng" />
            <Step title="Điền thông tin" />
            <Step title="Đặt hàng thành công" />
          </Steps>
        </Col>
      </Row>
      <Table
        className="mt-4"
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
        onClick={() => {
          setOpenOrder(true);
          setStep(1);
        }}
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
