import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  notification,
  Popconfirm,
  Select,
  Table,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_API, CART_ID,USER_ID } from "../../utils/common";
import { DeleteOutlined } from "@ant-design/icons";
import { formatPrice } from "../../helpers";
import { Steps } from "antd";
import { Col, Row } from "react-bootstrap";
import { set } from "lodash";

const { Search } = Input;
const { Step } = Steps;

export const Cart = (props) => {
  const { userId, cartId } = props;
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [openFormOrder, setOpenOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [step, setStep] = useState(0);
  const [disabledCoupon, setDisabledCoupon] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [inforOrder, setInforOrder] = useState();
  const [items, setItems] = useState([]);
  useEffect(() => {
    let localStorageUserId = localStorage.getItem(USER_ID);
    let localStorageCartId = localStorage.getItem(CART_ID);
    console.log(localStorageUserId);
    axios
      .get(
        `${URL_API}/Cart/get-cart-by-id/${
          cartId !== undefined ? cartId : localStorageCartId
        }`
      )
      .then((res) => {
        setData(
          res?.data?.items.map((x) => {
            let totalPriceItem =
              x?.productVariants[0]?.price * x?.productVariants[0]?.quantity;
            return {
              key: x?.productVariants[0]?.id,
              productName: x?.productName,
              quantity: x?.productVariants[0]?.quantity,
              price: x?.productVariants[0]?.price,
              total: totalPriceItem,
            };
          })
        );
      });

    axios.get(`${URL_API}/User/get-infor-user/${userId === undefined? localStorageUserId:userId}`).then((res) => {
      if (res.status === 200) {
        setInforOrder(res.data);
      }
    });
  }, []);

  const onChangeQuantity = (record, val) => {
    data.forEach((x) => {
      if (x.key === record.key) {
        x.quantity = val;
        x.total = x.quantity * x.price;
      }
    });
    setData([...data]);
  };

  const updateCart = (record) => {
    const payload = {
      id: cartId,
      items: [
        {
          productVariantId: record.key,
          quatity: record.quantity,
        },
      ],
    };
    axios
      .put(`${URL_API}/Cart/update-cart`, payload)
      .then((res) => {
        if (res)
          notification.success({
            message: "Cập nhật giỏ hàng thành công",
          });
      })
      .then(() => {
        setTimeout(1000);
        window.location.reload();
      });
  };

  const handleDeleteItem = (variantId) => {
    axios
      .delete(`${URL_API}/Cart/${cartId}/delete-item/${variantId}`)
      .then((res) => {
        if (res) console.log(res);
        notification.success({
          message: "Xóa sản phẩm giỏ hàng thành công",
        });
        setData(
          res?.data?.items.map((x) => ({
            key: x?.productVariants[0]?.id,
            productName: x?.productName,
            quantity: x?.productVariants[0]?.quantity,
            price: x?.productVariants[0]?.price,
            total:
              x?.productVariants[0]?.price * x?.productVariants[0]?.quantity,
          }))
        );
      })
      .then(() => {
        setTimeout(1000);
        window.location.reload();
      });
  };

  const onClose = () => {
    setOpenOrder(false);
    setIsUpdate(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    let totalCost = 0;
    let itemOrder = [];
    newSelectedRowKeys?.map((el) => {
      data?.map((item) => {
        if (item.key === el) {
          totalCost += item.total;
          itemOrder.push({
            productVariantId: item.key,
            quatity: item.quantity,
          });
        }
      });
    });
    setTotalPrice(totalCost);
    setItems(itemOrder);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish = (values) => {
    if (items.length === 0) {
      notification.warning({
        message: "Chọn lại sản phẩm",
      });
    }
    setLoading(true);
    console.log(userId);
    const payload = {
      userId: userId,
      description: values.description,
      fullName: values.fullName,
      phones: values.phoneNumber,
      address: values.address,
      orderItems: items,
      totalCost: totalPrice,
    };
    axios.post(`${URL_API}/Order/create-order`, payload).then((res) => {
      if (res.status === 200) {
        notification.success({
          message: "Đặt hàng thành công",
        });
        setOpenOrder(false);
        setStep(2);
        window.location.reload();
      }
    }).catch((err)=>{
        notification.error({
          message: "Đặt hàng thất bại: ",
        });
        setOpenOrder(false);
        setLoading(false);
    });
  };

  const onFinishUpdate = (props) => {
    console.log(props);
    let payload = {
      id: userId,
      address: [props.address],
      phones: [props.phoneNumber],
    };
    console.log(payload);
    axios
      .put(`${URL_API}/User/update-user`, payload)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          notification.success({
            message: "Cập nhật thành công",
          });
          setIsUpdate(false);
          setOpenOrder(true);
        }
        if (res.status !== 200) {
          notification.success({
            message: "Cập nhật thất bại",
          });
          setIsUpdate(false);
          setOpenOrder(true);
          setLoading(false);
        }
      })
      .then((res) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const onSearch = (value) => {
    axios
      .get(`${URL_API}/Coupon/get-coupon-by-code?code=${value}`)
      .then((res) => {
        if (res.data.item.minimunOrderValue > totalPrice) {
          notification.warning({
            message: "Đơn hàng chưa đạt tới " + res.data.item.minimunOrderValue,
          });
        } else {
          if (res?.data?.success) {
            setCoupon(value);
            notification.success({
              message: "Áp dụng mã giảm giá thành công",
            });
            setDisabledCoupon(true);
            setTotalPrice((prev) => prev - res.data.item.couponValue);
            const total_sale = totalPrice - res.data.item.minimunOrderValue;
            if (total_sale >= 0) {
              totalPrice = total_sale;
            } else {
              totalPrice = 0;
            }
          } else {
            notification.warning({
              message:
                "Mã giảm giá không hợp lệ, vui lòng nhập lại hoặc bỏ qua",
            });
          }
        }
      });
  };

  const columns = [
    {
      title: "Tên sản phẩm",
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
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div>
          <InputNumber
            min={1}
            defaultValue={record.quantity}
            onChange={(val) => onChangeQuantity(record, val)}
          />
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
      title: "Cập nhật",
      dataIndex: "update",
      key: "update",
      render: (_, record) => (
        <div>
          <Button className="ms-2" onClick={() => updateCart(record)}>
            Cập nhật
          </Button>
        </div>
      ),
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
      {data.length > 0 && (
        <>
          <div className="mt-3">
            <Search
              placeholder="Mã giảm giá"
              onSearch={onSearch}
              style={{ width: 200 }}
              enterButton="Áp dụng"
              disabled={disabledCoupon}
            />
          </div>
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
            Đặt hàng
          </Button>
        </>
      )}
      <Drawer
        title="Thông tin dặt hàng"
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
                message: "Vui lòng nhập họ và tên!",
              },
            ]}
          >
            <Input placeholder="Họ và Tên" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}
          >
            <Select
              placeholder={"Địa chỉ"}
              options={inforOrder?.address.map((x) => ({
                value: x,
                label: x,
              }))}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
            ]}
          >
            <Select
              placeholder={"Số điện thoại"}
              options={inforOrder?.phones.map((x) => ({
                value: x,
                label: x,
              }))}
            />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Mô tả" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </Button>{" "}
            <Button
              type="primary"
              onClick={() => setIsUpdate(true)}
              loading={loading}
            >
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title="Cập nhật thông tin dặt hàng"
        placement="right"
        onClose={onClose}
        open={isUpdate}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishUpdate}
          autoComplete="off"
        >
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ!",
              },
            ]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
            ]}
          >
            <Input type="text" placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </Button>{" "}
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
